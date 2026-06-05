import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { getProfile } from '../services/portfolioApi'
import Navbar from '../components/common/Navbar'
import TerminalModal from '../components/common/TerminalModal'
import { motion } from 'framer-motion'
import { useTheme } from '../lib/theme'
import { audio } from '../lib/audio'

const listSections = [
  { id: "hero-section", label: "Home" },
  { id: "about-section", label: "About Me" },
  { id: "experience-section", label: "Experience" },
  { id: "skills-section", label: "Tech Stack" },
  { id: "projects-section", label: "Projects" },
  { id: "contact", label: "Contact" }
];

function RootLayout({ scrollYProgress }) {
  const { data: profile, loading: loadingProfile } = useApi(getProfile, true, null)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero-section")
  const { activeTheme } = useTheme()
  const location = useLocation()
  
  const isHomePage = location.pathname === '/'

  // Setup intersection observer for sections on homepage
  useEffect(() => {
    if (!isHomePage || loadingProfile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisible = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target;
          }
        });
        if (mostVisible) {
          setActiveSection(prev => {
            if (prev !== mostVisible.id) {
              audio.playTransition();
            }
            return mostVisible.id;
          });
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7] }
    );

    listSections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loadingProfile, isHomePage]);

  const handleDotClick = (id) => {
    setActiveSection(id);
    audio.playDotClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white selection:bg-emerald-500 selection:text-black font-sans antialiased overflow-x-hidden flex flex-col">
      <Navbar 
        profile={profile} 
        onLaunchTerminal={() => setIsTerminalOpen(true)} 
        activeSection={activeSection}
        onSectionClick={handleDotClick}
      />
      
      {/* Left Vertical Circles Dot Navigator (Only on HomePage) */}
      {isHomePage && (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 1.0 } }
          }}
          className="hidden md:flex fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-5 select-none pointer-events-auto"
        >
          {listSections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <motion.button
                key={sec.id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                onClick={() => handleDotClick(sec.id)}
                className="relative group flex items-center justify-center focus:outline-none cursor-pointer w-5 h-5"
                title={sec.label}
              >
                <div 
                  className={`absolute w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    isActive ? "border-transparent" : "border-white/35 group-hover:border-white/70"
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeNavDot"
                    className={`absolute w-3.5 h-3.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)] z-10 ${activeTheme.ui.badgeBg}`}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="absolute left-8 font-sans text-xs font-semibold tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 bg-black/40 px-3 py-1.5 rounded border border-white/10 backdrop-blur-md whitespace-nowrap">
                  {sec.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      <main className="flex-grow w-full relative z-10">
        <Outlet context={{ profile, loadingProfile }} />
      </main>

      {/* Bottom Scroll Progress Bar */}
      {scrollYProgress && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 h-1 sm:h-1.5 z-40 origin-left pointer-events-none"
          style={{ 
            scaleX: scrollYProgress,
            backgroundColor: activeTheme.sky.start || 'white',
            boxShadow: `0 0 10px ${activeTheme.sky.start || 'white'}`
          }}
        />
      )}

      {/* Interactive Terminal Modal */}
      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        profile={profile}
      />
    </div>
  )
}

export default RootLayout
