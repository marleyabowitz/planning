import { ALGOS_DUE_DATES, ALGOS_SESSIONS } from './data/algos-schedule'
import { AI_SESSIONS } from './data/ai-schedule'
import {
  STATIC_CALENDAR_EVENTS,
  type EventCategory,
  type EventDetail,
} from './data/calendar-events'
import { LANGUAGES_SESSIONS } from './data/languages-schedule'
import { OH_SESSIONS } from './data/oh-schedule'
import { PROBABILITY_SESSIONS } from './data/probability-schedule'
import { loadEvents, saveEvents, type CalendarEvent } from './storage'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
const MONTH_DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

const COURSE_TITLE_PREFIXES = new Set([
  'algos',
  'ai',
  'probability',
  'languages',
  'cantor',
  'oh',
  'pdl',
  'birthday',
])

type CalendarView = 'week' | 'month'

type DisplayEvent = {
  id: string
  date: string
  title: string
  removable: boolean
  category: EventCategory
  detail?: EventDetail
}

function startOfWeek(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day
  result.setDate(result.getDate() + diff)
  return result
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function isSameDay(a: Date, b: Date): boolean {
  return toDateKey(a) === toDateKey(b)
}

function startOfMonth(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  result.setDate(1)
  return result
}

function endOfMonth(date: Date): Date {
  const result = startOfMonth(date)
  result.setMonth(result.getMonth() + 1, 0)
  return result
}

function monthGridStart(date: Date): Date {
  return startOfWeek(startOfMonth(date))
}

function monthGridEnd(date: Date): Date {
  return addDays(startOfWeek(endOfMonth(date)), 6)
}

function formatMonth(date: Date): string {
  return date.toLocaleDateString(undefined, {
    month: 'long',
  })
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

function eventCategory(title: string): EventCategory {
  const normalized = title.trim().toLowerCase()

  if (normalized.startsWith('algos')) return 'algos'
  if (normalized.startsWith('oh')) return 'oh'
  if (normalized.startsWith('ai')) return 'ai'
  if (normalized.startsWith('probability')) return 'probability'
  if (normalized.startsWith('languages')) return 'languages'
  if (normalized.startsWith('due date')) return 'due-dates'
  if (normalized.startsWith('cantor')) return 'cantor'
  if (normalized.startsWith('birthday')) return 'birthdays'
  if (normalized.startsWith('holiday')) return 'holidays'
  if (normalized.startsWith('other')) return 'other'
  return 'other'
}

function isCoursePrefix(value: string): boolean {
  return COURSE_TITLE_PREFIXES.has(value.trim().toLowerCase())
}

function algosDisplayEvents(): DisplayEvent[] {
  return ALGOS_SESSIONS.filter((session) => !session.assessment).map((session) => ({
    id: `algos-${session.date}`,
    date: session.date,
    title: `Algos ${session.time}`,
    removable: false,
    category: 'algos',
    detail: {
      topic: session.topic,
      time: session.time,
      readings: session.readings ?? 'None listed',
      homework: session.homework ?? 'None listed',
      assessment: session.assessment,
    },
  }))
}

function algosDueDisplayEvents(): DisplayEvent[] {
  const time = '8:40–9:55am'
  return ALGOS_DUE_DATES.map((item) => ({
    id: `algos-due-${item.date}-${item.label}`,
    date: item.date,
    title: `ALGOS: ${item.label} ${time}`,
    removable: false,
    category: 'due-dates',
    detail: {
      assessment: item.label,
      time,
    },
  }))
}

function aiDisplayEvents(): DisplayEvent[] {
  return AI_SESSIONS.filter((session) => !session.assessment).map((session) => ({
    id: `ai-${session.date}`,
    date: session.date,
    title: `AI ${session.time}`,
    removable: false,
    category: 'ai',
    detail: {
      topic: session.topic,
      time: session.time,
    },
  }))
}

function probabilityDisplayEvents(): DisplayEvent[] {
  return PROBABILITY_SESSIONS.map((session) => ({
    id: `probability-${session.date}`,
    date: session.date,
    title: `Probability ${session.time}`,
    removable: false,
    category: 'probability',
    detail: {
      topic: 'Probability class',
      time: session.time,
    },
  }))
}

function languagesDisplayEvents(): DisplayEvent[] {
  return LANGUAGES_SESSIONS.map((session) => ({
    id: `languages-${session.date}`,
    date: session.date,
    title: `Languages ${session.time}`,
    removable: false,
    category: 'languages',
    detail: {
      topic: 'Languages class',
      time: session.time,
    },
  }))
}

function ohDisplayEvents(): DisplayEvent[] {
  return OH_SESSIONS.map((session) => ({
    id: `oh-${session.date}`,
    date: session.date,
    title: `OH ${session.time}`,
    removable: false,
    category: 'oh',
    detail: {
      topic: 'Office hours',
      time: session.time,
    },
  }))
}

function staticDisplayEvents(): DisplayEvent[] {
  return STATIC_CALENDAR_EVENTS.map((event) => ({
    id: event.id,
    date: event.date,
    title: titleWithTime(event.title, event.detail?.time),
    removable: false,
    category: event.category,
    detail: event.detail,
  }))
}

function userDisplayEvents(events: CalendarEvent[]): DisplayEvent[] {
  return events.map((event) => ({
    id: event.id,
    date: event.date,
    title: event.title,
    removable: true,
    category: eventCategory(event.title),
  }))
}

/** Append time to a short title when not already present. */
function titleWithTime(title: string, time?: string): string {
  if (!time || title.includes(time)) return title
  return `${title} ${time}`
}

/** Parse the earliest start time in a string to minutes since midnight. */
function parseStartMinutes(text: string): number | null {
  const normalized = text.replace(/[–—]/g, '-')

  const toMinutes = (hoursRaw: number, minutes: number, periodRaw: string): number => {
    let hours = hoursRaw
    const period = periodRaw.toLowerCase().replace(/\./g, '')
    if (period.startsWith('p') && hours < 12) hours += 12
    else if (period.startsWith('a') && hours === 12) hours = 0
    else if (!period && hours >= 1 && hours <= 6) hours += 12
    return hours * 60 + minutes
  }

  // 8:40am, 11:40, 10:30 AM
  const clock = normalized.match(/(\d{1,2}):(\d{2})\s*(a\.?m\.?|p\.?m\.?)?/i)
  if (clock) {
    let period = clock[3] ?? ''
    if (!period) {
      const rest = normalized.slice(clock.index! + clock[0].length)
      const later = rest.match(/\b(a\.?m\.?|p\.?m\.?)\b/i)
      if (later) period = later[1]
    }
    return toMinutes(Number(clock[1]), Number(clock[2]), period)
  }

  // 4 PM, 10 AM
  const hourPeriod = normalized.match(/\b(\d{1,2})\s*(a\.?m\.?|p\.?m\.?)\b/i)
  if (hourPeriod) {
    return toMinutes(Number(hourPeriod[1]), 0, hourPeriod[2])
  }

  // 12-1 PM, 1-2 PM, 2-4 PM
  const range = normalized.match(/\b(\d{1,2})\s*-\s*(\d{1,2})\s*(a\.?m\.?|p\.?m\.?)?/i)
  if (range) {
    return toMinutes(Number(range[1]), 0, range[3] ?? '')
  }

  return null
}

function eventStartMinutes(event: DisplayEvent): number {
  const fromDetail = event.detail?.time ? parseStartMinutes(event.detail.time) : null
  if (fromDetail !== null) return fromDetail
  const fromTitle = parseStartMinutes(event.title)
  if (fromTitle !== null) return fromTitle
  return Number.MAX_SAFE_INTEGER
}

function eventsForDay(allEvents: DisplayEvent[], dateKey: string): DisplayEvent[] {
  return allEvents
    .filter((event) => event.date === dateKey)
    .sort((a, b) => {
      const diff = eventStartMinutes(a) - eventStartMinutes(b)
      if (diff !== 0) return diff
      return a.title.localeCompare(b.title)
    })
}

/** Bold the course/category name in calendar entry titles only. */
function eventTitleMarkup(title: string): string {
  const withColon = title.match(/^([^:]+):\s*(.*)$/)
  if (withColon && isCoursePrefix(withColon[1])) {
    return `<strong>${escapeHtml(withColon[1])}</strong>: ${escapeHtml(withColon[2])}`
  }

  const withSpace = title.match(/^(\S+)\s+(.*)$/)
  if (withSpace && isCoursePrefix(withSpace[1])) {
    return `<strong>${escapeHtml(withSpace[1])}</strong> ${escapeHtml(withSpace[2])}`
  }

  return escapeHtml(title)
}

function detailMarkup(detail: EventDetail): string {
  const rows: string[] = []
  if (detail.topic) {
    rows.push(`<p><strong>Topic</strong> ${escapeHtml(detail.topic)}</p>`)
  }
  if (detail.time) {
    rows.push(`<p><strong>Time</strong> ${escapeHtml(detail.time)}</p>`)
  }
  if (detail.location) {
    rows.push(`<p><strong>Location</strong> ${escapeHtml(detail.location)}</p>`)
  }
  if (detail.assessment) {
    rows.push(`<p><strong>Assessment</strong> ${escapeHtml(detail.assessment)}</p>`)
  }
  if (detail.homework !== undefined) {
    rows.push(`<p><strong>Homework</strong> ${escapeHtml(detail.homework)}</p>`)
  }
  if (detail.readings !== undefined) {
    rows.push(`<p><strong>Readings</strong> ${escapeHtml(detail.readings)}</p>`)
  }
  if (detail.note) {
    rows.push(`<p><strong>Note</strong> ${escapeHtml(detail.note)}</p>`)
  }
  return rows.length > 0 ? rows.join('') : `<p>No details.</p>`
}

function eventBubbleMarkup(event: DisplayEvent, kind: 'day' | 'month'): string {
  const base = kind === 'day' ? 'day-event' : 'month-event'
  const textTag = kind === 'day' ? 'p' : 'span'
  const textClass = `${base}__text`
  const action = event.removable
    ? ` data-edit-event="${event.id}"`
    : event.detail
      ? ` data-open-event="${event.id}"`
      : ''
  const clickable = action ? ` ${base}--clickable` : ''
  return `
    <li${action} class="${base}${clickable} ${base}--${event.category}" data-event-id="${event.id}">
      <${textTag} class="${textClass}">${eventTitleMarkup(event.title)}</${textTag}>
    </li>`
}

function newEventId(): string {
  return `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function initCalendar(container: HTMLElement): void {
  let weekStart = startOfWeek(new Date())
  let monthStart = startOfMonth(new Date())
  let view: CalendarView = 'week'
  let events = loadEvents()
  let editingId: string | null = null

  const persist = () => saveEvents(events)

  const closeDetail = () => {
    container.querySelector<HTMLDialogElement>('[data-event-detail]')?.close()
  }

  const closeForm = () => {
    editingId = null
    container.querySelector<HTMLDialogElement>('[data-event-form]')?.close()
  }

  const openDetail = (event: DisplayEvent) => {
    if (!event.detail) return
    const dialog = container.querySelector<HTMLDialogElement>('[data-event-detail]')
    const body = container.querySelector<HTMLElement>('[data-event-detail-body]')
    const title = container.querySelector<HTMLElement>('[data-event-detail-title]')
    if (!dialog || !body || !title) return
    title.textContent = event.title
    body.innerHTML = detailMarkup(event.detail)
    dialog.showModal()
  }

  const openForm = (opts: { date: string; id?: string; title?: string }) => {
    const dialog = container.querySelector<HTMLDialogElement>('[data-event-form]')
    const formTitle = container.querySelector<HTMLElement>('[data-event-form-title]')
    const dateInput = container.querySelector<HTMLInputElement>('[data-event-form-date]')
    const titleInput = container.querySelector<HTMLInputElement>('[data-event-form-title-input]')
    const deleteBtn = container.querySelector<HTMLButtonElement>('[data-event-form-delete]')
    if (!dialog || !formTitle || !dateInput || !titleInput || !deleteBtn) return

    editingId = opts.id ?? null
    formTitle.textContent = editingId ? 'Edit event' : 'Add event'
    dateInput.value = opts.date
    titleInput.value = opts.title ?? ''
    deleteBtn.hidden = !editingId
    dialog.showModal()
    titleInput.focus()
  }

  const render = () => {
    const today = new Date()
    const allEvents = [
      ...algosDisplayEvents(),
      ...algosDueDisplayEvents(),
      ...aiDisplayEvents(),
      ...probabilityDisplayEvents(),
      ...languagesDisplayEvents(),
      ...staticDisplayEvents(),
      ...ohDisplayEvents(),
      ...userDisplayEvents(events),
    ]
    const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))
    const monthDays = Array.from(
      {
        length:
          Math.round(
            (monthGridEnd(monthStart).getTime() - monthGridStart(monthStart).getTime()) /
              86_400_000
          ) + 1,
      },
      (_, index) => addDays(monthGridStart(monthStart), index)
    )

    container.innerHTML = `
      <div class="week-toolbar">
        <div class="week-toolbar__leading">
          <p class="week-toolbar__label">${
            view === 'week' ? formatMonth(weekStart) : formatMonth(monthStart)
          }</p>
          <button
            type="button"
            class="calendar-view-toggle"
            data-calendar-view-toggle
            aria-expanded="${view === 'month'}"
            aria-label="${view === 'week' ? 'Expand to month view' : 'Collapse to week view'}"
          >
            <span class="calendar-view-toggle__label">${view === 'week' ? 'Month' : 'Week'}</span>
            <span class="calendar-view-toggle__chevron" aria-hidden="true"></span>
          </button>
        </div>
        <div class="week-toolbar__controls">
          <button type="button" data-week-prev aria-label="Backward">←</button>
          <button type="button" data-week-today>Today</button>
          <button type="button" data-week-next aria-label="Forward">→</button>
        </div>
      </div>
      ${
        view === 'week'
          ? `<div class="week-grid" role="list">
        ${weekDays
          .map((day, index) => {
            const key = toDateKey(day)
            const dayEvents = eventsForDay(allEvents, key)
            const todayClass = isSameDay(day, today) ? ' is-today' : ''
            return `
              <article class="day-column${todayClass}" role="listitem" data-date="${key}">
                <header class="day-column__header">
                  <h3 class="day-column__name">${DAY_NAMES[index]}</h3>
                  <div class="day-column__meta">
                    <p class="day-column__date">${day.getDate()}</p>
                    <button type="button" class="day-add" data-add-event="${key}" aria-label="Add event">+</button>
                  </div>
                </header>
                <ul class="day-column__events">
                  ${dayEvents.map((event) => eventBubbleMarkup(event, 'day')).join('')}
                </ul>
              </article>
            `
          })
          .join('')}
      </div>`
          : `<div class="month-grid">
        ${MONTH_DAY_NAMES.map((name) => `<p class="month-grid__day-name">${name}</p>`).join('')}
        ${monthDays
          .map((day) => {
            const key = toDateKey(day)
            const dayEvents = eventsForDay(allEvents, key)
            const todayClass = isSameDay(day, today) ? ' is-today' : ''
            const outsideMonthClass = isSameMonth(day, monthStart) ? '' : ' is-outside-month'
            return `
              <article class="month-day${todayClass}${outsideMonthClass}" data-date="${key}">
                <header class="month-day__header">
                  <p class="month-day__date">${day.getDate()}</p>
                  <button type="button" class="day-add" data-add-event="${key}" aria-label="Add event">+</button>
                </header>
                <ul class="month-day__events">
                  ${dayEvents.map((event) => eventBubbleMarkup(event, 'month')).join('')}
                </ul>
              </article>
            `
          })
          .join('')}
      </div>`
      }
      <dialog class="event-detail" data-event-detail>
        <form method="dialog" class="event-detail__bar">
          <h3 class="event-detail__title" data-event-detail-title></h3>
          <button type="submit" class="event-detail__close" aria-label="Close">×</button>
        </form>
        <div class="event-detail__body" data-event-detail-body></div>
      </dialog>
      <dialog class="event-form" data-event-form>
        <form data-event-form-fields>
          <h3 class="event-form__title" data-event-form-title>Add event</h3>
          <div class="event-form__fields">
            <label class="event-form__label">
              Date
              <input class="event-form__input" type="date" required data-event-form-date />
            </label>
            <label class="event-form__label">
              Title
              <input
                class="event-form__input"
                type="text"
                required
                maxlength="120"
                placeholder="e.g. Other — errands"
                data-event-form-title-input
              />
            </label>
          </div>
          <div class="event-form__actions">
            <button type="submit">Save</button>
            <button type="button" data-event-form-cancel>Cancel</button>
            <span class="event-form__spacer"></span>
            <button type="button" class="event-form__danger" data-event-form-delete hidden>Delete</button>
          </div>
        </form>
      </dialog>
    `

    container.querySelector('[data-week-prev]')?.addEventListener('click', () => {
      if (view === 'week') {
        weekStart = addDays(weekStart, -7)
      } else {
        monthStart.setMonth(monthStart.getMonth() - 1)
        monthStart = startOfMonth(monthStart)
      }
      render()
    })

    container.querySelector('[data-week-next]')?.addEventListener('click', () => {
      if (view === 'week') {
        weekStart = addDays(weekStart, 7)
      } else {
        monthStart.setMonth(monthStart.getMonth() + 1)
        monthStart = startOfMonth(monthStart)
      }
      render()
    })

    container.querySelector('[data-week-today]')?.addEventListener('click', () => {
      weekStart = startOfWeek(new Date())
      monthStart = startOfMonth(new Date())
      render()
    })

    container.querySelector('[data-calendar-view-toggle]')?.addEventListener('click', () => {
      if (view === 'week') {
        monthStart = startOfMonth(weekStart)
        view = 'month'
      } else {
        weekStart = startOfWeek(monthStart)
        view = 'week'
      }
      render()
    })

    container.querySelectorAll<HTMLElement>('[data-add-event]').forEach((button) => {
      button.addEventListener('click', () => {
        const date = button.dataset.addEvent
        if (!date) return
        openForm({ date })
      })
    })

    container.querySelectorAll<HTMLElement>('[data-edit-event]').forEach((row) => {
      row.addEventListener('click', () => {
        const id = row.dataset.editEvent
        const event = events.find((item) => item.id === id)
        if (!event) return
        openForm({ id: event.id, date: event.date, title: event.title })
      })
    })

    container.querySelectorAll<HTMLElement>('[data-open-event]').forEach((row) => {
      row.addEventListener('click', () => {
        const id = row.dataset.openEvent
        const event = allEvents.find((item) => item.id === id)
        if (event) openDetail(event)
      })
    })

    const form = container.querySelector<HTMLFormElement>('[data-event-form-fields]')
    form?.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault()
      const dateInput = container.querySelector<HTMLInputElement>('[data-event-form-date]')
      const titleInput = container.querySelector<HTMLInputElement>('[data-event-form-title-input]')
      if (!dateInput || !titleInput) return

      const date = dateInput.value
      const title = titleInput.value.trim()
      if (!date || !title) return

      if (editingId) {
        events = events.map((event) =>
          event.id === editingId ? { ...event, date, title } : event
        )
      } else {
        events = [...events, { id: newEventId(), date, title }]
      }
      persist()
      closeForm()
      render()
    })

    container.querySelector('[data-event-form-cancel]')?.addEventListener('click', () => {
      closeForm()
    })

    container.querySelector('[data-event-form-delete]')?.addEventListener('click', () => {
      if (!editingId) return
      events = events.filter((event) => event.id !== editingId)
      persist()
      closeForm()
      render()
    })

    const bindBackdropClose = (selector: string, onClose: () => void) => {
      container.querySelector<HTMLDialogElement>(selector)?.addEventListener('click', (clickEvent) => {
        const dialog = clickEvent.currentTarget as HTMLDialogElement
        if (clickEvent.target === dialog) onClose()
      })
    }

    bindBackdropClose('[data-event-detail]', closeDetail)
    bindBackdropClose('[data-event-form]', closeForm)
  }

  render()
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
