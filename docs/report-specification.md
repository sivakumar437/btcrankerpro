# Report specification

## Output versioning

- Never overwrite the input workbook.
- Save one new output per run using a monotonically increasing suffix, for example `OVERALL DATA BTC 2 v2.xlsx`.
- Preserve all original club sheets.

## Worksheet order

Place all generated reader-facing sheets at the front of the workbook. Use this order:

1. `Dashboard`
2. `Overall-Weight Loss`, `Overall-Fat Loss`, and `Overall-Muscle Gain`
3. Weight Gain summary and Overall Weight Gain when applicable
4. W1, W2, and W3 category sheets, including Weight Gain when applicable
5. Review and individual club report sheets
6. Original source club sheets
7. `Rdata` as the final worksheet

Raw and consolidated source data must never appear before generated reports.

## Required worksheets

### Rdata

One row per source participant record with:

- Club
- Person
- for each chronological date: Weight, Body Fat, Muscle, Age, Height

Use formula links to original club cells. Explicit `absent` markers may appear as text. Empty readings remain blank.

### One report per club

Include:

- Person
- each dated Weight reading
- change from the previous dated column
- Weight Start, Weight Latest, Weight Change
- Fat Start, Fat Latest, Fat Change
- Muscle Start, Muscle Latest, Muscle Change
- a weekly top-weight-loss section

Change formulas use `current dated reading - previous dated reading`. A change is blank unless both compared cells are numeric.

The weekly leader is the participant with the most negative valid change for that interval. If no valid negative change exists, show `No loss`; if no valid comparisons exist, show `No data`. Participants without both readings remain represented in the detail as blank or `absent` according to the raw source.

### Weekly Overall Reports

Create exactly three weekly all-club sheets for each category:

- `W{n}-Weight Loss`
- `W{n}-Fat Loss`
- `W{n}-Muscle Gain`

Each weekly and Overall sheet contains every participant. VALID rows are ranked first; REVIEW, OUTLIER, and INVALID rows remain visible below them with reasons and no automatic rank.

Also create `Overall-Weight Loss`, `Overall-Fat Loss`, and `Overall-Muscle Gain`. Follow [Final ranking rules](final-ranking-rules.md) and [Weekly overall reports](weekly-overall-reports.md).

### Weight Gain category

When Weight Gain registrations are supplied, create `Weight Gain`, `W1-Weight Gain`, `W2-Weight Gain`, `W3-Weight Gain`, and `Overall Weight Gain`.

- Combine explicit registrations with participants whose Baseline Weight is below `Height - 105`.
- Do not duplicate an explicit participant already present in the main source data.
- Keep every Weight Gain candidate visible but INVALID and unranked on all Weight Loss sheets.
- Keep Weight Gain candidates eligible for Fat Loss and Muscle Gain sheets unless another rule excludes them.
- Rank valid Weight Gain comparisons by quality tier: positive Weight and Muscle; positive Weight only; positive Muscle only; then no positive gain. Within a tier, sort Weight Change descending, then Muscle Change descending.
- Include every candidate on each Weight Gain comparison sheet. Put `REVIEW` rows after ranked rows and `ABSENT / NO DATA` rows last.
- Overall uses Baseline and the defined Final Week; missing either required endpoint is INVALID.

### Dashboard

Create one `Dashboard` sheet containing weekly Top 3 for all categories, Overall Weight Loss Top 5, Overall Fat Loss Top 3, and Overall Muscle Gain Top 3.

Show W1 through W3 plus Overall. Weekly sections compare adjacent scheduled dates. Overall compares Baseline with the defined Final Week and never substitutes an earlier reading.

Follow [Dashboard rules](dashboard-rules.md) for period selection, eligibility, fields, layout, formulas, and validation.

### Excluded redundant sheets

Do not create `All Clubs Report` or generic `Week N Comparison` sheets. The `W{n}-Weight Loss`, `W{n}-Fat Loss`, and `W{n}-Muscle Gain` sheets already provide the complete all-club weekly comparisons and rankings.

### Review Flags

List nonstandard source text or ambiguous values without altering them. Include source sheet, source cell, exact value, and reason.

## Sign and color rules

Use a signed number format that displays positive values with `+`, negative values with `-`, and zero as `0.0`.

- Weight loss: negative and green.
- Weight gain: positive and red.
- Fat loss: negative and green.
- Fat gain: positive and red.
- Muscle gain: positive and green.
- Muscle loss: negative and red.
- Zero: neutral.

## Presentation rules

- Use clear titles and dark, high-contrast table headers.
- Freeze header rows and identifying columns on scrolling tables.
- Keep text columns wide enough to show names and clubs.
- Display dates consistently as sortable dates such as `dd-mmm-yyyy`.
- Display measurements and changes to one decimal unless the source requires more precision.
- Hide gridlines only on newly created report sheets.
- Preserve original club-sheet appearance.
