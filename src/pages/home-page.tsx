import { AboutSection } from '../sections/about-section'
import { ContactSection } from '../sections/contact-section'
import { ExperienceSection } from '../sections/experience-section'
import { HeroSection } from '../sections/hero-section'
import { ProjectsSection } from '../sections/projects-section'
import { SkillsSection } from '../sections/skills-section'

export function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  )
}
