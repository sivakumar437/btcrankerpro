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

### All Clubs Report

Use the club-report structure, add Club, include every participant record, and add weekly leaders across all clubs.

### Overall 3 Metrics

One row per participant record:

- Club
- Person
- Weight Start Date, Weight Start, Weight End Date, Weight End, Weight Change
- Fat Start Date, Fat Start, Fat End Date, Fat End, Fat Change
- Muscle Start Date, Muscle Start, Muscle End Date, Muscle End, Muscle Change

For each metric independently, use its first and latest numeric readings. Change is always End minus Start.

### Overall Rankings

Create three separate sections:

1. Weight Loss Ranking — ascending Weight Change.
2. Fat Loss Ranking — ascending Fat Change.
3. Muscle Gain Ranking — descending Muscle Change.

Exclude records lacking two numeric readings for the ranked metric. Each row contains Rank, Club, Person, Start Date, End Date, and Change.

### Week 1 Comparison

Compare each participant's first and second available numeric Weight readings.

### Week 2 Comparison

Compare each participant's second and third available numeric Weight readings.

### Week 3 Comparison

Compare each participant's third and fourth available numeric Weight readings.

Each comparison sheet contains Club, Person, Start Date, Start Weight, End Date, End Weight, and Difference. Sort by Club and then Person. Participants without enough readings remain listed with blank comparison fields.

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
