import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers, Palette } from "lucide-react";
import { audio } from "../../lib/audio";
import { useTheme, THEMES } from "../../lib/theme";

const sections = [
  { id: "hero-section", label: "Home" },
  { id: "about-section", label: "About Me" },
  { id: "experience-section", label: "Experience" },
  { id: "skills-section", label: "Tech Stack" },
  { id: "projects-section", label: "Projects" },
  { id: "contact", label: "Contact" }
];

export default function Navbar({ profile, onLaunchTerminal, activeSection, onSectionClick }) {
  const { activeTheme, setTheme } = useTheme();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Harsha';

  return (
    <>
      {/* Cinematic Floating Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-40 px-4 sm:px-12 py-4 sm:py-5 transition-all duration-300 pointer-events-none select-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Brand Logo */}
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            title="Return to Peak"
          >
            <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="font-sans text-lg sm:text-2xl font-light tracking-tight text-white drop-shadow-sm">
              {firstName}
            </span>
          </button>

          {/* Right Action */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Sections Menu (Mobile Only) */}
            <div className="relative pointer-events-auto md:hidden">
              <button
                onClick={() => {
                  audio.playTerminalClick();
                  setIsNavMenuOpen(!isNavMenuOpen);
                  setIsThemeMenuOpen(false);
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 rounded-full transition-all backdrop-blur-md cursor-pointer"
                title="Navigation Menu"
              >
                <div className="flex flex-col gap-1 items-center justify-center w-4 h-4">
                  <span className={`w-full h-0.5 bg-white rounded-full transition-all ${isNavMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`w-full h-0.5 bg-white rounded-full transition-all ${isNavMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-white rounded-full transition-all ${isNavMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {isNavMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-14 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col gap-1 min-w-[150px] shadow-2xl"
                  >
                    {sections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => {
                          audio.playTerminalClick();
                          if (onSectionClick) onSectionClick(sec.id);
                          setIsNavMenuOpen(false);
                        }}
                        className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                          activeSection === sec.id 
                            ? `${activeTheme.ui.badgeBg} ${activeTheme.ui.badgeText}` 
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Selector */}
            <div className="relative pointer-events-auto">
              <button
                onClick={() => {
                  audio.playTerminalClick();
                  setIsThemeMenuOpen(!isThemeMenuOpen);
                  setIsNavMenuOpen(false);
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 rounded-full transition-all backdrop-blur-md cursor-pointer"
                title="Change Theme"
              >
                <Palette className="w-4 h-4 text-white" />
              </button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-14 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col gap-1 min-w-[150px] shadow-2xl"
                  >
                    {Object.keys(THEMES).map((thm) => (
                      <button
                        key={thm}
                        onClick={() => {
                          audio.playTerminalClick();
                          setTheme(thm);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                          activeTheme.name === thm 
                            ? 'bg-white/10 text-white' 
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full border border-white/20" 
                            style={{ background: THEMES[thm].sky.start }} 
                          />
                          {THEMES[thm].label}
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => {
                audio.playTerminalClick();
                if (onLaunchTerminal) onLaunchTerminal();
              }}
              className="flex items-center gap-2.5 px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wide text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 active:scale-[0.98] rounded-full transition-all backdrop-blur-md shadow-md cursor-pointer pointer-events-auto"
            >
              <span className="hidden sm:inline">Terminal</span>
              <div className="bg-white rounded-full p-0.5 sm:p-1 border border-transparent flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black -rotate-45" />
              </div>
            </button>
          </div>

        </div>
      </motion.header>
    </>
  );
}
