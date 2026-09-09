const PREFIX = 'planning:'

export type CalendarEvent = {
  id: string
  date: string
  title: string
}

export type TodoItem = {
  id: string
  text: string
  done: boolean
}

type StorageMap = {
  events: CalendarEvent[]
  todos: TodoItem[]
}

function key(name: keyof StorageMap): string {
  return `${PREFIX}${name}`
}

function read<K extends keyof StorageMap>(name: K, fallback: StorageMap[K]): StorageMap[K] {
  try {
    const raw = localStorage.getItem(key(name))
    if (!raw) return fallback
    return JSON.parse(raw) as StorageMap[K]
  } catch {
    return fallback
  }
}

function write<K extends keyof StorageMap>(name: K, value: StorageMap[K]): void {
  localStorage.setItem(key(name), JSON.stringify(value))
}

export function loadEvents(): CalendarEvent[] {
  return read('events', [])
}

export function saveEvents(events: CalendarEvent[]): void {
  write('events', events)
}

export function loadTodos(): TodoItem[] {
  return read('todos', [])
}

export function saveTodos(todos: TodoItem[]): void {
  write('todos', todos)
}

export function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}
