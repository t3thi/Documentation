#!/usr/bin/env python3
"""Safely create and verify a T3THI meeting note on HedgeDoc 1.x.

HedgeDoc 1.x has a documented create API but no supported update API. This
tool therefore creates a new note once, verifies its exported Markdown, and
only then records the returned public URL in MeetingMinutes/overview.md.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import sqlite3
import ssl
import stat
import subprocess
import sys
import tempfile
import time
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Callable
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPRedirectHandler, HTTPSHandler, Request, build_opener


DEFAULT_BASE_URL = "https://notes.typo3.org"
SESSION_COOKIE_ENV = "HEDGEDOC_SESSION_COOKIE"
FIREFOX_BROWSER = "firefox"
FIREFOX_COOKIE_NAME = "connect.sid"
HEDGEDOC_LOGIN_PATH = "/auth/saml"
FIREFOX_COPY_ATTEMPTS = 3
MAX_SOURCE_BYTES = 1_000_000
REDIRECT_CODES = {301, 302, 303, 307, 308}
FRONTMATTER_DATE_RE = re.compile(
    r'^title: "(?P<date>\d{4}-\d{2}-\d{2}) - Translation Handling Initiative - Team Meeting Minutes"$',
    re.MULTILINE,
)
PATH_DATE_RE = re.compile(r"(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})\.md$")
LINKED_ENTRY_RE = re.compile(
    r"^- \[(?P<label>\d{4}-\d{2}-\d{2}(?:,[^\]]*)?)\]\((?P<url>[^)]+)\)\s*$"
)
PLAIN_ENTRY_RE = re.compile(r"^- (?P<label>\d{4}-\d{2}-\d{2}(?:,.*)?)\s*$")


class PublicationError(RuntimeError):
    """Raised when publication cannot be completed safely."""


class AuthenticationError(PublicationError):
    """Raised when a supplied HedgeDoc session is not authenticated."""


class NoRedirect(HTTPRedirectHandler):
    """Expose redirects so the HedgeDoc note URLs can be validated."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):  # type: ignore[no-untyped-def]
        return None


@dataclass(frozen=True)
class LocalMinutes:
    source_path: Path
    overview_path: Path
    meeting_date: str
    content: bytes
    sha256: str
    overview_label: str
    existing_url: str | None


@dataclass(frozen=True)
class PublicationResult:
    status: str
    meeting_date: str
    url: str
    sha256: str
    overview_updated: bool


def normalized_markdown(path: Path) -> bytes:
    try:
        raw = path.read_bytes()
    except OSError as exc:
        raise PublicationError(f"Cannot read Minutes file: {exc}") from exc
    if not raw:
        raise PublicationError("Minutes file is empty")
    if len(raw) > MAX_SOURCE_BYTES:
        raise PublicationError(
            f"Minutes file exceeds the {MAX_SOURCE_BYTES}-byte safety limit"
        )
    try:
        raw.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise PublicationError("Minutes file must be valid UTF-8") from exc
    return raw.replace(b"\r\n", b"\n").replace(b"\r", b"")


def discover_repository_root(path: Path) -> Path:
    resolved = path.resolve()
    start = resolved if resolved.is_dir() else resolved.parent
    for candidate in (start, *start.parents):
        if (candidate / ".git").exists():
            return candidate
    raise PublicationError("Minutes file is not inside a Git repository")


def discover_latest_minutes(repository_path: Path | None = None) -> Path:
    """Return the chronologically latest canonical weekly Minutes file."""

    repository_root = discover_repository_root(repository_path or Path.cwd())
    weekly_root = repository_root / "MeetingMinutes" / "Weekly"
    candidates = [
        path
        for path in weekly_root.glob("*/*/*.md")
        if PATH_DATE_RE.fullmatch(path.relative_to(weekly_root).as_posix())
    ]
    if not candidates:
        raise PublicationError(
            "No Minutes found below MeetingMinutes/Weekly/YYYY/MM/DD.md"
        )
    return max(candidates, key=lambda path: path.relative_to(weekly_root).as_posix())


