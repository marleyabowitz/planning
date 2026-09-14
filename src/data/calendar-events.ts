/** Static calendar events (course dues, career, PDL, birthdays). Algos dues live in algos-schedule. */

export type EventCategory =
  | 'algos'
  | 'ai'
  | 'probability'
  | 'languages'
  | 'due-dates'
  | 'cantor'
  | 'birthdays'
  | 'holidays'
  | 'oh'
  | 'other'

export type EventDetail = {
  topic?: string
  time?: string
  location?: string
  note?: string
  readings?: string
  homework?: string
  assessment?: string
}

export type StaticCalendarEvent = {
  id: string
  date: string
  title: string
  category: EventCategory
  detail?: EventDetail
}

export const STATIC_CALENDAR_EVENTS: StaticCalendarEvent[] = [
  // Probability assessments (assignment pink — not class color)
  {
    id: 'prob-ps1',
    date: '2026-09-18',
    title: 'PROBABILITY: PS1',
    category: 'due-dates',
    detail: { assessment: 'Problem set 1' },
  },
  {
    id: 'prob-midterm',
    date: '2026-11-04',
    title: 'PROBABILITY: Midterm',
    category: 'due-dates',
    detail: {
      assessment: 'Midterm (tentative)',
      time: '4:10–5:25',
      note: '25% of grade',
    },
  },
  {
    id: 'prob-final-1',
    date: '2026-12-09',
    title: 'PROBABILITY: Final',
    category: 'due-dates',
    detail: {
      assessment: 'Final Exam',
      time: '4:10–5:25',
      note: 'Dec 9 & 14 · 35% of grade',
    },
  },
  {
    id: 'prob-final-2',
    date: '2026-12-14',
    title: 'PROBABILITY: Final',
    category: 'due-dates',
    detail: {
      assessment: 'Final Exam',
      time: '4:10–5:25',
      note: 'Dec 9 & 14 · 35% of grade',
    },
  },

  // AI assessments (assignment pink — not class color)
  {
    id: 'ai-exam-1',
    date: '2026-10-08',
    title: 'AI: Exam 1',
    category: 'due-dates',
    detail: { assessment: 'Exam 1 — GOFAI', time: '11:40–12:55' },
  },
  {
    id: 'ai-exam-2',
    date: '2026-11-12',
    title: 'AI: Exam 2',
    category: 'due-dates',
    detail: { assessment: 'Exam 2 — Machine Learning', time: '11:40–12:55' },
  },
  {
    id: 'ai-exam-3',
    date: '2026-12-10',
    title: 'AI: Exam 3',
    category: 'due-dates',
    detail: { assessment: 'Exam 3 — Modern AI Systems', time: '11:40–12:55' },
  },

  // Sep 10
  {
    id: 'cs-research-fair',
    date: '2026-09-10',
    title: 'CS Research Fair',
    category: 'other',
    detail: { topic: 'CS Research Fair' },
  },
  {
    id: 'cs-advising',
    date: '2026-09-10',
    title: 'CS Advising',
    category: 'other',
    detail: { topic: 'CS advising walk-in hours', time: '12–1 PM' },
  },
  {
    id: 'khosla-panel',
    date: '2026-09-10',
    title: 'Khosla Ventures Panel',
    category: 'other',
    detail: {
      topic: "Khosla Ventures Partner's Informational Session Panel",
      time: '4 PM',
    },
  },

  // Sep 15
  {
    id: 'tiktok-next',
    date: '2026-09-15',
    title: 'TikTok NEXT',
    category: 'other',
    detail: {
      topic: 'TikTok NEXT @ Columbia — submit your interest',
      time: '6 PM EDT',
    },
  },

  // Sep 17
  {
    id: 'ta-sep-17',
    date: '2026-09-17',
    title: 'TA',
    category: 'other',
    detail: { topic: 'TA', time: '3:45–5:15 PM' },
  },
  {
    id: 'freestone',
    date: '2026-09-17',
    title: 'Freestone Grove',
    category: 'other',
    detail: {
      topic: 'Freestone Grove Partners',
      time: '5:30–7:30 PM EDT',
    },
  },

  // Sep 18 (PS1 is above)
  {
    id: 'nuclear-review',
    date: '2026-09-18',
    title: 'Nuclear Review',
    category: 'other',
    detail: { topic: 'Nuclear program review session', time: '12:00 PM' },
  },
  {
    id: 'bgc-review',
    date: '2026-09-18',
    title: 'BGC Internship Review',
    category: 'other',
    detail: {
      topic: 'BGC Internship review session',
      time: '1:00–2:00 PM ET',
    },
  },
  {
    id: 'jefferies-expo',
    date: '2026-09-18',
    title: 'Jefferies Expo',
    category: 'other',
    detail: {
      topic: 'Employer Expo Series: Jefferies',
      time: '10:30 AM–12 PM EDT',
      location: '530 West 120th Street, NYC',
    },
  },

  // Sep 19
  {
    id: 'alicia-party',
    date: '2026-09-19',
    title: 'Alicia Party',
    category: 'other',
    detail: { topic: 'Alicia party' },
  },

  // Sep 22
  {
    id: 'ta-sep-22',
    date: '2026-09-22',
    title: 'TA',
    category: 'other',
    detail: { topic: 'TA', time: '1–2 PM' },
  },

  // Sep 23
  {
    id: 'bcg-fireside',
    date: '2026-09-23',
    title: 'BCG Women\'s Chat',
    category: 'other',
    detail: {
      topic: 'BCG women\'s fireside chat',
      time: '2:00–2:45 PM EDT',
    },
  },
  {
    id: 'goldman-reg',
    date: '2026-09-23',
    title: 'Goldman Expo Reg',
    category: 'other',
    detail: { topic: 'Goldman expo series registration' },
  },
  {
    id: 'pdl-communication',
    date: '2026-09-23',
    title: 'PDL: Communication',
    category: 'other',
    detail: { topic: 'PDL Communication', time: '2–4 PM' },
  },

  // Sep 25
  {
    id: 'midland-expo',
    date: '2026-09-25',
    title: 'Midland Expo',
    category: 'other',
    detail: {
      topic: 'Employer Expo Series: Midland Credit Management',
      time: '3–4 PM',
    },
  },
  {
    id: 'pdl-ethics',
    date: '2026-09-25',
    title: 'PDL: Ethics',
    category: 'other',
    detail: { topic: 'PDL Ethics', time: '1–3 PM' },
  },
  {
    id: 'pdl-resume',
    date: '2026-09-25',
    title: 'PDL: Resume',
    category: 'other',
    detail: { topic: 'PDL Resume', time: '10 AM–12 PM' },
  },

  // Sep 29
  {
    id: 'dai-show',
    date: '2026-09-29',
    title: 'Dai Show',
    category: 'other',
    detail: { topic: 'Dai show' },
  },

  // Oct 2 — Algos Quiz Sep 30 already in algos-schedule
  {
    id: 'goldman-expo',
    date: '2026-10-02',
    title: 'Goldman Expo',
    category: 'other',
    detail: {
      topic: 'Employer Expo Series: Goldman Sachs',
      time: '3–5 PM',
    },
  },

  // Oct 3
  {
    id: 'pdl-writing',
    date: '2026-10-03',
    title: 'PDL: Writing',
    category: 'other',
    detail: { topic: 'PDL Writing', time: '10 AM–12 PM' },
  },
  {
    id: 'pdl-job-search',
    date: '2026-10-03',
    title: 'PDL: Job Search',
    category: 'other',
    detail: { topic: 'PDL Job Search', time: '10 AM–12 PM' },
  },

  // Oct 7
  {
    id: 'amazon-reg',
    date: '2026-10-07',
    title: 'Amazon Day Reg',
    category: 'other',
    detail: { topic: 'Amazon day registration' },
  },
  {
    id: 'voloridge-reg',
    date: '2026-10-07',
    title: 'Voloridge Reg',
    category: 'other',
    detail: { topic: 'Voloridge registration' },
  },

  // Oct 13
  {
    id: 'course-drop',
    date: '2026-10-13',
    title: 'Course Drop Deadline',
    category: 'holidays',
    detail: { topic: 'Course drop deadline' },
  },

  // Oct 14
  {
    id: 'orientation-deadline',
    date: '2026-10-14',
    title: 'Orientation Trainings',
    category: 'other',
    detail: { topic: 'Deadline for orientation trainings' },
  },

  // Oct 15
  {
    id: 'amazon-day',
    date: '2026-10-15',
    title: 'Amazon Day',
    category: 'other',
    detail: { topic: 'Amazon day' },
  },

  // Oct 16
  {
    id: 'voloridge-info',
    date: '2026-10-16',
    title: 'Voloridge Info',
    category: 'other',
    detail: { topic: 'Voloridge info session', time: '12–1 PM' },
  },

  // Oct 21 — Algos Midterm already in algos-schedule
  {
    id: 'lifesci-reg',
    date: '2026-10-21',
    title: 'LifeSci Reg',
    category: 'other',
    detail: { topic: 'LifeSci info session registration' },
  },

  // Oct 27
  {
    id: 'pdl-crocheting',
    date: '2026-10-27',
    title: 'PDL: Crocheting',
    category: 'other',
    detail: { topic: 'PDL Crocheting', time: '2 PM' },
  },

  // Oct 30
  {
    id: 'lifesci-info',
    date: '2026-10-30',
    title: 'LifeSci Info',
    category: 'other',
    detail: { topic: 'LifeSci info session', time: '11 AM–2:30 PM' },
  },

  // Nov 10
  {
    id: 'pdl-financial',
    date: '2026-11-10',
    title: 'PDL: Financial OS',
    category: 'other',
    detail: { topic: 'PDL The financial Operating system', time: '2 PM' },
  },

  // Nov 13
  {
    id: 'pdl-sign',
    date: '2026-11-13',
    title: 'PDL: What Did I Sign',
    category: 'other',
    detail: { topic: 'PDL What did I just sign', time: '1 PM' },
  },

  // Nov 19
  {
    id: 'pass-fail',
    date: '2026-11-19',
    title: 'Pass/Fail Deadline',
    category: 'holidays',
    detail: { topic: 'Pass fail deadline' },
  },

  // Nov 24
  {
    id: 'pdl-small-talk',
    date: '2026-11-24',
    title: 'PDL: Small Talk',
    category: 'other',
    detail: { topic: 'PDL Small talk', time: '2 PM' },
  },

  // Dec 14 — Algos Final already in algos-schedule; Probability Final above
  {
    id: 'last-day-class',
    date: '2026-12-14',
    title: 'Last Day of Class',
    category: 'holidays',
    detail: { topic: 'Last day of class' },
  },

  // Birthdays (next occurrence from Sep 2026)
  {
    id: 'bday-eddy',
    date: '2026-12-02',
    title: 'Birthday: Eddy',
    category: 'birthdays',
    detail: { topic: 'Birthday — Eddy' },
  },
  {
    id: 'bday-stella-o',
    date: '2026-12-04',
    title: 'Birthday: Stella O',
    category: 'birthdays',
    detail: { topic: 'Birthday — Stella O' },
  },
  {
    id: 'bday-andy',
    date: '2027-01-24',
    title: 'Birthday: Andy',
    category: 'birthdays',
    detail: { topic: 'Birthday — Andy' },
  },
  {
    id: 'bday-ruby',
    date: '2027-05-03',
    title: 'Birthday: Ruby',
    category: 'birthdays',
    detail: { topic: 'Birthday — Ruby' },
  },
  {
    id: 'bday-michael',
    date: '2027-05-24',
    title: 'Birthday: Michael',
    category: 'birthdays',
    detail: { topic: 'Birthday — Michael' },
  },
  {
    id: 'bday-scarlett-will',
    date: '2027-05-25',
    title: 'Birthday: Scarlett, Will',
    category: 'birthdays',
    detail: { topic: 'Birthday — Scarlett, Will' },
  },
  {
    id: 'bday-sophia',
    date: '2027-08-02',
    title: 'Birthday: Sophia',
    category: 'birthdays',
    detail: { topic: 'Birthday — Sophia' },
  },
  {
    id: 'bday-stella-r',
    date: '2026-11-03',
    title: 'Birthday: Stella R',
    category: 'birthdays',
    detail: { topic: 'Birthday — Stella R' },
  },
  {
    id: 'bday-aidan-brody',
    date: '2026-11-15',
    title: 'Birthday: Aidan, Brody',
    category: 'birthdays',
    detail: { topic: 'Birthday — Aidan, Brody' },
  },
]
