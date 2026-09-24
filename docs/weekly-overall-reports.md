# Weekly overall reports

Generate exactly three weekly all-club ranking sheets and one Overall sheet for each category:

- `W{n}-Weight Loss`
- `W{n}-Fat Loss`
- `W{n}-Muscle Gain`
- `Overall Weight Loss`
- `Overall Fat Loss`
- `Overall Muscle Gain`

For each participant and ranking metric, order the available numeric measurements chronologically. The first available measurement is the Baseline and does not create a separate report.

- Week 1 compares available measurements 1 and 2.
- Week 2 compares available measurements 2 and 3.
- Week 3 compares available measurements 3 and 4.
- Overall compares available measurement 1 with the final/latest available measurement.

Do not generate Week 4 or later weekly sheets. Overall must never use only the penultimate and latest measurements. If a participant lacks the pair required for a sheet, keep the participant and mark that sheet's status as `ABSENT`.

## Required population

Every sheet contains every participant record from every club, including:

- participants with valid comparisons;
- participants with partially missing measurements;
- participants with no measurements;
- repeated names that exist as separate source records.

Never limit these sheets to a Top 10, Top 20, winners, or any other subset.

## Required columns

Use the following columns on all three sheet types:

1. Name
2. Club Name
3. Age
4. Height
5. Previous Week Weight
6. Current Week Weight
7. Weight Loss/Gain
8. Previous Week Fat %
9. Current Week Fat %
10. Fat Loss/Gain
11. Previous Week Muscle
12. Current Week Muscle
13. Muscle Gain/Loss
14. Attendance/Status

Age and Height remain visible even though they are not ranking metrics. Preserve missing Age or Height as blank.

## Calculations

Use End minus Start for all change columns:

- Weight Loss/Gain = Current/End Weight minus Previous/Baseline Weight.
- Fat Loss/Gain = Current/End Fat % minus Previous/Baseline Fat %.
- Muscle Gain/Loss = Current/End Muscle minus Previous/Baseline Muscle.

Calculate each change only when both required cells for that metric are numeric. Otherwise leave that change blank.

## Sheet-specific attendance and sorting

Attendance/Status is evaluated against the ranking metric for that sheet:

- Weight Loss sheet: `PRESENT` only when Previous and Current Weight are numeric; otherwise `ABSENT`.
- Fat Loss sheet: `PRESENT` only when Previous and Current Fat are numeric; otherwise `ABSENT`.
- Muscle Gain sheet: `PRESENT` only when Previous and Current Muscle are numeric; otherwise `ABSENT`.

Sorting rules:

- `W{n}-Weight Loss`: valid rows first, sorted by Weight Loss/Gain ascending so the most negative change, representing the largest loss, appears first.
- `W{n}-Fat Loss`: valid rows first, sorted by Fat Loss/Gain ascending so the most negative change appears first.
- `W{n}-Muscle Gain`: valid rows first, sorted by Muscle Gain/Loss descending so the largest positive gain appears first.
- Apply the same category-specific sorting to each `Overall` sheet using Baseline to latest change.
- After valid rows, place all `ABSENT` rows at the bottom.
- Use Club Name and Name as deterministic secondary sort keys when ranking values tie and for the `ABSENT` group.

A participant can be `PRESENT` on one sheet and `ABSENT` on another during the same week because status depends on that sheet's ranking metric. Non-ranking metric changes may remain blank without making the participant absent from that sheet.

## Highlighting

Visually emphasize only the primary ranking column for each sheet:

- Weight Loss/Gain on the Weight Loss sheet.
- Fat Loss/Gain on the Fat Loss sheet.
- Muscle Gain/Loss on the Muscle Gain sheet.

Keep the other measurement and change columns visible but use normal table styling. Apply the repository's sign and color rules to all calculated changes.

## Formula and refresh behavior

- Link participant information and measurements to `Rdata` or the original club sheets.
- Use formulas for changes and attendance status.
- Use bounded formula ranges.
- The ordering must be refreshed or formula-driven so changes in source measurements can update the ranking order.
- Do not hardcode calculated changes, status, or ranking values.
