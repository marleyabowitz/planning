/** Office hours Wednesdays 1–3 PM, week of 2026-09-15 through 2026-12-08. */

export type OhSession = {
  date: string
  time: string
}

const OH_TIME = '1–3 PM'
const START = new Date(2026, 8, 14) // Mon of week containing Sept 15
const END = new Date(2026, 11, 8) // Dec 8

function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function buildOhSessions(): OhSession[] {
  const sessions: OhSession[] = []
  const cursor = new Date(START)
  cursor.setHours(0, 0, 0, 0)

  while (cursor <= END) {
    if (cursor.getDay() === 3) {
      sessions.push({ date: toDateKey(cursor), time: OH_TIME })
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return sessions
}

export const OH_SESSIONS: OhSession[] = buildOhSessions()