def resolve_minutes_path(minutes: Path | None) -> tuple[Path, bool]:
    """Resolve an explicit Minutes path or select the latest canonical file."""

    if minutes is not None:
        return minutes, False
    latest = discover_latest_minutes()
    repository_root = discover_repository_root(latest)
    print(
        f"Selected latest Minutes: {latest.relative_to(repository_root)}",
        file=sys.stderr,
    )
    return latest, True


def derive_meeting_date(source_path: Path, content: bytes) -> str:
    path_match = PATH_DATE_RE.search(source_path.as_posix())
    if path_match is None:
        raise PublicationError(
            "Minutes path must end in MeetingMinutes/Weekly/YYYY/MM/DD.md"
        )
    path_date = "-".join(
        (path_match.group("year"), path_match.group("month"), path_match.group("day"))
    )
    text = content.decode("utf-8")
    if not text.startswith("---\n"):
        raise PublicationError("Minutes must start with YAML frontmatter")
    frontmatter_end = text.find("\n---\n", 4)
    if frontmatter_end < 0:
        raise PublicationError("Minutes YAML frontmatter is not closed")
    title_match = FRONTMATTER_DATE_RE.search(text[4:frontmatter_end])
    if title_match is None:
        raise PublicationError("Minutes frontmatter title is missing or malformed")
    if title_match.group("date") != path_date:
        raise PublicationError("Minutes path date and frontmatter date differ")
    return path_date


def find_overview_entry(text: str, meeting_date: str) -> tuple[int, str, str | None]:
    matches: list[tuple[int, str, str | None]] = []
    for index, line in enumerate(text.splitlines()):
        linked = LINKED_ENTRY_RE.match(line)
        plain = PLAIN_ENTRY_RE.match(line)
        match = linked or plain
        if match is None or not match.group("label").startswith(meeting_date):
            continue
        url = linked.group("url") if linked is not None else None
        matches.append((index, match.group("label"), url))
    if len(matches) != 1:
        raise PublicationError(
            f"Expected exactly one {meeting_date} entry in MeetingMinutes/overview.md; "
            f"found {len(matches)}"
        )
    return matches[0]


def inspect_local_minutes(source_path: Path) -> LocalMinutes:
    source = source_path.resolve()
    repository_root = discover_repository_root(source)
    expected_root = (repository_root / "MeetingMinutes" / "Weekly").resolve()
    try:
        relative_source = source.relative_to(expected_root)
    except ValueError as exc:
        raise PublicationError(
            "Minutes file must be below MeetingMinutes/Weekly/ in the repository"
        ) from exc
    if len(relative_source.parts) != 3:
        raise PublicationError(
            "Minutes path must be exactly MeetingMinutes/Weekly/YYYY/MM/DD.md"
        )

    content = normalized_markdown(source)
    meeting_date = derive_meeting_date(source, content)
    overview = repository_root / "MeetingMinutes" / "overview.md"
    try:
        overview_text = overview.read_text(encoding="utf-8")
    except OSError as exc:
        raise PublicationError(f"Cannot read MeetingMinutes/overview.md: {exc}") from exc
    _line_index, label, existing_url = find_overview_entry(overview_text, meeting_date)
    return LocalMinutes(
        source_path=source,
        overview_path=overview,
        meeting_date=meeting_date,
        content=content,
        sha256=hashlib.sha256(content).hexdigest(),
        overview_label=label,
        existing_url=existing_url,
    )


def validate_base_url(base_url: str, *, allow_insecure_http: bool = False) -> str:
    normalized = base_url.rstrip("/")
    parsed = urlparse(normalized)
    allowed_schemes = {"https"} | ({"http"} if allow_insecure_http else set())
    if parsed.scheme not in allowed_schemes or not parsed.netloc or parsed.path:
        raise PublicationError("HedgeDoc base URL must be an HTTPS origin without a path")
    if parsed.username or parsed.password or parsed.query or parsed.fragment:
        raise PublicationError("HedgeDoc base URL must not contain credentials or parameters")
    return normalized


