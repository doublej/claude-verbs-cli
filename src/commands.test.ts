import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let tmpDir: string
let settingsPath: string

beforeEach(async () => {
  tmpDir = await mkdtemp(join(tmpdir(), 'spinner-verbs-cmd-'))
  settingsPath = join(tmpDir, 'settings.json')
  vi.stubEnv('SPINNER_VERBS_SETTINGS_PATH', settingsPath)
})

afterEach(async () => {
  vi.restoreAllMocks()
  await rm(tmpDir, { recursive: true })
})

describe('install + current + reset flow', () => {
  it('installs a set then resets', async () => {
    await writeFile(settingsPath, JSON.stringify({ $schema: 'test' }))

    vi.resetModules()
    const { install, reset } = await import('./commands.js')

    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    await install('jiskefet')
    expect(log).toHaveBeenCalledWith(expect.stringContaining('Installed "jiskefet"'))

    const after = JSON.parse(await readFile(settingsPath, 'utf-8'))
    expect(after.$schema).toBe('test')
    expect(after.spinnerVerbs.verbs.length).toBeGreaterThan(0)

    await reset()
    const final = JSON.parse(await readFile(settingsPath, 'utf-8'))
    expect(final.spinnerVerbs).toBeUndefined()
    log.mockRestore()
  })
})
