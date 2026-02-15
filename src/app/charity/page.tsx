'use client'

/**
 * Charity Commitment Screen
 * Personal charity tracker (no payment processing)
 */

import { useState, useEffect } from 'react'
import { AppShell } from '@/components/layout'
import { Card, Toggle, Input, Button } from '@/components/ui'
import { getCharityCommitment, setCharityCommitment } from '@/lib/storage'
import { theme } from '@/lib/theme'
import { CHARITY_CONTENT } from '@/lib/constants'
import type { CharityCommitment } from '@/lib/types'

export default function CharityPage() {
  const [commitment, setCommitmentState] = useState<CharityCommitment>({
    enabled: false,
    amount: null,
    currency: 'GBP',
  })
  const [customAmount, setCustomAmount] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load commitment from storage
  useEffect(() => {
    const loaded = getCharityCommitment()
    setCommitmentState(loaded)
    if (loaded.amount) {
      setCustomAmount(loaded.amount.toString())
    }
    setIsLoaded(true)
  }, [])

  // Save commitment to storage
  useEffect(() => {
    if (isLoaded) {
      setCharityCommitment(commitment)
    }
  }, [commitment, isLoaded])

  const handleToggle = (checked: boolean) => {
    setCommitmentState((prev) => ({ ...prev, enabled: checked }))
  }

  const handlePresetAmount = (amount: number) => {
    setCommitmentState((prev) => ({ ...prev, amount }))
    setCustomAmount(amount.toString())
  }

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      setCommitmentState((prev) => ({ ...prev, amount: numValue }))
    }
  }

  return (
    <AppShell showTabBar={true}>
      <div
        style={{
          padding: theme.spacing.lg,
          paddingBottom: theme.spacing.xxl,
        }}
      >
        {/* Hero Card */}
        <Card
          background="surfaceWarm"
          style={{ marginBottom: theme.spacing.lg, textAlign: 'center' }}
        >
          {/* Cat with charity box illustration (simplified) */}
          <div
            style={{
              fontSize: '80px',
              marginBottom: theme.spacing.md,
            }}
          >
            🐱💝
          </div>

          <h1
            style={{
              fontSize: theme.typography.heading2.fontSize,
              fontWeight: theme.typography.heading2.fontWeight,
              color: theme.palette.textPrimary,
              marginBottom: theme.spacing.sm,
            }}
          >
            {CHARITY_CONTENT.title}
          </h1>

          <p
            style={{
              fontSize: theme.typography.bodySmall.fontSize,
              color: theme.palette.textSecondary,
              fontStyle: 'italic',
              lineHeight: '1.6',
            }}
          >
            {CHARITY_CONTENT.hadith}
          </p>
        </Card>

        {/* Commitment Card */}
        <Card style={{ marginBottom: theme.spacing.lg }}>
          <h2
            style={{
              fontSize: theme.typography.heading3.fontSize,
              fontWeight: theme.typography.heading3.fontWeight,
              color: theme.palette.textPrimary,
              marginBottom: theme.spacing.md,
            }}
          >
            Set a Monthly Commitment
          </h2>

          <Toggle
            label="Track monthly charity"
            checked={commitment.enabled}
            onChange={(e) => handleToggle(e.target.checked)}
            style={{ marginBottom: theme.spacing.lg }}
          />

          {commitment.enabled && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.md,
              }}
            >
              {/* Preset amounts */}
              <div>
                <label
                  style={{
                    fontSize: theme.typography.label.fontSize,
                    fontWeight: theme.typography.label.fontWeight,
                    color: theme.palette.textPrimary,
                    display: 'block',
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  Choose an amount
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: theme.spacing.sm,
                  }}
                >
                  {[1, 5, 10, 20].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handlePresetAmount(amount)}
                      style={{
                        padding: theme.spacing.md,
                        borderRadius: theme.radii.card,
                        border: `2px solid ${
                          commitment.amount === amount
                            ? theme.palette.primary
                            : theme.palette.disabled
                        }`,
                        backgroundColor:
                          commitment.amount === amount
                            ? theme.palette.surfaceWarm
                            : theme.palette.surface,
                        fontSize: theme.typography.body.fontSize,
                        fontWeight: theme.typography.label.fontWeight,
                        color: theme.palette.textPrimary,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      £{amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom amount */}
              <Input
                label="Or enter custom amount"
                type="number"
                placeholder="Enter amount..."
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
              />

              {/* Disclaimer */}
              <p
                style={{
                  fontSize: theme.typography.caption.fontSize,
                  color: theme.palette.textSecondary,
                  fontStyle: 'italic',
                  textAlign: 'center',
                  marginTop: theme.spacing.sm,
                }}
              >
                This is a personal commitment tracker — no payment is processed
              </p>
            </div>
          )}
        </Card>

        {/* Impact Areas Grid */}
        <div>
          <h2
            style={{
              fontSize: theme.typography.heading3.fontSize,
              fontWeight: theme.typography.heading3.fontWeight,
              color: theme.palette.textPrimary,
              marginBottom: theme.spacing.md,
            }}
          >
            Where Your Charity Can Help
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: theme.spacing.md,
            }}
          >
            {CHARITY_CONTENT.impactAreas.map((area) => (
              <Card
                key={area.id}
                background="surface"
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing.sm,
                }}
              >
                <div style={{ fontSize: '40px' }}>{area.emoji}</div>
                <h3
                  style={{
                    fontSize: theme.typography.body.fontSize,
                    fontWeight: theme.typography.label.fontWeight,
                    color: theme.palette.textPrimary,
                    margin: 0,
                  }}
                >
                  {area.title}
                </h3>
                <p
                  style={{
                    fontSize: theme.typography.bodySmall.fontSize,
                    color: theme.palette.textSecondary,
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  {area.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
