#!/usr/bin/env python3
"""Offline tests for publish_minutes.py using a local fake HedgeDoc server."""

from __future__ import annotations

import importlib.util
import json
import sqlite3
import sys
import tempfile
import threading
import time
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


MODULE_PATH = Path(__file__).with_name("publish_minutes.py")
sys.dont_write_bytecode = True
SPEC = importlib.util.spec_from_file_location("publish_minutes", MODULE_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("Cannot load publish_minutes.py")
publish_minutes = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = publish_minutes
SPEC.loader.exec_module(publish_minutes)


MINUTES_TEMPLATE = """---
title: "2026-08-28 - Translation Handling Initiative - Team Meeting Minutes"
tags: "Meeting"
---

# Translation Handling Initiative<br>Team Meeting Minutes

Reviewed content.
"""


class FakeHedgeDocHandler(BaseHTTPRequestHandler):
    server: Any

    def log_message(self, format: str, *args: object) -> None:
        return

    def authenticated(self) -> bool:
        return self.headers.get("Cookie") in {
            "session=test-session",
            "connect.sid=test-session",
        }

    def do_GET(self) -> None:
        if self.path == "/me":
            payload = (
                {"status": "ok", "id": "user-1"}
                if self.authenticated()
                else {"status": "forbidden"}
            )
            body = json.dumps(payload).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if self.path == "/note-1/publish":
            self.send_response(302)
            self.send_header("Location", self.server.base_url + "/s/short-1")
            self.end_headers()
            return
        if self.path == "/s/short-1/download":
            self.server.download_cookie = self.headers.get("Cookie")
            if not self.server.public_download and not self.authenticated():
                self.send_response(403)
                self.end_headers()
                return
            body = self.server.note_content
            self.send_response(200)
            self.send_header("Content-Type", "text/markdown")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        self.send_response(404)
        self.end_headers()

    def do_POST(self) -> None:
        if self.path != "/new" or not self.authenticated():
            self.send_response(403)
            self.end_headers()
            return
        length = int(self.headers.get("Content-Length", "0"))
        self.server.note_content = self.rfile.read(length)
        self.server.create_count += 1
        self.send_response(302)
        self.send_header("Location", self.server.base_url + "/note-1")
        self.end_headers()


class FakeHedgeDoc:
    def __enter__(self) -> "FakeHedgeDoc":
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), FakeHedgeDocHandler)
        self.server.note_content = b""
        self.server.create_count = 0
        self.server.download_cookie = "not-requested"
        self.server.public_download = True
        host, port = self.server.server_address
        self.server.base_url = f"http://{host}:{port}"
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        return self

    def __exit__(self, *args: object) -> None:
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=5)

    @property
    def base_url(self) -> str:
        return self.server.base_url

    @property
    def create_count(self) -> int:
        return self.server.create_count


class PublishMinutesTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.repository = Path(self.temporary.name)
        (self.repository / ".git").mkdir()
        self.minutes_path = (
            self.repository / "MeetingMinutes" / "Weekly" / "2026" / "08" / "28.md"
        )
        self.minutes_path.parent.mkdir(parents=True)
        self.minutes_path.write_text(MINUTES_TEMPLATE, encoding="utf-8")
        self.overview_path = self.repository / "MeetingMinutes" / "overview.md"
        self.overview_path.write_text(
            "# Overview\n\n### August\n\n- 2026-08-28, 12:01 to 13:02 CET\n"
            "    - <sup>Summary</sup>\n",
            encoding="utf-8",
        )

    def tearDown(self) -> None:
        self.temporary.cleanup()

    def client(self, fake: FakeHedgeDoc, cookie: str = "session=test-session"):
        return publish_minutes.HedgeDocClient(
            fake.base_url,
            cookie,
            timeout=2,
            allow_insecure_http=True,
        )

    def create_firefox_profile(
        self, rows: list[tuple[str, str, str, int, int]]
    ) -> Path:
        profile = self.repository / "firefox-profile"
        profile.mkdir(exist_ok=True)
        database = profile / "cookies.sqlite"
        with sqlite3.connect(database) as connection:
            connection.execute(
                """
                CREATE TABLE moz_cookies (
                    host TEXT,
                    name TEXT,
                    value TEXT,
                    expiry INTEGER,
                    lastAccessed INTEGER
                )
                """
            )
            connection.executemany(
                "INSERT INTO moz_cookies VALUES (?, ?, ?, ?, ?)", rows
            )
        return profile

    def test_create_verify_and_update_overview(self) -> None:
        local = publish_minutes.inspect_local_minutes(self.minutes_path)
        with FakeHedgeDoc() as fake:
            result = publish_minutes.publish(local, self.client(fake))
            self.assertEqual(result.status, "published")
            self.assertEqual(result.url, fake.base_url + "/s/short-1")
            self.assertEqual(fake.create_count, 1)
            self.assertIsNone(fake.server.download_cookie)
        overview = self.overview_path.read_text(encoding="utf-8")
        self.assertIn(
            f"[2026-08-28, 12:01 to 13:02 CET]({result.url})", overview
        )

    def test_repeated_publish_is_idempotent(self) -> None:
        with FakeHedgeDoc() as fake:
            first = publish_minutes.publish(
                publish_minutes.inspect_local_minutes(self.minutes_path),
                self.client(fake),
            )
            second = publish_minutes.publish(
                publish_minutes.inspect_local_minutes(self.minutes_path),
                self.client(fake),
            )
            self.assertEqual(first.status, "published")
            self.assertEqual(second.status, "already-published")
            self.assertEqual(fake.create_count, 1)

    def test_existing_different_content_is_refused(self) -> None:
        with FakeHedgeDoc() as fake:
            fake.server.note_content = b"different"
            self.overview_path.write_text(
                "# Overview\n\n"
                f"- [2026-08-28, 12:01 CET]({fake.base_url}/s/short-1)\n",
                encoding="utf-8",
            )
            local = publish_minutes.inspect_local_minutes(self.minutes_path)
            with self.assertRaisesRegex(
                publish_minutes.PublicationError, "content differs"
            ):
                publish_minutes.publish(local, self.client(fake))
            self.assertEqual(fake.create_count, 0)

    def test_authentication_is_required_before_create(self) -> None:
        local = publish_minutes.inspect_local_minutes(self.minutes_path)
        with FakeHedgeDoc() as fake:
            with self.assertRaisesRegex(
                publish_minutes.PublicationError, "missing, expired"
            ):
                publish_minutes.publish(local, self.client(fake, "session=wrong"))
            self.assertEqual(fake.create_count, 0)

    def test_non_public_note_is_not_linked(self) -> None:
        local = publish_minutes.inspect_local_minutes(self.minutes_path)
        with FakeHedgeDoc() as fake:
            fake.server.public_download = False
            with self.assertRaisesRegex(
                publish_minutes.PublicationError, "HTTP 403"
            ):
                publish_minutes.publish(local, self.client(fake))
            self.assertEqual(fake.create_count, 1)
        self.assertNotIn(
            "http://", self.overview_path.read_text(encoding="utf-8")
        )

    def test_duplicate_overview_entries_are_refused(self) -> None:
        self.overview_path.write_text(
            "- 2026-08-28\n- 2026-08-28, 12:01 CET\n", encoding="utf-8"
        )
        with self.assertRaisesRegex(
            publish_minutes.PublicationError, "found 2"
        ):
            publish_minutes.inspect_local_minutes(self.minutes_path)

    def test_plain_http_is_not_allowed_for_cli_clients(self) -> None:
        with self.assertRaisesRegex(
            publish_minutes.PublicationError, "HTTPS origin"
        ):
            publish_minutes.HedgeDocClient(
                "http://notes.example.test", "session=value"
            )

    def test_no_argument_cli_selects_interactive_publish_defaults(self) -> None:
        args = publish_minutes.build_parser().parse_args(
            publish_minutes.normalize_cli_argv([])
        )

        self.assertEqual(args.command, "publish")
        self.assertIsNone(args.minutes)
        self.assertIsNone(args.reviewed)
        self.assertIsNone(args.cookies_from_browser)
        self.assertFalse(args.cookies_from_environment)

        publish_minutes.resolve_publish_defaults(
            args,
            input_reader=lambda: "",
            interactive=True,
        )

        self.assertTrue(args.reviewed)
        self.assertEqual(args.cookies_from_browser, "firefox")

    def test_missing_publish_defaults_fail_non_interactively(self) -> None:
        args = publish_minutes.build_parser().parse_args(
            publish_minutes.normalize_cli_argv([])
        )

        with self.assertRaisesRegex(
            publish_minutes.PublicationError, "non-interactively"
        ):
            publish_minutes.resolve_publish_defaults(args, interactive=False)

    def test_each_omitted_publish_option_is_prompted_with_safe_default(self) -> None:
        reviewed_only = publish_minutes.build_parser().parse_args(
            publish_minutes.normalize_cli_argv(["--reviewed"])
        )
        publish_minutes.resolve_publish_defaults(
            reviewed_only, input_reader=lambda: "", interactive=True
        )
        self.assertEqual(reviewed_only.cookies_from_browser, "firefox")

        firefox_only = publish_minutes.build_parser().parse_args(
            publish_minutes.normalize_cli_argv(
                ["--cookies-from-browser", "firefox"]
            )
        )
        publish_minutes.resolve_publish_defaults(
            firefox_only, input_reader=lambda: "", interactive=True
        )
        self.assertTrue(firefox_only.reviewed)

    def test_latest_minutes_are_selected_by_canonical_date_path(self) -> None:
        newer = (
            self.repository / "MeetingMinutes" / "Weekly" / "2026" / "09" / "04.md"
        )
        newer.parent.mkdir(parents=True)
        newer.write_text("newer", encoding="utf-8")
        noncanonical = newer.parent / "notes.md"
        noncanonical.write_text("ignore", encoding="utf-8")

        latest = publish_minutes.discover_latest_minutes(self.repository)

        self.assertEqual(latest, newer.resolve())

    def test_explicit_minutes_path_is_kept_for_older_document(self) -> None:
        args = publish_minutes.build_parser().parse_args(
            publish_minutes.normalize_cli_argv(
                [
                    str(self.minutes_path),
                    "--reviewed",
                    "--cookies-from-browser",
                    "firefox",
                ]
            )
        )
        resolved, automatically_selected = publish_minutes.resolve_minutes_path(
            args.minutes
        )

        self.assertEqual(resolved, self.minutes_path)
        self.assertFalse(automatically_selected)

    def test_firefox_cookie_import_is_host_scoped_and_deduplicated(self) -> None:
        future = int(time.time()) + 3600
        past = int(time.time()) - 3600
        profile = self.create_firefox_profile(
            [
                ("notes.typo3.org", "connect.sid", "test-session", future, 500),
                (".notes.typo3.org", "connect.sid", "test-session", future, 400),
                ("other.example.org", "connect.sid", "foreign", future, 900),
                ("notes.typo3.org", "other", "unrelated", future, 800),
                ("notes.typo3.org", "connect.sid", "expired", past, 700),
            ]
        )

        candidates = publish_minutes.read_firefox_cookie_candidates(
            "https://notes.typo3.org", str(profile)
        )

        self.assertEqual(candidates, ["connect.sid=test-session"])

    def test_firefox_database_copy_does_not_wait_for_live_writer(self) -> None:
        profile = self.repository / "locked-firefox-profile"
        profile.mkdir()
        source = profile / "cookies.sqlite"
        writer = sqlite3.connect(source)
        writer.execute("CREATE TABLE state (value TEXT)")
        writer.execute("INSERT INTO state VALUES ('committed')")
        writer.commit()
        writer.execute("BEGIN EXCLUSIVE")
        writer.execute("UPDATE state SET value = 'uncommitted'")

        target = self.repository / "copied-cookies.sqlite"
        errors: list[Exception] = []

        def copy_database() -> None:
            try:
                publish_minutes.copy_live_sqlite_database(source, target)
            except Exception as exc:  # pragma: no cover - assertion reports details
                errors.append(exc)

        worker = threading.Thread(target=copy_database, daemon=True)
        worker.start()
        worker.join(timeout=1)
        writer.rollback()
        writer.close()

        self.assertFalse(worker.is_alive(), "Firefox database copy waited on a lock")
        self.assertEqual(errors, [])
        self.assertTrue(target.is_file())

    def test_active_firefox_session_is_reused_without_opening_browser(self) -> None:
        opened: list[str] = []
        with FakeHedgeDoc() as fake:
            client = publish_minutes.authenticated_firefox_client(
                fake.base_url,
                timeout=2,
                allow_insecure_http=True,
                cookie_reader=lambda _base_url, _profile: [
                    "connect.sid=test-session"
                ],
                browser_opener=opened.append,
            )

            self.assertEqual(client.assert_authenticated(), "user-1")
            self.assertEqual(opened, [])

    def test_missing_firefox_session_opens_login_and_reloads_cookie(self) -> None:
        calls = 0
        opened: list[str] = []
        confirmed: list[str] = []

        def cookie_reader(_base_url: str, _profile: str | None) -> list[str]:
            nonlocal calls
            calls += 1
            return [] if calls == 1 else ["connect.sid=test-session"]

        with FakeHedgeDoc() as fake:
            client = publish_minutes.authenticated_firefox_client(
                fake.base_url,
                timeout=2,
                allow_insecure_http=True,
                cookie_reader=cookie_reader,
                browser_opener=opened.append,
                login_confirmation=confirmed.append,
            )

            expected_login = fake.base_url + "/auth/saml"
            self.assertEqual(client.assert_authenticated(), "user-1")
            self.assertEqual(opened, [expected_login])
            self.assertEqual(confirmed, [expected_login])
            self.assertEqual(calls, 2)


if __name__ == "__main__":
    unittest.main()
