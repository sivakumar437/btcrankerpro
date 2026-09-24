# Validation checklist

Complete every applicable check before delivering a workbook.

## Source preservation

- [ ] The input workbook was not modified or overwritten.
- [ ] Every original club sheet still exists.
- [ ] Original source values, formulas, notes, structure, and formatting remain unchanged.
- [ ] The output filename is a new version.

## Coverage

- [ ] Participant-record count in `Rdata` equals the count parsed from club sheets.
- [ ] Every source club appears in `Rdata`, its club report, and every weekly overall sheet.
- [ ] The workbook does not contain `All Clubs Report` or any generic `Week N Comparison` sheet.
- [ ] Exactly W1, W2, W3, and Overall exist for each of Weight Loss, Fat Loss, and Muscle Gain; no W4 sheet exists.
- [ ] Every weekly overall sheet includes every participant record from every club.
- [ ] Repeated participant names remain separate records.
- [ ] Dates are chronological.
- [ ] W1 uses available measurements 1→2, W2 uses 2→3, and W3 uses 3→4 for each participant and ranking metric.
- [ ] Every Overall category sheet uses the participant's original Baseline measurement and final/latest measurement.

## Calculations

- [ ] Weekly difference equals current available dated reading minus previous available dated reading.
- [ ] Overall change equals End minus Start.
- [ ] Weight, Fat, and Muscle use independent first/latest numeric readings.
- [ ] Missing or text readings do not become zero.
- [ ] Weekly leaders exclude blank, `absent`, and other nonnumeric cells.
- [ ] Rankings exclude records with fewer than two numeric readings for that metric.
- [ ] Weight and Fat rankings run from largest loss to largest gain.
- [ ] Muscle ranking runs from largest gain to largest loss.
- [ ] Week 1/2/3 sheets use the first-second, second-third, and third-fourth available numeric Weight readings.
- [ ] Every comparable weekly interval has Weight Loss, Fat Loss, and Muscle Gain all-club sheets.
- [ ] Weekly category reports compare consecutive available numeric readings for the participant and ranking metric.
- [ ] Weight and Fat weekly sheets sort valid rows from most negative change upward.
- [ ] Muscle weekly sheets sort valid rows from largest positive change downward.
- [ ] Participants missing the ranking metric's Previous or Current value are marked `ABSENT` and placed after all valid rows.
- [ ] Participants are never excluded because they are absent or lack comparison data.
- [ ] Ties and absent rows use Club Name and Name as deterministic secondary ordering.
- [ ] The Dashboard contains the required dynamic weekly sections and one Overall section.
- [ ] With five available dates, the Dashboard contains Week 1, Week 2, Week 3, and Overall.
- [ ] Each Dashboard period contains Weight Loss, Fat Loss, and Muscle Gain Top 3 sections.
- [ ] Weekly Dashboard names and results match the first three eligible rows in the corresponding detailed weekly sheets.
- [ ] Dashboard Top 3 sections exclude `ABSENT`, blank, and nonnumeric comparisons.
- [ ] Overall Dashboard rankings use each metric's first/start and latest/end applicable readings.
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
