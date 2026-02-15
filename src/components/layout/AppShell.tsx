/**
 * AppShell Component
 * Main layout wrapper with optional TabBar
 * Max-width 430px, centered
 */

import { ReactNode, CSSProperties } from 'react'
import { theme } from '@/lib/theme'
import { TabBar } from '@/components/ui/TabBar'

interface AppShellProps {
  children: ReactNode
  showTabBar?: boolean
  header?: ReactNode
  style?: CSSProperties
}

export function AppShell({
  children,
  showTabBar = false,
  header,
  style,
}: AppShellProps) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background,
      }}
    >
      {/* Header */}
      {header && (
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: theme.palette.background,
            borderBottom: `1px solid ${theme.palette.disabled}`,
          }}
        >
          <div
            style={{
              maxWidth: '430px',
              margin: '0 auto',
              padding: theme.spacing.md,
            }}
          >
            {header}
          </div>
        </header>
      )}

      {/* Main content */}
      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '430px',
          margin: '0 auto',
          paddingBottom: showTabBar ? '80px' : 0,
          ...style,
        }}
      >
        {children}
      </main>

      {showTabBar && <TabBar />}
    </div>
  )
}
