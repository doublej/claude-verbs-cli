import { readFile, readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import type { VerbSet } from './types.js'

const setsDir = resolve(import.meta.dirname, '..', 'sets')

export async function loadSets(): Promise<VerbSet[]> {
  const entries = await readdir(setsDir, { withFileTypes: true })
  const langDirs = entries.filter((e) => e.isDirectory() && !e.name.startsWith('_'))
  const sets = await Promise.all(langDirs.map((d) => loadLangSets(d.name)))
  return sets.flat()
}

async function loadLangSets(language: string): Promise<VerbSet[]> {
  const dir = join(setsDir, language)
  const files = await readdir(dir)
  const jsonFiles = files.filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  return Promise.all(jsonFiles.map((f) => loadSet(join(dir, f), language)))
}

async function loadSet(path: string, language: string): Promise<VerbSet> {
  const raw = await readFile(path, 'utf-8')
  const data = JSON.parse(raw) as Omit<VerbSet, 'language'>
  return { ...data, language }
}

export async function findSet(name: string): Promise<VerbSet | undefined> {
  const sets = await loadSets()
  return sets.find((s) => s.name === name)
}
