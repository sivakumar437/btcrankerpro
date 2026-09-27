# Weekly overall reports

Generate exactly three weekly all-club ranking sheets and one Overall sheet for each category:

- `W{n}-Weight Loss`
- `W{n}-Fat Loss`
- `W{n}-Muscle Gain`
- `Overall-Weight Loss`, `Overall-Fat Loss`, `Overall-Muscle Gain`

Weekly comparisons use the workbook's chronological scheduled measurement dates. The first scheduled date is the Baseline and does not create a separate report.

- Week 1 compares scheduled dates 1 and 2.
- Week 2 compares scheduled dates 2 and 3.
- Week 3 compares scheduled dates 3 and 4.
- Overall compares Baseline with the defined Final Week for all three metrics.

Do not generate Week 4 or later weekly sheets. Overall must never use the penultimate-to-final interval or substitute an earlier reading. Participants with missing data remain visible as INVALID.

## Required population

Every detailed category sheet contains all participants, including:

- participants with both scheduled numeric readings for the ranking metric;
- repeated names that exist as separate source records.

Never limit participants to a Top 10, Top 20, winners, or any other subset. Participants lacking required endpoint data remain visible as INVALID and receive no rank.

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

For W1-W3 only, mark OUTLIER when absolute Weight change exceeds 4 kg, Fat change exceeds 3 points, or Muscle change exceeds 3 points. Exact limits are valid. Do not apply these limits to Overall.

## Sheet-specific attendance and sorting

Final Status uses all three changes and the category combination rules. Every participant remains visible:

- Missing required endpoint data produces INVALID and no rank.
- Only VALID rows are automatically ranked.
- Place REVIEW, OUTLIER, and INVALID below VALID rows.

Sorting rules:

- `W{n}-Weight Loss`: valid rows first, sorted by Weight Loss/Gain ascending so the most negative change, representing the largest loss, appears first.
- `W{n}-Fat Loss`: valid rows first, sorted by Fat Loss/Gain ascending so the most negative change appears first.
- `W{n}-Muscle Gain`: valid rows first, sorted by Muscle Gain/Loss descending so the largest positive gain appears first.
- Sort all Overall categories by their final-rule category tuple using Baseline-to-defined-Final changes.
- Apply category Priority and supporting changes exactly as defined in `final-ranking-rules.md`.
- A complete sort-tuple tie receives the same rank and manual prize review. Club and Name only stabilize display order.
- Place `REVIEW` rows after all eligible ranked rows and never include them in Dashboard winners.

A participant appears on every category sheet. Category eligibility changes the Final Status and rank, not whether the row is present.

## Weight Gain comparisons

When the Weight Gain category applies, generate `W1-Weight Gain`, `W2-Weight Gain`, `W3-Weight Gain`, and `Overall Weight Gain`, plus a `Weight Gain` summary.

- Candidate population is the union of explicit Weight Gain registrations and the Baseline rule `Weight < Height - 105`.
- Weekly comparisons use the same adjacent scheduled slots as other weekly reports and require numeric Weight and Muscle at both endpoints.
- Overall compares Baseline and the defined Final Week; missing endpoints are INVALID.
- Quality tiers sort in this order: Weight Gain plus Muscle Gain; Weight Gain only; Muscle Gain only; no positive gain.
- Within a tier, sort Weight Change descending, then Muscle Change descending, then Club and Name.
- Assign ranks only to valid, non-flagged comparisons. Place `REVIEW` next and `ABSENT / NO DATA` last.
- Keep every Weight Gain candidate visible but INVALID and unranked on Weight Loss sheets.

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
