# Report specification

## Output versioning

- Never overwrite the input workbook.
- Save one new output per run using a monotonically increasing suffix, for example `OVERALL DATA BTC 2 v2.xlsx`.
- Preserve all original club sheets.

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

Each sheet contains all participant records and the complete Weight, Fat, Muscle, Age, Height, and attendance information. The three sheets differ only in their ranking parameter, sheet-specific attendance status, sort order, and highlighted ranking column.

Also create `Overall Weight Loss`, `Overall Fat Loss`, and `Overall Muscle Gain`. Follow [Weekly overall reports](weekly-overall-reports.md) for Baseline logic, consecutive available-measurement comparisons, Overall Baseline-to-latest logic, required columns, missing-data behavior, sorting, and highlighting.

### Dashboard

Create one `Dashboard` sheet containing the Top 3 Weight Loss, Fat Loss, and Muscle Gain performers for each Dashboard weekly period and for Overall.

Show at most Week 1 through Week 3 plus Overall. Weekly sections compare consecutive available measurements for each participant and ranking metric. Overall compares each metric's first/start reading with its latest/end reading; it is not a copy of the final weekly ranking.

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
