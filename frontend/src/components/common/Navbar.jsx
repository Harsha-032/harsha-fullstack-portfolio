import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar({ profile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)



  const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Harsha'
  const resumeUrl = profile?.resume_url || '#'

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-white hover:text-zinc-300 transition-colors"
          >
            {firstName}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 hover:text-white ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {profile?.resume_url && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-200 transition-colors duration-200"
            >
              Resume
            </a>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-900 py-4 px-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm py-2 transition-colors duration-200 ${
                  isActive ? 'text-white font-semibold' : 'text-zinc-400'
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
              onClick={() => setMobileMenuOpen(false)}
              className="bg-white text-black text-center py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-200 transition-colors duration-200"
            >
              Resume
            </a>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar