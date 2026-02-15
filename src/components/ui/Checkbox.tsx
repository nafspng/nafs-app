/**
 * Checkbox Component
 * Square with rounded corners
 * Unchecked: disabled color, Checked: checkmark color
 * Optional bounce animation on toggle
 */

import { theme } from '@/lib/theme'
import { CSSProperties, InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function Checkbox({ label, checked, style, ...props }: CheckboxProps) {
  const checkboxContainerStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? 0.5 : 1,
  }

  const checkboxStyles: CSSProperties = {
    appearance: 'none',
    width: '24px',
    height: '24px',
    borderRadius: theme.radii.sm,
    border: `2px solid ${checked ? theme.palette.checkmark : theme.palette.disabled}`,
    backgroundColor: checked ? theme.palette.checkmark : theme.palette.surface,
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  }

  const checkmarkStyles: CSSProperties = {
    content: '""',
    position: 'absolute',
    left: '6px',
    top: '2px',
    width: '6px',
    height: '12px',
    border: 'solid white',
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
    opacity: checked ? 1 : 0,
  }

  const labelStyles: CSSProperties = {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.palette.textPrimary,
    lineHeight: theme.typography.body.lineHeight,
  }

  // CSS for bounce animation
  const bounceAnimation = `
    @keyframes checkboxBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .checkbox-bounce {
      animation: checkboxBounce 0.3s ease;
    }

    input[type="checkbox"]:focus {
      outline: 2px solid ${theme.palette.primary};
      outline-offset: 2px;
    }
  `

  return (
    <label style={checkboxContainerStyles}>
      <style>{bounceAnimation}</style>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <input
          type="checkbox"
          checked={checked}
          style={{ ...checkboxStyles, ...style }}
          className={checked ? 'checkbox-bounce' : ''}
          {...props}
        />
        {checked && <div style={checkmarkStyles} />}
      </div>
      {label && <span style={labelStyles}>{label}</span>}
    </label>
  )
}
