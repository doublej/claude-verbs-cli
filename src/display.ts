const SITE_URL = 'https://claudeverbs.com'

const BANNER = `    _              _                     _
 __| |__ _ _  _ __| |___ _____ _____ _ _| |__ ___
/ _| / _\` | || / _\` / -_)___\\ V / -_) '_| '_ (_-<
\\__|_\\__,_|\\_,_\\__,_\\___|    \\_/\\___|_| |_.__/__/`

export function banner(): string {
  return `\n${BANNER}\n`
}

export function heading(text: string): string {
  const line = '─'.repeat(text.length + 2)
  return `┌${line}┐\n│ ${text} │\n└${line}┘`
}

export function footer(): string {
  return `\n  Browse more sets at ${SITE_URL}`
}

export function success(text: string): string {
  return `  ✓ ${text}`
}

export function hint(text: string): string {
  return `  → ${text}`
}

export function verbList(verbs: string[], columns = 3): string {
  const maxLen = Math.max(...verbs.map((v) => v.length))
  const pad = maxLen + 4
  const lines: string[] = []
  for (let i = 0; i < verbs.length; i += columns) {
    const row = verbs
      .slice(i, i + columns)
      .map((v) => v.padEnd(pad))
      .join('')
    lines.push(`  ${row.trimEnd()}`)
  }
  return lines.join('\n')
}
