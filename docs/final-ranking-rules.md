# Final BTC ranking rules

This is the human-readable source of truth for the final v11 ranking method. If an older document conflicts with this file, this file wins.

## Reports and comparisons

Generate W1, W2, W3, and Overall for Weight Loss, Fat Loss, and Muscle Gain. W1 compares Baseline→Week 1, W2 compares Week 1→Week 2, W3 compares Week 2→Week 3, and Overall compares Baseline→the defined Final Week. Do not create W4 or substitute an earlier reading for a missing Final Week value.

Every detailed sheet retains every participant. Only VALID rows receive automatic ranks. REVIEW, OUTLIER, and INVALID rows remain visible below ranked rows.

## Signed changes and processing

`Change = Current - Previous` for Weight, Fat, and Muscle. Negative means loss, zero means stable, and positive means gain. Stable means exactly zero. Never use absolute values for display or ranking.

Process each participant, period, and category in this order:

1. Require previous and current Weight, Fat, and Muscle so the combination can be classified. Missing data is INVALID.
2. Calculate all three signed changes.
3. For W1-W3 only, apply weekly outlier limits.
4. Check the primary category direction.
5. Apply the category combination rule and assign VALID, REVIEW, or INVALID.
6. Assign Priority only to VALID rows.
7. Sort, tie-break, and rank VALID rows.
8. Append REVIEW, OUTLIER, and INVALID rows without ranks.

## Weekly outliers

For W1-W3, assign OUTLIER if any absolute weekly change is strictly greater than Weight 4 kg, Fat 3 points, or Muscle 3 points. Exact boundary values are valid. These thresholds do not apply to Overall.

## Weight Loss

Weight Change must be negative. Weight Stable and Weight Gain are INVALID. Explicit or rule-based Weight Gain program participants remain visible but are INVALID for Weight Loss ranking.

| Priority | Fat / Muscle combination | Status |
| --- | --- | --- |
| 1 | Fat Loss + Muscle Gain | VALID |
| 2 | Fat Loss + Muscle Stable | VALID |
| 3 | Fat Loss + Muscle Loss | VALID |
| 4 | Fat Stable + Muscle Gain | VALID |
| 5 | Fat Stable + Muscle Stable | VALID |
| - | Fat Stable + Muscle Loss | REVIEW |
| - | Fat Gain + Muscle Gain | REVIEW |
| - | Fat Gain + Muscle Stable | REVIEW |
| - | Fat Gain + Muscle Loss | INVALID |

Sort VALID rows by Weight Change ascending, Priority ascending, Muscle Change descending, then Fat Change ascending.

## Fat Loss

Fat Change must be negative. Fat Stable and Fat Gain are INVALID.

| Priority | Muscle / Weight combination | Status |
| --- | --- | --- |
| 1 | Muscle Gain + Weight Loss | VALID |
| 2 | Muscle Gain + Weight Stable | VALID |
| 3 | Muscle Stable + Weight Loss | VALID |
| 4 | Muscle Stable + Weight Stable | VALID |
| 5 | Muscle Gain + Weight Gain | VALID |
| 6 | Muscle Stable + Weight Gain | VALID |
| - | Muscle Loss + Weight Loss | REVIEW |
| - | Muscle Loss + Weight Stable | REVIEW |
| - | Muscle Loss + Weight Gain | INVALID |

Sort VALID rows by Fat Change ascending, Priority ascending, Muscle Change descending, then Weight Change ascending.

## Muscle Gain

Muscle Change must be positive. Muscle Stable and Muscle Loss are INVALID.

| Priority | Fat / Weight combination | Status |
| --- | --- | --- |
| 1 | Fat Loss + Weight Loss | VALID |
| 2 | Fat Loss + Weight Stable | VALID |
| 3 | Fat Loss + Weight Gain | VALID |
| 4 | Fat Stable + Weight Loss | VALID |
| 5 | Fat Stable + Weight Stable | VALID |
| 6 | Fat Stable + Weight Gain | VALID |
| 7 | Fat Gain + Weight Gain | VALID |
| 8 | Fat Gain + Weight Stable | VALID |
| - | Fat Gain + Weight Loss | INVALID |

Sort VALID rows by Muscle Change descending, Priority ascending, Fat Change ascending, then Weight Change ascending.

## Ties

Use the complete category sort tuple. If every value is identical, assign the same rank and mark manual prize-order review. Do not break a complete tie alphabetically for ranking. Name and Club may only stabilize display order after the shared rank is assigned. Dashboard tie notes must state the deciding priority/supporting metric or that the rank is shared.

## Overall and missing data

Overall applies the same category rules but no weekly outlier limits. It uses Baseline→defined Final Week only.

- Missing Baseline: `INVALID - NO BASELINE DATA`.
- Missing defined Final Week: `INVALID - FINAL WEEK DATA MISSING`.
- Other missing endpoint data: `INVALID - NO DATA AVAILABLE FOR COMPARISON`.
- Duplicate participant/date measurement: `REVIEW - DUPLICATE MEASUREMENT`.
- Nonnumeric source value: `INVALID - BAD SOURCE DATA`.
- Missing is never converted to zero or Stable.

Use only VALID, REVIEW, OUTLIER, and INVALID final statuses.

## Dashboard

- W1, W2, W3: Top 3 Weight Loss, Fat Loss, and Muscle Gain.
- Overall: Top 5 Weight Loss, Top 3 Fat Loss, and Top 3 Muscle Gain.
- Entries must come from VALID rows in the corresponding detailed sheet.
- Show Rank, Name, Club, Age, Height, Previous/Start, Current/Final, signed Change, and Priority.
- Display `NA` for unavailable Age or Height.

## Open decisions and conservative defaults

These cases were not completely defined. Until the owner decides otherwise:

1. Require all six endpoint values because supporting metrics determine status and priority.
2. Compare stored numeric values, not rounded display text, when detecting ties. If the source precision is one decimal, normalize calculations to one decimal consistently before exact-zero and tie tests.
3. Do not resolve duplicates automatically by averaging, first, or last value.
4. Treat the defined Final Week as global; a personal earlier latest reading cannot replace it.
5. Weight Gain classification excludes a participant from Weight Loss only, not automatically from Fat Loss or Muscle Gain.
6. Record every manual override with participant, period, category, reason, date, and approver; never silently change source data.
7. Leave unused Dashboard positions blank when fewer VALID winners exist.
8. Do not rank across mixed measurement units until a documented conversion is approved.
9. Missing Age or Height does not affect ranking eligibility, except Height is required for rule-based Weight Gain classification.
10. Repeated names within one club need a stable source-record identifier; otherwise mark them REVIEW.
11. If date/column mapping is ambiguous, stop automatic ranking and document the ambiguity.

