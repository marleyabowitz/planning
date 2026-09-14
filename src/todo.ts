import { loadTodos, saveTodos } from './storage'

export function initTodo(container: HTMLElement): void {
  let todos = loadTodos()

  const persist = () => saveTodos(todos)

  const render = () => {
    container.innerHTML =
      todos.length === 0
        ? `<p class="todo-empty">No to-dos yet.</p>`
        : `<ul class="todo-list" role="list">
            ${todos
              .map(
                (todo) => `
              <li class="todo-item${todo.done ? ' is-done' : ''}" data-todo-id="${todo.id}">
                <label class="todo-item__label">
                  <input
                    class="todo-item__checkbox"
                    type="checkbox"
                    data-todo-toggle
                    ${todo.done ? 'checked' : ''}
                  />
                  <span class="todo-item__text">${escapeHtml(todo.text)}</span>
                </label>
                <button
                  type="button"
                  class="todo-item__remove"
                  data-todo-remove
                  aria-label="Delete to-do"
                >×</button>
              </li>`
              )
              .join('')}
          </ul>`

    container.querySelectorAll<HTMLInputElement>('[data-todo-toggle]').forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const row = checkbox.closest<HTMLElement>('[data-todo-id]')
        const id = row?.dataset.todoId
        if (!id) return
        todos = todos.map((todo) =>
          todo.id === id ? { ...todo, done: checkbox.checked } : todo
        )
        persist()
        render()
      })
    })

    container.querySelectorAll<HTMLButtonElement>('[data-todo-remove]').forEach((button) => {
      button.addEventListener('click', () => {
        const row = button.closest<HTMLElement>('[data-todo-id]')
        const id = row?.dataset.todoId
        if (!id) return
        todos = todos.filter((todo) => todo.id !== id)
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
