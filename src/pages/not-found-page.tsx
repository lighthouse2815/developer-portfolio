import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { buttonStyles } from '../ui/button-styles'
import { getLocalizedValue } from '../utils/i18n'

type NotFoundPageProps = {
  compact?: boolean
}

export function NotFoundPage({ compact = false }: NotFoundPageProps) {
  const locale = useLocale()

  return (
    <section
      className={compact ? 'py-8' : 'px-4 py-12 sm:px-6 lg:px-8'}
      id={compact ? undefined : 'not-found'}
    >
      <div className="mx-auto max-w-[960px] rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--color-shadow)] backdrop-blur-2xl md:p-12">
        <p className="text-sm font-medium text-[var(--color-text-muted)]">404</p>
        <h1 className="mt-4 text-4xl md:text-6xl">{getLocalizedValue(locale, siteCopy.notFound.title)}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-lg">
          {getLocalizedValue(locale, siteCopy.notFound.description)}
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/" className={buttonStyles({ variant: 'primary' })}>
            <ArrowLeft className="h-4 w-4" />
            {getLocalizedValue(locale, siteCopy.common.backHome)}
          </Link>
        </div>
      </div>
    </section>
  )
}
