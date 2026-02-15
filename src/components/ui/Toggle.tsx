/**
 * Toggle Component
 * On/off switch with CSS-only animation
 * On: primary color, Off: disabled color
 */

import { theme } from '@/lib/theme'
import { CSSProperties, InputHTMLAttributes } from 'react'

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  onLabel?: string
  offLabel?: string
}

export function Toggle({
  label,
  onLabel,
  offLabel,
  checked,
  disabled,
  style,
  ...props
}: ToggleProps) {
  const containerStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  }

  const labelStyles: CSSProperties = {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.palette.textPrimary,
    lineHeight: theme.typography.body.lineHeight,
  }

  const trackStyles: CSSProperties = {
    position: 'relative',
    width: '52px',
    height: '28px',
    backgroundColor: checked ? theme.palette.primary : theme.palette.disabled,
    borderRadius: theme.radii.pill,
    transition: 'background-color 0.3s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    flexShrink: 0,
  }

  const thumbStyles: CSSProperties = {
    position: 'absolute',
    top: '3px',
    left: checked ? '26px' : '3px',
    width: '22px',
    height: '22px',
    backgroundColor: theme.palette.surface,
    borderRadius: theme.radii.round,
    transition: 'left 0.3s ease',
    boxShadow: theme.shadows.subtle,
  }

  const statusLabelStyles: CSSProperties = {
    fontSize: theme.typography.bodySmall.fontSize,
    fontWeight: theme.typography.label.fontWeight,
    color: theme.palette.textSecondary,
    minWidth: '30px',
  }

  const focusStyles = `
    .toggle-input:focus + .toggle-track {
      outline: 2px solid ${theme.palette.primary};
      outline-offset: 2px;
    }

    .toggle-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
  `

  return (
    <label style={containerStyles}>
      <style>{focusStyles}</style>
      {label && <span style={labelStyles}>{label}</span>}
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
        <input
          type="checkbox"
          className="toggle-input"
          checked={checked}
          disabled={disabled}
          {...props}
        />
        <div className="toggle-track" style={trackStyles}>
          <div style={thumbStyles} />
        </div>
        {(onLabel || offLabel) && (
          <span style={statusLabelStyles}>
            {checked ? onLabel : offLabel}
          </span>
        )}
      </div>
    </label>
  )
}
