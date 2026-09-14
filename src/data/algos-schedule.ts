/** COMS Analysis of Algorithms I, Fall 2026 — from course lectures page. */
export type AlgosSession = {
  date: string
  time: string
  topic: string
  readings?: string
  homework?: string
  assessment?: string
}

const CLASS_TIME = '8:40–9:55am'

export const ALGOS_SESSIONS: AlgosSession[] = [
  {
    date: '2026-09-09',
    time: CLASS_TIME,
    topic:
      'Introduction, Class overview, RAM model, Worst-case complexity, Insertion sort, and Asymptotics',
    readings: 'Chapter 1, Section 2.1, 2.2 and 3.1',
  },
  {
    date: '2026-09-14',
    time: CLASS_TIME,
    topic:
      'Asymptotics, Induction, Divide and conquer, Merge sort, Recurrence, Recursion tree',
    readings:
      'Section 2.3 and 3.2; Sort with dance; Sorting algorithms in six minutes',
  },
  {
    date: '2026-09-16',
    time: CLASS_TIME,
    topic:
      "Binary search, Powering, Matrix multiplication, Strassen's algorithm, Master theorem",
    readings: 'Section 4.2, 4.3 and 4.5',
  },
  {
    date: '2026-09-21',
    time: CLASS_TIME,
    topic: 'Randomized algorithms, Quicksort and its analysis',
    readings:
      'Chapter 5, Section 7.1 and 7.2; Appendix C for basics of probability',
  },
  {
    date: '2026-09-23',
    time: CLASS_TIME,
    topic:
      'Randomized Quicksort, Selection in linear time, and Lower bound on comparison sorts',
    readings: 'Section 7.3 and 7.4; Section 9.2, 9.3 and 8.1',
  },
  {
    date: '2026-09-28',
    time: CLASS_TIME,
    topic: 'Hash tables and hash functions, Universal hashing',
    readings: 'Section 11.1 and 11.2; Section 11.3.3',
  },
  {
    date: '2026-09-30',
    time: CLASS_TIME,
    topic: 'Quiz (tentative makeup class on Oct 3)',
    assessment: 'Quiz',
  },
  {
    date: '2026-10-03',
    time: CLASS_TIME,
    topic: 'Binary search trees',
    readings: 'Section 11.5 and Chapter 12',
  },
  {
    date: '2026-10-05',
    time: CLASS_TIME,
    topic: 'Red-Black trees',
    readings: 'Chapter 13',
  },
  {
    date: '2026-10-07',
    time: CLASS_TIME,
    topic: 'Augmenting data structures, Order statistics, Interval trees',
    readings: 'Chapter 14',
  },
  {
    date: '2026-10-12',
    time: CLASS_TIME,
    topic: 'Greedy algorithms',
    readings: 'Section 16.1, 16.2 and 16.3',
  },
  {
    date: '2026-10-14',
    time: CLASS_TIME,
    topic: 'Dynamic programming: Rod cutting and Longest common subsequence',
    readings: 'Section 15.1, 15.3 and 15.4',
  },
  {
    date: '2026-10-19',
    time: CLASS_TIME,
    topic: 'Dynamic programming: Optimal binary search tree',
    readings: 'Section 15.4',
  },
  {
    date: '2026-10-21',
    time: CLASS_TIME,
    topic: 'Midterm evaluation',
    assessment: 'Midterm evaluation',
  },
  {
    date: '2026-10-26',
    time: CLASS_TIME,
    topic: 'Graphs and Breadth-first search',
    readings: 'Section 22.1 and 22.2',
  },
  {
    date: '2026-10-28',
    time: CLASS_TIME,
    topic: 'Breadth-first search and its correctness',
    readings: 'Section 22.2',
  },
  {
    date: '2026-11-04',
    time: CLASS_TIME,
    topic: 'Depth-first search and Topological sort',
    readings: 'Section 22.3 and 22.4',
  },
  {
    date: '2026-11-09',
    time: CLASS_TIME,
    topic:
      'Strongly connected components, Minimum spanning tree: the generic method',
    readings: 'Section 22.5 and Section 23.1',
  },
  {
    date: '2026-11-11',
    time: CLASS_TIME,
    topic: 'Minimum spanning trees: Kruskal and Prim',
    readings: 'Chapter 23 and Section 21.1-2',
  },
  {
    date: '2026-11-16',
    time: CLASS_TIME,
    topic: 'Single-source shortest path: Bellman-Ford and Dijkstra',
    readings: 'Chapter 24',
  },
  {
    date: '2026-11-18',
    time: CLASS_TIME,
    topic: 'Quiz (tentative makeup class on Nov 21)',
    assessment: 'Quiz',
  },
  {
    date: '2026-11-21',
    time: CLASS_TIME,
    topic: 'All-pairs shortest paths',
    readings: 'Chapter 25',
  },
  {
    date: '2026-11-23',
    time: CLASS_TIME,
    topic: 'Maximum Flow: Ford-Fulkerson',
    readings: 'Section 26.1 and 26.2',
  },
  {
    date: '2026-11-30',
    time: CLASS_TIME,
    topic: 'Edmonds-Karp, and Maximum bipartite matching',
    readings: 'Section 26.2 and 26.3',
  },
  {
    date: '2026-12-02',
    time: CLASS_TIME,
    topic: 'NP-completeness',
    readings: 'Chapter 34',
  },
  {
    date: '2026-12-07',
    time: CLASS_TIME,
    topic: 'NP-completeness',
    readings: 'Chapter 34',
  },
  {
    date: '2026-12-09',
    time: CLASS_TIME,
    topic: 'NP-completeness',
    readings: 'Chapter 34',
  },
  {
    date: '2026-12-14',
    time: CLASS_TIME,
    topic: 'Final evaluation',
    assessment: 'Final evaluation',
  },
]

/** Graded items shown on the Algos important-dates list (homeworks not yet posted). */
export const ALGOS_DUE_DATES: { date: string; label: string }[] = [
  { date: '2026-09-30', label: 'Quiz' },
  { date: '2026-10-21', label: 'Midterm' },
  { date: '2026-11-18', label: 'Quiz' },
  { date: '2026-12-14', label: 'Final' },
]
