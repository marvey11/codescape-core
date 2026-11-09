# @marvey11/codescape-core

Shared non-UI TypeScript utilities for Codescape projects. The package is
published as an ES module with TypeScript declarations; React components belong
in `codescape-ui`, while React hooks belong in `codescape-react-utils`.

## Utilities

- `SortedList` maintains comparator order and can optionally prevent duplicate
  identifiers. Removing an item or clearing the list releases its identifier.
- `sortDataArray` sorts a copy using strings, numbers, or valid dates. Non-null
  keys must share one type; `null` and `undefined` values remain at the end.
  Unsupported values, invalid dates, and mixed types throw a `TypeError`.
- Date helpers accept `YYYY-MM-DD`, `DD.MM.YYYY`, and `DD/MM/YYYY` strings.
  Normalization and comparisons use the UTC calendar day.
- `formatCurrency(value, locale = "en-GB", currency = "EUR")` keeps EUR as the
  default and supports an ISO 4217 currency-code override.
- `parseLocaleNumber` validates ASCII digits and decimal/grouping separators for
  the explicit locale and returns `NaN` for malformed input.
  `parseNumberWithAutoLocale` heuristically distinguishes English-like and
  German-like punctuation; use the explicit-locale parser for ambiguous values.
- Approximate numeric comparisons use an absolute tolerance, defaulting to
  `FLOATING_POINT_TOLERANCE`. Explicit tolerances must be finite and
  non-negative.

## Install

The package is published to GitHub Packages. Configure npm for the Codescape
scope and provide a GitHub token with `read:packages` via the environment:

```ini
@marvey11:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```sh
npm install @marvey11/codescape-core
```

Do not put tokens in `.npmrc` committed to the repository. A public repository
does not automatically make its GitHub package public. After the first publish,
set the package visibility to **Public** in GitHub Packages settings.

## Development

Requires Node.js 20.19.x or 22.12 or later, and npm.

```sh
npm ci
npm run typecheck
npm run lint
npm run format:check
npm test
npm run test:coverage
npm run build
```

The build bundles `src/index.ts` as an ESM library with Vite and emits
declarations with TypeScript. Vitest uses the Vite config and enforces 80%
minimum coverage for statements, branches, functions, and lines. TypeScript is
pinned to an exact 6.x version; Dependabot is configured not to change it.

Husky runs lint-staged before commits. Staged JavaScript and TypeScript files
are linted and formatted; staged documentation and configuration files are
formatted. CI runs the full checks.

## Releases

Push a Git tag (for example, `v0.1.0`) to create a GitHub Release with generated
release notes. Publishing is triggered when the release is published. The
workflow builds the package and publishes it to GitHub Packages using the
workflow's `GITHUB_TOKEN` and `packages: write` permission; no personal access
token secret is required.
