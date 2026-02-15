/**
 * Nafs Design System
 * Single source of truth for all design tokens
 * Warm Islamic aesthetic inspired by Finch
 */

export const theme = {
  palette: {
    // Primary colors - Terracotta/Clay tones
    primary: '#D9725C',
    primaryLight: '#F4A78A',
    primaryDark: '#B85A47',

    // Neutral warm tones
    cream: '#F9F5F0',
    surface: '#FDFCFB',
    surfaceWarm: '#FFF8F0',

    // Accent colors
    amber: '#F5B85F',
    warmBrown: '#8B6F47',
    sage: '#A8B899',

    // Text colors
    textPrimary: '#2C2416',
    textSecondary: '#6B5D4F',

    // UI states
    disabled: '#E8E3DC',
    disabledText: '#ACA295',
    checkmark: '#5C9F6E',
    accent: '#D4A574', // For notepad binding tabs

    // Semantic colors
    success: '#5C9F6E',
    warning: '#F5B85F',
    error: '#D9725C',

    // Background
    background: '#FDFCFB',
  },

  typography: {
    // Headings
    heading1: {
      fontSize: '32px',
      fontWeight: 800,
      lineHeight: '40px',
      letterSpacing: '-0.02em',
    },
    heading2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '32px',
      letterSpacing: '-0.01em',
    },
    heading3: {
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '28px',
      letterSpacing: '0',
    },

    // Body text
    body: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      letterSpacing: '0',
    },
    bodySmall: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '0',
    },

    // UI elements
    button: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '24px',
      letterSpacing: '0',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
      letterSpacing: '0.01em',
    },
    label: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
      letterSpacing: '0',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  radii: {
    xs: '4px',
    sm: '8px',
    card: '16px',
    pill: '100px',
    round: '50%',
  },

  shadows: {
    card: '0px 2px 8px rgba(44, 36, 22, 0.08), 0px 1px 4px rgba(44, 36, 22, 0.04)',
    button: '0px 2px 4px rgba(44, 36, 22, 0.12)',
    subtle: '0px 1px 3px rgba(44, 36, 22, 0.06)',
    elevated: '0px 4px 12px rgba(44, 36, 22, 0.12), 0px 2px 4px rgba(44, 36, 22, 0.06)',
  },
} as const

export type Theme = typeof theme