def validate_public_url(url: str, base_url: str) -> str:
    parsed = urlparse(url)
    base = urlparse(base_url)
    if (parsed.scheme, parsed.netloc) != (base.scheme, base.netloc):
        raise PublicationError("HedgeDoc returned a redirect to a different origin")
    if not re.fullmatch(r"/s/[^/]+", parsed.path):
        raise PublicationError(f"Unexpected HedgeDoc public URL path: {parsed.path}")
    if parsed.query:
        raise PublicationError("Unexpected query parameters in HedgeDoc public URL")
    return parsed._replace(fragment="").geturl()


def firefox_profile_roots() -> list[Path]:
    """Return normal Firefox profile roots for the current operating system."""

    home = Path.home()
    if sys.platform == "darwin":
        candidates = [
            home / "Library" / "Application Support" / "Firefox" / "Profiles"
        ]
    elif os.name == "nt":
        appdata = os.environ.get("APPDATA")
        local_appdata = os.environ.get("LOCALAPPDATA")
        candidates = []
        if appdata:
            candidates.append(Path(appdata) / "Mozilla" / "Firefox" / "Profiles")
        if local_appdata:
            candidates.append(
                Path(local_appdata)
                / "Packages"
                / "Mozilla.Firefox_n80bbvh6b1yt2"
                / "LocalCache"
                / "Roaming"
                / "Mozilla"
                / "Firefox"
                / "Profiles"
            )
    else:
        candidates = [
            home / ".mozilla" / "firefox",
            home / ".config" / "mozilla" / "firefox",
            home / ".var" / "app" / "org.mozilla.firefox" / ".mozilla" / "firefox",
            home / "snap" / "firefox" / "common" / ".mozilla" / "firefox",
        ]
    return [candidate for candidate in candidates if candidate.is_dir()]


def discover_firefox_cookie_databases(profile: str | None = None) -> list[Path]:
    """Find Firefox cookies.sqlite files, newest active profile first."""

    roots = firefox_profile_roots()
    if profile:
        explicit = Path(profile).expanduser()
        if explicit.is_dir():
            profile_directories = [explicit]
        else:
            profile_directories = [
                root / profile for root in roots if (root / profile).is_dir()
            ]
        if not profile_directories:
            raise PublicationError(f"Firefox profile not found: {profile}")
        databases = [directory / "cookies.sqlite" for directory in profile_directories]
    else:
        databases = [
            database for root in roots for database in root.glob("*/cookies.sqlite")
        ]

    readable = [database for database in databases if database.is_file()]
    if not readable:
        if not profile:
            return []
        raise PublicationError(f"No Firefox cookies.sqlite found for profile '{profile}'")
    try:
        return sorted(
            readable, key=lambda path: path.stat().st_mtime_ns, reverse=True
        )
    except OSError as exc:
        raise PublicationError(f"Cannot inspect Firefox cookie database: {exc}") from exc


def copy_live_sqlite_database(source_path: Path, target_path: Path) -> None:
    """Copy a live Firefox database without waiting for a SQLite read lock."""

    try:
        shutil.copy2(source_path, target_path)
        source_wal = Path(str(source_path) + "-wal")
        if source_wal.is_file():
            try:
                shutil.copy2(source_wal, Path(str(target_path) + "-wal"))
            except FileNotFoundError:
                # Firefox may checkpoint and remove the WAL between both checks.
                pass
    except OSError as exc:
        raise PublicationError(f"Cannot copy Firefox cookie database: {exc}") from exc


def normalize_cookie_expiry(expiry: int) -> float:
    """Normalize Firefox expiry values stored as seconds or milliseconds."""

    return expiry / 1000 if expiry > 10_000_000_000 else float(expiry)


