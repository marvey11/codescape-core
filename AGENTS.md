# Development Guide

## Package scope

`@marvey11/codescape-core` is the shared, framework-independent TypeScript
utility package for Codescape projects. It exports:

- `SortedList` for comparator-sorted collections and optional ID uniqueness.
- `sortDataArray` for validated sorting by string, number, or date keys.
- Date parsing, UTC-day normalization, comparison, and validation helpers.
- Currency, percentage, and normalized-date formatters.
- Locale-aware number parsing and currency rounding.
- Approximate numeric comparisons and their default tolerance constant.

Keep UI components in `codescape-ui` and React-specific hooks in
`codescape-react-utils`. Do not add application-domain logic or React runtime
dependencies here.

## Project layout and conventions

- `src/index.ts` defines the package's public exports. Update it when adding
  public helpers and test public exports through the package entry point.
- `src/` contains the implementation; `tests/` contains Vitest unit tests.
- Keep public APIs typed and document non-obvious behavior with concise JSDoc.
- Use the existing ESM import convention, including `.js` extensions in
  TypeScript relative imports.
- Vite bundles the ESM entry point. TypeScript emits package declarations;
  `tsconfig.json` is used for no-emit checking, while `tsconfig.build.json` emits
  declarations from `src/`.
- Vitest uses `vite.config.ts` and requires at least 80% statement, branch,
  function, and line coverage.
- ESLint owns correctness and code-quality rules. Prettier owns formatting;
  `eslint-config-prettier` disables conflicting formatting rules.

## Quality commands

Run these before submitting changes:

```sh
npm ci
npm run typecheck
npm run lint
npm run format:check
npm test
npm run test:coverage
npm run build
```

`npm run format` formats supported project files. Husky invokes lint-staged
before commits to lint/format staged JavaScript and TypeScript and format staged
documentation/configuration files. CI runs all checks on pull requests and
pushes to `main`.

## Dependencies and TypeScript

TypeScript is pinned to an exact 6.x release. Dependabot must not update
TypeScript; do not remove its ignore rule. Review `npm audit` and remediate
advisories only when a compatible, non-breaking update is available. Do not
silence advisories with dependency overrides.

## Package publishing

The package is published to GitHub Packages. Pushing a tag creates a GitHub
Release with automatically generated notes; publishing the release runs the
package publishing workflow using the standard `GITHUB_TOKEN` with
`packages: write`. Do not commit credentials or personal access tokens.

For consumers, configure `.npmrc` as follows and provide the token through
`NODE_AUTH_TOKEN`:

```ini
@marvey11:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

After the first package publication, set the package visibility to Public in
GitHub Packages settings. Repository visibility alone does not ensure the
package is public.

There is no separate worker CLI in this repository; use the documented npm
scripts for build, tests, lint, formatting, and type checking.
