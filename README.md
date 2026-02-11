# claude-verbs-cli

Themed spinner verb sets for Claude Code.

## Usage

```bash
bunx github:doublej/claude-verbs-cli list              # Show available verb sets
bunx github:doublej/claude-verbs-cli install freddy    # Apply a verb set
bunx github:doublej/claude-verbs-cli current           # Show installed verbs
bunx github:doublej/claude-verbs-cli reset             # Restore defaults
```

### For development

```bash
git clone https://github.com/doublej/claude-verbs-cli
cd claude-verbs-cli
bun install
bun link   # makes `claude-verbs` available globally
```

## Adding a verb set

Create a JSON file in `sets/`:

```json
{
  "name": "my-set",
  "description": "My custom spinner verbs",
  "author": "You",
  "config": {
    "showTurnDuration": false,
    "spinnerVerbs": {
      "mode": "replace",
      "verbs": ["Doing thing one", "Doing thing two"]
    }
  }
}
```

## Development

```bash
just cli list       # Run CLI in dev mode
just check          # Run all quality checks
just test           # Run tests
```