def read_firefox_cookie_candidates(
    base_url: str, profile: str | None = None
) -> list[str]:
    """Read only matching HedgeDoc session cookies from temporary DB copies."""

    validated_base_url = validate_base_url(base_url)
    hostname = urlparse(validated_base_url).hostname
    if not hostname:
        raise PublicationError("HedgeDoc base URL has no hostname")

    candidates: list[tuple[int, int, str]] = []
    read_errors: list[Exception] = []
    now = time.time()
    databases = discover_firefox_cookie_databases(profile)
    with tempfile.TemporaryDirectory(prefix="t3thi-firefox-") as temporary:
        temporary_root = Path(temporary)
        for index, database in enumerate(databases):
            copied_database = temporary_root / f"cookies-{index}.sqlite"
            rows = None
            last_error: Exception | None = None
            for _attempt in range(FIREFOX_COPY_ATTEMPTS):
                copied_database.unlink(missing_ok=True)
                Path(str(copied_database) + "-wal").unlink(missing_ok=True)
                Path(str(copied_database) + "-shm").unlink(missing_ok=True)
                try:
                    copy_live_sqlite_database(database, copied_database)
                    with sqlite3.connect(copied_database, timeout=0.25) as connection:
                        rows = connection.execute(
                            """
                            SELECT value, expiry, lastAccessed
                            FROM moz_cookies
                            WHERE host IN (?, ?) AND name = ?
                            ORDER BY lastAccessed DESC
                            """,
                            (hostname, "." + hostname, FIREFOX_COOKIE_NAME),
                        ).fetchall()
                    break
                except (OSError, sqlite3.Error, PublicationError) as exc:
                    last_error = exc
            if rows is None:
                if last_error is not None:
                    read_errors.append(last_error)
                continue
            try:
                profile_mtime = database.stat().st_mtime_ns
            except OSError as exc:
                read_errors.append(exc)
                continue
            for value, expiry, last_accessed in rows:
                if not isinstance(value, str) or not value:
                    continue
                numeric_expiry = int(expiry or 0)
                if (
                    numeric_expiry > 0
                    and normalize_cookie_expiry(numeric_expiry) <= now
                ):
                    continue
                candidates.append((int(last_accessed or 0), profile_mtime, value))

    if read_errors and len(read_errors) == len(databases):
        raise PublicationError(
            "Cannot read any Firefox cookie database safely: "
            f"{read_errors[-1]}"
        ) from read_errors[-1]

    headers: list[str] = []
    seen_values: set[str] = set()
    for _last_accessed, _profile_mtime, value in sorted(candidates, reverse=True):
        if value in seen_values:
            continue
        seen_values.add(value)
        headers.append(f"{FIREFOX_COOKIE_NAME}={value}")
    return headers


def open_firefox_login(login_url: str) -> None:
    """Open the HedgeDoc SAML sign-in page in the user's normal Firefox."""

    try:
        if sys.platform == "darwin":
            subprocess.run(["open", "-a", "Firefox", login_url], check=True)
        elif os.name == "nt":
            os.startfile(login_url)  # type: ignore[attr-defined]
        else:
            subprocess.Popen(
                ["firefox", login_url],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                start_new_session=True,
            )
    except (OSError, subprocess.CalledProcessError) as exc:
        raise PublicationError(f"Cannot open Firefox login page: {exc}") from exc


def wait_for_firefox_login(login_url: str) -> None:
    """Pause only in an interactive terminal while the user completes SAML login."""

    if not sys.stdin.isatty():
        raise PublicationError(
            "No authenticated Firefox session was found and interactive login is "
            "unavailable. Sign in first or use HEDGEDOC_SESSION_COOKIE."
        )
    print(
        f"Firefox opened {login_url}. Complete the sign-in, then press Enter here.",
        file=sys.stderr,
    )
    try:
        input()
    except EOFError as exc:
        raise PublicationError("Firefox login confirmation was not received") from exc


