/**
 * Nafs Type Definitions
 * All TypeScript interfaces and types for app state
 */

// Cat types
export type CatColor = 'cream' | 'ginger' | 'gray' | 'black' | 'calico'
export type CatStateType = 'happy' | 'hungry' | 'messy' | 'calm'
export type CatAction = 'eating' | 'brushed' | 'playing'

export interface CatState {
  name: string
  color: CatColor
  happiness: number // 0-100
  state: CatStateType
  fedToday: boolean
  brushedToday: boolean
  playedToday: boolean
  daysActive: number
}

// Task types
export type TaskCategory = 'prayer' | 'dua' | 'manners'

export interface Task {
  id: string
  category: TaskCategory
  label: string
  emoji: string
  points: number
  completed: boolean
}

export interface DailyTasks {
  date: string // ISO date string (YYYY-MM-DD)
  tasks: Task[]
}

// Charity types
export interface CharityCommitment {
  enabled: boolean
  amount: number | null
  currency: string
}

// Onboarding types
export interface FocusArea {
  id: string
  label: string
  emoji: string
}

export interface OnboardingState {
  completed: boolean
  step: number // 1-4
  catName: string
  catColor: CatColor
  focusAreas: string[] // Array of focus area IDs
}

// Settings types
export interface Settings {
  prayerReminders: boolean
  catCareReminders: boolean
  prayerMethod: string | null
  location: string | null
}

// Storage versioning
export interface VersionedData<T> {
  version: number
  data: T
}

// localStorage keys
export const STORAGE_KEYS = {
  CAT: 'nafs_cat',
  TASKS: 'nafs_tasks',
  ONBOARDING: 'nafs_onboarding',
  CHARITY: 'nafs_charity',
  SETTINGS: 'nafs_settings',
} as const
