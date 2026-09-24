# Data rules

## Source authority

Original club worksheets are the sole source of truth. Do not change their content to make reporting easier. All consolidation and reporting must be added in a new output workbook copied from the source workbook.

## Expected club-sheet pattern

A participant block normally contains:

1. participant name and one or more reading dates;
2. `weight` row;
3. `fat` row;
4. `musle` or `muscle` row;
5. optional `age` row;
6. optional `height` row;
7. optional blank separator row.

Rules:

- Match metric labels case-insensitively and trim surrounding spaces for recognition only.
- Treat both `musle` and `muscle` as the Muscle metric.
- Preserve participant and club spelling exactly in linked output values.
- A participant row followed by a recognized Weight row starts a participant block.
- Preserve repeated names as separate source records. Do not merge them automatically.
- Use each participant's dated readings in chronological order.
- If later participant blocks omit date headers, use the club sheet's dated measurement columns only when their column positions clearly match the first dated block on that sheet.
- If column/date alignment is ambiguous, stop and flag it for review.

## Values and missing data

- A numeric cell is an available measurement.
- A truly empty source cell remains blank in reports.
- An explicit `absent` value remains `absent` in `Rdata` and is nonnumeric everywhere else.
- Other text in a measurement area is preserved exactly and listed in `Review Flags`.
- Never coerce source text to zero.
- Never interpolate, carry forward, average, or invent a missing measurement.
- Age and Height may be linked from their single available source cells. They are not used to infer missing metric readings.

## Dates

- Keep dates as native Excel dates, never display-only text in data cells.
- Sort dates ascending for consolidation and comparisons.
- Use the first and latest available dates separately for Weight, Body Fat, and Muscle.
- Do not assume that all participants or clubs share the same available dates.
- For weekly overall sheets, preserve the sequence of scheduled dated columns within each club. Compare adjacent weekly slots and do not skip a missing slot to reach the next numeric reading.

## Units

- Preserve source units. If the workbook does not state units, do not invent them.
- A future workbook that mixes units must add an explicit unit field and conversion rule before consolidation.

## Formula linkage

- Every `Rdata` participant identity and measurement must be formula-linked to the original club sheet where practicable.
- All downstream report calculations must reference `Rdata` or the original club sheets.
- Use bounded cell ranges. Never use full-column formula references for rankings, leaders, or changes.
- Blank and nonnumeric readings must not participate in subtraction, minima, maxima, leaders, or rankings.

## Sensitive data

- Treat names and measurements as sensitive personal information.
- Do not publish or commit source workbooks, output workbooks, screenshots, previews, extracted tables, or logs containing participant data.
