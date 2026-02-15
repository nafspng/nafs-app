/**
 * Input Component
 * Rounded text input with theme styling
 */

import { theme } from '@/lib/theme'
import { CSSProperties, InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, style, ...props }, ref) => {
    const inputStyles: CSSProperties = {
      width: '100%',
      fontFamily: 'inherit',
      fontSize: theme.typography.body.fontSize,
      fontWeight: theme.typography.body.fontWeight,
      lineHeight: theme.typography.body.lineHeight,
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      borderRadius: theme.radii.pill,
      border: `2px solid ${error ? theme.palette.error : theme.palette.disabled}`,
      backgroundColor: theme.palette.surface,
      color: theme.palette.textPrimary,
      outline: 'none',
      transition: 'border-color 0.2s ease',
    }

    const focusStyles = `
      input:focus {
        border-color: ${theme.palette.primary};
      }
      input::placeholder {
        color: ${theme.palette.disabledText};
      }
    `

    return (
      <div style={{ width: '100%' }}>
        {label && (
          <label
            style={{
              display: 'block',
              fontSize: theme.typography.label.fontSize,
              fontWeight: theme.typography.label.fontWeight,
              color: theme.palette.textPrimary,
              marginBottom: theme.spacing.sm,
            }}
          >
            {label}
          </label>
        )}
        <style>{focusStyles}</style>
        <input ref={ref} style={{ ...inputStyles, ...style }} {...props} />
        {error && (
          <span
            style={{
              display: 'block',
              fontSize: theme.typography.caption.fontSize,
              color: theme.palette.error,
              marginTop: theme.spacing.xs,
            }}
          >
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
