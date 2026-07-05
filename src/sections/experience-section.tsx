import { Reveal } from '../components/reveal'
import { SectionHeading } from '../components/section-heading'
import { siteCopy } from '../data/site-copy'
import { timelineEntries } from '../data/timeline'
import { useLocale } from '../hooks/use-locale'
import { GlassPanel } from '../ui/glass-panel'
import { getLocalizedValue } from '../utils/i18n'

export function ExperienceSection() {
  const locale = useLocale()

  return (
    <section id="experience" className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionHeading
            title={getLocalizedValue(locale, siteCopy.experience.title)}
            description={getLocalizedValue(locale, siteCopy.experience.description)}
          />
        </Reveal>

        <div className="relative mt-12 grid gap-6">
          {timelineEntries.map((entry, index) => (
            <Reveal key={entry.title.en} delay={index * 0.03}>
              <GlassPanel className="relative overflow-hidden">
                <div className="grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[var(--color-text-muted)]">
                      {getLocalizedValue(locale, entry.period)}
                    </p>
                    <div className="h-1 w-16 rounded-full bg-[var(--color-accent)]/70" />
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl">{getLocalizedValue(locale, entry.title)}</h3>
                    <p className="mt-4 max-w-[62ch] text-base leading-7 text-[var(--color-text-muted)]">
                      {getLocalizedValue(locale, entry.summary)}
                    </p>
                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      {getLocalizedValue(locale, entry.bullets).map((bullet) => (
                        <div
                          key={bullet}
                          className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-4 text-sm leading-6 text-[var(--color-text)]"
                        >
                          {bullet}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
