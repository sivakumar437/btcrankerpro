# Weekly overall reports

Generate exactly three weekly all-club ranking sheets for each category, plus one Overall Weight Loss sheet:

- `W{n}-Weight Loss`
- `W{n}-Fat Loss`
- `W{n}-Muscle Gain`
- `Overall Weight Loss`

Weekly comparisons use the workbook's chronological scheduled measurement dates. The first scheduled date is the Baseline and does not create a separate report.

- Week 1 compares scheduled dates 1 and 2.
- Week 2 compares scheduled dates 2 and 3.
- Week 3 compares scheduled dates 3 and 4.
- Overall Weight Loss compares the participant's first available numeric Weight with the final/latest available numeric Weight.

Do not generate Week 4 or later weekly sheets. Overall must never use only the penultimate and latest measurements. If either scheduled reading for a weekly sheet's ranking metric is missing or nonnumeric, omit that participant from that weekly sheet entirely.

## Required population

Every weekly category sheet contains all participants eligible for that category and interval, including:

- participants with both scheduled numeric readings for the ranking metric;
- repeated names that exist as separate source records.

Never limit eligible participants to a Top 10, Top 20, winners, or any other ranking subset. Participants lacking either required scheduled reading are excluded by eligibility, not rank.

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

Apply a realism screen after calculation. If `ABS(Current - Previous) / ABS(Previous)` exceeds 5% for a weekly comparison, mark the result `REVIEW` and exclude it from ranking. For Overall Weight Loss, use a 20% Baseline-to-Final threshold. Keep the participant and original measurements visible, place `REVIEW` rows after eligible rows, and record the result in `Review Flags`.

## Sheet-specific attendance and sorting

Attendance/Status is evaluated against the ranking metric for that sheet. Because ineligible participants are omitted, every retained weekly row is `PRESENT`:

- Weight Loss sheet: include only when Previous and Current Weight are numeric.
- Fat Loss sheet: include only when Previous and Current Fat are numeric.
- Muscle Gain sheet: include only when Previous and Current Muscle are numeric.

Sorting rules:

- `W{n}-Weight Loss`: valid rows first, sorted by Weight Loss/Gain ascending so the most negative change, representing the largest loss, appears first.
- `W{n}-Fat Loss`: valid rows first, sorted by Fat Loss/Gain ascending so the most negative change appears first.
- `W{n}-Muscle Gain`: valid rows first, sorted by Muscle Gain/Loss descending so the largest positive gain appears first.
- Sort `Overall Weight Loss` by Baseline-to-latest Weight change ascending.
- Use Club Name and Name as deterministic secondary sort keys when ranking values tie.
- Before Club Name and Name, resolve primary-metric ties with valid, non-flagged changes from the same comparison interval: Weight Loss → Muscle Gain → Fat Loss; Fat Loss → Weight Loss → Muscle Gain; Muscle Gain → Weight Loss → Fat Loss. Weight and Fat sort toward the more negative change; Muscle sorts toward the more positive change.
- Place `REVIEW` rows after all eligible ranked rows and never include them in Dashboard winners.

A participant can appear on one category sheet and be omitted from another during the same week because eligibility depends on that sheet's ranking metric. Non-ranking metric changes may remain blank without making the participant ineligible for that sheet.

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
