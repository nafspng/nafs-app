'use client'

/**
 * Onboarding Page
 * 4-step flow: Name → Color → Focus Areas → Ready
 */

import { useRouter } from 'next/navigation'
import { Button, Input, SelectionCard, Card } from '@/components/ui'
import { CatAvatar } from '@/components/cat'
import { OnboardingLayout } from '@/components/layout'
import { useOnboarding } from '@/hooks'
import { theme } from '@/lib/theme'
import { CAT_COLORS, FOCUS_AREAS, STARTER_TASKS_PREVIEW } from '@/lib/constants'

export default function OnboardingPage() {
  const router = useRouter()
  const onboarding = useOnboarding()

  const handleComplete = () => {
    onboarding.completeOnboarding()
    router.push('/home')
  }

  return (
    <OnboardingLayout
      currentStep={onboarding.step}
      totalSteps={4}
      onBack={onboarding.previousStep}
      showBackButton={onboarding.step > 1}
    >
      {/* Step 1: Name your cat */}
      {onboarding.step === 1 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing.xl,
          }}
        >
          <CatAvatar color="cream" mood="happy" size={180} />

          <div
            style={{
              backgroundColor: theme.palette.surface,
              padding: `${theme.spacing.md} ${theme.spacing.lg}`,
              borderRadius: theme.radii.card,
              boxShadow: theme.shadows.card,
              position: 'relative',
              maxWidth: '280px',
            }}
          >
            <p
              style={{
                fontSize: theme.typography.body.fontSize,
                color: theme.palette.textPrimary,
                textAlign: 'center',
                margin: 0,
              }}
            >
              Assalamu alaykum! What&apos;s my name?
            </p>
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

          <Input
            placeholder="Enter your cat's name..."
            value={onboarding.catName}
            onChange={(e) => onboarding.setCatName(e.target.value)}
            style={{ width: '100%' }}
          />

          <Button
            variant="primary"
            fullWidth
            disabled={onboarding.catName.length === 0}
            onClick={onboarding.nextStep}
          >
            Next
          </Button>
        </div>
      )}

      {/* Step 2: Choose color */}
      {onboarding.step === 2 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing.xl,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: theme.typography.heading2.fontSize,
                fontWeight: theme.typography.heading2.fontWeight,
                color: theme.palette.textPrimary,
                marginBottom: theme.spacing.sm,
              }}
            >
              Choose {onboarding.catName}&apos;s color
            </h2>
            <p
              style={{
                fontSize: theme.typography.bodySmall.fontSize,
                color: theme.palette.textSecondary,
              }}
            >
              Pick a color that speaks to you
            </p>
          </div>

          {/* Color options in a grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: theme.spacing.lg,
              width: '100%',
              maxWidth: '320px',
            }}
          >
            {CAT_COLORS.map((colorOption) => (
              <button
                key={colorOption.id}
                onClick={() => onboarding.setCatColor(colorOption.id as any)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  padding: theme.spacing.md,
                  borderRadius: theme.radii.card,
                  border: `3px solid ${
                    onboarding.catColor === colorOption.id
                      ? theme.palette.primary
                      : 'transparent'
                  }`,
                  backgroundColor:
                    onboarding.catColor === colorOption.id
                      ? theme.palette.surfaceWarm
                      : theme.palette.surface,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: theme.radii.round,
                    backgroundColor: colorOption.hex,
                    boxShadow: theme.shadows.subtle,
                  }}
                />
                <span
                  style={{
                    fontSize: theme.typography.bodySmall.fontSize,
                    color: theme.palette.textPrimary,
                    fontWeight: theme.typography.label.fontWeight,
                  }}
                >
                  {colorOption.label}
                </span>
              </button>
            ))}
          </div>

          <Button variant="primary" fullWidth onClick={onboarding.nextStep}>
            Next
          </Button>
        </div>
      )}

      {/* Step 3: Focus areas */}
      {onboarding.step === 3 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.lg,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <CatAvatar
              color={onboarding.catColor}
              mood="content"
              size={120}
              style={{ marginBottom: theme.spacing.md }}
            />
            <h2
              style={{
                fontSize: theme.typography.heading2.fontSize,
                fontWeight: theme.typography.heading2.fontWeight,
                color: theme.palette.textPrimary,
                marginBottom: theme.spacing.sm,
              }}
            >
              What would you like to focus on?
            </h2>
            <p
              style={{
                fontSize: theme.typography.bodySmall.fontSize,
                color: theme.palette.textSecondary,
              }}
            >
              Select all that apply
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md,
            }}
          >
            {FOCUS_AREAS.map((area) => (
              <SelectionCard
                key={area.id}
                emoji={area.emoji}
                label={area.label}
                selected={onboarding.focusAreas.includes(area.id)}
                onClick={() => onboarding.toggleFocusArea(area.id)}
              />
            ))}
          </div>

          <Button variant="primary" fullWidth onClick={onboarding.nextStep}>
            Next
          </Button>
        </div>
      )}

      {/* Step 4: Ready to begin */}
      {onboarding.step === 4 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing.xl,
          }}
        >
          <CatAvatar color={onboarding.catColor} mood="happy" size={160} />

          <div
            style={{
              backgroundColor: theme.palette.surface,
              padding: `${theme.spacing.md} ${theme.spacing.lg}`,
              borderRadius: theme.radii.card,
              boxShadow: theme.shadows.card,
              position: 'relative',
              maxWidth: '280px',
            }}
          >
            <p
              style={{
                fontSize: theme.typography.body.fontSize,
                color: theme.palette.textPrimary,
                textAlign: 'center',
                margin: 0,
              }}
            >
              Bismillah, let&apos;s begin!
            </p>
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

          {/* Notepad card */}
          <Card
            background="surfaceWarm"
            style={{
              width: '100%',
              position: 'relative',
              border: `2px solid ${theme.palette.accent}`,
            }}
          >
            {/* Binding tabs */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: theme.spacing.lg,
                right: theme.spacing.lg,
                height: '8px',
                display: 'flex',
                gap: theme.spacing.md,
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '40px',
                    height: '8px',
                    backgroundColor: theme.palette.accent,
                    borderRadius: `0 0 ${theme.radii.xs} ${theme.radii.xs}`,
                  }}
                />
              ))}
            </div>

            <h3
              style={{
                fontSize: theme.typography.heading3.fontSize,
                fontWeight: theme.typography.heading3.fontWeight,
                color: theme.palette.textPrimary,
                marginTop: theme.spacing.md,
                marginBottom: theme.spacing.xs,
              }}
            >
              {onboarding.catName}&apos;s daily plan
            </h3>
            <p
              style={{
                fontSize: theme.typography.bodySmall.fontSize,
                color: theme.palette.textSecondary,
                marginBottom: theme.spacing.md,
              }}
            >
              Start with these daily goals!
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.sm,
              }}
            >
              {STARTER_TASKS_PREVIEW.map((task, index) => (
                <div
                  key={index}
                  style={{
                    padding: theme.spacing.sm,
                    borderBottom:
                      index < STARTER_TASKS_PREVIEW.length - 1
                        ? `1px solid ${theme.palette.disabled}`
                        : 'none',
                  }}
                >
                  <p
                    style={{
                      fontSize: theme.typography.body.fontSize,
                      color: theme.palette.textPrimary,
                      margin: 0,
                    }}
                  >
                    {task}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Button variant="primary" fullWidth onClick={handleComplete}>
            Let&apos;s begin!
          </Button>
        </div>
      )}
    </OnboardingLayout>
  )
}
