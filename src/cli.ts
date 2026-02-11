#!/usr/bin/env bun
import { current, install, list, reset, show } from './commands.js'
import { generatePrompt } from './prompt.js'

const USAGE = `Usage: claude-verbs <command>

Commands:
  list [--language <code>]  Show available verb sets (filter by language)
  show <name>               Show contents of a verb set
  install <name>            Apply a verb set to Claude Code
  current                   Show currently installed spinner verbs
  reset                     Remove spinner verbs (restore defaults)
  prompt <subject> [--language <locale>]  Generate a prompt for creating a new verb set

Browse more sets at https://claudeverbs.com`

const argv = process.argv.slice(2)
const command = argv[0]

function extractFlag(flag: string): string | undefined {
  const idx = argv.indexOf(flag)
  if (idx === -1) return undefined
  const value = argv[idx + 1]
  argv.splice(idx, 2)
  return value
}

function requireArg(cmd: string): string {
  const positional = argv.slice(1).filter((a) => !a.startsWith('--'))
  if (!positional[0]) {
    console.error(`Usage: claude-verbs ${cmd}`)
    process.exit(1)
  }
  return positional[0]
}

async function main(): Promise<void> {
  const language = extractFlag('--language')

  switch (command) {
    case 'list':
      return list(language)
    case 'show':
      return show(requireArg('show <name>'))
    case 'install':
      return install(requireArg('install <name>'))
    case 'current':
      return current()
    case 'reset':
      return reset()
    case 'prompt': {
      requireArg('prompt <subject>')
      const subject = argv
        .slice(1)
        .filter((a) => !a.startsWith('--'))
        .join(' ')
      return generatePrompt(subject, language)
    }
    default:
      console.log(USAGE)
      process.exit(command ? 1 : 0)
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
