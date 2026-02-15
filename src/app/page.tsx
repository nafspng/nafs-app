'use client'

/**
 * Welcome/Landing Page
 * Shows different options for new vs returning users
 */

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { CatScene } from '@/components/cat'
import { useOnboarding } from '@/hooks'
import { theme } from '@/lib/theme'

export default function WelcomePage() {
  const router = useRouter()
  const { completed, catName, isLoaded } = useOnboarding()

  // Auto-redirect returning users after 2 seconds (optional)
  useEffect(() => {
    if (isLoaded && completed && catName) {
      const timer = setTimeout(() => {
        router.push('/home')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, completed, catName, router])

  const isReturningUser = completed && catName

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background,
      }}
    >
      {/* Top 60% - Cat scene and branding */}
      <div
        style={{
          flex: '0 0 60%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing.lg,
        }}
      >
        <CatScene
          catColor="cream"
          catMood="content"
          showSpeechBubble={isReturningUser}
          speechText={`Welcome back! Ready to continue?`}
        />

        <h1
          style={{
            fontSize: theme.typography.heading1.fontSize,
            fontWeight: theme.typography.heading1.fontWeight,
            color: theme.palette.textPrimary,
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.sm,
            textAlign: 'center',
          }}
        >
          Nafs
        </h1>

        <p
          style={{
            fontSize: theme.typography.bodySmall.fontSize,
            color: theme.palette.textSecondary,
            textAlign: 'center',
          }}
        >
          Your daily faith companion
        </p>
      </div>

      {/* Bottom 40% - Action buttons */}
      <div
        style={{
          flex: '0 0 40%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: theme.spacing.xl,
          maxWidth: '430px',
          width: '100%',
          margin: '0 auto',
          gap: theme.spacing.md,
        }}
      >
        {!isReturningUser ? (
          // New user: only show "Meet your cat"
          <Button
            variant="primary"
            fullWidth
            onClick={() => router.push('/onboarding')}
          >
            Meet your cat
          </Button>
        ) : (
          // Returning user: show both buttons
          <>
            <Button
              variant="primary"
              fullWidth
              onClick={() => router.push('/home')}
            >
              Continue
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => router.push('/onboarding')}
            >
              Start over
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