class HedgeDocClient:
    def __init__(
        self,
        base_url: str,
        session_cookie: str,
        timeout: float = 20.0,
        *,
        allow_insecure_http: bool = False,
    ) -> None:
        self.base_url = validate_base_url(
            base_url, allow_insecure_http=allow_insecure_http
        )
        if not session_cookie or "\n" in session_cookie or "\r" in session_cookie:
            raise PublicationError(
                f"{SESSION_COOKIE_ENV} must contain one valid Cookie header value"
            )
        self.session_cookie = session_cookie
        self.timeout = timeout
        handlers: list[Any] = [NoRedirect()]
        if self.base_url.startswith("https://"):
            handlers.append(HTTPSHandler(context=ssl.create_default_context()))
        self.opener = build_opener(*handlers)

    def _request(
        self, request: Request, *, authentication_check: bool = False
    ) -> bytes:
        try:
            with self.opener.open(request, timeout=self.timeout) as response:
                return response.read()
        except HTTPError as exc:
            try:
                if authentication_check and exc.code in {401, 403}:
                    raise AuthenticationError(
                        "The HedgeDoc session is missing, expired, or not authenticated"
                    ) from exc
                body = exc.read(200).decode("utf-8", errors="replace").strip()
                detail = f": {body}" if body else ""
                raise PublicationError(
                    f"HedgeDoc request failed with HTTP {exc.code}{detail}"
                ) from exc
            finally:
                exc.close()
        except (URLError, TimeoutError, OSError) as exc:
            raise PublicationError(f"HedgeDoc request failed: {exc}") from exc

    def _redirect(self, request: Request) -> str:
        try:
            self.opener.open(request, timeout=self.timeout)
        except HTTPError as exc:
            try:
                if exc.code not in REDIRECT_CODES:
                    body = exc.read(200).decode("utf-8", errors="replace").strip()
                    detail = f": {body}" if body else ""
                    raise PublicationError(
                        f"HedgeDoc request failed with HTTP {exc.code}{detail}"
                    ) from exc
                location = exc.headers.get("Location")
                if not location:
                    raise PublicationError(
                        "HedgeDoc redirect did not include a Location header"
                    )
                absolute = urljoin(self.base_url + "/", location)
                parsed = urlparse(absolute)
                base = urlparse(self.base_url)
                if (parsed.scheme, parsed.netloc) != (base.scheme, base.netloc):
                    raise PublicationError("HedgeDoc redirected to a different origin")
                return absolute
            finally:
                exc.close()
        except (URLError, TimeoutError, OSError) as exc:
            raise PublicationError(
                "HedgeDoc request outcome is uncertain. Do not retry blindly; check the "
                "account history for a newly created note first. " + str(exc)
            ) from exc
        raise PublicationError("HedgeDoc did not return the expected redirect")

    def _headers(self, *, authenticated: bool = True) -> dict[str, str]:
        headers = {
            "Accept": "application/json, text/markdown;q=0.9, text/html;q=0.8",
            "User-Agent": "t3thi-meeting-minutes/1.0",
        }
        if authenticated:
            headers["Cookie"] = self.session_cookie
        return headers

    def assert_authenticated(self) -> str:
        request = Request(self.base_url + "/me", headers=self._headers())
        raw = self._request(request, authentication_check=True)
        try:
            profile = json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise PublicationError("HedgeDoc /me returned invalid JSON") from exc
        if profile.get("status") != "ok" or not profile.get("id"):
            raise AuthenticationError(
                "The HedgeDoc session is missing, expired, or not authenticated"
            )
        return str(profile["id"])

    def download(self, public_url: str) -> bytes:
        validated = validate_public_url(public_url, self.base_url)
        request = Request(
            validated + "/download", headers=self._headers(authenticated=False)
        )
        return self._request(request).replace(b"\r\n", b"\n").replace(b"\r", b"")

    def create(self, content: bytes) -> str:
        headers = self._headers()
        headers["Content-Type"] = "text/markdown; charset=utf-8"
        create_request = Request(
            self.base_url + "/new", data=content, headers=headers, method="POST"
        )
        editor_url = self._redirect(create_request)
        editor = urlparse(editor_url)
        if not re.fullmatch(r"/[^/]+", editor.path) or editor.query or editor.fragment:
            raise PublicationError(f"Unexpected HedgeDoc editor URL: {editor_url}")

        publish_request = Request(editor_url + "/publish", headers=self._headers())
        public_url = self._redirect(publish_request)
        return validate_public_url(public_url, self.base_url)


def client_from_cookie_candidates(
    base_url: str,
    cookie_candidates: list[str],
    timeout: float,
    *,
    allow_insecure_http: bool = False,
) -> HedgeDocClient | None:
    """Return the first candidate that HedgeDoc confirms as authenticated."""

    for cookie in cookie_candidates:
        client = HedgeDocClient(
            base_url,
            cookie,
            timeout=timeout,
            allow_insecure_http=allow_insecure_http,
        )
        try:
            client.assert_authenticated()
        except AuthenticationError:
            continue
        return client
    return None


def authenticated_firefox_client(
    base_url: str,
    timeout: float,
    profile: str | None = None,
    *,
    allow_browser_login: bool = True,
    allow_insecure_http: bool = False,
    cookie_reader: Callable[
        [str, str | None], list[str]
    ] = read_firefox_cookie_candidates,
    browser_opener: Callable[[str], None] = open_firefox_login,
    login_confirmation: Callable[[str], None] = wait_for_firefox_login,
) -> HedgeDocClient:
    """Reuse an active Firefox session or guide one interactive login."""

    normalized_base_url = validate_base_url(
        base_url, allow_insecure_http=allow_insecure_http
    )
    print("Reading the Firefox session...", file=sys.stderr)
    candidates = cookie_reader(normalized_base_url, profile)
    if candidates:
        print(
            f"Validating {len(candidates)} matching Firefox session(s)...",
            file=sys.stderr,
        )
    client = client_from_cookie_candidates(
        normalized_base_url,
        candidates,
        timeout,
        allow_insecure_http=allow_insecure_http,
    )
    if client is not None:
        print("Authenticated Firefox session found.", file=sys.stderr)
        return client
    if not allow_browser_login:
        raise AuthenticationError(
            "No authenticated HedgeDoc session was found in Firefox"
        )

    login_url = normalized_base_url + HEDGEDOC_LOGIN_PATH
    browser_opener(login_url)
    login_confirmation(login_url)
    print("Reading the refreshed Firefox session...", file=sys.stderr)
    candidates = cookie_reader(normalized_base_url, profile)
    client = client_from_cookie_candidates(
        normalized_base_url,
        candidates,
        timeout,
        allow_insecure_http=allow_insecure_http,
    )
    if client is None:
        raise AuthenticationError(
            "Firefox still has no authenticated HedgeDoc session after confirmation"
        )
    return client


def replace_overview_url(local: LocalMinutes, public_url: str) -> None:
    try:
        text = local.overview_path.read_text(encoding="utf-8")
    except OSError as exc:
        raise PublicationError(f"Cannot re-read MeetingMinutes/overview.md: {exc}") from exc
    line_index, label, current_url = find_overview_entry(text, local.meeting_date)
    if current_url is not None and current_url != public_url:
        raise PublicationError(
            f"Overview entry already points to a different URL: {current_url}"
        )
    if current_url == public_url:
        return

    lines = text.splitlines(keepends=True)
    line_ending = "\n" if lines[line_index].endswith("\n") else ""
    lines[line_index] = f"- [{label}]({public_url}){line_ending}"
    updated = "".join(lines)
    try:
        mode = stat.S_IMODE(local.overview_path.stat().st_mode)
        with tempfile.NamedTemporaryFile(
            mode="w",
            encoding="utf-8",
            newline="",
            dir=local.overview_path.parent,
            prefix=".overview.",
            suffix=".tmp",
            delete=False,
        ) as handle:
            temporary_path = Path(handle.name)
            handle.write(updated)
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(temporary_path, mode)
        os.replace(temporary_path, local.overview_path)
    except OSError as exc:
        try:
            temporary_path.unlink(missing_ok=True)
        except UnboundLocalError:
            pass
        raise PublicationError(f"Cannot update MeetingMinutes/overview.md: {exc}") from exc


