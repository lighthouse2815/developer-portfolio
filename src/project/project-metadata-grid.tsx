import type { Project } from '../types/portfolio'
import { Reveal } from '../components/reveal'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { GlassPanel } from '../ui/glass-panel'
import { TagChip } from '../ui/tag-chip'
import { getLocalizedValue } from '../utils/i18n'

type ProjectMetadataGridProps = {
  project: Project
}

export function ProjectMetadataGrid({ project }: ProjectMetadataGridProps) {
  const locale = useLocale()
  const technicalHighlights = getLocalizedValue(locale, project.technicalHighlights)

  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Reveal>
        <GlassPanel className="h-full">
          <div className="space-y-4">
            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              {getLocalizedValue(locale, siteCopy.detail.roleLabel)}
            </p>
            <h2 className="text-3xl">{getLocalizedValue(locale, siteCopy.detail.roleHeadline)}</h2>
            <p className="text-base leading-7 text-[var(--color-text-muted)]">
              {getLocalizedValue(locale, project.role)}
            </p>
          </div>
        </GlassPanel>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="grid gap-6 sm:grid-cols-2">
          <GlassPanel className="h-full">
            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              {getLocalizedValue(locale, siteCopy.detail.technicalHighlights)}
            </p>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--color-text)]">
              {technicalHighlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-2xl bg-[var(--color-surface-strong)] px-4 py-3"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel className="h-full">
            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              {getLocalizedValue(locale, siteCopy.detail.snapshot)}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TagChip tone="subtle">{project.year}</TagChip>
              <TagChip tone="subtle">{getLocalizedValue(locale, project.status)}</TagChip>
              <TagChip tone="subtle">{getLocalizedValue(locale, project.category)}</TagChip>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">
              {getLocalizedValue(locale, siteCopy.detail.snapshotDescription)}
            </p>
          </GlassPanel>
        </div>
      </Reveal>
    </section>
  )
}
