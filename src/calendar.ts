import {
  createId,
  loadEvents,
  saveEvents,
  type CalendarEvent,
} from './storage'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

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

function formatRange(weekStart: Date): string {
  const weekEnd = addDays(weekStart, 6)
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  const startLabel = weekStart.toLocaleDateString(undefined, opts)
  const endLabel = weekEnd.toLocaleDateString(undefined, {
    ...opts,
    year: 'numeric',
  })
  return `${startLabel} – ${endLabel}`
}

export function initCalendar(container: HTMLElement): void {
  let weekStart = startOfWeek(new Date())
  let events = loadEvents()

  const persist = () => saveEvents(events)

  const render = () => {
    const today = new Date()
    const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))

    container.innerHTML = `
      <div class="week-toolbar">
        <p class="week-toolbar__label">${formatRange(weekStart)}</p>
        <div class="week-toolbar__controls">
          <button type="button" data-week-prev aria-label="Previous week">Prev</button>
          <button type="button" data-week-today>Today</button>
          <button type="button" data-week-next aria-label="Next week">Next</button>
        </div>
      </div>
      <div class="week-grid" role="list">
        ${days
          .map((day, index) => {
            const key = toDateKey(day)
            const dayEvents = events.filter((event) => event.date === key)
            const todayClass = isSameDay(day, today) ? ' is-today' : ''
            return `
              <article class="day-column${todayClass}" role="listitem" data-date="${key}">
                <header class="day-column__header">
                  <h3 class="day-column__name">${DAY_NAMES[index]}</h3>
                  <p class="day-column__date">${day.getDate()}</p>
                </header>
                <ul class="day-column__events">
                  ${
                    dayEvents.length === 0
                      ? ''
                      : dayEvents
                          .map(
                            (event) => `
                      <li class="day-event" data-event-id="${event.id}">
                        <p class="day-event__text">${escapeHtml(event.title)}</p>
                        <button
                          type="button"
                          class="day-event__remove"
                          data-remove-event
                          aria-label="Remove event"
                        >×</button>
                      </li>`
                          )
                          .join('')
                  }
                </ul>
                <button type="button" class="day-column__add" data-add-event>Add</button>
              </article>
            `
          })
          .join('')}
      </div>
    `

    container.querySelector('[data-week-prev]')?.addEventListener('click', () => {
      weekStart = addDays(weekStart, -7)
      render()
    })

    container.querySelector('[data-week-next]')?.addEventListener('click', () => {
      weekStart = addDays(weekStart, 7)
      render()
    })

    container.querySelector('[data-week-today]')?.addEventListener('click', () => {
      weekStart = startOfWeek(new Date())
      render()
    })

    container.querySelectorAll<HTMLElement>('[data-add-event]').forEach((button) => {
      button.addEventListener('click', () => {
        const column = button.closest<HTMLElement>('[data-date]')
        const date = column?.dataset.date
        if (!date) return

        const title = window.prompt('Event title')
        if (!title || !title.trim()) return

        const event: CalendarEvent = {
          id: createId(),
          date,
          title: title.trim(),
        }
        events = [...events, event]
        persist()
        render()
      })
    })

    container.querySelectorAll<HTMLElement>('[data-remove-event]').forEach((button) => {
      button.addEventListener('click', () => {
        const row = button.closest<HTMLElement>('[data-event-id]')
        const id = row?.dataset.eventId
        if (!id) return
        events = events.filter((event) => event.id !== id)
        persist()
        render()
      })
    })
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
