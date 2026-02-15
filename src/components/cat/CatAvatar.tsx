/**
 * CatAvatar Component
 * Geometric SVG cat with color variants and mood states
 * Simple, kawaii-style design with circle head, triangle ears
 */

import { theme } from '@/lib/theme'
import { CSSProperties } from 'react'

export type CatColor = 'cream' | 'ginger' | 'gray' | 'black' | 'calico'
export type CatMood = 'idle' | 'happy' | 'sleepy' | 'needy' | 'content'

interface CatAvatarProps {
  color?: CatColor
  mood?: CatMood
  size?: number
  style?: CSSProperties
}

export function CatAvatar({
  color = 'cream',
  mood = 'idle',
  size = 200,
  style,
}: CatAvatarProps) {
  // Color mapping based on cat colors from constants
  const colorMap: Record<CatColor, { main: string; inner: string; outline: string }> = {
    cream: {
      main: '#F9E4C8',
      inner: '#FFF5E8',
      outline: '#E8D4B8',
    },
    ginger: {
      main: '#E39756',
      inner: '#F0B87A',
      outline: '#C67D3E',
    },
    gray: {
      main: '#A8A8A8',
      inner: '#C4C4C4',
      outline: '#8A8A8A',
    },
    black: {
      main: '#3D3D3D',
      inner: '#5A5A5A',
      outline: '#2A2A2A',
    },
    calico: {
      main: '#D9956A',
      inner: '#E8B086',
      outline: '#B8784F',
    },
  }

  const colors = colorMap[color]

  // Eye shapes based on mood
  const renderEyes = () => {
    const eyeColor = '#2C2416'

    switch (mood) {
      case 'happy':
        // Wide open happy eyes (upturned arcs)
        return (
          <>
            <path
              d="M 70 85 Q 75 80 80 85"
              fill="none"
              stroke={eyeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 120 85 Q 125 80 130 85"
              fill="none"
              stroke={eyeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )

      case 'sleepy':
        // Closed eyes (horizontal lines)
        return (
          <>
            <line
              x1="68"
              y1="88"
              x2="82"
              y2="88"
              stroke={eyeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="118"
              y1="88"
              x2="132"
              y2="88"
              stroke={eyeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )

      case 'needy':
        // Large pleading eyes (circles)
        return (
          <>
            <circle cx="75" cy="88" r="6" fill={eyeColor} />
            <circle cx="125" cy="88" r="6" fill={eyeColor} />
            {/* White highlights for extra cuteness */}
            <circle cx="77" cy="86" r="2" fill="white" opacity="0.8" />
            <circle cx="127" cy="86" r="2" fill="white" opacity="0.8" />
          </>
        )

      case 'content':
        // Relaxed gentle curves
        return (
          <>
            <ellipse cx="75" cy="88" rx="4" ry="5" fill={eyeColor} />
            <ellipse cx="125" cy="88" rx="4" ry="5" fill={eyeColor} />
          </>
        )

      case 'idle':
      default:
        // Simple dots
        return (
          <>
            <circle cx="75" cy="88" r="4" fill={eyeColor} />
            <circle cx="125" cy="88" r="4" fill={eyeColor} />
          </>
        )
    }
  }

  // Mouth shapes based on mood
  const renderMouth = () => {
    const mouthColor = '#2C2416'

    switch (mood) {
      case 'happy':
        // Wide smile
        return (
          <path
            d="M 85 110 Q 100 120 115 110"
            fill="none"
            stroke={mouthColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )

      case 'sleepy':
        // Small o mouth
        return <circle cx="100" cy="110" r="3" fill="none" stroke={mouthColor} strokeWidth="2" />

      case 'needy':
        // Small downturned mouth
        return (
          <path
            d="M 90 112 Q 100 108 110 112"
            fill="none"
            stroke={mouthColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )

      case 'content':
        // Gentle smile
        return (
          <path
            d="M 88 108 Q 100 113 112 108"
            fill="none"
            stroke={mouthColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )

      case 'idle':
      default:
        // Tiny neutral mouth
        return (
          <line
            x1="95"
            y1="110"
            x2="105"
            y2="110"
            stroke={mouthColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ ...style }}
      aria-label={`${color} cat feeling ${mood}`}
    >
      {/* Drop shadow */}
      <defs>
        <filter id={`shadow-${color}-${mood}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#shadow-${color}-${mood})`}>
        {/* Left ear */}
        <path
          d="M 60 70 L 40 30 L 75 60 Z"
          fill={colors.main}
          stroke={colors.outline}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Left ear inner */}
        <path d="M 55 60 L 45 40 L 65 58 Z" fill={colors.inner} />

        {/* Right ear */}
        <path
          d="M 140 70 L 160 30 L 125 60 Z"
          fill={colors.main}
          stroke={colors.outline}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Right ear inner */}
        <path d="M 145 60 L 155 40 L 135 58 Z" fill={colors.inner} />

        {/* Head (circle) */}
        <circle
          cx="100"
          cy="100"
          r="55"
          fill={colors.main}
          stroke={colors.outline}
          strokeWidth="2"
        />

        {/* Inner face highlight */}
        <ellipse cx="100" cy="105" rx="38" ry="35" fill={colors.inner} opacity="0.6" />

        {/* Nose */}
        <ellipse cx="100" cy="100" rx="4" ry="3" fill={theme.palette.warmBrown} />

        {/* Eyes */}
        {renderEyes()}

        {/* Mouth */}
        {renderMouth()}

        {/* Rosy cheeks */}
        <circle cx="60" cy="105" r="8" fill={theme.palette.primary} opacity="0.25" />
        <circle cx="140" cy="105" r="8" fill={theme.palette.primary} opacity="0.25" />

        {/* Small body (semi-circle at bottom) */}
        <path
          d="M 65 145 Q 100 165 135 145"
          fill={colors.main}
          stroke={colors.outline}
          strokeWidth="2"
        />
        <ellipse cx="100" cy="145" rx="30" ry="15" fill={colors.inner} opacity="0.5" />
      </g>
    </svg>
  )
}
