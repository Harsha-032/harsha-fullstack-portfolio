import { Link, useOutletContext } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { getPortfolioItems, getTechStack } from '../services/portfolioApi'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import HeroSection from '../sections/HeroSection'
import SkillsSection from '../sections/SkillsSection'
import ProjectCard from '../components/common/ProjectCard'

function HomePage() {
  const { profile, loadingProfile } = useOutletContext()
  const projectsSectionRef = useRef(null)
  const projectsInView = useInView(projectsSectionRef, { once: true, margin: '-80px' })

  const { data: projectsData, loading: loadingProjects } = useApi(
    () => getPortfolioItems({ featured: true }),
    true,
    null
  )

  const { data: skills, loading: loadingSkills } = useApi(
    () => getTechStack({ ordering: '-proficiency' }),
    true,
    []
  )

  const featuredProjects = projectsData?.results || []

  return (
    <div className="relative">
      {/* Hero */}
      {loadingProfile ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-zinc-800 border-t-[#7c3aed] rounded-full animate-spin" />
        </div>
      ) : (
        <HeroSection profile={profile} />
      )}

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Featured Projects */}
      <section ref={projectsSectionRef} className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#22d3ee] mb-4 block">
                Featured Work
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-white">
                Selected{' '}
                <span className="gradient-text-accent">Projects</span>
              </h2>
            </div>

            <Link
              to="/projects"
              className="text-sm font-medium text-zinc-500 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              View All
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {loadingProjects ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 rounded-2xl bg-white/[0.02] border border-white/[0.04] animate-pulse" />
              ))}
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/[0.06] rounded-2xl">
              <p className="text-zinc-600 text-sm">No featured projects yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.slice(0, 3).map((project, i) => (
                <ProjectCard key={project.id} item={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Skills */}
      <SkillsSection
        skills={Array.isArray(skills) ? skills : []}
        loading={loadingSkills}
      />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Contact CTA */}
      <section className="relative py-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7c3aed]/[0.04] blur-[120px] pointer-events-none" />

        <motion.div
          className="max-w-3xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-zinc-500 mb-6 block">
            Let's Connect
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-white mb-6">
            Ready to build{' '}
            <span className="gradient-text-accent">something?</span>
          </h2>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            I'm always open to new opportunities and collaborations. Let's create something exceptional together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
              >
                <span className="relative z-10">Get in Touch</span>
                <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
            <Link
              to="/about"
              className="px-8 py-4 rounded-full border border-white/10 text-sm font-medium text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              Learn More About Me
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage
