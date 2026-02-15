/**
 * OnboardingLayout Component
 * Layout for onboarding steps with progress bar and back button
 */

import { ReactNode } from 'react'
import { ProgressBar, Button } from '@/components/ui'
import { theme } from '@/lib/theme'

interface OnboardingLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps?: number
  onBack?: () => void
  showBackButton?: boolean
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps = 4,
  onBack,
  showBackButton = true,
}: OnboardingLayoutProps) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background,
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: theme.palette.background,
          padding: theme.spacing.md,
        }}
      >
        <div style={{ maxWidth: '430px', margin: '0 auto' }}>
          <ProgressBar
            current={currentStep}
            total={totalSteps}
            style={{ marginBottom: theme.spacing.sm }}
          />
          <p
            style={{
              fontSize: theme.typography.caption.fontSize,
              color: theme.palette.textSecondary,
              textAlign: 'center',
            }}
          >
            Step {currentStep} of {totalSteps}
          </p>
        </div>
      </div>

      {/* Back button */}
      {showBackButton && onBack && currentStep > 1 && (
        <div
          style={{
            maxWidth: '430px',
            margin: '0 auto',
            padding: `0 ${theme.spacing.md}`,
            marginBottom: theme.spacing.md,
          }}
        >
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        </div>
      )}

      {/* Main content */}
      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '430px',
          margin: '0 auto',
          padding: theme.spacing.lg,
        }}
      >
        {children}
      </main>
    </div>
  )
}
