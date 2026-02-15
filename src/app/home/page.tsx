'use client'

/**
 * Home Screen
 * Main dashboard with cat scene, tasks, and happiness tracking
 */

import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout'
import { CatScene } from '@/components/cat'
import { TaskList } from '@/components/tasks'
import { ProgressBar, Card } from '@/components/ui'
import { useOnboarding, useCat, useTasks } from '@/hooks'
import { theme } from '@/lib/theme'

export default function HomePage() {
  const router = useRouter()
  const onboarding = useOnboarding()
  const tasks = useTasks({ focusAreas: onboarding.focusAreas })
  const cat = useCat({ tasksCompletedToday: tasks.completedCount })

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

  return (
    <AppShell showTabBar={true}>
      {/* Header with hamburger menu placeholder */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: theme.spacing.md,
        }}
      >
        <button
          type="button"
          style={{
            fontSize: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: theme.spacing.sm,
          }}
          aria-label="Settings"
          onClick={() => router.push('/settings')}
        >
          ☰
        </button>
      </div>

      {/* Cat Scene */}
      <CatScene
        catColor={onboarding.catColor}
        catMood={getCatMood()}
        showSpeechBubble={cat.shouldShowBanner}
        speechText={`${cat.name || 'Your cat'} wants attention! Feed · Brush · Play`}
        style={{ marginBottom: theme.spacing.lg }}
      />

      {/* Happiness Bar */}
      <div style={{ padding: `0 ${theme.spacing.lg}`, marginBottom: theme.spacing.lg }}>
        <Card>
          <div style={{ marginBottom: theme.spacing.sm }}>
            <h3
              style={{
                fontSize: theme.typography.label.fontSize,
                fontWeight: theme.typography.label.fontWeight,
                color: theme.palette.textPrimary,
                margin: 0,
                marginBottom: theme.spacing.xs,
              }}
            >
              {cat.name || 'Your cat'}&apos;s Happiness
            </h3>
            <ProgressBar current={cat.happiness} total={100} showLabel />
          </div>
          <p
            style={{
              fontSize: theme.typography.bodySmall.fontSize,
              color: theme.palette.textSecondary,
              margin: 0,
            }}
          >
            State: {cat.state}
          </p>
        </Card>
      </div>

      {/* Goals Left Header */}
      <div
        style={{
          padding: `0 ${theme.spacing.lg}`,
          marginBottom: theme.spacing.md,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2
          style={{
            fontSize: theme.typography.heading2.fontSize,
            fontWeight: theme.typography.heading2.fontWeight,
            color: theme.palette.textPrimary,
            margin: 0,
          }}
        >
          {tasks.goalsLeft} goals left for today!
        </h2>
        {/* Decorative filter/grid icons placeholder */}
        <div style={{ display: 'flex', gap: theme.spacing.sm, opacity: 0.3 }}>
          <span style={{ fontSize: '20px' }}>⋮</span>
          <span style={{ fontSize: '20px' }}>▦</span>
        </div>
      </div>

      {/* Task List */}
      <div style={{ padding: `0 ${theme.spacing.lg}` }}>
        <TaskList
          tasks={tasks.tasks}
          currentDate={tasks.currentDate}
          onTaskToggle={tasks.toggleTask}
        />
      </div>

      {/* Persistent Banner (when cat wants attention) */}
      {cat.shouldShowBanner && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px', // Above tab bar
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '390px',
            width: 'calc(100% - 32px)',
            zIndex: 50,
          }}
        >
          <Card
            style={{
              backgroundColor: theme.palette.primaryLight,
              border: `2px solid ${theme.palette.primary}`,
              textAlign: 'center',
              animation: 'slideUp 0.3s ease',
            }}
          >
            <style>
              {`
                @keyframes slideUp {
                  from {
                    transform: translateY(100%);
                    opacity: 0;
                  }
                  to {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }
              `}
            </style>
            <p
              style={{
                fontSize: theme.typography.body.fontSize,
                fontWeight: theme.typography.label.fontWeight,
                color: theme.palette.textPrimary,
                margin: 0,
              }}
            >
              🐱 {cat.name || 'Your cat'} wants attention!
            </p>
            <p
              style={{
                fontSize: theme.typography.bodySmall.fontSize,
                color: theme.palette.textSecondary,
                margin: 0,
                marginTop: theme.spacing.xs,
              }}
            >
              Complete {cat.canFeed ? '' : '2'} tasks to feed
              {cat.canBrush ? ', brush' : ''}
              {cat.canPlay ? ', or play' : ''}
            </p>
          </Card>
        </div>
      )}
    </AppShell>
  )
}
