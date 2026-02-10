import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { VerbSet } from './types.js'

const mockSet: VerbSet = {
  name: 'test',
  description: 'test set',
  author: 'test',
  github: 'test-user',
  language: 'en',
  config: {
    showTurnDuration: false,
    spinnerVerbs: { mode: 'replace', verbs: ['Verb one', 'Verb two'] },
  },
}

let tmpDir: string
let settingsPath: string

beforeEach(async () => {
  tmpDir = await mkdtemp(join(tmpdir(), 'spinner-verbs-test-'))
  settingsPath = join(tmpDir, 'settings.json')
})

afterEach(async () => {
  vi.restoreAllMocks()
  await rm(tmpDir, { recursive: true })
})

async function importSettings() {
  vi.stubEnv('SPINNER_VERBS_SETTINGS_PATH', settingsPath)
  vi.resetModules()
  return import('./settings.js')
}

describe('installVerbs', () => {
  it('adds spinnerVerbs to existing settings', async () => {
    const original = { $schema: 'https://example.com', language: 'en_GB' }
    await writeFile(settingsPath, JSON.stringify(original))

    const { installVerbs } = await importSettings()
    await installVerbs(mockSet)

    const result = JSON.parse(await readFile(settingsPath, 'utf-8'))
    expect(result.$schema).toBe('https://example.com')
    expect(result.language).toBe('en_GB')
    expect(result.spinnerVerbs).toEqual(mockSet.config.spinnerVerbs)
    expect(result.showTurnDuration).toBe(false)
  })
})

describe('resetVerbs', () => {
  it('removes spinnerVerbs and showTurnDuration', async () => {
    const original = {
      language: 'en_GB',
      spinnerVerbs: { mode: 'replace', verbs: ['test'] },
      showTurnDuration: false,
    }
    await writeFile(settingsPath, JSON.stringify(original))

    const { resetVerbs } = await importSettings()
    await resetVerbs()

    const result = JSON.parse(await readFile(settingsPath, 'utf-8'))
    expect(result.language).toBe('en_GB')
    expect(result.spinnerVerbs).toBeUndefined()
    expect(result.showTurnDuration).toBeUndefined()
  })
})
