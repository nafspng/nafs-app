/**
 * SelectionCard Component
 * Full-width row with emoji/icon, text, and selection indicator
 * Selected: primary border, Unselected: subtle border
 * Used in onboarding for multi-select options
 */

import { theme } from '@/lib/theme'
import { CSSProperties, HTMLAttributes } from 'react'

interface SelectionCardProps extends HTMLAttributes<HTMLButtonElement> {
  emoji?: string
  label: string
  description?: string
  selected: boolean
  disabled?: boolean
}

export function SelectionCard({
  emoji,
  label,
  description,
  selected,
  disabled,
  style,
  ...props
}: SelectionCardProps) {
  const cardStyles: CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.card,
    border: `2px solid ${selected ? theme.palette.primary : theme.palette.disabled}`,
    backgroundColor: selected ? theme.palette.surfaceWarm : theme.palette.surface,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    opacity: disabled ? 0.5 : 1,
  }

  const emojiStyles: CSSProperties = {
    fontSize: '32px',
    lineHeight: 1,
    flexShrink: 0,
  }

  const contentStyles: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  }

  const labelStyles: CSSProperties = {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.label.fontWeight,
    color: theme.palette.textPrimary,
    lineHeight: theme.typography.body.lineHeight,
  }

  const descriptionStyles: CSSProperties = {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.palette.textSecondary,
    lineHeight: theme.typography.bodySmall.lineHeight,
  }

  const indicatorStyles: CSSProperties = {
    width: '24px',
    height: '24px',
    borderRadius: theme.radii.round,
    border: `2px solid ${selected ? theme.palette.primary : theme.palette.disabled}`,
    backgroundColor: selected ? theme.palette.primary : theme.palette.surface,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: theme.palette.surface,
    fontSize: '16px',
    fontWeight: 'bold',
  }

  const hoverStyles = `
    .selection-card:hover:not(:disabled) {
      border-color: ${theme.palette.primary};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.card};
    }

    .selection-card:focus {
      outline: 2px solid ${theme.palette.primary};
      outline-offset: 2px;
    }
  `

  return (
    <>
      <style>{hoverStyles}</style>
      <button
        className="selection-card"
        style={{ ...cardStyles, ...style }}
        disabled={disabled}
        type="button"
        {...props}
      >
        {emoji && <span style={emojiStyles}>{emoji}</span>}
        <div style={contentStyles}>
          <div style={labelStyles}>{label}</div>
          {description && <div style={descriptionStyles}>{description}</div>}
        </div>
        <div style={indicatorStyles}>{selected ? '✓' : '+'}</div>
      </button>
    </>
  )
}
