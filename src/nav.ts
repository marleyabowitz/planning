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

export function navMarkup(current: 'home' | 'notes'): string {
  const homeCurrent = current === 'home' ? ' aria-current="page"' : ''
  const notesCurrent = current === 'notes' ? ' aria-current="page"' : ''

  return `
    <header class="site-header">
      <h1 class="site-title"><a href="./">Planning</a></h1>
      <nav class="site-nav" data-nav aria-label="Primary">
        <button
          type="button"
          class="site-nav__toggle"
          data-nav-toggle
          aria-expanded="false"
          aria-controls="site-menu"
        >
          Menu
          <span class="site-nav__chevron" aria-hidden="true"></span>
        </button>
        <ul class="site-nav__menu" id="site-menu" data-nav-menu role="list">
          <li><a class="site-nav__link" href="./"${homeCurrent}>Home</a></li>
          <li><a class="site-nav__link" href="./notes.html"${notesCurrent}>Notes</a></li>
        </ul>
      </nav>
    </header>
  `
}
