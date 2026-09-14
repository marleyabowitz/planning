import './styles/global.css'
import { ALGOS_DUE_DATES } from './data/algos-schedule'
import { ALGOS_NOTES_LATEX } from './data/algos-notes'
import { initNav, navMarkup } from './nav'

declare global {
  interface Window {
    renderMathInElement?: (
      element: HTMLElement,
      options: {
        delimiters: { left: string; right: string; display: boolean }[]
        throwOnError: boolean
      },
    ) => void
  }
}

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

function paintNotes(container: HTMLElement): void {
  const trimmed = ALGOS_NOTES_LATEX.trim()
  if (!trimmed) {
    container.innerHTML = `<p class="notes-placeholder">No notes yet.</p>`
    return
  }

  container.textContent = trimmed
  window.renderMathInElement?.(container, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '\\[', right: '\\]', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
    ],
    throwOnError: false,
  })
}

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  const upcoming = ALGOS_DUE_DATES.filter((item) => item.date >= todayKey())

  app.innerHTML = `
    <div class="site-wrap">
      ${navMarkup('algos')}
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
        <section class="page-section" aria-labelledby="notes-heading">
          <h2 id="notes-heading" class="page-section__heading">Notes</h2>
          <div class="notes-body" data-notes-body></div>
        </section>
      </main>
    </div>
  `

  initNav(app)

  const notesBody = app.querySelector<HTMLElement>('[data-notes-body]')
  if (notesBody) {
    paintNotes(notesBody)
    if (!window.renderMathInElement) {
      window.addEventListener('load', () => paintNotes(notesBody), { once: true })
    }
  }
}
