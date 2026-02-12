# claude-verbs-cli

CLI tool for installing and managing themed spinner verb sets for Claude Code.

Browse available sets at [claudeverbs.com](https://claudeverbs.com).

## Usage

```bash
bunx github:doublej/claude-verbs-cli list                       # Show available verb sets
bunx github:doublej/claude-verbs-cli list --language nl         # Filter by language
bunx github:doublej/claude-verbs-cli show <name>                # Show one set
bunx github:doublej/claude-verbs-cli install <name>             # Apply a verb set
bunx github:doublej/claude-verbs-cli current                    # Show installed verbs
bunx github:doublej/claude-verbs-cli reset                      # Restore defaults
bunx github:doublej/claude-verbs-cli prompt "topic" --language nl_NL  # Generate a set prompt
```

## Verb Set Submissions

Do not submit verb sets in this repository.

Submit new sets via PR in [doublej/claude-verbs](https://github.com/doublej/claude-verbs):

- Contribution guide: [doublej/claude-verbs/CONTRIBUTING.md](https://github.com/doublej/claude-verbs/blob/main/CONTRIBUTING.md)
- Include the author manifest in your PR description (GitHub profile, top 3 projects, generic description)

## CLI Development

```bash
git clone https://github.com/doublej/claude-verbs-cli
cd claude-verbs-cli
bun install
bun link   # makes `claude-verbs` available globally
```

## Development Commands

```bash
just cli list       # Run CLI in dev mode
just check          # Run all quality checks
just test           # Run tests
```
