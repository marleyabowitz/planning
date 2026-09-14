import type { ImportantDate } from './important-date'

export type AiSession = {
  date: string
  time: string
  topic: string
  assessment?: string
}

const CLASS_TIME = '11:40–12:55'

/** AI lecture sessions, Fall 2026. */
export const AI_SESSIONS: AiSession[] = [
  { date: '2026-09-08', time: CLASS_TIME, topic: 'Class' },
  { date: '2026-09-10', time: CLASS_TIME, topic: 'Class' },
  { date: '2026-09-15', time: CLASS_TIME, topic: 'Uninformed Search (BFS, DFS, UCS)' },
  { date: '2026-09-17', time: CLASS_TIME, topic: 'Informed Search (A*, heuristics)' },
  { date: '2026-09-22', time: CLASS_TIME, topic: 'Local & Stochastic Search' },
  { date: '2026-09-24', time: CLASS_TIME, topic: 'Adversarial Search / Game Playing' },
  { date: '2026-09-29', time: CLASS_TIME, topic: 'Constraint Satisfaction Problems' },
  { date: '2026-10-01', time: CLASS_TIME, topic: 'Bayesian Networks' },
  { date: '2026-10-06', time: CLASS_TIME, topic: 'ML Basics I' },
  {
    date: '2026-10-08',
    time: CLASS_TIME,
    topic: 'Exam 1 — GOFAI',
    assessment: 'Exam 1',
  },
  { date: '2026-10-13', time: CLASS_TIME, topic: 'ML Basics II' },
  { date: '2026-10-15', time: CLASS_TIME, topic: 'Advanced ML (Ensembles)' },
  { date: '2026-10-20', time: CLASS_TIME, topic: 'Deep Learning Architectures' },
  { date: '2026-10-22', time: CLASS_TIME, topic: 'Convolutional Neural Networks' },
  { date: '2026-10-27', time: CLASS_TIME, topic: 'Attention & Transformers I' },
  { date: '2026-10-29', time: CLASS_TIME, topic: 'Attention & Transformers II' },
  { date: '2026-11-05', time: CLASS_TIME, topic: 'Foundation Models & LLMs' },
  { date: '2026-11-10', time: CLASS_TIME, topic: 'Multimodal Learning & RAG' },
  {
    date: '2026-11-12',
    time: CLASS_TIME,
    topic: 'Exam 2 — Machine Learning',
    assessment: 'Exam 2',
  },
  {
    date: '2026-11-17',
    time: CLASS_TIME,
    topic: 'Reinforcement Learning (MDPs, RLHF, MCTS)',
  },
  { date: '2026-11-19', time: CLASS_TIME, topic: 'Agentic AI I' },
  { date: '2026-11-24', time: CLASS_TIME, topic: 'Agentic AI II' },
  { date: '2026-12-01', time: CLASS_TIME, topic: 'Ethical & Responsible AI I' },
  { date: '2026-12-03', time: CLASS_TIME, topic: 'Ethical & Responsible AI II' },
  { date: '2026-12-08', time: CLASS_TIME, topic: 'Conclusion of the course' },
  {
    date: '2026-12-10',
    time: CLASS_TIME,
    topic: 'Exam 3 — Modern AI Systems',
    assessment: 'Exam 3',
  },
]

/** AI important dates (plain labels for the course page). */
export const AI_DUE_DATES: ImportantDate[] = [
  { date: '2026-10-08', label: 'Exam 1 — GOFAI' },
  { date: '2026-11-12', label: 'Exam 2 — Machine Learning' },
  { date: '2026-12-10', label: 'Exam 3 — Modern AI Systems' },
]
