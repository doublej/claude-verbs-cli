# Contributing to claude-verbs-cli

This repository is for CLI code and release workflow changes.

## Verb Set Submissions

Do not submit new verb sets here.

Submit verb sets in [doublej/claude-verbs](https://github.com/doublej/claude-verbs):

- Guide: [doublej/claude-verbs/CONTRIBUTING.md](https://github.com/doublej/claude-verbs/blob/main/CONTRIBUTING.md)
- Include the author manifest in the PR description:
  - GitHub profile URL
  - Top 3 projects (name + URL + short description)
  - Generic one-sentence description

## CLI Code Contributions

### 1. Fork and clone

```sh
gh repo fork doublej/claude-verbs-cli --clone
cd claude-verbs-cli
bun install
```

### 2. Create a branch

```sh
git checkout -b your-change-name
```

### 3. Make changes

Keep changes scoped and include tests when behavior changes.

### 4. Run checks

```sh
just check
```

### 5. Open a PR

```sh
git add .
git commit -m "feat: describe your change"
git push -u origin your-change-name
gh pr create
```

## Rules

- Keep CLI behavior backward compatible unless explicitly changing UX
- Add or update tests for logic changes
- Run `just check` before opening a PR
- Keep documentation aligned with actual CLI behavior
