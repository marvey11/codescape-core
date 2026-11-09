# codescape-core

Core non-UI library for Codescape projects.

## Utilities

- `SortedList` maintains comparator order and can optionally prevent duplicate
  identifiers. Removing an item or clearing the list releases its identifier.
- `sortDataArray` sorts a copy using strings, numbers, or valid dates. Non-null
  keys must share one type; `null` and `undefined` values remain at the end.
  Unsupported values, invalid dates, and mixed types throw a `TypeError`.
- Date helpers accept `YYYY-MM-DD`, `DD.MM.YYYY`, and `DD/MM/YYYY` strings.
  Normalization and comparisons use the UTC calendar day.
- `formatCurrency(value, locale = "en-GB", currency = "EUR")` keeps EUR as the
  default and supports an ISO 4217 currency code override.
- `parseLocaleNumber` validates ASCII digits and decimal/grouping separators for
  the explicit locale and returns `NaN` for malformed input. `parseNumberWithAutoLocale`
  heuristically distinguishes English-like and German-like punctuation; use the
  explicit-locale parser for ambiguous values.
- Approximate numeric comparisons use an absolute tolerance, defaulting to
  `FLOATING_POINT_TOLERANCE`. Explicit tolerances must be finite and
  non-negative.

## Development

### Install Dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Test

```bash
npm run test
npm run test:coverage
```

### Lint

```bash
npm run lint

# or

npm run lint:fix # to automatically fix linting errors
```

### Format

```bash
npm run format
```

### Build and Publish an Artifact

The `publish:private` script will publish the package to the local Verdaccio registry. The appropiate Verdaccio configuration is expected to be running on `http://localhost:4873` (see `package.json` for details).

```bash
npm pack
npm run publish:private
```
