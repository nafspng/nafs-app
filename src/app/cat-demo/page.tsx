'use client'

/**
 * Cat Avatar Demo Page
 * Showcase all color variants and mood states
 */

import { CatAvatar, CatColor, CatMood } from '@/components/cat'
import { theme } from '@/lib/theme'

export default function CatDemoPage() {
  const colors: CatColor[] = ['cream', 'ginger', 'gray', 'black', 'calico']
  const moods: CatMood[] = ['idle', 'happy', 'sleepy', 'needy', 'content']

  return (
    <main
      style={{
        padding: theme.spacing.lg,
        maxWidth: '100%',
        margin: '0 auto',
        backgroundColor: theme.palette.background,
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: theme.spacing.xl }}>
          <h1
            style={{
              fontSize: theme.typography.heading1.fontSize,
              fontWeight: theme.typography.heading1.fontWeight,
              color: theme.palette.textPrimary,
              marginBottom: theme.spacing.sm,
            }}
          >
            🐱 Cat Avatar Demo
          </h1>
          <p
            style={{
              fontSize: theme.typography.body.fontSize,
              color: theme.palette.textSecondary,
            }}
          >
            5 colors × 5 moods = 25 geometric cat variations
          </p>
        </div>

        {/* All moods for each color */}
        {colors.map((color) => (
          <div
            key={color}
            style={{
              marginBottom: theme.spacing.xxl,
              padding: theme.spacing.lg,
              backgroundColor: theme.palette.surface,
              borderRadius: theme.radii.card,
              boxShadow: theme.shadows.card,
            }}
          >
            <h2
              style={{
                fontSize: theme.typography.heading2.fontSize,
                fontWeight: theme.typography.heading2.fontWeight,
                color: theme.palette.textPrimary,
                marginBottom: theme.spacing.lg,
                textTransform: 'capitalize',
              }}
            >
              {color} Cat
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: theme.spacing.lg,
              }}
            >
              {moods.map((mood) => (
                <div
                  key={`${color}-${mood}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    padding: theme.spacing.md,
                    backgroundColor: theme.palette.surfaceWarm,
                    borderRadius: theme.radii.card,
                  }}
                >
                  <CatAvatar color={color} mood={mood} size={180} />
                  <span
                    style={{
                      fontSize: theme.typography.label.fontSize,
                      fontWeight: theme.typography.label.fontWeight,
                      color: theme.palette.textSecondary,
                      textTransform: 'capitalize',
                    }}
                  >
                    {mood}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Size variations */}
        <div
          style={{
            marginBottom: theme.spacing.xxl,
            padding: theme.spacing.lg,
            backgroundColor: theme.palette.surface,
            borderRadius: theme.radii.card,
            boxShadow: theme.shadows.card,
          }}
        >
          <h2
            style={{
              fontSize: theme.typography.heading2.fontSize,
              fontWeight: theme.typography.heading2.fontWeight,
              color: theme.palette.textPrimary,
              marginBottom: theme.spacing.lg,
            }}
          >
            Size Variations
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.xl,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <CatAvatar color="calico" mood="happy" size={100} />
              <p
                style={{
                  fontSize: theme.typography.caption.fontSize,
                  color: theme.palette.textSecondary,
                  marginTop: theme.spacing.sm,
                }}
              >
                100px
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <CatAvatar color="calico" mood="happy" size={150} />
              <p
                style={{
                  fontSize: theme.typography.caption.fontSize,
                  color: theme.palette.textSecondary,
                  marginTop: theme.spacing.sm,
                }}
              >
                150px
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <CatAvatar color="calico" mood="happy" size={200} />
              <p
                style={{
                  fontSize: theme.typography.caption.fontSize,
                  color: theme.palette.textSecondary,
                  marginTop: theme.spacing.sm,
                }}
              >
                200px (default)
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <CatAvatar color="calico" mood="happy" size={250} />
              <p
                style={{
                  fontSize: theme.typography.caption.fontSize,
                  color: theme.palette.textSecondary,
                  marginTop: theme.spacing.sm,
                }}
              >
                250px
              </p>
            </div>
          </div>
        </div>

        {/* Usage guide */}
        <div
          style={{
            padding: theme.spacing.lg,
            backgroundColor: theme.palette.surfaceWarm,
            borderRadius: theme.radii.card,
            border: `2px solid ${theme.palette.primary}`,
          }}
        >
          <h3
            style={{
              fontSize: theme.typography.heading3.fontSize,
              fontWeight: theme.typography.heading3.fontWeight,
              color: theme.palette.textPrimary,
              marginBottom: theme.spacing.md,
            }}
          >
            Usage
          </h3>
          <pre
            style={{
              fontSize: theme.typography.bodySmall.fontSize,
              color: theme.palette.textPrimary,
              backgroundColor: theme.palette.surface,
              padding: theme.spacing.md,
              borderRadius: theme.radii.sm,
              overflow: 'auto',
              fontFamily: 'monospace',
            }}
          >
            {`import { CatAvatar } from '@/components/cat'

<CatAvatar
  color="cream"     // cream | ginger | gray | black | calico
  mood="happy"      // idle | happy | sleepy | needy | content
  size={200}        // number (default: 200)
/>`}
          </pre>
        </div>
      </div>
    </main>
  )
}
