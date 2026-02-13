import { footer, heading, hint, success, verbList } from './display.js'
import { findSet, loadSets } from './sets.js'
import { installVerbs, readSettings, resetVerbs } from './settings.js'
import type { VerbSet } from './types.js'

async function requireSet(name: string): Promise<VerbSet> {
  const set = await findSet(name)
  if (!set) {
    console.error(`Unknown verb set: "${name}"`)
    console.error('Run "claude-verbs list" to see available sets.')
    process.exit(1)
  }
  return set
}

export async function list(language?: string): Promise<void> {
  let sets = await loadSets()
  if (language) {
    sets = sets.filter((s) => s.language.startsWith(language))
  }
  if (sets.length === 0) {
    console.log(language ? `No verb sets found for language "${language}".` : 'No verb sets found.')
    return
  }
  console.log(`\n${heading(`${sets.length} verb sets available`)}\n`)
  for (const set of sets) {
    const count = set.config.spinnerVerbs.verbs.length
    console.log(`  ${set.name}  ─  ${set.description}`)
    console.log(`    [${set.language}] @${set.github} · ${count} verbs\n`)
  }
  console.log(footer())
}

export async function show(name: string): Promise<void> {
  const set = await requireSet(name)
  const count = set.config.spinnerVerbs.verbs.length
  console.log(`\n${heading(set.name)}\n`)
  console.log(`  ${set.description}`)
  console.log(`  by ${set.author} (@${set.github})`)
  console.log(`  Language: ${set.language}  ·  Mode: ${set.config.spinnerVerbs.mode}`)
  console.log(`\n  ── ${count} verbs ──\n`)
  console.log(verbList(set.config.spinnerVerbs.verbs))
  console.log(footer())
}

export async function install(name: string): Promise<void> {
  const set = await requireSet(name)
  await installVerbs(set)
  const count = set.config.spinnerVerbs.verbs.length
  console.log(`\n${success(`Installed "${set.name}" [${set.language}] (${count} verbs)`)}`)
  console.log(hint('Restart Claude Code to see the new spinner verbs'))
  console.log(footer())
}

export async function current(): Promise<void> {
  const settings = await readSettings()
  if (!settings.spinnerVerbs?.verbs?.length) {
    console.log(`\n${hint('No custom spinner verbs installed (using defaults)')}`)
    console.log(footer())
    return
  }
  const { mode, verbs } = settings.spinnerVerbs
  console.log(`\n${heading('Current spinner verbs')}\n`)
  console.log(`  Mode: ${mode}`)
  console.log(`\n  ── ${verbs.length} verbs ──\n`)
  console.log(verbList(verbs))
}

export async function reset(): Promise<void> {
  await resetVerbs()
  console.log(`\n${success('Spinner verbs reset to defaults')}`)
}
