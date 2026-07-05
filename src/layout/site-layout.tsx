import { Outlet } from 'react-router-dom'
import { HashScrollManager } from '../components/hash-scroll-manager'
import { useLocaleSync } from '../hooks/use-locale-sync'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'
import { useThemeSync } from '../hooks/use-theme-sync'

export function SiteLayout() {
  useThemeSync()
  useLocaleSync()

  return (
    <div className="relative min-h-[100dvh] overflow-x-clip bg-[var(--color-bg)] text-[var(--color-text)]">
      <HashScrollManager />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(67,162,255,0.2),transparent_32%),radial-gradient(circle_at_85%_12%,rgba(117,120,255,0.12),transparent_24%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px]" />
      <SiteHeader />
      <main className="relative z-10 pb-24 pt-28 md:pt-32">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
