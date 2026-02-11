# Publishing to npm

## Prerequisites

1. npm account (create at https://www.npmjs.com/signup)
2. Login via CLI: `npm login`

## Pre-publish checklist

- [ ] All tests pass: `bun test`
- [ ] No lint errors: `bun run lint`
- [ ] Version bumped in package.json (follow semver)
- [ ] CHANGELOG updated (if you maintain one)

## Publishing

The `prepublishOnly` script will automatically:
- Build TypeScript to JavaScript
- Run tests
- Run linter

```bash
# Dry run (see what would be published)
npm publish --dry-run

# Publish to npm
npm publish
```

## Post-publish

- Tag the release in git: `git tag v0.1.0 && git push --tags`
- Test installation: `npm install -g spinner-verbs`

## Package name availability

Before first publish, check if the name is available:
```bash
npm view spinner-verbs
```

If taken, you can:
- Choose a different name (update package.json)
- Use a scoped package: `@yourname/spinner-verbs`
