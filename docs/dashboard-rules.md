# Dashboard rules

Create one `Dashboard` summarizing weekly Top 3 performers, Overall Weight Loss Top 5, Overall Fat Loss Top 3, and Overall Muscle Gain Top 3.

## Dashboard reporting periods

Let `N` be the maximum number of chronologically available measurements.

- Create at most three weekly Dashboard sections: `min(3, max(N - 1, 0))`.
- Dashboard Week 1 compares scheduled dates 1 and 2.
- Dashboard Week 2 compares scheduled dates 2 and 3.
- Dashboard Week 3 compares scheduled dates 3 and 4.
- Create Overall sections comparing Baseline with the defined Final Week for each metric. Never substitute an earlier reading.

Therefore, five available measurement dates produce:

- Week 1: date 1 to date 2;
- Week 2: date 2 to date 3;
- Week 3: date 3 to date 4;
- Overall: date 1 to date 5.

The Overall section is not the final weekly ranking. It uses each participant's first/start and latest/end applicable numeric Weight reading.

## Categories and ranks

Every weekly Dashboard period contains three sections:

1. Weight Loss - Top 3
2. Fat Loss - Top 3
3. Muscle Gain - Top 3

Each section has Rank 1, Rank 2, and Rank 3 when three eligible participants exist.

The Overall period contains Weight Loss Top 5, Fat Loss Top 3, and Muscle Gain Top 3.

- Weight Loss uses the most negative valid Weight change first.
- Fat Loss uses the most negative valid Fat change first.
- Muscle Gain uses the largest positive valid Muscle change first.
- Use the same tie ordering as the corresponding detailed ranking data.
- When displayed primary results tie, explain the priority or supporting metric that decided the order. If the complete category tuple ties, assign the same rank and mark manual prize review.
- Use the priority and complete category tie tuples in `final-ranking-rules.md`.

## Eligibility

- Weekly Top 3 entries must come from the corresponding `W{n}-Weight Loss`, `W{n}-Fat Loss`, or `W{n}-Muscle Gain` sheet.
- Include only detailed rows with Final Status `VALID`.
- REVIEW, OUTLIER, and INVALID rows remain on detailed sheets but cannot appear on the Dashboard.
- Overall entries must come from the corresponding Overall category sheet and use Baseline and defined Final Week values.
- If fewer than three eligible participants exist, leave the unused ranked positions blank.

## Required fields

Show these fields for every ranked entry:

- Rank
- Participant Name
- Club Name
- Age
- Height
- Previous value for weekly sections, or Starting value for Overall
- Current value for weekly sections, or Ending value for Overall
- Result/Change

Display `NA` when Age or Height is unavailable. Do not convert missing measurement values to zero.

## Calculations

- Weekly Weight Change = Current Weight minus Previous Weight.
- Weekly Fat Change = Current Fat minus Previous Fat.
- Weekly Muscle Change = Current Muscle minus Previous Muscle.
- Overall changes use defined Final Week minus Baseline for the relevant metric.

The Dashboard should link to the detailed weekly and overall datasets rather than hardcoding participant names or calculated results.

## Layout and formatting

- Keep all periods on one compact management-summary sheet.
- Clearly separate Week 1, Week 2, subsequent weekly periods, and Overall.
- Within each weekly period, place the Weight, Fat, and Muscle Top 3 tables side by side when practical.
- Use consistent columns and widths across all periods.
- Highlight the Change column in each category.
- Apply the standard Weight/Fat/Muscle sign and color rules.
- Display reporting dates for each weekly section and the complete start/end dates for Overall.
- Ensure the complete Dashboard is readable at normal zoom and suitable for single-page review.

## Refresh behavior

- Dashboard cells must use formulas linked to the corresponding weekly and overall datasets.
- When source measurements change, recalculate linked values.
- If a source change affects ranking order, refresh or regenerate the detailed rankings and Dashboard ordering together.
