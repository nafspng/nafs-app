/**
 * Button Component
 * Variants: primary (terracotta), secondary (surface), ghost
 * All styling from theme.ts
 */

import { theme } from '@/lib/theme'
import { CSSProperties, ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const getButtonStyles = (): CSSProperties => {
    const baseStyles: CSSProperties = {
      fontFamily: 'inherit',
      fontSize: theme.typography.button.fontSize,
      fontWeight: theme.typography.button.fontWeight,
      lineHeight: theme.typography.button.lineHeight,
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      borderRadius: theme.radii.pill,
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      width: fullWidth ? '100%' : 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
      opacity: disabled ? 0.5 : 1,
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: disabled ? theme.palette.disabled : theme.palette.primary,
          color: disabled ? theme.palette.disabledText : theme.palette.surface,
          boxShadow: disabled ? 'none' : theme.shadows.button,
        }

      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: theme.palette.surface,
          color: theme.palette.textSecondary,
          border: `2px solid ${theme.palette.disabled}`,
          boxShadow: theme.shadows.card,
        }

      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: theme.palette.textSecondary,
          boxShadow: 'none',
        }
    }
  }

  return (
    <button
      style={{ ...getButtonStyles(), ...style }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
