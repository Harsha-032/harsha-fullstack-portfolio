import { useOutletContext } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { getExperiences } from '../services/portfolioApi'
import { getTechStack } from '../services/portfolioApi'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillsSection from '../sections/SkillsSection'

gsap.registerPlugin(ScrollTrigger)

// Animated counter component
function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const start = 0
    const end = parseInt(value) || 0
    const startTime = Date.now()
    const dur = duration * 1000

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / dur, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(start + (end - start) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

function AboutPage() {
  const { profile, loadingProfile } = useOutletContext()
  const { data: experiences, loading: loadingExp } = useApi(getExperiences, true, [])
  const { data: skills, loading: loadingSkills } = useApi(
    () => getTechStack({ ordering: '-proficiency' }),
    true,
    []
  )

  const timelineRef = useRef(null)

  // GSAP scroll-triggered timeline line draw
  useEffect(() => {
    if (!timelineRef.current || !experiences?.length) return
    const ctx = gsap.context(() => {
      gsap.from('.timeline-line-fill', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1,
        },
      })
    }, timelineRef)
    return () => ctx.revert()
  }, [experiences])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getTypeLabel = (type) => {
    const map = { full_time: 'Full Time', internship: 'Internship', freelance: 'Freelance', contract: 'Contract' }
    return map[type] || type
  }

  const isLoading = loadingProfile || loadingExp

  const stats = [
    { label: 'Years Learning', value: '3', suffix: '+' },
    { label: 'Projects Built', value: '10', suffix: '+' },
    { label: 'Technologies', value: '15', suffix: '+' },
  ]

  return (
    <div className="relative pt-32">
      {isLoading ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-zinc-800 border-t-[#7c3aed] rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* About Hero */}
          {profile && (
            <section className="px-6 md:px-12 pb-32">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#7c3aed] mb-6 block">
                    Biography
                  </span>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white mb-16">
                    About{' '}
                    <span className="gradient-text-accent">Me</span>
                  </h1>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-16 items-start">
                  {/* Left - Photo and stats */}
                  <motion.div
                    className="lg:col-span-2 space-y-8"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Portrait placeholder */}
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#7c3aed]/10 to-[#22d3ee]/5 border border-white/[0.04]">
                      {profile.profile_picture ? (
                        <img
                          src={profile.profile_picture}
                          alt={profile.full_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700">
                          <span className="text-6xl font-black">{profile.full_name?.charAt(0) || 'H'}</span>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {stats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          className="text-center p-4 rounded-xl border border-white/[0.04] bg-[#0d0d0d]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                        >
                          <div className="text-2xl font-black text-white">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                          </div>
                          <div className="text-[10px] text-zinc-600 tracking-wider uppercase mt-1 font-medium">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Right - Story */}
                  <motion.div
                    className="lg:col-span-3 space-y-8"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="text-zinc-400 leading-[1.8] text-base whitespace-pre-line">
                      {profile.about_description}
                    </div>

                    {/* Info cards */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {profile.location && (
                        <div className="p-5 rounded-xl border border-white/[0.04] bg-[#0d0d0d]">
                          <h3 className="text-[10px] font-semibold uppercase text-zinc-600 tracking-wider mb-2">Location</h3>
                          <p className="text-sm font-medium text-white">{profile.location}</p>
                        </div>
                      )}
                      {profile.email && (
                        <div className="p-5 rounded-xl border border-white/[0.04] bg-[#0d0d0d]">
                          <h3 className="text-[10px] font-semibold uppercase text-zinc-600 tracking-wider mb-2">Email</h3>
                          <a href={`mailto:${profile.email}`} className="text-sm font-medium text-[#8b5cf6] hover:text-[#a855f7] transition-colors">
                            {profile.email}
                          </a>
                        </div>
                      )}
                    </div>

                    {profile.availability_status && (
                      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-medium text-emerald-400">{profile.availability_status}</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </section>
          )}

          {/* Section Divider */}
          <div className="section-divider" />

          {/* Skills Section */}
          <SkillsSection skills={Array.isArray(skills) ? skills : []} loading={loadingSkills} />

          {/* Section Divider */}
          <div className="section-divider" />

          {/* Experience Timeline */}
          <section className="py-32 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-20"
              >
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#22d3ee] mb-4 block">
                  Journey
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-white">
                  Experience
                </h2>
              </motion.div>

              {experiences.length === 0 ? (
                <div className="text-zinc-600 text-sm">No experiences found.</div>
              ) : (
                <div ref={timelineRef} className="relative ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
                  {/* Timeline line background */}
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.04]">
                    <div className="timeline-line-fill absolute inset-0 bg-gradient-to-b from-[#7c3aed] to-[#22d3ee]" />
                  </div>

                  {experiences.map((exp, i) => (
                    <motion.div
                      key={exp.id}
                      className="relative group"
                      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[44px] md:-left-[52px] top-1 w-4 h-4 rounded-full border-2 border-zinc-800 bg-[#050505] group-hover:border-[#7c3aed] transition-colors duration-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#7c3aed] transition-colors duration-300" />
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">{exp.role}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-zinc-400 font-medium">{exp.company}</span>
                              <span className="text-[10px] font-semibold text-[#7c3aed] bg-[#7c3aed]/10 px-2 py-0.5 rounded-full">
                                {getTypeLabel(exp.employment_type)}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-zinc-500 shrink-0">
                            {formatDate(exp.start_date)} – {exp.current ? 'Present' : formatDate(exp.end_date)}
                          </span>
                        </div>

                        <p className="text-sm text-zinc-500 leading-relaxed whitespace-pre-line max-w-3xl">
                          {exp.description}
                        </p>

                        {exp.tech_used && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {exp.tech_used.split(',').map((tech) => (
                              <span
                                key={tech.trim()}
                                className="text-[10px] font-medium text-zinc-500 bg-white/[0.03] border border-white/[0.04] px-2 py-0.5 rounded-md"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default AboutPage
