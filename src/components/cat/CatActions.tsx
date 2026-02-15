/**
 * CatActions Component
 * Feed, Brush, Play action buttons with unlock states
 */

import { Button } from '@/components/ui'
import { theme } from '@/lib/theme'
import { CSSProperties } from 'react'

interface CatActionsProps {
  feedUnlocked: boolean
  brushUnlocked: boolean
  playUnlocked: boolean
  feedDone?: boolean
  brushDone?: boolean
  playDone?: boolean
  onFeed: () => void
  onBrush: () => void
  onPlay: () => void
  style?: CSSProperties
}

export function CatActions({
  feedUnlocked,
  brushUnlocked,
  playUnlocked,
  feedDone = false,
  brushDone = false,
  playDone = false,
  onFeed,
  onBrush,
  onPlay,
  style,
}: CatActionsProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.md,
        width: '100%',
        ...style,
      }}
    >
      {/* Feed button */}
      <Button
        variant="primary"
        fullWidth
        disabled={!feedUnlocked || feedDone}
        onClick={onFeed}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing.sm,
          position: 'relative',
        }}
      >
        {!feedUnlocked && (
          <span style={{ fontSize: '18px' }}>🔒</span>
        )}
        <span style={{ fontSize: '20px' }}>🍽️</span>
        <span>Feed</span>
        {!feedUnlocked && (
          <span
            style={{
              fontSize: theme.typography.caption.fontSize,
              opacity: 0.8,
            }}
          >
            (2 tasks)
          </span>
        )}
        {feedDone && (
          <span
            style={{
              fontSize: theme.typography.caption.fontSize,
              opacity: 0.8,
            }}
          >
            ✓ Done
          </span>
        )}
      </Button>

      {/* Brush button */}
      <Button
        variant="primary"
        fullWidth
        disabled={!brushUnlocked || brushDone}
        onClick={onBrush}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing.sm,
        }}
      >
        {!brushUnlocked && (
          <span style={{ fontSize: '18px' }}>🔒</span>
        )}
        <span style={{ fontSize: '20px' }}>🪥</span>
        <span>Brush</span>
        {!brushUnlocked && (
          <span
            style={{
              fontSize: theme.typography.caption.fontSize,
              opacity: 0.8,
            }}
          >
            (4 tasks)
          </span>
        )}
        {brushDone && (
          <span
            style={{
              fontSize: theme.typography.caption.fontSize,
              opacity: 0.8,
            }}
          >
            ✓ Done
          </span>
        )}
      </Button>

      {/* Play button */}
      <Button
        variant="primary"
        fullWidth
        disabled={!playUnlocked || playDone}
        onClick={onPlay}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing.sm,
        }}
      >
        {!playUnlocked && (
          <span style={{ fontSize: '18px' }}>🔒</span>
        )}
        <span style={{ fontSize: '20px' }}>🎾</span>
        <span>Play</span>
        {!playUnlocked && (
          <span
            style={{
              fontSize: theme.typography.caption.fontSize,
              opacity: 0.8,
            }}
          >
            (6 tasks)
          </span>
        )}
        {playDone && (
          <span
            style={{
              fontSize: theme.typography.caption.fontSize,
              opacity: 0.8,
            }}
          >
            ✓ Done
          </span>
        )}
      </Button>
    </div>
  )
}
