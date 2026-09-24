# Validation checklist

Complete every applicable check before delivering a workbook.

## Source preservation

- [ ] The input workbook was not modified or overwritten.
- [ ] Every original club sheet still exists.
- [ ] Original source values, formulas, notes, structure, and formatting remain unchanged.
- [ ] The output filename is a new version.

## Coverage

- [ ] Participant-record count in `Rdata` equals the count parsed from club sheets.
- [ ] Every source club appears in `Rdata`, its club report, and the all-clubs report.
- [ ] Repeated participant names remain separate records.
- [ ] Dates are chronological.

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

## Formula and update behavior

- [ ] `Rdata` values are linked to original club sheets by formulas.
- [ ] Report calculations use formulas referencing `Rdata` or source sheets.
- [ ] Formula ranges are bounded.
- [ ] A disposable source-value change updates the linked report and is then restored.
- [ ] Changing a value that affects a leader or ranking updates the result in the intended Excel engine.

## Formatting

- [ ] Weight/Fat losses are negative and green; gains are positive and red.
- [ ] Muscle gains are positive and green; losses are negative and red.
- [ ] Zero displays as `0.0` with neutral formatting.
- [ ] Dates display as dates, not Excel serial numbers or `####`.
- [ ] Titles, headers, names, numbers, and notes are not clipped.
- [ ] Every new report sheet has been rendered and visually inspected.

## Errors and flags

- [ ] No unexpected `#REF!`, `#VALUE!`, `#DIV/0!`, `#NAME?`, `#N/A`, `#NUM!`, `#NULL!`, `#SPILL!`, or `#CALC!` values exist.
- [ ] Unusual source text is preserved and included in `Review Flags`.
- [ ] Any unresolved ambiguity is disclosed with the delivered workbook.
