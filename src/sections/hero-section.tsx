import { ArrowUpRight, Download, FolderKanban, Layers3, Sparkles, Workflow } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../components/reveal'
import { heroMetrics, profile } from '../data/profile'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { buttonStyles } from '../ui/button-styles'
import { GlassPanel } from '../ui/glass-panel'
import { TagChip } from '../ui/tag-chip'
import { getLocalizedValue } from '../utils/i18n'

const coreStack = ['React', 'TypeScript', 'ASP.NET Core', 'NestJS', 'MongoDB', 'PostgreSQL']

export function HeroSection() {
  const reduceMotion = useReducedMotion()
  const locale = useLocale()
  const focusAreas = getLocalizedValue(locale, profile.focusAreas)

  return (
    <section id="home" className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100dvh-8rem)] max-w-[1400px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="max-w-3xl">
          <TagChip>{getLocalizedValue(locale, profile.availability)}</TagChip>
          <h1 className="mt-6 text-balance text-5xl md:text-6xl xl:text-7xl">
            {getLocalizedValue(locale, siteCopy.hero.greeting)}
            <span className="mt-4 block text-[0.62em] font-medium leading-[1.05] text-[var(--color-text-muted)]">
              {getLocalizedValue(locale, profile.heroLabel)}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-text-muted)]">
            {getLocalizedValue(locale, profile.heroSummary)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className={buttonStyles({ variant: 'primary' })}>
              <FolderKanban className="h-4 w-4" />
              {getLocalizedValue(locale, siteCopy.common.viewProjects)}
            </a>
            <a href="/duong-cv.txt" download className={buttonStyles({ variant: 'secondary' })}>
              <Download className="h-4 w-4" />
              {getLocalizedValue(locale, siteCopy.common.downloadCv)}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-text)]"
            >
              {getLocalizedValue(locale, siteCopy.common.contact)}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <GlassPanel className="relative overflow-hidden p-6 md:p-8">
            <div className="absolute right-6 top-6 rounded-3xl bg-[var(--color-accent-soft)] p-3 text-[var(--color-text)]">
              <Sparkles className="h-5 w-5" />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-[var(--color-text-muted)]">
                {getLocalizedValue(locale, siteCopy.hero.previewLabel)}
              </p>
              <h2 className="max-w-lg text-3xl md:text-4xl">
                {getLocalizedValue(locale, siteCopy.hero.previewTitle)}
              </h2>
              <p className="max-w-xl text-base leading-7 text-[var(--color-text-muted)]">
                {getLocalizedValue(locale, siteCopy.hero.previewDescription)}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {heroMetrics.map((metric) => (
                <div
                  key={metric.label.en}
                  className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4"
                >
                  <p className="text-sm font-medium text-[var(--color-text-muted)]">
                    {getLocalizedValue(locale, metric.label)}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[var(--color-text)]">
                    {getLocalizedValue(locale, metric.value)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-2xl bg-[var(--color-accent-soft)] p-2">
                    <Workflow className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium text-[var(--color-text)]">
                    {getLocalizedValue(locale, siteCopy.hero.currentFocus)}
                  </p>
                </div>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--color-text-muted)]">
                  {focusAreas.map((item) => (
                    <li key={item} className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-2xl bg-[var(--color-accent-soft)] p-2">
                    <Layers3 className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium text-[var(--color-text)]">
                    {getLocalizedValue(locale, siteCopy.hero.coreStack)}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {coreStack.map((item) => (
                    <TagChip key={item} tone="subtle">
                      {item}
                    </TagChip>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  )
}
