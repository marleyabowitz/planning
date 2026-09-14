# Calendar event colors

When adding calendar events (titles stored in `planning:events` / `CalendarEvent.title`), **start the title with the category name** so the Home calendar picks the right bubble color. Matching is case-insensitive prefix match in `src/calendar.ts`.

| Category | Title must start with | Bubble color |
|----------|----------------------|--------------|
| Algos | `Algos` | `#462035` |
| OH | `OH` | `#945c34` |
| AI | `AI` | `#4d7aae` |
| Probability | `Probability` | `#303baa` |
| Languages | `Languages` | `#5c3014` |
| Due Dates | `Due date` | `#ba1c63` |
| Cantor | `Cantor` | `#23385c` |
| Birthdays | `Birthday` | `#f6d0da` |
| Holidays | `Holiday` | `#878533` |
| Other | `Other` (or any unmatched title) | `#f3c129` |

Built-in schedules (not removable in the UI): Algos sessions from `src/data/algos-schedule.ts`; OH Mon/Wed `10:30–13:30` from the week of 2026-09-15 through 2026-12-08 in `src/data/oh-schedule.ts`.

## Examples

- `Algos 10:00–11:15`
- `OH 10:30–13:30`
- `AI office hours`
- `Probability HW due`
- `Languages practice`
- `Due date: essay`
- `Cantor seminar`
- `Birthday — Sam`
- `Holiday — Labor Day`
- `Other — errands`

Do not invent other color systems in client code without updating this table and the CSS classes in `src/styles/global.css` (`day-event--*`, `month-event--*`).
