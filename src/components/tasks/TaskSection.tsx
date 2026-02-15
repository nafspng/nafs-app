/**
 * TaskSection Component
 * Section header with tasks grouped by category
 */

import { TaskItem } from './TaskItem'
import { theme } from '@/lib/theme'
import type { Task } from '@/lib/types'
import { CSSProperties } from 'react'

interface TaskSectionProps {
  title: string
  emoji?: string
  tasks: Task[]
  onTaskToggle: (taskId: string) => void
  style?: CSSProperties
}

export function TaskSection({
  title,
  emoji,
  tasks,
  onTaskToggle,
  style,
}: TaskSectionProps) {
  if (tasks.length === 0) return null

  return (
    <div
      style={{
        marginBottom: theme.spacing.lg,
        ...style,
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.md,
        }}
      >
        <h3
          style={{
            fontSize: theme.typography.heading3.fontSize,
            fontWeight: theme.typography.heading3.fontWeight,
            color: theme.palette.textPrimary,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
          }}
        >
          {emoji && <span>{emoji}</span>}
          {title}
        </h3>

        {/* Decorative add button (non-functional for MVP) */}
        <button
          style={{
            width: '24px',
            height: '24px',
            borderRadius: theme.radii.round,
            backgroundColor: theme.palette.disabled,
            border: 'none',
            color: theme.palette.textSecondary,
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'default',
            opacity: 0.5,
          }}
          disabled
        >
          +
        </button>
      </div>

      {/* Task list */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm,
        }}
      >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onTaskToggle} />
        ))}
      </div>
    </div>
  )
}
