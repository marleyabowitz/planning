import { initNav, navMarkup, type NavPage } from './nav'
import type { ImportantDate } from './data/important-date'

function todayKey(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDueDate(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

/** Important Dates section only (no notes). */
export function mountDatesPage(page: NavPage, dates: ImportantDate[]): void {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  const upcoming = dates.filter((item) => item.date >= todayKey())

  app.innerHTML = `
    <div class="site-wrap">
      ${navMarkup(page)}
      <main>
        <section class="page-section" aria-labelledby="due-heading">
          <h2 id="due-heading" class="page-section__heading">Important Dates</h2>
          ${
            upcoming.length === 0
              ? `<p class="notes-placeholder">No upcoming important dates.</p>`
              : `<ul class="due-list">
            ${upcoming
              .map(
                (item) => `
              <li class="due-list__item">
                <span class="due-list__date">${formatDueDate(item.date)}</span>
                <span class="due-list__label">${item.label}</span>
              </li>`,
              )
              .join('')}
          </ul>`
          }
        </section>
      </main>
    </div>
  `

  initNav(app)
}
