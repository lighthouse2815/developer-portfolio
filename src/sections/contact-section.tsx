import { BriefcaseBusiness, FolderGit2, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { Locale } from '../types/portfolio'
import { Reveal } from '../components/reveal'
import { SectionHeading } from '../components/section-heading'
import { profile } from '../data/profile'
import { siteCopy } from '../data/site-copy'
import { useLocale } from '../hooks/use-locale'
import { Button } from '../ui/button'
import { GlassPanel } from '../ui/glass-panel'
import { TextArea } from '../ui/text-area'
import { TextField } from '../ui/text-field'
import { getLocalizedValue } from '../utils/i18n'

type ContactForm = {
  name: string
  email: string
  message: string
}

type ContactErrors = Partial<Record<keyof ContactForm, string>>

const initialForm: ContactForm = {
  name: '',
  email: '',
  message: '',
}

function validate(values: ContactForm, locale: Locale): ContactErrors {
  const errors: ContactErrors = {}
  const { validations } = siteCopy.contact

  if (!values.name.trim()) {
    errors.name = getLocalizedValue(locale, validations.nameRequired)
  }

  if (!values.email.trim()) {
    errors.email = getLocalizedValue(locale, validations.emailRequired)
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = getLocalizedValue(locale, validations.emailInvalid)
  }

  if (!values.message.trim()) {
    errors.message = getLocalizedValue(locale, validations.messageRequired)
  } else if (values.message.trim().length < 16) {
    errors.message = getLocalizedValue(locale, validations.messageTooShort)
  }

  return errors
}

export function ContactSection() {
  const locale = useLocale()
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const handleFieldChange =
    (field: keyof ContactForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value

      setForm((current) => ({ ...current, [field]: value }))
      setErrors((current) => ({ ...current, [field]: undefined }))
      setStatus('idle')
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(form, locale)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setStatus('sending')
    await new Promise((resolve) => window.setTimeout(resolve, 800))
    setStatus('success')
    setForm(initialForm)
  }

  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <GlassPanel className="h-full">
            <SectionHeading
              title={getLocalizedValue(locale, siteCopy.contact.title)}
              description={getLocalizedValue(locale, profile.contactLead)}
            />

            <div className="mt-8 grid gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium text-[var(--color-text)]">
                    {getLocalizedValue(locale, siteCopy.common.email)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                  {profile.email}
                </p>
              </a>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <FolderGit2 className="h-5 w-5" />
                    <span className="font-medium text-[var(--color-text)]">
                      {getLocalizedValue(locale, siteCopy.common.github)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {getLocalizedValue(locale, siteCopy.contact.githubDescription)}
                  </p>
                </a>

                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness className="h-5 w-5" />
                    <span className="font-medium text-[var(--color-text)]">
                      {getLocalizedValue(locale, siteCopy.common.linkedin)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {getLocalizedValue(locale, siteCopy.contact.linkedinDescription)}
                  </p>
                </a>
              </div>
            </div>
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.05}>
          <GlassPanel className="h-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-muted)]">
                  {getLocalizedValue(locale, siteCopy.contact.formLabel)}
                </p>
                <h3 className="mt-2 text-3xl">{getLocalizedValue(locale, siteCopy.contact.formTitle)}</h3>
              </div>
            </div>

            <div className="mt-6 min-h-14">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[1.5rem] border border-emerald-300/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-300"
                >
                  {getLocalizedValue(locale, siteCopy.common.messageSent)}
                </motion.div>
              ) : null}
            </div>

            <form className="mt-2 grid gap-3" onSubmit={handleSubmit} noValidate>
              <TextField
                id="name"
                label={getLocalizedValue(locale, siteCopy.contact.nameLabel)}
                name="name"
                placeholder={getLocalizedValue(locale, siteCopy.contact.namePlaceholder)}
                value={form.name}
                onChange={handleFieldChange('name')}
                error={errors.name}
              />
              <TextField
                id="email"
                label={getLocalizedValue(locale, siteCopy.contact.emailLabel)}
                name="email"
                placeholder={getLocalizedValue(locale, siteCopy.contact.emailPlaceholder)}
                value={form.email}
                onChange={handleFieldChange('email')}
                error={errors.email}
              />
              <TextArea
                id="message"
                label={getLocalizedValue(locale, siteCopy.contact.messageLabel)}
                name="message"
                placeholder={getLocalizedValue(locale, siteCopy.contact.messagePlaceholder)}
                value={form.message}
                onChange={handleFieldChange('message')}
                error={errors.message}
              />
              <div className="pt-2">
                <Button type="submit" disabled={status === 'sending'}>
                  {status === 'sending'
                    ? getLocalizedValue(locale, siteCopy.common.sending)
                    : getLocalizedValue(locale, siteCopy.common.sendMessage)}
                </Button>
              </div>
            </form>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  )
}
