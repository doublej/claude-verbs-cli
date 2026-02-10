import { readFile, rename, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import type { ClaudeSettings, VerbSet } from './types.js'

function getSettingsPath(): string {
  return process.env.SPINNER_VERBS_SETTINGS_PATH ?? join(homedir(), '.claude', 'settings.json')
}

export async function readSettings(): Promise<ClaudeSettings> {
  const raw = await readFile(getSettingsPath(), 'utf-8')
  return JSON.parse(raw) as ClaudeSettings
}

async function writeSettings(settings: ClaudeSettings): Promise<void> {
  const path = getSettingsPath()
  const tmp = `${path}.tmp`
  await writeFile(tmp, `${JSON.stringify(settings, null, 2)}\n`)
  await rename(tmp, path)
}

export async function installVerbs(set: VerbSet): Promise<void> {
  const settings = await readSettings()
  settings.spinnerVerbs = set.config.spinnerVerbs
  if (set.config.showTurnDuration !== undefined) {
    settings.showTurnDuration = set.config.showTurnDuration
  }
  await writeSettings(settings)
}

export async function resetVerbs(): Promise<void> {
  const { spinnerVerbs: _, showTurnDuration: __, ...rest } = await readSettings()
  await writeSettings(rest)
}
