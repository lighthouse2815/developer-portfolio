import { ArrowLeft, ArrowUpRight, FolderGit2, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Locale, Project } from '../types/portfolio'
import { Reveal } from '../components/reveal'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { buttonStyles } from '../ui/button-styles'
import { GlassPanel } from '../ui/glass-panel'
import { TagChip } from '../ui/tag-chip'
import { getLocalizedValue } from '../utils/i18n'

type ProjectDetailHeroProps = {
  project: Project
}

type ActionLinkProps = Project['links'][number] & {
  locale: Locale
}

function ActionLink({ label, url, kind, locale }: ActionLinkProps) {
  const icon = url.includes('github.com') ? (
    <FolderGit2 className="h-4 w-4" />
  ) : (
    <Globe className="h-4 w-4" />
  )
  const localizedLabel = getLocalizedValue(locale, label)

  if (kind === 'internal') {
    return (
      <Link to={url} className={buttonStyles({ variant: 'secondary', size: 'sm' })}>
        {icon}
        {localizedLabel}
      </Link>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={buttonStyles({ variant: 'secondary', size: 'sm' })}
    >
      {icon}
      {localizedLabel}
    </a>
  )
}

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const locale = useLocale()

  return (
    <Reveal>
      <GlassPanel className="overflow-hidden p-0">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between gap-8 p-6 md:p-8 lg:p-10">
            <div className="space-y-5">
              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-text)]"
              >
                <ArrowLeft className="h-4 w-4" />
                {getLocalizedValue(locale, siteCopy.detail.backToProjects)}
              </Link>

              <div className="flex flex-wrap gap-2">
                <TagChip>{getLocalizedValue(locale, project.category)}</TagChip>
                <TagChip tone="subtle">{getLocalizedValue(locale, project.status)}</TagChip>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl">{getLocalizedValue(locale, project.title)}</h1>
                <p className="max-w-[58ch] text-base leading-7 text-[var(--color-text-muted)] md:text-lg">
                  {getLocalizedValue(locale, project.description)}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <TagChip key={item} tone="subtle">
                    {item}
                  </TagChip>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/#contact" className={buttonStyles({ variant: 'primary', size: 'sm' })}>
                  {getLocalizedValue(locale, siteCopy.common.contact)}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                {project.links.map((link) => (
                  <ActionLink key={`${project.slug}-${link.url}`} locale={locale} {...link} />
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden lg:min-h-full">
            <img
              src={project.heroImage}
              alt={getLocalizedValue(locale, project.heroImageAlt)}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020712]/82 via-transparent to-transparent" />
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  )
}
