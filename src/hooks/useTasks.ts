/**
 * useTasks Hook
 * Manages daily tasks with automatic reset and focus area personalization
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { getDailyTasks, setDailyTasks, getTodayDate, isNewDay } from '@/lib/storage'
import type { DailyTasks, Task } from '@/lib/types'
import { DEFAULT_TASKS } from '@/lib/constants'

interface UseTasksOptions {
  focusAreas?: string[]
}

export function useTasks(options: UseTasksOptions = {}) {
  const { focusAreas = [] } = options

  const [tasks, setTasks] = useState<Task[]>([])
  const [currentDate, setCurrentDate] = useState<string>(getTodayDate())
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize tasks with focus area personalization
  const initializeTasks = useCallback(
    (shouldPersonalize = true): Task[] => {
      let initialTasks = DEFAULT_TASKS.map((t) => ({ ...t }))

      // Personalize task order based on focus areas (from onboarding)
      if (shouldPersonalize && focusAreas.length > 0) {
        // Map focus areas to task categories
        const categoryMap: Record<string, string> = {
          prayers: 'prayer',
          duas: 'dua',
          manners: 'manners',
        }

        // Get prioritized categories
        const prioritizedCategories = focusAreas
          .map((area) => categoryMap[area])
          .filter(Boolean)

        // Sort tasks: prioritized categories first, then others
        initialTasks.sort((a, b) => {
          const aPriority = prioritizedCategories.indexOf(a.category)
          const bPriority = prioritizedCategories.indexOf(b.category)

          if (aPriority !== -1 && bPriority !== -1) {
            return aPriority - bPriority
          }
          if (aPriority !== -1) return -1
          if (bPriority !== -1) return 1
          return 0
        })
      }

      return initialTasks
    },
    [focusAreas]
  )

  // Reset tasks to defaults
  const resetTasks = useCallback(() => {
    const newTasks = initializeTasks()
    const today = getTodayDate()

    const dailyTasks: DailyTasks = {
      date: today,
      tasks: newTasks,
    }

    setTasks(newTasks)
    setCurrentDate(today)
    setDailyTasks(dailyTasks)
  }, [initializeTasks])

  // Load tasks from storage and check for new day
  useEffect(() => {
    const loadedData = getDailyTasks()
    const today = getTodayDate()

    // Check if it's a new day
    if (isNewDay(loadedData.date)) {
      // Reset tasks for new day
      resetTasks()
    } else {
      // Use stored tasks
      setTasks(loadedData.tasks)
      setCurrentDate(loadedData.date)
    }

    setIsLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Check for new day on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const today = getTodayDate()

        // Check if date has changed
        if (isNewDay(currentDate)) {
          console.log('New day detected, resetting tasks')
          resetTasks()
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, resetTasks])

  // Save tasks to storage whenever they change
  useEffect(() => {
    if (isLoaded) {
      const dailyTasks: DailyTasks = {
        date: currentDate,
        tasks,
      }
      setDailyTasks(dailyTasks)
    }
  }, [tasks, currentDate, isLoaded])

  // Toggle task completion
  const toggleTask = useCallback(
    (taskId: string) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      )
    },
    []
  )

  // Mark task as completed
  const completeTask = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    )
  }, [])

  // Mark task as incomplete
  const uncompleteTask = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: false } : task
      )
    )
  }, [])

  // Manual refresh (optional fallback)
  const manualRefresh = useCallback(() => {
    const today = getTodayDate()
    if (isNewDay(currentDate)) {
      resetTasks()
    }
  }, [currentDate, resetTasks])

  // Calculate stats
  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length
  const goalsLeft = totalCount - completedCount
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = []
    }
    acc[task.category].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  // Get tasks for specific category
  const getTasksByCategory = useCallback(
    (category: string) => {
      return tasks.filter((t) => t.category === category)
    },
    [tasks]
  )

  return {
    // Tasks data
    tasks,
    tasksByCategory,
    currentDate,
    isLoaded,

    // Stats
    completedCount,
    totalCount,
    goalsLeft,
    completionPercentage,
    tasksCompletedToday: completedCount,

    // Actions
    toggleTask,
    completeTask,
    uncompleteTask,
    resetTasks,
    manualRefresh,

    // Helpers
    getTasksByCategory,
  }
}
