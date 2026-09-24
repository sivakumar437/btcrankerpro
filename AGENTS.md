# BTC Ranker Pro agent instructions

These instructions apply to the entire repository.

## Required references

For any workbook-generation or workbook-validation task, read these files before acting:

1. `.agents/skills/btc-report-generation/SKILL.md`
2. `docs/data-rules.md`
3. `docs/report-specification.md`
4. `docs/validation-checklist.md`

Treat those files as the repository's persistent memory for BTC reports.

## Non-negotiable safeguards

- Never modify or overwrite the source workbook.
- Create exactly one new versioned `.xlsx` output for each completed run.
- Treat original club sheets as the source of truth and preserve their values, structure, spelling, and formatting.
- Never silently correct unusual values. Preserve them and add them to `Review Flags`.
- Never invent a reading, date, unit, participant, or club.
- Keep missing readings blank. Preserve an explicit source marker such as `absent` as text in raw data, but exclude it from numeric changes, leaders, and rankings.
- Use formulas for linked values and calculated report cells. Use bounded references, not entire-column formula ranges.
- Keep dates and measurements as typed, sortable Excel values.
- Do not commit participant workbooks, generated reports, previews, or extracted health data to Git.

## Change discipline

- Update the specification and the operational skill together when business rules change.
- Record ambiguous or new source layouts in documentation before encoding them in a generator.
- Preserve backward compatibility unless the user explicitly approves a breaking rule change.
- Test formula signs, missing-data behavior, rankings, weekly leaders, and source-link updates before delivery.
