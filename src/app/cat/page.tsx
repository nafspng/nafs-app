'use client'

/**
 * Cat Interaction Screen
 * Care for your cat with feed, brush, and play actions
 */

import { useState } from 'react'
import { AppShell } from '@/components/layout'
import { CatAvatar } from '@/components/cat'
import { CatActions } from '@/components/cat'
import { Card, Button } from '@/components/ui'
import { useOnboarding, useCat, useTasks } from '@/hooks'
import { theme } from '@/lib/theme'
import { CAT_MESSAGES } from '@/lib/constants'

export default function CatPage() {
  const onboarding = useOnboarding()
  const tasks = useTasks({ focusAreas: onboarding.focusAreas })
  const cat = useCat({ tasksCompletedToday: tasks.completedCount })

  const [showReaction, setShowReaction] = useState(false)
  const [reactionType, setReactionType] = useState<'feed' | 'brush' | 'play' | null>(null)
  const [reactionMessage, setReactionMessage] = useState('')

  // Map cat state to mood
  const getCatMood = () => {
    switch (cat.state) {
      case 'happy':
        return 'happy'
      case 'hungry':
        return 'needy'
      case 'messy':
        return 'sleepy'
      case 'calm':
      default:
        return 'content'
    }
  }

  // Get action-specific mood
  const getActionMood = () => {
    if (reactionType === 'feed') return 'happy'
    if (reactionType === 'brush') return 'content'
    if (reactionType === 'play') return 'happy'
    return getCatMood()
  }

  // Handle care actions with reaction overlay
  const handleAction = (
    action: 'feed' | 'brush' | 'play',
    callback: () => void
  ) => {
    // Get random message for this action
    const messages = CAT_MESSAGES[action]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    setReactionType(action)
    setReactionMessage(randomMessage)
    setShowReaction(true)

    // Execute the action
    callback()

    // Auto-close after 2.5 seconds
    setTimeout(() => {
      setShowReaction(false)
      setReactionType(null)
    }, 2500)
  }

  return (
    <AppShell showTabBar={true}>
      <div style={{ padding: theme.spacing.lg }}>
        {/* Large Cat Avatar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: theme.spacing.lg,
          }}
        >
          <CatAvatar color={onboarding.catColor} mood={getCatMood()} size={200} />
        </div>

        {/* Cat Name and State */}
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
          <h1
            style={{
              fontSize: theme.typography.heading1.fontSize,
              fontWeight: theme.typography.heading1.fontWeight,
              color: theme.palette.textPrimary,
              marginBottom: theme.spacing.xs,
            }}
          >
            {cat.name || 'Your Cat'}
          </h1>
          <p
            style={{
              fontSize: theme.typography.body.fontSize,
              color: theme.palette.textSecondary,
              textTransform: 'capitalize',
            }}
          >
            Feeling {cat.state}
          </p>
        </div>

        {/* Stats Card */}
        <Card style={{ marginBottom: theme.spacing.lg }}>
          <h3
            style={{
              fontSize: theme.typography.heading3.fontSize,
              fontWeight: theme.typography.heading3.fontWeight,
              color: theme.palette.textPrimary,
              marginBottom: theme.spacing.md,
            }}
          >
            Stats
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.sm,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: theme.typography.body.fontSize,
                  color: theme.palette.textSecondary,
                }}
              >
                Days together
              </span>
              <span
                style={{
                  fontSize: theme.typography.body.fontSize,
                  fontWeight: theme.typography.label.fontWeight,
                  color: theme.palette.textPrimary,
                }}
              >
                {cat.daysActive}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: theme.typography.body.fontSize,
                  color: theme.palette.textSecondary,
                }}
              >
                Happiness
              </span>
              <span
                style={{
                  fontSize: theme.typography.body.fontSize,
                  fontWeight: theme.typography.label.fontWeight,
                  color: theme.palette.textPrimary,
                }}
              >
                {cat.happiness} / 100
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: theme.typography.body.fontSize,
                  color: theme.palette.textSecondary,
                }}
              >
                Tasks completed today
              </span>
              <span
                style={{
                  fontSize: theme.typography.body.fontSize,
                  fontWeight: theme.typography.label.fontWeight,
                  color: theme.palette.textPrimary,
                }}
              >
                {tasks.completedCount}
              </span>
            </div>
          </div>
        </Card>

        {/* Care Actions */}
        <CatActions
          feedUnlocked={cat.canFeed}
          brushUnlocked={cat.canBrush}
          playUnlocked={cat.canPlay}
          feedDone={cat.fedToday}
          brushDone={cat.brushedToday}
          playDone={cat.playedToday}
          onFeed={() => handleAction('feed', cat.feed)}
          onBrush={() => handleAction('brush', cat.brush)}
          onPlay={() => handleAction('play', cat.play)}
        />
      </div>

      {/* Fullscreen Reaction Overlay */}
      {showReaction && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.xl,
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={() => setShowReaction(false)}
        >
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes bounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
              }
              .reaction-cat {
                animation: bounce 0.6s ease infinite;
              }
            `}
          </style>
          <div className="reaction-cat">
            <CatAvatar
              color={onboarding.catColor}
              mood={getActionMood()}
              size={220}
            />
          </div>

          <div
            style={{
              backgroundColor: theme.palette.surface,
              padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
              borderRadius: theme.radii.card,
              boxShadow: theme.shadows.elevated,
              maxWidth: '300px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: theme.typography.heading3.fontSize,
                color: theme.palette.textPrimary,
                margin: 0,
              }}
            >
              {reactionMessage}
            </p>
          </div>

          <Button variant="ghost" onClick={() => setShowReaction(false)}>
            Close
          </Button>
        </div>
      )}
    </AppShell>
  )
}
