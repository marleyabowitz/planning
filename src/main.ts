import './styles/global.css'
import { initCalendar } from './calendar'
import { initNav, navMarkup } from './nav'
import { initTodo } from './todo'

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  app.innerHTML = `
    <div class="site-wrap">
      ${navMarkup('home')}
      <main>
        <section class="page-section" aria-labelledby="week-heading">
          <h2 id="week-heading" class="page-section__heading">This week</h2>
          <div id="calendar-root"></div>
        </section>
        <section class="page-section" aria-labelledby="todo-heading">
          <h2 id="todo-heading" class="page-section__heading">To do</h2>
          <div id="todo-root"></div>
        </section>
      </main>
    </div>
  `

  initNav(app)

  const calendarRoot = app.querySelector<HTMLElement>('#calendar-root')
  const todoRoot = app.querySelector<HTMLElement>('#todo-root')
  if (calendarRoot) initCalendar(calendarRoot)
  if (todoRoot) initTodo(todoRoot)
}
