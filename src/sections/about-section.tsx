import { Languages, LayoutGrid, Rocket, ShieldCheck } from 'lucide-react'
import { Reveal } from '../components/reveal'
import { SectionHeading } from '../components/section-heading'
import { profile } from '../data/profile'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { GlassPanel } from '../ui/glass-panel'
import { getLocalizedValue } from '../utils/i18n'

const strengthIcons = [Rocket, ShieldCheck, LayoutGrid, Languages]

export function AboutSection() {
  const locale = useLocale()
  const aboutParagraphs = getLocalizedValue(locale, profile.about)

  return (
    <section id="about" className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <GlassPanel className="h-full">
            <SectionHeading
              title={getLocalizedValue(locale, siteCopy.about.title)}
              description={getLocalizedValue(locale, siteCopy.about.description)}
            />
            <div className="mt-8 grid gap-5">
              {aboutParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-[var(--color-text-muted)] md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid gap-6">
            <GlassPanel className="h-full">
              <h3 className="text-2xl">{getLocalizedValue(locale, siteCopy.about.strengthsTitle)}</h3>
              <div className="mt-6 grid gap-4">
                {siteCopy.about.strengths.map((item, index) => {
                  const Icon = strengthIcons[index] ?? Rocket

                  return (
                    <article
                      key={item.title.en}
                      className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded-2xl bg-[var(--color-accent-soft)] p-2">
                          <Icon className="h-4 w-4" />
                        </span>
                        <h3 className="text-xl">{getLocalizedValue(locale, item.title)}</h3>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
                        {getLocalizedValue(locale, item.body)}
                      </p>
                    </article>
                  )
                })}
              </div>
            </GlassPanel>

            <GlassPanel className="bg-[linear-gradient(145deg,rgba(47,115,255,0.14),transparent),var(--color-surface)]">
              <p className="text-sm font-medium text-[var(--color-text-muted)]">
                {getLocalizedValue(locale, siteCopy.about.mindsetLabel)}
              </p>
              <p className="mt-3 text-xl leading-8 text-[var(--color-text)]">
                {getLocalizedValue(locale, siteCopy.about.mindsetBody)}
              </p>
            </GlassPanel>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
