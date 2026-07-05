import { BriefcaseBusiness, FolderGit2, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { TagChip } from '../ui/tag-chip'
import { getLocalizedValue } from '../utils/i18n'

export function SiteFooter() {
  const locale = useLocale()

  return (
    <footer className="relative z-10 border-t border-[var(--color-border)] px-4 pb-8 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--color-shadow)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-8">
        <div className="space-y-3">
          <TagChip tone="subtle">{profile.brand}</TagChip>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
            {getLocalizedValue(locale, profile.slogan)}
          </p>
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            © 2026 Dương. {getLocalizedValue(locale, siteCopy.footer.builtWith)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <FolderGit2 className="h-4 w-4" />
            {getLocalizedValue(locale, siteCopy.common.github)}
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <BriefcaseBusiness className="h-4 w-4" />
            {getLocalizedValue(locale, siteCopy.common.linkedin)}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" />
            {getLocalizedValue(locale, siteCopy.common.email)}
          </a>
        </div>
      </div>
    </footer>
  )
}
