---
name: btc-report-generation
description: Generate and validate formula-linked BTC health and fitness ranking workbooks from club worksheets while preserving source data.
---

# BTC report generation

Use this skill whenever creating, updating, reviewing, or diagnosing a BTC ranking workbook.

## Read first

Read completely:

- `../../../docs/data-rules.md`
- `../../../docs/report-specification.md`
- `../../../docs/validation-checklist.md`

For any weekly all-club ranking request, also read `../../../docs/weekly-overall-reports.md` completely.

Use the available spreadsheet-authoring skill and its required artifact tooling. The repository documents business rules; the spreadsheet skill governs safe workbook editing, formulas, rendering, and export.

## Workflow

1. Confirm the input `.xlsx` path and inspect the workbook read-only.
2. Record original sheet names, used ranges, participant-block count, dates, formulas, notes, and formatting.
3. Render every original club sheet before editing so its layout is understood.
4. Parse participant blocks according to `data-rules.md`. Do not normalize source spelling in linked output values.
5. Identify all nonstandard text and ambiguous source structures before building reports.
6. Import the source workbook and add the required sheets. Do not edit original sheets.
7. Build `Rdata` first with direct source formulas.
8. Build club and consolidated reports from `Rdata` with bounded formulas.
9. Build Overall 3 Metrics, rankings, and Week 1/2/3 comparisons.
10. Build the three complete all-club weekly ranking sheets for every comparable interval as defined in `weekly-overall-reports.md`.
11. Add conditional formatting for the required sign/color semantics and highlight each weekly sheet's ranking column.
12. Add `Review Flags` for preserved unusual values.
13. Recalculate once after authoring.
14. Run every item in `validation-checklist.md`, including formula-error scanning and representative independent calculations.
15. Render and visually inspect every newly created sheet. Correct clipped headers, serial-number dates, unreadable text, and excessive whitespace.
16. Export one new versioned workbook. Never overwrite the source.

## Required implementation behavior

- Prefer explicit formulas that are easy to audit.
- Use `ISNUMBER` guards before subtraction.
- Keep missing values blank and explicit `absent` markers nonnumeric.
- Use direct source or `Rdata` references instead of hardcoded calculated results.
- Rank Weight and Fat ascending by change; rank Muscle descending.
- Comparison sheets use available-reading order, not assumed calendar-week positions.
- Weekly overall ranking sheets use adjacent scheduled weekly slots and never skip a missing slot. Keep all participants, mark metric-specific missing comparisons `ABSENT`, and place them after valid ranked rows.
- Where an input change can alter attendance patterns or ranking order, use formulas or a documented refresh process that updates the result correctly.

## Delivery note

State the output path, participant and club counts, dates found, validation performed, and unresolved review flags. Do not expose participant measurements in the chat summary.
