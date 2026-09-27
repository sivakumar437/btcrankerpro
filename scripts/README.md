# Report scripts

## Generate the final-rules report

```text
node scripts/generate-final-v11-report.mjs <source.xlsx> <output.xlsx> [club|name ...]
```

The source workbook must contain the normalized `Rdata` sheet used by the v9/v11 pipeline and a `Weight Gain` sheet. Optional `club|name` arguments mark source results for manual REVIEW without embedding participant identifiers in code. Set `BTC_REPORT_TITLE` to customize the Dashboard title.

The script creates W1, W2, W3, and Overall reports for Weight Loss, Fat Loss, and Muscle Gain, plus Dashboard, Review Queue, Status Summary, and Source Data sheets.

## Validate a generated report

```text
node scripts/validate-final-report.mjs <report.xlsx>
```

Validation checks the required 16-sheet structure, complete participant populations, rank/status consistency, weekly limits, and formula-error markers.

These scripts require the Codex bundled `@oai/artifact-tool` runtime described by the repository report-generation skill.
