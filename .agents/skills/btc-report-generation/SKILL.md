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

For any management summary or Top 3 Dashboard request, also read `../../../docs/dashboard-rules.md` completely.

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
9. Build Week 1/2/3 comparisons for all three metrics and build Overall Weight Loss only.
10. Build the three complete all-club weekly ranking sheets for every comparable interval as defined in `weekly-overall-reports.md`.
11. Build the Dashboard from the corresponding detailed weekly and Overall datasets when required by `dashboard-rules.md`.
12. Add conditional formatting for the required sign/color semantics and highlight each weekly sheet's ranking column.
13. Add `Review Flags` for preserved unusual values.
14. Recalculate once after authoring.
15. Run every item in `validation-checklist.md`, including formula-error scanning and representative independent calculations.
16. Render and visually inspect every newly created sheet. Correct clipped headers, serial-number dates, unreadable text, and excessive whitespace.
17. Export one new versioned workbook. Never overwrite the source.

## Required implementation behavior

- Prefer explicit formulas that are easy to audit.
- Use `ISNUMBER` guards before subtraction.
- Keep missing values blank and explicit `absent` markers nonnumeric.
- Use direct source or `Rdata` references instead of hardcoded calculated results.
- Rank Weight and Fat ascending by change; rank Muscle descending.
- Comparison sheets use available-reading order, not assumed calendar-week positions.
- Weekly category sheets use adjacent scheduled weekly slots and never skip a missing slot. Include a participant on a weekly category sheet only when both scheduled readings for that sheet's ranking metric are numeric; otherwise omit that participant from that sheet for the week.
- Dashboard weekly Top 3 tables link to eligible detailed weekly data; Overall shows Weight Loss Top 5 only. Exclude absent comparisons, show `NA` for missing Age or Height, and follow `dashboard-rules.md`.
- Apply the realism screen before ranking: weekly absolute relative change above 5% of the previous value is `REVIEW`; Overall absolute relative change above 20% of Baseline is `REVIEW`. Preserve the source values, list the result in `Review Flags`, and exclude it from rankings.
- Resolve equal primary results with valid, non-flagged secondary changes: Weight Loss ties use Muscle Gain then Fat Loss; Fat Loss ties use Weight Loss then Muscle Gain; Muscle Gain ties use Weight Loss then Fat Loss. Use Club and Name only after all applicable metrics remain tied.
- For every displayed primary-result tie on the Dashboard, add an Excel comment to the affected Rank cells that states the tied result and the secondary metric and values that decided the order. If all applicable metrics tie, state that Club/Name alphabetical order decided it.
- Where an input change can alter attendance patterns or ranking order, use formulas or a documented refresh process that updates the result correctly.

## Delivery note

State the output path, participant and club counts, dates found, validation performed, and unresolved review flags. Do not expose participant measurements in the chat summary.
