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
- `../../../docs/final-ranking-rules.md`

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
9. Build W1/W2/W3 and Overall comparisons for Weight Loss, Fat Loss, and Muscle Gain.
10. Identify Weight Gain candidates from explicit registrations plus `Baseline Weight < Height - 105`, exclude them from Weight Loss sheets, and build the Weight Gain summary and W1/W2/W3/Overall Weight Gain rankings when requested.
11. Build the three complete all-club weekly ranking sheets for every comparable interval as defined in `weekly-overall-reports.md`.
12. Build the Dashboard from the corresponding detailed weekly and Overall datasets when required by `dashboard-rules.md`.
13. Add conditional formatting for the required sign/color semantics and highlight each weekly sheet's ranking column.
14. Add `Review Flags` for preserved unusual values.
15. Recalculate once after authoring.
16. Run every item in `validation-checklist.md`, including formula-error scanning and representative independent calculations.
17. Render and visually inspect every newly created sheet. Correct clipped headers, serial-number dates, unreadable text, and excessive whitespace.
18. Export one new versioned workbook. Never overwrite the source.

## Required implementation behavior

- Prefer explicit formulas that are easy to audit.
- Use `ISNUMBER` guards before subtraction.
- Keep missing values blank and explicit `absent` markers nonnumeric.
- Use direct source or `Rdata` references instead of hardcoded calculated results.
- Rank Weight and Fat ascending by change; rank Muscle descending.
- Comparison sheets use the defined scheduled slots: Baseline, Week 1, Week 2, Week 3, and Final.
- Keep every participant visible on every detailed category sheet. Missing endpoint data is `INVALID` and receives no rank.
- Dashboard weekly Top 3 tables and Overall Top lists link to VALID rows in their corresponding detailed datasets. Show `NA` for missing Age or Height and follow `dashboard-rules.md`.
- For W1-W3 only, mark OUTLIER when absolute Weight change is greater than 4 kg, Fat change is greater than 3 points, or Muscle change is greater than 3 points. Exact limits are valid. Do not apply these limits to Overall.
- Apply the category priorities and complete tie tuples in `final-ranking-rules.md`. A complete tuple tie receives the same rank and manual prize review; Club and Name are display ordering only.
- For every displayed primary-result tie, add a note or comment stating the priority/supporting metric that decided the order. If the complete tuple ties, assign the same rank and state that manual prize review is required.
- Weight Gain candidates are explicit registrations or participants whose Baseline Weight is below `Height - 105`. Keep them visible but INVALID on Weight Loss sheets. Rank the separate Weight Gain category by: positive Weight plus positive Muscle first, then positive Weight without positive Muscle, then positive Muscle without positive Weight, then remaining valid comparisons. Within a tier, sort Weight Gain descending, then Muscle Gain descending.
- Where an input change can alter attendance patterns or ranking order, use formulas or a documented refresh process that updates the result correctly.

## Delivery note

State the output path, participant and club counts, dates found, validation performed, and unresolved review flags. Do not expose participant measurements in the chat summary.
