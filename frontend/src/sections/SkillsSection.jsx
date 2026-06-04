import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FaPython, FaReact, FaDocker, FaGitAlt, FaDatabase, FaJs, FaServer } from 'react-icons/fa'
import { SiDjango, SiPostgresql } from 'react-icons/si'
import gsap from 'gsap'

const iconMap = {
  python: <FaPython size={22} />,
  react: <FaReact size={22} />,
  docker: <FaDocker size={22} />,
  git: <FaGitAlt size={22} />,
  django: <SiDjango size={22} />,
  postgresql: <SiPostgresql size={22} />,
  javascript: <FaJs size={22} />,
  default: <FaServer size={22} />,
}

function getIcon(name) {
  const key = name?.toLowerCase().replace(/\s/g, '')
  return iconMap[key] || iconMap.default
}

export default function SkillsSection({ skills = [], loading }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'tools', label: 'DevOps' },
    { id: 'cloud', label: 'Cloud' },
  ]

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section ref={sectionRef} className="relative py-32 px-6 md:px-12">
      {/* Section ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#7c3aed] mb-4 block">
              Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-white">
              Skills &{' '}
              <span className="gradient-text-accent">Stack</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'text-white'
                    : 'text-zinc-500 hover:text-zinc-300 border border-white/[0.06] hover:border-white/10'
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="skill-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-white/[0.02] border border-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, i) => (
                <SkillCard key={skill.id} skill={skill} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function SkillCard({ skill, index }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    gsap.to(cardRef.current, {
      rotateX, rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl border border-white/[0.04] bg-[#0d0d0d] p-6 flex flex-col justify-between min-h-[180px] overflow-hidden cursor-default gradient-border"
      style={{ willChange: 'transform' }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7c3aed]/[0.03] to-[#22d3ee]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="text-zinc-600 group-hover:text-[#8b5cf6] transition-colors duration-400">
          {getIcon(skill.name)}
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-zinc-600 bg-white/[0.03] px-2 py-1 rounded-full">
          {skill.proficiency}%
        </span>
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className="text-base font-semibold text-white tracking-tight">
          {skill.name}
        </h3>
        <span className="text-[11px] text-zinc-600 capitalize mt-1 block">
          {skill.category}
        </span>
        
        {/* Proficiency bar */}
        <div className="mt-3 h-[2px] w-full bg-white/[0.04] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </motion.div>
  )
}
