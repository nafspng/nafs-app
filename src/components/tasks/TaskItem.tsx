/**
 * TaskItem Component
 * Individual task row with checkbox
 * Drag handle (decorative) + emoji + label + points + checkbox
 */

import { Checkbox } from '@/components/ui'
import { theme } from '@/lib/theme'
import type { Task } from '@/lib/types'
import { CSSProperties } from 'react'

interface TaskItemProps {
  task: Task
  onToggle: (taskId: string) => void
  style?: CSSProperties
}

export function TaskItem({ task, onToggle, style }: TaskItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.md,
        padding: theme.spacing.md,
        backgroundColor: theme.palette.surface,
        borderRadius: theme.radii.card,
        boxShadow: theme.shadows.card,
        transition: 'transform 0.2s ease',
        ...style,
      }}
      className="task-item"
    >
      <style>
        {`
          .task-item:hover {
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.elevated};
          }
        `}
      </style>

      {/* Decorative drag handle */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          opacity: 0.3,
        }}
      >
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: theme.palette.textSecondary,
          }}
        />
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: theme.palette.textSecondary,
          }}
        />
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: theme.palette.textSecondary,
          }}
        />
      </div>

      {/* Emoji circle */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: theme.radii.round,
          backgroundColor: theme.palette.surfaceWarm,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          flexShrink: 0,
        }}
      >
        {task.emoji}
      </div>

      {/* Task label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: theme.typography.body.fontSize,
            color: task.completed ? theme.palette.textSecondary : theme.palette.textPrimary,
            textDecoration: task.completed ? 'line-through' : 'none',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {task.label}
        </p>
      </div>

      {/* Points */}
      <div
        style={{
          fontSize: theme.typography.bodySmall.fontSize,
          color: theme.palette.primary,
          fontWeight: theme.typography.label.fontWeight,
          flexShrink: 0,
        }}
      >
        {task.points} ❤️
      </div>

      {/* Checkbox */}
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        style={{ flexShrink: 0 }}
      />
    </div>
  )
}
