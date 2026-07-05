import { AppWindow, BrainCircuit, Database, Server, Wrench } from 'lucide-react'
import { Reveal } from '../components/reveal'
import { SectionHeading } from '../components/section-heading'
import { skillGroups } from '../data/skills'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { GlassPanel } from '../ui/glass-panel'
import { TagChip } from '../ui/tag-chip'
import { getLocalizedValue } from '../utils/i18n'

const iconMap = {
  frontend: AppWindow,
  backend: Server,
  database: Database,
  tools: Wrench,
  other: BrainCircuit,
}

const cardSpans = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-12',
]

export function SkillsSection() {
  const locale = useLocale()

  return (
    <section id="skills" className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionHeading
            title={getLocalizedValue(locale, siteCopy.skills.title)}
            description={getLocalizedValue(locale, siteCopy.skills.description)}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {skillGroups.map((group, index) => {
            const Icon = iconMap[group.icon]
            const items = getLocalizedValue(locale, group.items)

            return (
              <Reveal key={group.title.en} className={cardSpans[index]} delay={index * 0.04}>
                <GlassPanel className={`h-full overflow-hidden ${group.accent}`}>
                  <div className="flex items-center gap-3">
                    <span className="rounded-2xl bg-[var(--color-accent-soft)] p-3">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-2xl">{getLocalizedValue(locale, group.title)}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
                        {getLocalizedValue(locale, group.description)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <TagChip key={item} tone="subtle">
                        {item}
                      </TagChip>
                    ))}
                  </div>
                </GlassPanel>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
