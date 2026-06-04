import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Harsha'
  const resumeUrl = profile?.resume_url || '#'

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 pt-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className={`max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/70 backdrop-blur-2xl border border-white/[0.06] shadow-2xl shadow-black/30'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-sm font-black tracking-[0.25em] uppercase text-white hover:text-[#8b5cf6] transition-colors duration-300"
        >
          {firstName}
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative py-1 transition-colors duration-300 ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          {profile?.resume_url && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-5 py-2 rounded-full text-sm font-medium text-white border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#7c3aed]/50"
            >
              <span className="relative z-10">Resume</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full" />
            </a>
          )}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-white cursor-pointer"
          aria-label="Toggle Menu"
        >
          <motion.span
            className="block w-5 h-[1.5px] bg-white rounded-full origin-center"
            animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-5 h-[1.5px] bg-white rounded-full"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-[1.5px] bg-white rounded-full origin-center"
            animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden mt-2 mx-2 rounded-2xl bg-[#0d0d0d]/95 backdrop-blur-2xl border border-white/[0.06] p-6 flex flex-col gap-4"
            initial={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-base py-2 transition-colors duration-200 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-500'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {profile?.resume_url && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white text-center py-2.5 rounded-full text-sm font-semibold"
              >
                Resume
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
