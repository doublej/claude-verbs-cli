export interface VerbSet {
  name: string
  description: string
  author: string
  github: string
  language: string
  config: {
    showTurnDuration?: boolean
    spinnerVerbs: {
      mode: 'replace' | 'append'
      verbs: string[]
    }
  }
}

export interface ClaudeSettings {
  $schema?: string
  showTurnDuration?: boolean
  spinnerVerbs?: {
    mode: 'replace' | 'append'
    verbs: string[]
  }
  [key: string]: unknown
}
