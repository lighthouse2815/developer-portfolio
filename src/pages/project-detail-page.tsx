import { useParams } from 'react-router-dom'
import { Reveal } from '../components/reveal'
import { SectionHeading } from '../components/section-heading'
import { projects } from '../data/projects'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { ProjectDetailHero } from '../project/project-detail-hero'
import { ProjectMetadataGrid } from '../project/project-metadata-grid'
import { GlassPanel } from '../ui/glass-panel'
import { getLocalizedValue } from '../utils/i18n'
import { NotFoundPage } from './not-found-page'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const locale = useLocale()
  const project = projects.find((entry) => entry.slug === slug)

  if (!project) {
    return <NotFoundPage compact />
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
        <ProjectDetailHero project={project} />
        <ProjectMetadataGrid project={project} />

        <section className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassPanel className="h-full">
              <SectionHeading
                title={getLocalizedValue(locale, siteCopy.detail.mainFeaturesTitle)}
                description={getLocalizedValue(locale, siteCopy.detail.mainFeaturesDescription)}
              />
              <ul className="mt-8 grid gap-3">
                {getLocalizedValue(locale, project.keyFeatures).map((feature) => (
                  <li
                    key={feature}
                    className="rounded-3xl bg-[var(--color-surface-strong)] px-4 py-4 text-sm leading-6 text-[var(--color-text)]"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>

          <Reveal delay={0.05}>
            <GlassPanel className="h-full">
              <SectionHeading
                title={getLocalizedValue(locale, siteCopy.detail.learnedTitle)}
                description={getLocalizedValue(locale, siteCopy.detail.learnedDescription)}
              />
              <ul className="mt-8 grid gap-3">
                {getLocalizedValue(locale, project.learned).map((item) => (
                  <li
                    key={item}
                    className="rounded-3xl bg-[var(--color-surface-strong)] px-4 py-4 text-sm leading-6 text-[var(--color-text)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <GlassPanel className="h-full">
              <SectionHeading
                title={getLocalizedValue(locale, siteCopy.detail.challengesTitle)}
                description={getLocalizedValue(locale, siteCopy.detail.challengesDescription)}
              />
              <div className="mt-8 grid gap-4">
                {project.challenges.map((challenge, index) => (
                  <article
                    key={`${project.slug}-${index}`}
                    className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5"
                  >
                    <h3 className="text-xl">{getLocalizedValue(locale, siteCopy.detail.problemLabel)}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                      {getLocalizedValue(locale, challenge.problem)}
                    </p>
                    <h3 className="mt-6 text-xl">{getLocalizedValue(locale, siteCopy.detail.solutionLabel)}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                      {getLocalizedValue(locale, challenge.solution)}
                    </p>
                  </article>
                ))}
              </div>
            </GlassPanel>
          </Reveal>

          <Reveal delay={0.05}>
            <GlassPanel className="h-full">
              <SectionHeading
                title={getLocalizedValue(locale, siteCopy.detail.screenshotTitle)}
                description={getLocalizedValue(locale, siteCopy.detail.screenshotDescription)}
              />
              <div className="panel-grid mt-8 rounded-[calc(var(--radius-panel)-0.5rem)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-strong)] p-6">
                <div className="space-y-4 rounded-[1.5rem] bg-[var(--color-surface)] p-5">
                  <p className="text-sm font-medium text-[var(--color-text)]">
                    {getLocalizedValue(locale, siteCopy.detail.screenshotPrompt)}
                  </p>
                  <ul className="grid gap-3 text-sm leading-6 text-[var(--color-text-muted)]">
                    {getLocalizedValue(locale, siteCopy.detail.screenshotItems).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassPanel>
          </Reveal>
        </section>
      </div>
    </div>
  )
}
