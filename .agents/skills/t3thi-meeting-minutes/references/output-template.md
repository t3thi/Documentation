# Output Template

The final meeting minutes **must** match this template structure exactly.
Replace placeholders (`{{…}}`) with actual content. Do not add, remove, or
reorder structural elements, except for the explicitly defined optional
reconstructed-summary notice block.

## Template

````markdown
---
title: "{{YYYY-MM-DD}} - Translation Handling Initiative - Team Meeting Minutes"
tags: "Meeting"
---

# Translation Handling Initiative<br>Team Meeting Minutes

[← Back to the overview](https://notes.typo3.org/s/f3ae8fZSD)

- **Date:** {{YYYY-MM-DD}}<br>
- **Where:** [Slack Huddle](https://app.slack.com/huddle/T024TUMLZ/C05D7UF1L8M)
- **Participants:**
    - {{Name 1}}
    - {{Name 2}}
    - {{…sorted alphabetically by first name / nickname}}

{{Optional block: only if recording/transcript is incomplete}}
> ⚠️ This is a **reconstructed summary** based on memory, as the audio
> recording was not available due to a technical oversight.

## Topic 1: {{Title in Title Case}}

{{Prose summary of what was discussed. Complete sentences. No bullet points
unless the speakers explicitly enumerated a list.}}

## Topic 2: {{Title in Title Case}}

{{Prose summary…}}

## Topic N: {{Title in Title Case}}

{{Prose summary…}}
````

## Template Rules

1. **Frontmatter**: The YAML frontmatter (`---` block) must be present with
   `title` and `tags` exactly as shown.
2. **Heading**: The `# Translation Handling Initiative<br>Team Meeting Minutes`
   heading uses an HTML `<br>` — keep it exactly like this.
3. **Back link**: The `[← Back to the overview]` link must always point to
   `https://notes.typo3.org/s/f3ae8fZSD`.
4. **Slack Huddle link**: Must always be
   `https://app.slack.com/huddle/T024TUMLZ/C05D7UF1L8M`. Never modify it.
5. **Date format**: Always `YYYY-MM-DD` (ISO 8601).
6. **Participant list indentation**: Each name is indented with 4 spaces and
   prefixed with `- ` (Markdown nested list under `**Participants:**`).
7. **Display names**: Apply roster display-name rules consistently (nickname
   if defined; otherwise full name in the participant list).
8. **Topic numbering**: Sequential starting at 1. Use `## Topic N: Title`.
9. **Optional reconstructed-summary notice**: Allowed only when the
    recording/transcript is incomplete, and only in the dedicated position
    between the participant list and Topic 1.
10. **No trailing sections**: The document ends after the last topic. No
    "End of meeting minutes", no "Summary", no "Action Items", no "Next Steps"
    section.
11. **Output wrapping**: When presenting in chat, wrap the entire output in a
    fenced code block with `markdown` language identifier:
    ````
    ```markdown
    …content…
    ```
    ````

## Things That Must NOT Appear

- `## Action Points` or `## Action Items`
- `## Next Steps` (unless it was an explicitly discussed and enumerated topic)
- `## Summary` or `## Conclusion`
- `"End of meeting minutes."` or any closing phrase
- `(guest)` suffix after any participant name
- Any person in "Participants" without speaking or presence evidence from the
  transcript
