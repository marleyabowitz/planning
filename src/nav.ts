export const TOPIC_PAGES = [
  { id: 'algos', label: 'Algos', href: './algos.html' },
  { id: 'probability', label: 'Probability', href: './probability.html' },
  { id: 'ai', label: 'AI', href: './ai.html' },
  { id: 'languages', label: 'Languages', href: './languages.html' },
  { id: 'bc1014', label: 'BC1014', href: './bc1014.html' },
  { id: 'cantor', label: 'Cantor', href: './cantor.html' },
  { id: 'career', label: 'Career', href: './career.html' },
] as const

export type NavPage = 'home' | (typeof TOPIC_PAGES)[number]['id']

export function initNav(root: ParentNode = document): void {
  const nav = root.querySelector<HTMLElement>('[data-nav]')
  if (!nav) return

  const toggle = nav.querySelector<HTMLButtonElement>('[data-nav-toggle]')
  const menu = nav.querySelector<HTMLElement>('[data-nav-menu]')
  if (!toggle || !menu) return

  const setOpen = (open: boolean) => {
    nav.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
  }

  toggle.addEventListener('click', (event) => {
    event.stopPropagation()
    setOpen(!nav.classList.contains('is-open'))
  })

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target as Node)) {
      setOpen(false)
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false)
      toggle.focus()
    }
  })

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false))
  })
}

function formatToday(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function navMarkup(current: NavPage): string {
  const homeCurrent = current === 'home' ? ' aria-current="page"' : ''
  const topicLinks = TOPIC_PAGES.map((page) => {
    const currentAttr = current === page.id ? ' aria-current="page"' : ''
    return `<li><a class="site-nav__link" href="${page.href}"${currentAttr}>${page.label}</a></li>`
  }).join('')

  return `
    <header class="site-header">
      <p class="site-date">${formatToday()}</p>
      <nav class="site-nav" data-nav aria-label="Primary">
        <button
          type="button"
          class="site-nav__toggle"
          data-nav-toggle
          aria-expanded="false"
          aria-controls="site-menu"
          aria-label="Menu"
        >
          <span class="site-nav__chevron" aria-hidden="true"></span>
        </button>
        <ul class="site-nav__menu" id="site-menu" data-nav-menu role="list">
          <li><a class="site-nav__link" href="./"${homeCurrent}>Home</a></li>
          ${topicLinks}
        </ul>
      </nav>
    </header>
  `
}
