/**
 * useOnboarding Hook
 * Manages onboarding flow state with versioned localStorage
 */

'use client'

import { useState, useEffect } from 'react'
import { getOnboardingState, setOnboardingState } from '@/lib/storage'
import type { OnboardingState, CatColor } from '@/lib/types'

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    completed: false,
    step: 1,
    catName: '',
    catColor: 'cream',
    focusAreas: [],
  })

  const [isLoaded, setIsLoaded] = useState(false)

  // Load onboarding state from storage on mount
  useEffect(() => {
    const loadedState = getOnboardingState()
    setState(loadedState)
    setIsLoaded(true)
  }, [])

  // Save to storage whenever state changes (after initial load)
  useEffect(() => {
    if (isLoaded) {
      setOnboardingState(state)
    }
  }, [state, isLoaded])

  // Update step
  const setStep = (step: number) => {
    setState((prev) => ({ ...prev, step }))
  }

  // Go to next step
  const nextStep = () => {
    setState((prev) => ({ ...prev, step: Math.min(prev.step + 1, 4) }))
  }

  // Go to previous step
  const previousStep = () => {
    setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }))
  }

  // Update cat name
  const setCatName = (catName: string) => {
    setState((prev) => ({ ...prev, catName }))
  }

  // Update cat color
  const setCatColor = (catColor: CatColor) => {
    setState((prev) => ({ ...prev, catColor }))
  }

  // Update focus areas (multi-select)
  const setFocusAreas = (focusAreas: string[]) => {
    setState((prev) => ({ ...prev, focusAreas }))
  }

  // Toggle a single focus area
  const toggleFocusArea = (areaId: string) => {
    setState((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(areaId)
        ? prev.focusAreas.filter((id) => id !== areaId)
        : [...prev.focusAreas, areaId],
    }))
  }

  // Complete onboarding
  const completeOnboarding = () => {
    setState((prev) => ({ ...prev, completed: true }))
  }

  // Reset onboarding (for testing)
  const resetOnboarding = () => {
    setState({
      completed: false,
      step: 1,
      catName: '',
      catColor: 'cream',
      focusAreas: [],
    })
  }

  return {
    // State
    step: state.step,
    catName: state.catName,
    catColor: state.catColor,
    focusAreas: state.focusAreas,
    completed: state.completed,
    isComplete: state.completed,
    isLoaded,

    // Actions
    setStep,
    nextStep,
    previousStep,
    setCatName,
    setCatColor,
    setFocusAreas,
    toggleFocusArea,
    completeOnboarding,
    resetOnboarding,
  }
}
