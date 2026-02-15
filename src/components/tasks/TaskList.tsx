/**
 * TaskList Component
 * Daily task checklist with "Today: [date]" label
 * Groups tasks by category and renders TaskSections
 */

import { TaskSection } from './TaskSection'
import { theme } from '@/lib/theme'
import type { Task } from '@/lib/types'
import { TASK_CATEGORIES } from '@/lib/constants'
import { CSSProperties } from 'react'

interface TaskListProps {
  tasks: Task[]
  currentDate: string
  onTaskToggle: (taskId: string) => void
  style?: CSSProperties
}

export function TaskList({
  tasks,
  currentDate,
  onTaskToggle,
  style,
}: TaskListProps) {
  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = []
    }
    acc[task.category].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div style={{ ...style }}>
      {/* Date label */}
      <div
        style={{
          marginBottom: theme.spacing.lg,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: theme.typography.bodySmall.fontSize,
            color: theme.palette.textSecondary,
            margin: 0,
          }}
        >
          Today: {formatDate(currentDate)}
        </p>
      </div>

      {/* Task sections */}
      {Object.entries(TASK_CATEGORIES).map(([categoryKey, categoryInfo]) => {
        const categoryTasks = tasksByCategory[categoryKey] || []
        return (
          <TaskSection
            key={categoryKey}
            title={categoryInfo.label}
            emoji={categoryInfo.emoji}
            tasks={categoryTasks}
            onTaskToggle={onTaskToggle}
          />
        )
      })}

      {/* Empty state */}
      {tasks.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: theme.spacing.xl,
          }}
        >
          <p
            style={{
              fontSize: theme.typography.body.fontSize,
              color: theme.palette.textSecondary,
            }}
          >
            No tasks for today
          </p>
        </div>
      )}
    </div>
  )
}
