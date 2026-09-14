import type { ImportantDate } from './important-date'

export type ProbabilitySession = {
  date: string
  time: string
}

const CLASS_TIME = '4:10–5:25'

/** Academic holidays / no-class days for Fall 2026 Mon–Wed courses. */
const NO_CLASS = new Set([
  '2026-09-07', // Labor Day
  '2026-11-02', // Academic holiday
  '2026-11-25', // Academic holiday
])

/** Assessment days already shown as PROBABILITY: Midterm / Final — skip class blocks. */
const ASSESSMENT_DAYS = new Set(['2026-11-04', '2026-12-09'])

function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Mon/Wed class meetings through Dec 10 (holidays + assessment days excluded). */
function buildSessions(): ProbabilitySession[] {
  const sessions: ProbabilitySession[] = []
  const cursor = new Date(2026, 8, 9) // Sep 9
  const end = new Date(2026, 11, 10) // Dec 10
  cursor.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  while (cursor <= end) {
    const key = toDateKey(cursor)
    const day = cursor.getDay()
    if (
      (day === 1 || day === 3) &&
      !NO_CLASS.has(key) &&
      !ASSESSMENT_DAYS.has(key)
    ) {
      sessions.push({ date: key, time: CLASS_TIME })
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return sessions
}

export const PROBABILITY_SESSIONS: ProbabilitySession[] = buildSessions()

/** Probability important dates (plain labels for the course page). */
export const PROBABILITY_DUE_DATES: ImportantDate[] = [
  { date: '2026-09-18', label: 'Problem set 1' },
  { date: '2026-11-04', label: 'Midterm (tentative) · 25%' },
  { date: '2026-12-09', label: 'Final Exam (Dec 9 & 14) · 35%' },
]
