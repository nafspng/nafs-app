'use client'

/**
 * Bottom Tab Bar
 * Links to Home, Charity, and Cat with active state highlighting
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useOnboarding } from '@/hooks'
import { theme } from '@/lib/theme'

const TABS = [
  { href: '/home', label: 'Home', icon: '🏠' },
  { href: '/charity', label: 'Charity', icon: '🤲' },
  { href: '/cat', labelKey: 'catName', icon: '🐱' }, // label from cat name
] as const

export function TabBar() {
  const pathname = usePathname()
  const onboarding = useOnboarding()
  const catName = onboarding.catName?.trim() || 'Cat'

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.disabled}`,
        boxShadow: theme.shadows.elevated,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: '430px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: theme.spacing.sm,
          minHeight: '64px',
        }}
      >
        {TABS.map((tab) => {
          const isActive = pathname === tab.href
          const label = tab.labelKey === 'catName' ? catName : tab.label!
          const color = isActive ? theme.palette.primary : theme.palette.textSecondary

          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: theme.spacing.xs,
                textDecoration: 'none',
                color,
                flex: 1,
                padding: theme.spacing.xs,
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <span style={{ fontSize: '24px', lineHeight: 1 }}>{tab.icon}</span>
              <span
                style={{
                  fontSize: theme.typography.caption.fontSize,
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
