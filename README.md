# codescape-core

Core non-UI library for Codescape projects.

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
