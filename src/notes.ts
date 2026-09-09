import './styles/global.css'
import { initNav, navMarkup } from './nav'

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  app.innerHTML = `
    <div class="site-wrap">
      ${navMarkup('notes')}
      <main>
        <section class="page-section" aria-labelledby="notes-heading">
          <h2 id="notes-heading" class="page-section__heading">Notes</h2>
          <p class="page-section__lede notes-placeholder">
            This page will hold notes. Coming soon.
          </p>
        </section>
      </main>
    </div>
  `

  initNav(app)
}
