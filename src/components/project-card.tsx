import { ArrowUpRight, FolderGit2, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Locale, Project, ProjectLink } from '../types/portfolio'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { buttonStyles } from '../ui/button-styles'
import { TagChip } from '../ui/tag-chip'
import { cn } from '../utils/cn'
import { getLocalizedValue } from '../utils/i18n'

type ProjectCardProps = {
  project: Project
  featured?: boolean
  reverse?: boolean
}

function ProjectLinkButton({ link, locale }: { link: ProjectLink; locale: Locale }) {
  const label = getLocalizedValue(locale, link.label)
  const content = (
    <>
      {link.url.includes('github.com') ? (
        <FolderGit2 className="h-4 w-4" />
      ) : (
        <Globe className="h-4 w-4" />
      )}
      {label}
    </>
  )

  if (link.kind === 'internal') {
    return (
      <Link to={link.url} className={buttonStyles({ variant: 'ghost', size: 'sm' })}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={buttonStyles({ variant: 'ghost', size: 'sm' })}
    >
      {content}
    </a>
  )
}

export function ProjectCard({ project, featured = false, reverse = false }: ProjectCardProps) {
  const locale = useLocale()
  const heroImageAlt = getLocalizedValue(locale, project.heroImageAlt)
  const category = getLocalizedValue(locale, project.category)
  const status = getLocalizedValue(locale, project.status)
  const title = getLocalizedValue(locale, project.title)
  const summary = getLocalizedValue(locale, project.summary)
  const technicalHighlights = getLocalizedValue(locale, project.technicalHighlights)

  return (
    <article
      className={cn(
        'group overflow-hidden rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--color-shadow)] backdrop-blur-2xl',
        featured ? 'grid gap-0 lg:grid-cols-[1.15fr_0.85fr]' : 'flex h-full flex-col',
      )}
    >
      <div
        className={cn(
          'relative min-h-[320px] overflow-hidden',
          featured && reverse && 'lg:order-2',
        )}
      >
        <img
          src={project.heroImage}
          alt={heroImageAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020812]/86 via-[#05111f]/30 to-transparent dark:from-[#02050d]/88" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-6">
          <TagChip>{category}</TagChip>
          <TagChip tone="subtle">{status}</TagChip>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-8 p-6 md:p-8">
        <div className="space-y-5">
          <div className="text-sm font-medium text-[var(--color-text-muted)]">{project.year}</div>
          <div className="space-y-3">
            <h3 className="text-balance">{title}</h3>
            <p className="max-w-[54ch] text-base leading-7 text-[var(--color-text-muted)]">
              {summary}
            </p>
          </div>

          <ul className="grid gap-3 text-sm leading-6 text-[var(--color-text)]">
            {technicalHighlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="rounded-2xl bg-[var(--color-surface-strong)] px-4 py-3">
                {highlight}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, featured ? 6 : 5).map((item) => (
              <TagChip key={item} tone="subtle">
                {item}
              </TagChip>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/projects/${project.slug}`}
            className={buttonStyles({ variant: 'primary', size: 'sm' })}
          >
            {getLocalizedValue(locale, siteCopy.common.viewDetail)}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          {project.links.map((link) => (
            <ProjectLinkButton key={`${project.slug}-${link.url}`} link={link} locale={locale} />
          ))}
        </div>
      </div>
    </article>
  )
}
