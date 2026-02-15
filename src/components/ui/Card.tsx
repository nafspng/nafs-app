/**
 * Card Component
 * Container with theme styling
 * Optional surface/surfaceWarm background
 */

import { theme } from '@/lib/theme'
import { CSSProperties, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  background?: 'surface' | 'surfaceWarm' | 'default'
  padding?: keyof typeof theme.spacing
  children: React.ReactNode
}

export function Card({
  background = 'surface',
  padding = 'lg',
  children,
  style,
  ...props
}: CardProps) {
  const cardStyles: CSSProperties = {
    borderRadius: theme.radii.card,
    boxShadow: theme.shadows.card,
    padding: theme.spacing[padding],
    backgroundColor:
      background === 'surfaceWarm'
        ? theme.palette.surfaceWarm
        : background === 'surface'
        ? theme.palette.surface
        : 'transparent',
  }

  return (
    <div style={{ ...cardStyles, ...style }} {...props}>
      {children}
    </div>
  )
}
