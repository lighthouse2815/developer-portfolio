import { ProjectCard } from '../components/project-card'
import { Reveal } from '../components/reveal'
import { SectionHeading } from '../components/section-heading'
import { projects } from '../data/projects'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { GlassPanel } from '../ui/glass-panel'
import { getLocalizedValue } from '../utils/i18n'

export function ProjectsSection() {
  const locale = useLocale()

  if (!projects.length) {
    return (
      <section id="projects" className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <GlassPanel>
            <SectionHeading
              title={getLocalizedValue(locale, siteCopy.projects.emptyTitle)}
              description={getLocalizedValue(locale, siteCopy.projects.emptyDescription)}
            />
          </GlassPanel>
        </div>
      </section>
    )
  }

  const [firstProject, secondProject, thirdProject, fourthProject] = projects

  return (
    <section id="projects" className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionHeading
            title={getLocalizedValue(locale, siteCopy.projects.title)}
            description={getLocalizedValue(locale, siteCopy.projects.description)}
          />
        </Reveal>

        <div className="mt-12 grid gap-6">
          <Reveal>
            <ProjectCard project={firstProject} featured />
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.04}>
              <ProjectCard project={secondProject} />
            </Reveal>
            <Reveal delay={0.08}>
              <ProjectCard project={thirdProject} />
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <ProjectCard project={fourthProject} featured reverse />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
