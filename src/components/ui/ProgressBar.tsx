/**
 * ProgressBar Component
 * Horizontal progress bar with optional label
 * Track: primaryLight, Fill: primary
 */

import { theme } from '@/lib/theme'
import { CSSProperties, HTMLAttributes } from 'react'

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  current: number
  total: number
  showLabel?: boolean
  height?: string
}

export function ProgressBar({
  current,
  total,
  showLabel = false,
  height = '12px',
  style,
  ...props
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0

  const containerStyles: CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  }

  const trackStyles: CSSProperties = {
    width: '100%',
    height,
    backgroundColor: theme.palette.primaryLight,
    borderRadius: theme.radii.pill,
    overflow: 'hidden',
    position: 'relative',
  }

  const fillStyles: CSSProperties = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: theme.palette.primary,
    borderRadius: theme.radii.pill,
    transition: 'width 0.3s ease',
  }

  const labelStyles: CSSProperties = {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
    color: theme.palette.textSecondary,
    textAlign: 'center',
  }

  return (
    <div style={{ ...containerStyles, ...style }} {...props}>
      <div style={trackStyles}>
        <div style={fillStyles} />
      </div>
      {showLabel && (
        <div style={labelStyles}>
          {current} / {total}
        </div>
      )}
    </div>
  )
}
