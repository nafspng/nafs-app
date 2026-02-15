/**
 * useCat Hook
 * Manages cat companion state with happiness system and daily decay
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { getCatState, setCatState, getTodayDate, isNewDay } from '@/lib/storage'
import type { CatState, CatStateType } from '@/lib/types'
import { CAT_HAPPINESS, DEFAULT_CAT_STATE } from '@/lib/constants'

interface UseCatOptions {
  tasksCompletedToday?: number
}

export function useCat(options: UseCatOptions = {}) {
  const { tasksCompletedToday = 0 } = options

  const [cat, setCat] = useState<CatState>(DEFAULT_CAT_STATE)
  const [lastUpdateDate, setLastUpdateDate] = useState<string>(getTodayDate())
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cat state from storage and check for new day
  useEffect(() => {
    const loadedCat = getCatState()
    const today = getTodayDate()

    // Check if it's a new day since last update
    if (lastUpdateDate && isNewDay(lastUpdateDate)) {
      // Apply daily decay
      const newHappiness = Math.max(
        CAT_HAPPINESS.MIN,
        loadedCat.happiness - CAT_HAPPINESS.DAILY_DECAY
      )

      // Reset daily care flags
      const updatedCat: CatState = {
        ...loadedCat,
        happiness: newHappiness,
        fedToday: false,
        brushedToday: false,
        playedToday: false,
        daysActive: loadedCat.daysActive + 1,
      }

      setCat(updatedCat)
      setCatState(updatedCat)
      setLastUpdateDate(today)
    } else {
      setCat(loadedCat)
      setLastUpdateDate(today)
    }

    setIsLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Check for new day on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const today = getTodayDate()
        if (isNewDay(lastUpdateDate)) {
          // Reload cat state and apply new day logic
          const loadedCat = getCatState()
          const newHappiness = Math.max(
            CAT_HAPPINESS.MIN,
            loadedCat.happiness - CAT_HAPPINESS.DAILY_DECAY
          )

          const updatedCat: CatState = {
            ...loadedCat,
            happiness: newHappiness,
            fedToday: false,
            brushedToday: false,
            playedToday: false,
            daysActive: loadedCat.daysActive + 1,
          }

          setCat(updatedCat)
          setCatState(updatedCat)
          setLastUpdateDate(today)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdateDate])

  // Save cat state to storage
  const saveCat = useCallback((updatedCat: CatState) => {
    setCat(updatedCat)
    setCatState(updatedCat)
  }, [])

  // Derive cat state from happiness and care flags
  const deriveCatState = useCallback((catData: CatState): CatStateType => {
    // Needy: hasn't been fed and happiness is low
    if (!catData.fedToday && catData.happiness < 40) {
      return 'hungry'
    }

    // Messy: hasn't been brushed in a while
    if (!catData.brushedToday && catData.happiness < 50) {
      return 'messy'
    }

    // Happy: high happiness and been cared for
    if (catData.happiness > 70 && catData.fedToday) {
      return 'happy'
    }

    // Default: calm
    return 'calm'
  }, [])

  // Update derived state whenever cat data changes
  useEffect(() => {
    if (isLoaded) {
      const newState = deriveCatState(cat)
      if (newState !== cat.state) {
        const updatedCat = { ...cat, state: newState }
        saveCat(updatedCat)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat.happiness, cat.fedToday, cat.brushedToday, isLoaded])

  // Increase happiness when tasks are completed
  useEffect(() => {
    if (isLoaded && tasksCompletedToday > 0) {
      const expectedHappiness = Math.min(
        CAT_HAPPINESS.MAX,
        DEFAULT_CAT_STATE.happiness + tasksCompletedToday * CAT_HAPPINESS.TASK_BONUS
      )

      // Only update if happiness is lower than expected
      if (cat.happiness < expectedHappiness) {
        saveCat({ ...cat, happiness: expectedHappiness })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksCompletedToday, isLoaded])

  // Feed action
  const feed = useCallback(() => {
    const newHappiness = Math.min(CAT_HAPPINESS.MAX, cat.happiness + CAT_HAPPINESS.FEED_BONUS)
    saveCat({
      ...cat,
      happiness: newHappiness,
      fedToday: true,
    })
  }, [cat, saveCat])

  // Brush action
  const brush = useCallback(() => {
    const newHappiness = Math.min(CAT_HAPPINESS.MAX, cat.happiness + CAT_HAPPINESS.BRUSH_BONUS)
    saveCat({
      ...cat,
      happiness: newHappiness,
      brushedToday: true,
    })
  }, [cat, saveCat])

  // Play action
  const play = useCallback(() => {
    const newHappiness = Math.min(CAT_HAPPINESS.MAX, cat.happiness + CAT_HAPPINESS.PLAY_BONUS)
    saveCat({
      ...cat,
      happiness: newHappiness,
      playedToday: true,
    })
  }, [cat, saveCat])

  // Update cat name (from onboarding)
  const updateName = useCallback(
    (name: string) => {
      saveCat({ ...cat, name })
    },
    [cat, saveCat]
  )

  // Update cat color (from onboarding)
  const updateColor = useCallback(
    (color: CatState['color']) => {
      saveCat({ ...cat, color })
    },
    [cat, saveCat]
  )

  // Check unlock status for actions
  const canFeed = tasksCompletedToday >= 2
  const canBrush = tasksCompletedToday >= 4
  const canPlay = tasksCompletedToday >= 6

  // Check if banner should show (3+ tasks but no interaction)
  const shouldShowBanner =
    tasksCompletedToday >= 3 && !cat.fedToday && !cat.brushedToday && !cat.playedToday

  return {
    // Cat state
    cat,
    name: cat.name,
    color: cat.color,
    happiness: cat.happiness,
    state: cat.state,
    fedToday: cat.fedToday,
    brushedToday: cat.brushedToday,
    playedToday: cat.playedToday,
    daysActive: cat.daysActive,
    isLoaded,

    // Actions
    feed,
    brush,
    play,
    updateName,
    updateColor,

    // Unlock status
    canFeed,
    canBrush,
    canPlay,

    // UI helpers
    shouldShowBanner,
  }
}
