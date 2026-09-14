import type { ImportantDate } from './important-date'

export type LanguagesSession = {
  date: string
  time: string
}

const CLASS_TIME = '2:10–4:00'

/** No-class Thursdays (Thanksgiving). */
const NO_CLASS = new Set(['2026-11-26'])

function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Thursday class meetings, Sep 10 through Dec 10. */
function buildSessions(): LanguagesSession[] {
  const sessions: LanguagesSession[] = []
  const cursor = new Date(2026, 8, 10) // Sep 10
  const end = new Date(2026, 11, 10) // Dec 10
  cursor.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  while (cursor <= end) {
    const key = toDateKey(cursor)
    if (cursor.getDay() === 4 && !NO_CLASS.has(key)) {
      sessions.push({ date: key, time: CLASS_TIME })
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return sessions
}

export const LANGUAGES_SESSIONS: LanguagesSession[] = buildSessions()

/** Languages important dates (none added yet). */
export const LANGUAGES_DUE_DATES: ImportantDate[] = []
