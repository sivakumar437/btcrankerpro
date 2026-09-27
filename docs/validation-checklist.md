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
- [ ] Exactly W1, W2, W3, and Overall exist for Weight Loss, Fat Loss, and Muscle Gain; no W4 exists.
- [ ] Every detailed category sheet contains the complete participant population.
- [ ] Repeated participant names remain separate records.
- [ ] Dates are chronological.
- [ ] W1 uses scheduled dates 1→2, W2 uses 2→3, and W3 uses 3→4 for each participant and ranking metric without skipping missing dates.
- [ ] Every Overall category uses Baseline and the defined Final Week without earlier-week substitution.
- [ ] Weight Gain candidate count equals explicit registrations plus unique Baseline-rule candidates after matching existing participants without duplication.
- [ ] Every Weight Gain candidate is visible but INVALID and unranked on all Weight Loss sheets.
- [ ] `Weight Gain`, W1/W2/W3 Weight Gain, and Overall Weight Gain contain the complete candidate population.

## Calculations

- [ ] Weekly difference equals current available dated reading minus previous available dated reading.
- [ ] Overall change equals End minus Start.
- [ ] Weight, Fat, and Muscle use independent first/latest numeric readings.
- [ ] Missing or text readings do not become zero.
- [ ] Weekly leaders exclude blank, `absent`, and other nonnumeric cells.
- [ ] Missing any required endpoint measurement produces INVALID and no rank while remaining visible.
- [ ] Weight and Fat rankings run from largest loss to largest gain.
- [ ] Muscle ranking runs from largest gain to largest loss.
- [ ] Week 1/2/3 sheets use the first-second, second-third, and third-fourth scheduled readings.
- [ ] Every comparable weekly interval has Weight Loss, Fat Loss, and Muscle Gain all-club sheets.
- [ ] Weekly category reports compare adjacent scheduled readings for the participant and ranking metric.
- [ ] Weight and Fat weekly sheets sort valid rows from most negative change upward.
- [ ] Muscle weekly sheets sort valid rows from largest positive change downward.
- [ ] REVIEW, OUTLIER, and INVALID rows remain visible below VALID rows and receive no rank.
- [ ] Weekly absolute changes above 4 kg Weight, 3 Fat points, or 3 Muscle points are OUTLIER; exact boundaries remain eligible.
- [ ] Overall does not apply weekly outlier limits.
- [ ] Sorting applies primary change, category Priority, and supporting changes in the required order.
- [ ] Complete sort-tuple ties receive the same rank and manual prize review rather than an alphabetical rank decision.
- [ ] Every displayed primary tie explains its deciding priority/supporting metric; complete tuple ties share a rank and require manual prize review.
- [ ] Weight Gain quality tiers order positive Weight plus positive Muscle first, then positive Weight only, positive Muscle only, and no positive gain; each tier sorts Weight Change then Muscle Change descending.
- [ ] Weight Gain `REVIEW` rows follow ranked rows and `ABSENT / NO DATA` rows are last.
- [ ] Weight Gain summary Start/Latest values and changes reconcile to `Overall Weight Gain`.
- [ ] The Dashboard contains the required dynamic weekly sections and one Overall section.
- [ ] With five available dates, the Dashboard contains Week 1, Week 2, Week 3, and Overall.
- [ ] Each weekly Dashboard period contains three Top 3 sections; Overall contains Weight Loss Top 5, Fat Loss Top 3, and Muscle Gain Top 3.
- [ ] Weekly Dashboard names and results match the first three eligible rows in the corresponding detailed weekly sheets.
- [ ] Dashboard rankings contain only VALID detailed rows.
- [ ] Overall Dashboard rankings use Baseline and defined Final Week values only.
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
