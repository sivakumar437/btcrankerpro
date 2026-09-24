# BTC Ranker Pro

Repository-level rules and reusable guidance for generating health and fitness ranking workbooks from club measurement sheets.

## Purpose

Use this repository as the durable source of truth for future BTC report-generation tasks. It defines:

- how club sheets are interpreted;
- how missing and unusual values are handled;
- the required report sheets and formulas;
- ranking and weekly-comparison logic;
- formatting and validation requirements;
- privacy and source-preservation safeguards.

The repository intentionally excludes participant workbooks and generated reports. Place source workbooks in a local working directory outside the repository, or in an ignored `data/` directory.

## Starting a future report

1. Open this repository as the working project.
2. Provide the path to the source `.xlsx` workbook.
3. Ask the agent to use the `btc-report-generation` skill.
4. Review the generated workbook and its `Review Flags` sheet before distribution.

Example request:

> Use the btc-report-generation skill. Generate a new versioned report from `C:\path\source.xlsx`. Do not modify the source workbook.

## Repository map

- `AGENTS.md` — mandatory repository instructions for coding agents.
- `.agents/skills/btc-report-generation/SKILL.md` — operational workflow for future report runs.
- `docs/data-rules.md` — source parsing and data-integrity rules.
- `docs/report-specification.md` — required worksheets, calculations, and formatting.
- `docs/weekly-overall-reports.md` — complete weekly all-club Weight, Fat, and Muscle ranking rules.
- `docs/validation-checklist.md` — acceptance tests before delivery.

## Privacy

Health and fitness measurements are sensitive personal data. Do not commit workbooks, participant exports, screenshots, previews, or logs containing participant data.
