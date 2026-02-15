'use client'

/**
 * Hooks Demo Page
 * Test all three state management hooks
 */

import { useOnboarding, useCat, useTasks } from '@/hooks'
import { Button, Card, ProgressBar, Checkbox } from '@/components/ui'
import { CatAvatar } from '@/components/cat'
import { theme } from '@/lib/theme'
import { FOCUS_AREAS, CAT_COLORS, TASK_CATEGORIES } from '@/lib/constants'

export default function HooksDemoPage() {
  // Initialize hooks
  const onboarding = useOnboarding()
  const tasks = useTasks({ focusAreas: onboarding.focusAreas })
  const cat = useCat({ tasksCompletedToday: tasks.completedCount })

  return (
    <main
      style={{
        padding: theme.spacing.lg,
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: theme.palette.background,
        minHeight: '100vh',
      }}
    >
      <div style={{ marginBottom: theme.spacing.xl }}>
        <h1
          style={{
            fontSize: theme.typography.heading1.fontSize,
            fontWeight: theme.typography.heading1.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.sm,
          }}
        >
          🎣 Hooks Demo
        </h1>
        <p
          style={{
            fontSize: theme.typography.bodySmall.fontSize,
            color: theme.palette.textSecondary,
          }}
        >
          Test state management with localStorage persistence
        </p>
      </div>

      {/* Onboarding Hook */}
      <Card style={{ marginBottom: theme.spacing.lg }}>
        <h2
          style={{
            fontSize: theme.typography.heading2.fontSize,
            fontWeight: theme.typography.heading2.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.md,
          }}
        >
          useOnboarding
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <div>
            <p style={{ fontSize: theme.typography.label.fontSize, marginBottom: theme.spacing.xs }}>
              Status: {onboarding.completed ? '✅ Completed' : '⏳ In Progress'}
            </p>
            <p style={{ fontSize: theme.typography.label.fontSize, marginBottom: theme.spacing.xs }}>
              Step: {onboarding.step} / 4
            </p>
            <p style={{ fontSize: theme.typography.label.fontSize, marginBottom: theme.spacing.xs }}>
              Cat Name: {onboarding.catName || '(none)'}
            </p>
            <p style={{ fontSize: theme.typography.label.fontSize, marginBottom: theme.spacing.xs }}>
              Cat Color: {onboarding.catColor}
            </p>
            <p style={{ fontSize: theme.typography.label.fontSize }}>
              Focus Areas: {onboarding.focusAreas.length} selected
            </p>
          </div>

          <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={onboarding.previousStep} disabled={onboarding.step === 1}>
              Previous
            </Button>
            <Button variant="secondary" onClick={onboarding.nextStep} disabled={onboarding.step === 4}>
              Next
            </Button>
            <Button
              variant="primary"
              onClick={() => onboarding.setCatName('Whiskers')}
            >
              Set Name
            </Button>
            <Button variant="ghost" onClick={onboarding.resetOnboarding}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Tasks Hook */}
      <Card style={{ marginBottom: theme.spacing.lg }}>
        <h2
          style={{
            fontSize: theme.typography.heading2.fontSize,
            fontWeight: theme.typography.heading2.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.md,
          }}
        >
          useTasks
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <div>
            <p
              style={{
                fontSize: theme.typography.bodySmall.fontSize,
                color: theme.palette.textSecondary,
                marginBottom: theme.spacing.sm,
              }}
            >
              Today: {tasks.currentDate}
            </p>
            <ProgressBar
              current={tasks.completedCount}
              total={tasks.totalCount}
              showLabel
              style={{ marginBottom: theme.spacing.md }}
            />
            <p style={{ fontSize: theme.typography.label.fontSize, marginBottom: theme.spacing.xs }}>
              Goals left: {tasks.goalsLeft}
            </p>
            <p style={{ fontSize: theme.typography.label.fontSize }}>
              Completion: {tasks.completionPercentage.toFixed(0)}%
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
            {Object.entries(tasks.tasksByCategory).map(([category, categoryTasks]) => (
              <div key={category}>
                <h3
                  style={{
                    fontSize: theme.typography.heading3.fontSize,
                    color: theme.palette.textPrimary,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  {TASK_CATEGORIES[category as keyof typeof TASK_CATEGORIES]?.label || category}
                </h3>
                {categoryTasks.slice(0, 2).map((task) => (
                  <Checkbox
                    key={task.id}
                    label={`${task.emoji} ${task.label} (${task.points}❤️)`}
                    checked={task.completed}
                    onChange={() => tasks.toggleTask(task.id)}
                    style={{ marginBottom: theme.spacing.xs }}
                  />
                ))}
              </div>
            ))}
          </div>

          <Button variant="secondary" onClick={tasks.manualRefresh} fullWidth>
            Manual Refresh
          </Button>
        </div>
      </Card>

      {/* Cat Hook */}
      <Card style={{ marginBottom: theme.spacing.lg }}>
        <h2
          style={{
            fontSize: theme.typography.heading2.fontSize,
            fontWeight: theme.typography.heading2.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.md,
          }}
        >
          useCat
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CatAvatar
              color={cat.color}
              mood={
                cat.state === 'happy'
                  ? 'happy'
                  : cat.state === 'hungry'
                  ? 'needy'
                  : cat.state === 'messy'
                  ? 'sleepy'
                  : 'content'
              }
              size={150}
            />
          </div>

          <div>
            <p style={{ fontSize: theme.typography.label.fontSize, marginBottom: theme.spacing.xs }}>
              Name: {cat.name || '(unnamed)'}
            </p>
            <p style={{ fontSize: theme.typography.label.fontSize, marginBottom: theme.spacing.xs }}>
              State: {cat.state}
            </p>
            <p style={{ fontSize: theme.typography.label.fontSize, marginBottom: theme.spacing.xs }}>
              Days Active: {cat.daysActive}
            </p>
            <ProgressBar
              current={cat.happiness}
              total={100}
              showLabel
              style={{ marginTop: theme.spacing.sm }}
            />
          </div>

          <div>
            <p
              style={{
                fontSize: theme.typography.bodySmall.fontSize,
                color: theme.palette.textSecondary,
                marginBottom: theme.spacing.sm,
              }}
            >
              Care Status:
            </p>
            <div style={{ display: 'flex', gap: theme.spacing.md }}>
              <span style={{ fontSize: theme.typography.bodySmall.fontSize }}>
                Fed: {cat.fedToday ? '✅' : '❌'}
              </span>
              <span style={{ fontSize: theme.typography.bodySmall.fontSize }}>
                Brushed: {cat.brushedToday ? '✅' : '❌'}
              </span>
              <span style={{ fontSize: theme.typography.bodySmall.fontSize }}>
                Played: {cat.playedToday ? '✅' : '❌'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              onClick={cat.feed}
              disabled={!cat.canFeed || cat.fedToday}
            >
              🍽️ Feed {!cat.canFeed ? '(2 tasks)' : ''}
            </Button>
            <Button
              variant="primary"
              onClick={cat.brush}
              disabled={!cat.canBrush || cat.brushedToday}
            >
              🪥 Brush {!cat.canBrush ? '(4 tasks)' : ''}
            </Button>
            <Button
              variant="primary"
              onClick={cat.play}
              disabled={!cat.canPlay || cat.playedToday}
            >
              🎾 Play {!cat.canPlay ? '(6 tasks)' : ''}
            </Button>
          </div>

          {cat.shouldShowBanner && (
            <div
              style={{
                padding: theme.spacing.md,
                backgroundColor: theme.palette.primaryLight,
                borderRadius: theme.radii.card,
                border: `2px solid ${theme.palette.primary}`,
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: theme.typography.body.fontSize, color: theme.palette.textPrimary }}>
                🐱 {cat.name || 'Your cat'} wants attention!
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* localStorage Info */}
      <Card background="surfaceWarm">
        <h3
          style={{
            fontSize: theme.typography.heading3.fontSize,
            fontWeight: theme.typography.heading3.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.sm,
          }}
        >
          💾 Persistence Info
        </h3>
        <p
          style={{
            fontSize: theme.typography.bodySmall.fontSize,
            color: theme.palette.textSecondary,
            lineHeight: '1.6',
          }}
        >
          All state is automatically saved to localStorage with versioning. Try refreshing the page or
          closing and reopening the browser - your data persists!
        </p>
        <ul
          style={{
            fontSize: theme.typography.bodySmall.fontSize,
            color: theme.palette.textSecondary,
            marginTop: theme.spacing.sm,
            paddingLeft: theme.spacing.lg,
            lineHeight: '1.8',
          }}
        >
          <li>Tasks reset daily (check at midnight)</li>
          <li>Cat happiness decays each new day</li>
          <li>Visibility API detects tab return</li>
          <li>Focus areas personalize task order</li>
        </ul>
      </Card>
    </main>
  )
}
