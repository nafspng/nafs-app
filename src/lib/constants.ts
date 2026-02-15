/**
 * Nafs Constants
 * Default data, task definitions, and configuration
 * All Islamic content from well-established sources
 */

import type { Task, FocusArea, CatState } from './types'

// Task unlock thresholds
export const TASK_UNLOCK_THRESHOLDS = {
  FEED: 2,
  BRUSH: 4,
  PLAY: 6,
} as const

// Cat happiness constants
export const CAT_HAPPINESS = {
  MIN: 20, // Never goes below this
  MAX: 100,
  DAILY_DECAY: 5, // Decreases by this amount each new day
  TASK_BONUS: 2, // Increases by this for each task completed
  FEED_BONUS: 8,
  BRUSH_BONUS: 6,
  PLAY_BONUS: 10,
} as const

// Default cat state
export const DEFAULT_CAT_STATE: CatState = {
  name: '',
  color: 'cream',
  happiness: 50,
  state: 'calm',
  fedToday: false,
  brushedToday: false,
  playedToday: false,
  daysActive: 0,
}

// Cat color options for onboarding
export const CAT_COLORS = [
  { id: 'cream', label: 'Cream', hex: '#F9E4C8' },
  { id: 'ginger', label: 'Ginger', hex: '#E39756' },
  { id: 'gray', label: 'Gray', hex: '#A8A8A8' },
  { id: 'black', label: 'Black', hex: '#3D3D3D' },
  { id: 'calico', label: 'Calico', hex: '#D9956A' },
] as const

// Focus areas for onboarding step 3
export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'prayers',
    label: 'Keep up with daily prayers',
    emoji: '🕌',
  },
  {
    id: 'duas',
    label: 'Learn daily du\'as',
    emoji: '📿',
  },
  {
    id: 'manners',
    label: 'Build good habits & manners',
    emoji: '🤲',
  },
  {
    id: 'quran',
    label: 'Read more Quran',
    emoji: '📖',
  },
  {
    id: 'charity',
    label: 'Give more charity',
    emoji: '💝',
  },
]

// Default daily tasks
// Islamic content sourced from well-established Islamic teachings
export const DEFAULT_TASKS: Task[] = [
  // Prayers (5 daily prayers - Fard)
  {
    id: 'task-fajr',
    category: 'prayer',
    label: 'Fajr prayer',
    emoji: '🌅',
    points: 5,
    completed: false,
  },
  {
    id: 'task-dhuhr',
    category: 'prayer',
    label: 'Dhuhr prayer',
    emoji: '☀️',
    points: 5,
    completed: false,
  },
  {
    id: 'task-asr',
    category: 'prayer',
    label: 'Asr prayer',
    emoji: '🌤️',
    points: 5,
    completed: false,
  },
  {
    id: 'task-maghrib',
    category: 'prayer',
    label: 'Maghrib prayer',
    emoji: '🌆',
    points: 5,
    completed: false,
  },
  {
    id: 'task-isha',
    category: 'prayer',
    label: 'Isha prayer',
    emoji: '🌙',
    points: 5,
    completed: false,
  },

  // Daily Du'as (authentic du'as from Sunnah)
  {
    id: 'task-dua-eating',
    category: 'dua',
    label: 'Before eating: Bismillah',
    emoji: '🍽️',
    points: 3,
    completed: false,
  },
  {
    id: 'task-dua-sleeping',
    category: 'dua',
    label: 'Before sleeping: Allahumma bismika amutu wa ahya',
    emoji: '😴',
    points: 3,
    completed: false,
  },
  {
    id: 'task-dua-morning',
    category: 'dua',
    label: 'Morning adhkar',
    emoji: '🌄',
    points: 3,
    completed: false,
  },

  // Good Manners (Islamic etiquettes)
  {
    id: 'task-salam',
    category: 'manners',
    label: 'Say Salam to family',
    emoji: '🤝',
    points: 2,
    completed: false,
  },
  {
    id: 'task-bismillah',
    category: 'manners',
    label: 'Say Bismillah before actions',
    emoji: '📿',
    points: 2,
    completed: false,
  },
  {
    id: 'task-smile',
    category: 'manners',
    label: 'Smile at someone',
    emoji: '😊',
    points: 2,
    completed: false,
  },
  {
    id: 'task-kindness',
    category: 'manners',
    label: 'Do an act of kindness',
    emoji: '💚',
    points: 2,
    completed: false,
  },
]

// Task category labels
export const TASK_CATEGORIES = {
  prayer: {
    label: 'Start the day',
    emoji: '🕌',
    description: 'Daily prayers',
  },
  dua: {
    label: 'Daily Du\'a',
    emoji: '📿',
    description: 'Remembrance and supplications',
  },
  manners: {
    label: 'Good Manners',
    emoji: '🤲',
    description: 'Islamic etiquettes and character',
  },
} as const

// Starter tasks shown in onboarding step 4
export const STARTER_TASKS_PREVIEW = [
  '🕌 Pray Fajr',
  '🌄 Make morning du\'a',
  '🤝 Say Salam to family',
  '📿 Say Bismillah before eating',
  '🌙 Pray Isha',
]

// Cat care action messages
export const CAT_MESSAGES = {
  feed: [
    'Alhamdulillah! *purr*',
    'Jazakallahu khayran!',
    'That was delicious!',
  ],
  brush: [
    'Much better, thank you!',
    'So refreshing!',
    'Feeling clean now!',
  ],
  play: [
    'That was fun!',
    'Let\'s play again soon!',
    'Alhamdulillah for playtime!',
  ],
  hungry: [
    'I\'m feeling a bit hungry...',
    'Could use a treat!',
  ],
  happy: [
    'Alhamdulillah for another day!',
    'Keep up the great work!',
    'MashaAllah, you\'re doing wonderful!',
  ],
} as const

// Charity section content
export const CHARITY_CONTENT = {
  title: 'Give with a generous heart',
  hadith: '"The believer\'s shade on the Day of Resurrection will be their charity." - Tirmidhi',
  impactAreas: [
    {
      id: 'water',
      title: 'Clean Water',
      emoji: '💧',
      description: 'Provide access to clean drinking water',
    },
    {
      id: 'education',
      title: 'Education',
      emoji: '📚',
      description: 'Support education for children in need',
    },
    {
      id: 'food',
      title: 'Feed the Hungry',
      emoji: '🍲',
      description: 'Provide meals to those in need',
    },
    {
      id: 'medical',
      title: 'Medical Aid',
      emoji: '🏥',
      description: 'Support healthcare for communities',
    },
  ],
} as const
