# Weekly overall reports

Generate three all-club ranking sheets for every comparable weekly interval in the source workbook:

- `W{n}-Weight Loss`
- `W{n}-Fat Loss`
- `W{n}-Muscle Gain`

For example, Week 1 uses the first scheduled measurement slot as Previous and the second scheduled slot as Current. Week 2 uses the second and third slots. Continue with adjacent scheduled slots for every subsequent week.

Do not skip over a missing weekly slot to create a comparison. If either the Previous or Current value required by a sheet is missing or nonnumeric, keep the participant and mark that sheet's status as `ABSENT`.

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

- Weight Loss/Gain = Current Week Weight minus Previous Week Weight.
- Fat Loss/Gain = Current Week Fat % minus Previous Week Fat %.
- Muscle Gain/Loss = Current Week Muscle minus Previous Week Muscle.

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
