# Validation checklist

Complete every applicable check before delivering a workbook.

## Source preservation

- [ ] The input workbook was not modified or overwritten.
- [ ] Every original club sheet still exists.
- [ ] Original source values, formulas, notes, structure, and formatting remain unchanged.
- [ ] The output filename is a new version.
- [ ] Generated report sheets appear first, `Dashboard` is the first tab, original source sheets appear after reports, and `Rdata` is the final tab.

## Coverage

- [ ] Participant-record count in `Rdata` equals the count parsed from club sheets.
- [ ] Every source club appears in `Rdata` and its club report; weekly category sheets include every eligible participant from every club.
- [ ] The workbook does not contain `All Clubs Report` or any generic `Week N Comparison` sheet.
- [ ] Exactly W1, W2, and W3 exist for Weight Loss, Fat Loss, and Muscle Gain; only `Overall Weight Loss` exists; no W4, `Overall Fat Loss`, or `Overall Muscle Gain` sheet exists.
- [ ] Every weekly category sheet includes every participant whose ranking metric has numeric readings at both scheduled comparison dates.
- [ ] Repeated participant names remain separate records.
- [ ] Dates are chronological.
- [ ] W1 uses scheduled dates 1→2, W2 uses 2→3, and W3 uses 3→4 for each participant and ranking metric without skipping missing dates.
- [ ] `Overall Weight Loss` uses the participant's original Baseline Weight and final/latest Weight.

## Calculations

- [ ] Weekly difference equals current available dated reading minus previous available dated reading.
- [ ] Overall change equals End minus Start.
- [ ] Weight, Fat, and Muscle use independent first/latest numeric readings.
- [ ] Missing or text readings do not become zero.
- [ ] Weekly leaders exclude blank, `absent`, and other nonnumeric cells.
- [ ] Rankings exclude records with fewer than two numeric readings for that metric.
- [ ] Weight and Fat rankings run from largest loss to largest gain.
- [ ] Muscle ranking runs from largest gain to largest loss.
- [ ] Week 1/2/3 sheets use the first-second, second-third, and third-fourth scheduled readings.
- [ ] Every comparable weekly interval has Weight Loss, Fat Loss, and Muscle Gain all-club sheets.
- [ ] Weekly category reports compare adjacent scheduled readings for the participant and ranking metric.
- [ ] Weight and Fat weekly sheets sort valid rows from most negative change upward.
- [ ] Muscle weekly sheets sort valid rows from largest positive change downward.
- [ ] Participants missing either scheduled ranking-metric reading are omitted from that weekly category sheet.
- [ ] No retained weekly row has a blank/nonnumeric ranking comparison or `ABSENT` status.
- [ ] Weekly results above 5% absolute relative change are marked `REVIEW`, placed after eligible rows, listed in `Review Flags`, and excluded from rankings.
- [ ] Overall Weight results above 20% absolute relative change are marked `REVIEW`, listed in `Review Flags`, and excluded from rankings.
- [ ] Ties use Club Name and Name as deterministic secondary ordering.
- [ ] Primary ties use the required cross-metric order before Club Name and Name: Weight→Muscle→Fat, Fat→Weight→Muscle, and Muscle→Weight→Fat.
- [ ] Every displayed primary tie on the Dashboard has Rank-cell comments identifying the deciding secondary metric and compared values, or the Club/Name alphabetical fallback.
- [ ] The Dashboard contains the required dynamic weekly sections and one Overall section.
- [ ] With five available dates, the Dashboard contains Week 1, Week 2, Week 3, and Overall.
- [ ] Each weekly Dashboard period contains Weight Loss, Fat Loss, and Muscle Gain Top 3 sections; Overall contains Weight Loss Top 5 only.
- [ ] Weekly Dashboard names and results match the first three eligible rows in the corresponding detailed weekly sheets.
- [ ] Dashboard Top 3 sections exclude `ABSENT`, blank, and nonnumeric comparisons.
- [ ] Overall Dashboard rankings use first/start and latest/end applicable Weight readings only.
- [ ] Missing Dashboard Age or Height displays as `NA`, not zero.

## Formula and update behavior

- [ ] `Rdata` values are linked to original club sheets by formulas.
- [ ] Report calculations use formulas referencing `Rdata` or source sheets.
- [ ] Formula ranges are bounded.
- [ ] A disposable source-value change updates the linked report and is then restored.
- [ ] Changing a value that affects a leader or ranking updates the result in the intended Excel engine.
- [ ] Changing a weekly ranking metric updates its change, status, and sorted position after the intended refresh/recalculation process.
- [ ] Dashboard formulas update from their linked weekly and overall datasets after recalculation or the documented ranking refresh.

## Formatting

- [ ] Weight/Fat losses are negative and green; gains are positive and red.
- [ ] Muscle gains are positive and green; losses are negative and red.
- [ ] Zero displays as `0.0` with neutral formatting.
- [ ] Dates display as dates, not Excel serial numbers or `####`.
- [ ] Titles, headers, names, numbers, and notes are not clipped.
- [ ] Every new report sheet has been rendered and visually inspected.
- [ ] Each weekly overall sheet visibly highlights only its primary ranking column.
- [ ] Dashboard periods and categories are clearly separated, change columns are highlighted, and all Top 3 fields are unclipped.

## Errors and flags

- [ ] No unexpected `#REF!`, `#VALUE!`, `#DIV/0!`, `#NAME?`, `#N/A`, `#NUM!`, `#NULL!`, `#SPILL!`, or `#CALC!` values exist.
- [ ] Unusual source text is preserved and included in `Review Flags`.
- [ ] Any unresolved ambiguity is disclosed with the delivered workbook.
