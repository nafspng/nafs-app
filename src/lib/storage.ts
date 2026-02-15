/**
 * Nafs Storage Layer
 * Versioned localStorage with migrations and graceful error handling
 */

import type {
  CatState,
  DailyTasks,
  OnboardingState,
  CharityCommitment,
  Settings,
  VersionedData,
} from './types'
import { STORAGE_KEYS } from './types'
import { DEFAULT_CAT_STATE, DEFAULT_TASKS } from './constants'

// Current version for all stored data
const CURRENT_VERSION = 1

// In-memory fallback when localStorage is unavailable
let memoryStorage: Record<string, any> = {}

/**
 * Check if localStorage is available
 * Handles Safari private mode and SSR
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const test = '__storage_test__'
    window.localStorage.setItem(test, test)
    window.localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

/**
 * Check if sessionStorage is available (fallback)
 */
function isSessionStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const test = '__storage_test__'
    window.sessionStorage.setItem(test, test)
    window.sessionStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

/**
 * Get storage mechanism (localStorage > sessionStorage > memory)
 */
function getStorage(): Storage | null {
  if (isLocalStorageAvailable()) {
    return window.localStorage
  }
  if (isSessionStorageAvailable()) {
    console.warn('localStorage unavailable, falling back to sessionStorage')
    return window.sessionStorage
  }
  console.warn('No storage available, using in-memory storage (will be lost on refresh)')
  return null
}

/**
 * Safely get item from storage with error handling
 */
function getItem(key: string): string | null {
  try {
    const storage = getStorage()
    if (storage) {
      return storage.getItem(key)
    }
    return memoryStorage[key] || null
  } catch (error) {
    console.error(`Error reading from storage (${key}):`, error)
    return null
  }
}

/**
 * Safely set item to storage with error handling and quota management
 */
function setItem(key: string, value: string): boolean {
  try {
    const storage = getStorage()
    if (storage) {
      storage.setItem(key, value)
      return true
    }
    memoryStorage[key] = value
    return true
  } catch (error) {
    // Check if it's a quota exceeded error
    if (
      error instanceof DOMException &&
      (error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    ) {
      console.error('Storage quota exceeded, falling back to memory storage')
      memoryStorage[key] = value
      return true
    }
    console.error(`Error writing to storage (${key}):`, error)
    return false
  }
}

/**
 * Remove item from storage
 */
function removeItem(key: string): void {
  try {
    const storage = getStorage()
    if (storage) {
      storage.removeItem(key)
    }
    delete memoryStorage[key]
  } catch (error) {
    console.error(`Error removing from storage (${key}):`, error)
  }
}

/**
 * Generic get function with versioning and migration
 */
function getData<T>(key: string, defaultValue: T, migrate?: (data: any, version: number) => T): T {
  const raw = getItem(key)

  if (!raw) {
    return defaultValue
  }

  try {
    const parsed = JSON.parse(raw) as VersionedData<T>

    // Check if data has version field
    if (typeof parsed.version !== 'number') {
      console.warn(`Data in ${key} has no version, resetting to default`)
      setData(key, defaultValue)
      return defaultValue
    }

    // Check if migration is needed
    if (parsed.version < CURRENT_VERSION) {
      console.log(`Migrating ${key} from v${parsed.version} to v${CURRENT_VERSION}`)
      const migrated = migrate ? migrate(parsed.data, parsed.version) : parsed.data
      setData(key, migrated)
      return migrated
    }

    // Check if data is valid (future version or corrupted)
    if (parsed.version > CURRENT_VERSION) {
      console.warn(`Data in ${key} is from future version, resetting`)
      setData(key, defaultValue)
      return defaultValue
    }

    return parsed.data
  } catch (error) {
    console.error(`Error parsing data from ${key}, resetting to default:`, error)
    setData(key, defaultValue)
    return defaultValue
  }
}

/**
 * Generic set function with versioning
 */
function setData<T>(key: string, data: T): boolean {
  const versioned: VersionedData<T> = {
    version: CURRENT_VERSION,
    data,
  }

  try {
    const serialized = JSON.stringify(versioned)
    return setItem(key, serialized)
  } catch (error) {
    console.error(`Error serializing data for ${key}:`, error)
    return false
  }
}

// ===== Specific storage functions =====

/**
 * Cat state storage
 */
export function getCatState(): CatState {
  return getData(STORAGE_KEYS.CAT, DEFAULT_CAT_STATE)
}

export function setCatState(state: CatState): boolean {
  return setData(STORAGE_KEYS.CAT, state)
}

/**
 * Daily tasks storage
 */
export function getDailyTasks(): DailyTasks {
  const today = getTodayDate()
  const defaultTasks: DailyTasks = {
    date: today,
    tasks: DEFAULT_TASKS.map(t => ({ ...t })), // Deep copy
  }

  return getData(STORAGE_KEYS.TASKS, defaultTasks)
}

export function setDailyTasks(tasks: DailyTasks): boolean {
  return setData(STORAGE_KEYS.TASKS, tasks)
}

/**
 * Onboarding state storage
 */
export function getOnboardingState(): OnboardingState {
  const defaultOnboarding: OnboardingState = {
    completed: false,
    step: 1,
    catName: '',
    catColor: 'cream',
    focusAreas: [],
  }

  return getData(STORAGE_KEYS.ONBOARDING, defaultOnboarding)
}

export function setOnboardingState(state: OnboardingState): boolean {
  return setData(STORAGE_KEYS.ONBOARDING, state)
}

/**
 * Charity commitment storage
 */
export function getCharityCommitment(): CharityCommitment {
  const defaultCharity: CharityCommitment = {
    enabled: false,
    amount: null,
    currency: 'GBP',
  }

  return getData(STORAGE_KEYS.CHARITY, defaultCharity)
}

export function setCharityCommitment(commitment: CharityCommitment): boolean {
  return setData(STORAGE_KEYS.CHARITY, commitment)
}

/**
 * Settings storage
 */
export function getSettings(): Settings {
  const defaultSettings: Settings = {
    prayerReminders: false,
    catCareReminders: false,
    prayerMethod: null,
    location: null,
  }

  return getData(STORAGE_KEYS.SETTINGS, defaultSettings)
}

export function setSettings(settings: Settings): boolean {
  return setData(STORAGE_KEYS.SETTINGS, settings)
}

/**
 * Clear all app data (for testing or reset)
 */
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeItem(key)
  })
  memoryStorage = {}
}

// ===== Date utilities =====

/**
 * Get today's date as ISO string (YYYY-MM-DD)
 */
export function getTodayDate(): string {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

/**
 * Check if stored date is before today (needs reset)
 */
export function isNewDay(storedDate: string): boolean {
  const today = getTodayDate()
  return storedDate < today
}

/**
 * Parse ISO date string to Date object
 */
export function parseDate(dateString: string): Date | null {
  try {
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? null : date
  } catch {
    return null
  }
}
