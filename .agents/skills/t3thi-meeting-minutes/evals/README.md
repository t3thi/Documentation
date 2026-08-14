# `thi-meeting-minutes` Eval Scenarios

These evals defend the most failure-prone behavior of this skill:

- English-only output from German transcripts
- evidence-based participant selection and alphabetical sorting
- transcript resolution under `Transcripts/` and dated output under
  `MeetingMinutes/Weekly/`
- no invented action-items or summary boilerplate
- omission of explicit off-the-record content

Keep the scenarios aligned when the output contract or style rules change.
Run `python3 scripts/verify_minutes_contract.py` when the Markdown output
template or prohibited-section rules change.
