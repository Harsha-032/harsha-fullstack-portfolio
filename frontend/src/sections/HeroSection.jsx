import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function HeroSection({ profile }) {
  const name = profile?.full_name || 'Harsha C'
  const headline = profile?.headline || 'Full Stack Developer'
  const bio = profile?.short_intro || 'Building scalable web applications with modern technologies.'
  const resumeUrl = profile?.resume_url

  const orbRef = useRef(null)

  // Floating orb animation with GSAP
  useEffect(() => {
    if (!orbRef.current) return
    const ctx = gsap.context(() => {
      // Floating orbs
      gsap.to('.orb-1', {
        y: -30, x: 15, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })
      gsap.to('.orb-2', {
        y: 20, x: -20, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1,
      })
      gsap.to('.orb-3', {
        y: -15, x: 25, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.5,
      })
    }, orbRef)
    return () => ctx.revert()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 2.6 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient background glows */}
      <div ref={orbRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#7c3aed]/[0.06] blur-[100px]" />
        <div className="orb-2 absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#22d3ee]/[0.04] blur-[120px]" />
        <div className="orb-3 absolute top-[60%] right-[40%] w-[250px] h-[250px] rounded-full bg-[#a855f7]/[0.05] blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10 py-32">
        {/* Left — Text content */}
        <motion.div
          className="flex flex-col gap-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Availability badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-md text-xs font-medium tracking-[0.15em] uppercase text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              {profile?.availability_status || 'Available for work'}
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={fadeUp}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-[-0.04em] leading-[0.95] text-white">
              {name.split(' ').map((word, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="gradient-text-accent">{word}</span> : word}
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Headline */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-zinc-400 font-light tracking-wide max-w-lg"
          >
            {headline}
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-md"
          >
            {bio}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/projects"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            >
              <span className="relative z-10">View Projects</span>
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-sm font-medium text-zinc-300 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                Download Resume
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Right — Artistic floating illustration */}
        <motion.div
          className="relative hidden lg:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-[420px] h-[420px]">
            {/* Central rotating ring */}
            <div className="absolute inset-0 rounded-full border border-white/[0.04] animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-[#7c3aed]/20 animate-[spin_25s_linear_infinite_reverse]" />
            <div className="absolute inset-12 rounded-full border border-[#22d3ee]/10 animate-[spin_20s_linear_infinite]" />

            {/* Glowing center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7c3aed]/30 to-[#22d3ee]/20 blur-xl animate-pulse" />
              <div className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
            </div>

            {/* Floating tech dots */}
            {['Python', 'React', 'Django', 'JS'].map((tech, i) => {
              const angle = (i / 4) * Math.PI * 2 - Math.PI / 2
              const r = 170
              return (
                <motion.div
                  key={tech}
                  className="absolute flex items-center gap-2"
                  style={{
                    left: `${50 + (Math.cos(angle) * r) / 4.2}%`,
                    top: `${50 + (Math.sin(angle) * r) / 4.2}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#7c3aed] shadow-[0_0_12px_rgba(124,58,237,0.6)]" />
                  <span className="text-[11px] font-semibold text-zinc-500 tracking-wider uppercase">{tech}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-medium">Scroll</span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-zinc-500 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
