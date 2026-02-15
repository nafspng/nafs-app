'use client'

/**
 * UI Components Demo Page
 * Showcase all base components for review
 */

import { useState } from 'react'
import {
  Button,
  Card,
  Input,
  Checkbox,
  ProgressBar,
  SelectionCard,
  Toggle,
} from '@/components/ui'
import { theme } from '@/lib/theme'

export default function DemoPage() {
  const [inputValue, setInputValue] = useState('')
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [toggleChecked, setToggleChecked] = useState(false)
  const [selection1, setSelection1] = useState(false)
  const [selection2, setSelection2] = useState(true)
  const [selection3, setSelection3] = useState(false)

  return (
    <main
      style={{
        padding: theme.spacing.lg,
        maxWidth: '430px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.xl,
        backgroundColor: theme.palette.background,
        minHeight: '100vh',
      }}
    >
      <div>
        <h1
          style={{
            fontSize: theme.typography.heading1.fontSize,
            fontWeight: theme.typography.heading1.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.sm,
          }}
        >
          UI Components Demo
        </h1>
        <p
          style={{
            fontSize: theme.typography.bodySmall.fontSize,
            color: theme.palette.textSecondary,
          }}
        >
          Review all base components with warm Islamic theme
        </p>
      </div>

      {/* Buttons */}
      <Card>
        <h2
          style={{
            fontSize: theme.typography.heading3.fontSize,
            fontWeight: theme.typography.heading3.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.md,
          }}
        >
          Buttons
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="primary" disabled>
            Disabled Button
          </Button>
          <Button variant="primary" fullWidth>
            Full Width Button
          </Button>
        </div>
      </Card>

      {/* Input */}
      <Card>
        <h2
          style={{
            fontSize: theme.typography.heading3.fontSize,
            fontWeight: theme.typography.heading3.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.md,
          }}
        >
          Input
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <Input
            label="Cat Name"
            placeholder="Enter your cat's name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            label="With Error"
            placeholder="This has an error"
            error="This field is required"
          />
          <Input placeholder="No label input" />
        </div>
      </Card>

      {/* Checkbox */}
      <Card>
        <h2
          style={{
            fontSize: theme.typography.heading3.fontSize,
            fontWeight: theme.typography.heading3.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.md,
          }}
        >
          Checkbox
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <Checkbox
            label="Task completed (click to see bounce)"
            checked={checkboxChecked}
            onChange={(e) => setCheckboxChecked(e.target.checked)}
          />
          <Checkbox label="Unchecked checkbox" checked={false} onChange={() => {}} />
          <Checkbox label="Disabled checkbox" checked={false} disabled />
        </div>
      </Card>

      {/* Progress Bar */}
      <Card>
        <h2
          style={{
            fontSize: theme.typography.heading3.fontSize,
            fontWeight: theme.typography.heading3.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.md,
          }}
        >
          Progress Bar
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <ProgressBar current={3} total={10} showLabel />
          <ProgressBar current={7} total={10} />
          <ProgressBar current={10} total={10} showLabel />
        </div>
      </Card>

      {/* Selection Cards */}
      <Card>
        <h2
          style={{
            fontSize: theme.typography.heading3.fontSize,
            fontWeight: theme.typography.heading3.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.md,
          }}
        >
          Selection Cards
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <SelectionCard
            emoji="🕌"
            label="Keep up with daily prayers"
            description="Establish regular prayer times"
            selected={selection1}
            onClick={() => setSelection1(!selection1)}
          />
          <SelectionCard
            emoji="📿"
            label="Learn daily du'as"
            description="Memorize authentic supplications"
            selected={selection2}
            onClick={() => setSelection2(!selection2)}
          />
          <SelectionCard
            emoji="🤲"
            label="Build good habits & manners"
            selected={selection3}
            onClick={() => setSelection3(!selection3)}
          />
        </div>
      </Card>

      {/* Toggle */}
      <Card>
        <h2
          style={{
            fontSize: theme.typography.heading3.fontSize,
            fontWeight: theme.typography.heading3.fontWeight,
            color: theme.palette.textPrimary,
            marginBottom: theme.spacing.md,
          }}
        >
          Toggle
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <Toggle
            label="Prayer Reminders"
            checked={toggleChecked}
            onChange={(e) => setToggleChecked(e.target.checked)}
            onLabel="On"
            offLabel="Off"
          />
          <Toggle label="Disabled toggle" checked={false} disabled />
          <Toggle checked={true} onChange={() => {}} onLabel="Enabled" />
        </div>
      </Card>

      {/* Card Variants */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        <h2
          style={{
            fontSize: theme.typography.heading3.fontSize,
            fontWeight: theme.typography.heading3.fontWeight,
            color: theme.palette.textPrimary,
          }}
        >
          Card Variants
        </h2>
        <Card background="surface">
          <p style={{ color: theme.palette.textPrimary }}>Surface background card</p>
        </Card>
        <Card background="surfaceWarm">
          <p style={{ color: theme.palette.textPrimary }}>Warm surface background card</p>
        </Card>
      </div>
    </main>
  )
}
