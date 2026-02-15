/**
 * CatScene Component
 * Cat on prayer mat with desert/oasis background
 * Used on Welcome and Home screens
 */

import { CatAvatar, CatColor, CatMood } from './CatAvatar'
import { theme } from '@/lib/theme'
import { CSSProperties } from 'react'

interface CatSceneProps {
  catColor?: CatColor
  catMood?: CatMood
  showSpeechBubble?: boolean
  speechText?: string
  style?: CSSProperties
}

export function CatScene({
  catColor = 'cream',
  catMood = 'idle',
  showSpeechBubble = false,
  speechText = '',
  style,
}: CatSceneProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.lg,
        ...style,
      }}
    >
      {/* Desert background SVG */}
      <svg
        width="100%"
        height="280"
        viewBox="0 0 400 280"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5DEB3" />
            <stop offset="100%" stopColor="#FFE4B5" />
          </linearGradient>
        </defs>
        <rect width="400" height="280" fill="url(#skyGradient)" />

        {/* Sun */}
        <circle cx="350" cy="50" r="30" fill="#FFD700" opacity="0.4" />

        {/* Clouds */}
        <ellipse cx="100" cy="60" rx="40" ry="15" fill="#FFFFFF" opacity="0.3" />
        <ellipse cx="280" cy="80" rx="50" ry="18" fill="#FFFFFF" opacity="0.3" />

        {/* Sand dunes */}
        <path
          d="M 0 180 Q 100 160 200 180 T 400 180 L 400 280 L 0 280 Z"
          fill={theme.palette.amber}
          opacity="0.3"
        />
        <path
          d="M 0 200 Q 150 180 300 200 T 400 200 L 400 280 L 0 280 Z"
          fill={theme.palette.warmBrown}
          opacity="0.2"
        />

        {/* Palm tree */}
        <g transform="translate(320, 140)">
          {/* Trunk */}
          <rect x="-5" y="0" width="10" height="60" fill="#8B6F47" rx="2" />
          {/* Leaves */}
          <ellipse cx="0" cy="-10" rx="30" ry="15" fill="#A8B899" opacity="0.8" />
          <ellipse cx="-15" cy="-5" rx="25" ry="12" fill="#A8B899" opacity="0.8" />
          <ellipse cx="15" cy="-5" rx="25" ry="12" fill="#A8B899" opacity="0.8" />
        </g>
      </svg>

      {/* Prayer mat */}
      <svg
        width="240"
        height="140"
        viewBox="0 0 240 140"
        style={{
          position: 'relative',
          zIndex: 1,
          marginTop: '140px',
        }}
      >
        <defs>
          <linearGradient id="matGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.palette.primary} />
            <stop offset="100%" stopColor={theme.palette.primaryDark} />
          </linearGradient>
        </defs>
        {/* Mat body */}
        <rect
          x="10"
          y="30"
          width="220"
          height="100"
          rx="8"
          fill="url(#matGradient)"
          opacity="0.7"
        />
        {/* Mat pattern lines */}
        <line x1="10" y1="40" x2="230" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
        <line x1="10" y1="120" x2="230" y2="120" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
        {/* Decorative border */}
        <rect
          x="10"
          y="30"
          width="220"
          height="100"
          rx="8"
          fill="none"
          stroke={theme.palette.accent}
          strokeWidth="2"
          opacity="0.5"
        />
      </svg>

      {/* Cat avatar */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}
      >
        <CatAvatar color={catColor} mood={catMood} size={180} />
      </div>

      {/* Speech bubble */}
      {showSpeechBubble && speechText && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            backgroundColor: theme.palette.surface,
            padding: `${theme.spacing.md} ${theme.spacing.lg}`,
            borderRadius: theme.radii.card,
            boxShadow: theme.shadows.card,
            maxWidth: '280px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: theme.typography.body.fontSize,
              color: theme.palette.textPrimary,
              margin: 0,
            }}
          >
            {speechText}
          </p>
          {/* Tail */}
          <div
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `10px solid ${theme.palette.surface}`,
            }}
          />
        </div>
      )}
    </div>
  )
}
