import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { navigation, profile } from '../data/profile'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { buttonStyles } from '../ui/button-styles'
import { LocaleToggle } from '../ui/locale-toggle'
import { ThemeToggle } from '../ui/theme-toggle'
import { getLocalizedValue } from '../utils/i18n'
import { cn } from '../utils/cn'

function resolveHref(pathname: string, href: string) {
  return pathname === '/' ? href : `/${href}`
}

export function SiteHeader() {
  const location = useLocation()
  const locale = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-[var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 shadow-[var(--color-shadow)] backdrop-blur-2xl lg:px-6">
        <a
          href={resolveHref(location.pathname, '#home')}
          className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.02em] text-[var(--color-text)]"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] text-base shadow-sm">
            D
          </span>
          <span className="hidden sm:inline">{profile.brand}</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={resolveHref(location.pathname, item.href)}
              className="text-sm font-medium text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-text)]"
            >
              {getLocalizedValue(locale, item.label)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleToggle />
          <a
            href="/duong-cv.txt"
            download
            className={buttonStyles({ variant: 'secondary', size: 'sm' })}
          >
            <Download className="h-4 w-4" />
            {getLocalizedValue(locale, siteCopy.common.downloadCv)}
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleToggle />
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={getLocalizedValue(
              locale,
              menuOpen ? siteCopy.header.closeMenu : siteCopy.header.openMenu,
            )}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] text-[var(--color-text)] transition-transform duration-300 active:translate-y-px',
              menuOpen && 'bg-[var(--color-accent-soft)]',
            )}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-3 max-w-[1400px] overflow-hidden rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--color-shadow)] backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={resolveHref(location.pathname, item.href)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-text)] transition-colors duration-300 hover:bg-[var(--color-accent-soft)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {getLocalizedValue(locale, item.label)}
                </a>
              ))}
            </nav>
            <a
              href="/duong-cv.txt"
              download
              className={cn(
                buttonStyles({ variant: 'primary' }),
                'mt-4 w-full justify-center',
              )}
              onClick={() => setMenuOpen(false)}
            >
              <Download className="h-4 w-4" />
              {getLocalizedValue(locale, siteCopy.common.downloadCv)}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
