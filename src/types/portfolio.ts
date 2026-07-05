export type Locale = 'vi' | 'en'

export type ThemeMode = 'light' | 'dark'

export type LocalizedValue<T> = Record<Locale, T>

export type NavItem = {
  label: LocalizedValue<string>
  href: `#${string}`
}

export type HeroMetric = {
  label: LocalizedValue<string>
  value: LocalizedValue<string>
}

export type SkillGroup = {
  title: LocalizedValue<string>
  description: LocalizedValue<string>
  icon: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
  accent: string
  items: LocalizedValue<string[]>
}

export type ProjectLink = {
  label: LocalizedValue<string>
  url: string
  kind: 'external' | 'internal'
}

export type ProjectChallenge = {
  problem: LocalizedValue<string>
  solution: LocalizedValue<string>
}

export type Project = {
  slug: string
  title: LocalizedValue<string>
  category: LocalizedValue<string>
  year: string
  status: LocalizedValue<string>
  summary: LocalizedValue<string>
  description: LocalizedValue<string>
  heroImage: string
  heroImageAlt: LocalizedValue<string>
  techStack: string[]
  role: LocalizedValue<string>
  keyFeatures: LocalizedValue<string[]>
  technicalHighlights: LocalizedValue<string[]>
  learned: LocalizedValue<string[]>
  challenges: ProjectChallenge[]
  links: ProjectLink[]
}

export type TimelineEntry = {
  period: LocalizedValue<string>
  title: LocalizedValue<string>
  summary: LocalizedValue<string>
  bullets: LocalizedValue<string[]>
}