def publish(local: LocalMinutes, client: HedgeDocClient) -> PublicationResult:
    client.assert_authenticated()
    if local.existing_url is not None:
        existing_url = validate_public_url(local.existing_url, client.base_url)
        remote = client.download(existing_url)
        if remote != local.content:
            raise PublicationError(
                "Overview already contains a HedgeDoc URL whose content differs from "
                "the local Minutes. HedgeDoc 1.x has no supported update API; review "
                "the difference and update that note manually."
            )
        return PublicationResult(
            status="already-published",
            meeting_date=local.meeting_date,
            url=existing_url,
            sha256=local.sha256,
            overview_updated=False,
        )

    public_url = client.create(local.content)
    try:
        remote = client.download(public_url)
    except PublicationError as exc:
        raise PublicationError(
            f"HedgeDoc created {public_url}, but public read-back failed. The "
            f"overview was not changed: {exc}"
        ) from exc
    if remote != local.content:
        raise PublicationError(
            f"HedgeDoc created {public_url}, but the downloaded content does not match "
            "the local Minutes. The overview was not changed."
        )
    try:
        replace_overview_url(local, public_url)
    except PublicationError as exc:
        raise PublicationError(
            f"HedgeDoc created and verified {public_url}, but the overview update "
            f"failed: {exc}"
        ) from exc
    return PublicationResult(
        status="published",
        meeting_date=local.meeting_date,
        url=public_url,
        sha256=local.sha256,
        overview_updated=True,
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Check or publish reviewed T3THI meeting minutes to HedgeDoc."
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    check_parser = subparsers.add_parser(
        "check", help="Validate the local Minutes and overview contract without network access"
    )
    check_parser.add_argument("minutes", type=Path, nargs="?")
    check_parser.add_argument("--json", action="store_true", dest="as_json")

    publish_parser = subparsers.add_parser(
        "publish", help="Create, verify, and link one reviewed HedgeDoc note"
    )
    publish_parser.add_argument("minutes", type=Path, nargs="?")
    publish_parser.add_argument(
        "--reviewed",
        action="store_true",
        default=None,
        help="Confirm that a human reviewed the final local Minutes",
    )
    publish_parser.add_argument("--base-url", default=DEFAULT_BASE_URL)
    publish_parser.add_argument("--timeout", type=float, default=20.0)
    authentication = publish_parser.add_mutually_exclusive_group()
    authentication.add_argument(
        "--cookies-from-browser",
        choices=(FIREFOX_BROWSER,),
        help="Reuse the authenticated session from a normal Firefox profile",
    )
    authentication.add_argument(
        "--cookies-from-environment",
        action="store_true",
        help=f"Read the Cookie header from {SESSION_COOKIE_ENV}",
    )
    publish_parser.add_argument(
        "--firefox-profile",
        help="Optional Firefox profile directory or profile name",
    )
    publish_parser.add_argument(
        "--no-browser-login",
        action="store_true",
        help="Fail instead of opening Firefox when no valid session is found",
    )
    publish_parser.add_argument("--json", action="store_true", dest="as_json")
    return parser


def normalize_cli_argv(argv: list[str] | None = None) -> list[str]:
    """Default command-less invocations to the interactive publish workflow."""

    normalized = list(sys.argv[1:] if argv is None else argv)
    if not normalized or normalized[0] not in {"check", "publish"}:
        normalized.insert(0, "publish")
    return normalized


def interactive_answer(
    prompt: str,
    *,
    input_reader: Callable[[], str] | None = None,
    interactive: bool | None = None,
) -> str:
    """Read one answer without mixing prompts into JSON/stdout output."""

    is_interactive = sys.stdin.isatty() if interactive is None else interactive
    if not is_interactive:
        raise PublicationError(
            "Missing publication options cannot be confirmed non-interactively. "
            "Pass --reviewed and either --cookies-from-browser firefox or "
            "--cookies-from-environment."
        )
    print(prompt, end="", file=sys.stderr, flush=True)
    reader = input if input_reader is None else input_reader
    try:
        return reader().strip().lower()
    except EOFError as exc:
        raise PublicationError("Interactive confirmation was not received") from exc


def confirm_default_yes(
    prompt: str,
    *,
    input_reader: Callable[[], str] | None = None,
    interactive: bool | None = None,
) -> bool:
    answer = interactive_answer(
        prompt, input_reader=input_reader, interactive=interactive
    )
    if answer in {"", "y", "yes", "j", "ja"}:
        return True
    if answer in {"n", "no", "nein"}:
        return False
    raise PublicationError("Expected Enter, yes, or no")


def resolve_publish_defaults(
    args: argparse.Namespace,
    *,
    input_reader: Callable[[], str] | None = None,
    interactive: bool | None = None,
) -> None:
    """Interactively resolve omitted review and authentication choices."""

    authentication_missing = not (
        args.cookies_from_browser or args.cookies_from_environment
    )
    review_missing = args.reviewed is None
    if not review_missing and not authentication_missing:
        return

    if review_missing and authentication_missing:
        accepted = confirm_default_yes(
            "Use defaults --reviewed --cookies-from-browser firefox? [Y/n]: ",
            input_reader=input_reader,
            interactive=interactive,
        )
        if not accepted:
            raise PublicationError("Interactive publication was cancelled")
        args.reviewed = True
        args.cookies_from_browser = FIREFOX_BROWSER
        return

    if review_missing:
        accepted = confirm_default_yes(
            "Confirm completed human review (--reviewed)? [Y/n]: ",
            input_reader=input_reader,
            interactive=interactive,
        )
        if not accepted:
            raise PublicationError("Publication requires completed human review")
        args.reviewed = True
        return

    answer = interactive_answer(
        "Authentication source [firefox/environment] (default: firefox): ",
        input_reader=input_reader,
        interactive=interactive,
    )
    if answer in {"", "firefox"}:
        args.cookies_from_browser = FIREFOX_BROWSER
    elif answer in {"environment", "env"}:
        args.cookies_from_environment = True
    else:
        raise PublicationError("Expected firefox or environment")


def print_result(result: dict[str, Any], as_json: bool) -> None:
    if as_json:
        print(json.dumps(result, ensure_ascii=False, sort_keys=True))
        return
    for key, value in result.items():
        print(f"{key.replace('_', ' ').title()}: {value}")


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(normalize_cli_argv(argv))
    try:
        minutes, _automatically_selected = resolve_minutes_path(args.minutes)
        local = inspect_local_minutes(minutes)
        if args.command == "check":
            print_result(
                {
                    "status": "ready",
                    "meeting_date": local.meeting_date,
                    "sha256": local.sha256,
                    "overview_url": local.existing_url,
                },
                args.as_json,
            )
            return 0

        resolve_publish_defaults(args)
        if not args.reviewed:
            raise PublicationError(
                "Remote publication requires --reviewed after human review"
            )
        if args.timeout <= 0:
            raise PublicationError("--timeout must be greater than zero")
        if args.firefox_profile and args.cookies_from_browser != FIREFOX_BROWSER:
            raise PublicationError(
                "--firefox-profile requires --cookies-from-browser firefox"
            )
        if args.no_browser_login and args.cookies_from_browser != FIREFOX_BROWSER:
            raise PublicationError(
                "--no-browser-login requires --cookies-from-browser firefox"
            )
        if args.cookies_from_browser == FIREFOX_BROWSER:
            client = authenticated_firefox_client(
                args.base_url,
                args.timeout,
                args.firefox_profile,
                allow_browser_login=not args.no_browser_login,
            )
        else:
            session_cookie = os.environ.get(SESSION_COOKIE_ENV, "")
            client = HedgeDocClient(args.base_url, session_cookie, timeout=args.timeout)
        result = publish(local, client)
        print_result(asdict(result), args.as_json)
        return 0
    except PublicationError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
