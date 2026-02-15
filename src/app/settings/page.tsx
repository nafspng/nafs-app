'use client'

/**
 * Settings Screen
 * App preferences with coming-soon states
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Toggle, Button } from '@/components/ui'
import { getSettings, setSettings as saveSettings } from '@/lib/storage'
import { theme } from '@/lib/theme'
import type { Settings } from '@/lib/types'

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettingsState] = useState<Settings>({
    prayerReminders: false,
    catCareReminders: false,
    prayerMethod: null,
    location: null,
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load settings from storage
  useEffect(() => {
    const loaded = getSettings()
    setSettingsState(loaded)
    setIsLoaded(true)
  }, [])

  // Save settings to storage
  useEffect(() => {
    if (isLoaded) {
      saveSettings(settings)
    }
  }, [settings, isLoaded])

  const handleToggle = (key: keyof Settings) => (checked: boolean) => {
    setSettingsState((prev) => ({ ...prev, [key]: checked }))
  }

  // Coming soon item style
  const comingSoonStyle = {
    opacity: 0.5,
    cursor: 'default',
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: theme.palette.background,
        paddingBottom: theme.spacing.xxl,
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: theme.palette.background,
          borderBottom: `1px solid ${theme.palette.disabled}`,
          padding: theme.spacing.md,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '430px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md,
          }}
        >
          <Button variant="ghost" onClick={() => router.back()}>
            ← Back
          </Button>
          <h1
            style={{
              fontSize: theme.typography.heading2.fontSize,
              fontWeight: theme.typography.heading2.fontWeight,
              color: theme.palette.textPrimary,
              margin: 0,
            }}
          >
            Settings
          </h1>
        </div>
      </div>

      {/* Settings Content */}
      <div
        style={{
          maxWidth: '430px',
          margin: '0 auto',
          padding: theme.spacing.lg,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.xl,
        }}
      >
        {/* REMINDERS Section */}
        <div>
          <h2
            style={{
              fontSize: theme.typography.label.fontSize,
              fontWeight: theme.typography.label.fontWeight,
              color: theme.palette.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: theme.spacing.md,
            }}
          >
            Reminders
          </h2>

          <Card style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
            <Toggle
              label="Prayer reminders"
              checked={settings.prayerReminders}
              onChange={(e) => handleToggle('prayerReminders')(e.target.checked)}
            />

            <Toggle
              label="Cat care reminders"
              checked={settings.catCareReminders}
              onChange={(e) => handleToggle('catCareReminders')(e.target.checked)}
            />

            {/* Coming soon item */}
            <div style={comingSoonStyle}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                  <span
                    style={{
                      fontSize: theme.typography.body.fontSize,
                      color: theme.palette.textPrimary,
                    }}
                  >
                    🔒 Reminder times
                  </span>
                </div>
                <span
                  style={{
                    fontSize: theme.typography.caption.fontSize,
                    color: theme.palette.disabledText,
                    fontStyle: 'italic',
                  }}
                >
                  Coming soon
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* PREFERENCES Section */}
        <div>
          <h2
            style={{
              fontSize: theme.typography.label.fontSize,
              fontWeight: theme.typography.label.fontWeight,
              color: theme.palette.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: theme.spacing.md,
            }}
          >
            Preferences
          </h2>

          <Card style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
            {/* Coming soon items */}
            <div style={comingSoonStyle}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                  <span
                    style={{
                      fontSize: theme.typography.body.fontSize,
                      color: theme.palette.textPrimary,
                    }}
                  >
                    🔒 Prayer calculation method
                  </span>
                </div>
                <span
                  style={{
                    fontSize: theme.typography.caption.fontSize,
                    color: theme.palette.disabledText,
                    fontStyle: 'italic',
                  }}
                >
                  Coming soon
                </span>
              </div>
            </div>

            <div style={comingSoonStyle}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                  <span
                    style={{
                      fontSize: theme.typography.body.fontSize,
                      color: theme.palette.textPrimary,
                    }}
                  >
                    🔒 Location
                  </span>
                </div>
                <span
                  style={{
                    fontSize: theme.typography.caption.fontSize,
                    color: theme.palette.disabledText,
                    fontStyle: 'italic',
                  }}
                >
                  Coming soon
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* ABOUT Section */}
        <div>
          <h2
            style={{
              fontSize: theme.typography.label.fontSize,
              fontWeight: theme.typography.label.fontWeight,
              color: theme.palette.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: theme.spacing.md,
            }}
          >
            About
          </h2>

          <Card style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
            {/* Coming soon items */}
            <div style={comingSoonStyle}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontSize: theme.typography.body.fontSize,
                    color: theme.palette.textPrimary,
                  }}
                >
                  🔒 Help & FAQ
                </span>
                <span
                  style={{
                    fontSize: theme.typography.caption.fontSize,
                    color: theme.palette.disabledText,
                    fontStyle: 'italic',
                  }}
                >
                  Coming soon
                </span>
              </div>
            </div>

            <div style={comingSoonStyle}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontSize: theme.typography.body.fontSize,
                    color: theme.palette.textPrimary,
                  }}
                >
                  🔒 About Nafs
                </span>
                <span
                  style={{
                    fontSize: theme.typography.caption.fontSize,
                    color: theme.palette.disabledText,
                    fontStyle: 'italic',
                  }}
                >
                  Coming soon
                </span>
              </div>
            </div>

            <div style={comingSoonStyle}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontSize: theme.typography.body.fontSize,
                    color: theme.palette.textPrimary,
                  }}
                >
                  🔒 Send Feedback
                </span>
                <span
                  style={{
                    fontSize: theme.typography.caption.fontSize,
                    color: theme.palette.disabledText,
                    fontStyle: 'italic',
                  }}
                >
                  Coming soon
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', paddingTop: theme.spacing.lg }}>
          <p
            style={{
              fontSize: theme.typography.caption.fontSize,
              color: theme.palette.disabledText,
            }}
          >
            Nafs v1.0.0
          </p>
        </div>
      </div>
    </div>
  )
}
