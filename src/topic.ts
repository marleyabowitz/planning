import './styles/global.css'
import { initNav, navMarkup, TOPIC_PAGES, type NavPage } from './nav'

const app = document.querySelector<HTMLDivElement>('#app')
const topicId = app?.dataset.topic as NavPage | undefined
const topic = TOPIC_PAGES.find((page) => page.id === topicId)

if (app && topic) {
  app.innerHTML = `
    <div class="site-wrap">
      ${navMarkup(topic.id)}
      <main>
        <section class="page-section" aria-labelledby="topic-heading">
          <h2 id="topic-heading" class="page-section__heading">${topic.label}</h2>
          <p class="page-section__lede notes-placeholder">
            Coming soon.
          </p>
        </section>
      </main>
    </div>
  `

  initNav(app)
}
