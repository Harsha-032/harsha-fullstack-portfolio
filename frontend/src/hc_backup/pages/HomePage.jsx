import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { getPortfolioItems, getTechStack, getExperiences, getSocialLinks } from '../services/portfolioApi'

import { motion } from 'framer-motion'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ExperienceSection from '../sections/ExperienceSection'
import SkillsSection from '../sections/SkillsSection'
import ProjectsShowcase from '../sections/ProjectsShowcase'
import Preloader from '../components/common/Preloader';
import ContactSection from '../sections/ContactSection'

export default function HomePage() {
  const { profile, loadingProfile } = useOutletContext()

  const { data: projectsData } = useApi(
    () => getPortfolioItems({ featured: true }),
    true,
    null
  )

  const { data: skills } = useApi(
    () => getTechStack({ ordering: '-proficiency' }),
    true,
    []
  )

  const { data: experiencesData } = useApi(
    () => getExperiences(),
    true,
    []
  )

  const { data: socialLinksData } = useApi(
    () => getSocialLinks(),
    true,
    []
  )

  const featuredProjects = projectsData?.results || []
  const experiences = experiencesData?.results || experiencesData || []
  const socialLinks = socialLinksData?.results || socialLinksData || []

  if (loadingProfile) {
    return null; // Let Preloader handle this wait visually
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 w-full"
    >
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ExperienceSection experiences={experiences} />
      <SkillsSection techStack={Array.isArray(skills) ? skills : []} />
      <ProjectsShowcase projects={featuredProjects} />
      <ContactSection profile={profile} socialLinks={socialLinks} />
    </motion.div>
  )
}
