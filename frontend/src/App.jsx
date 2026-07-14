import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ArrowUp, ArrowDown, X, Info, Flame, DollarSign, Wallet, RefreshCw, Layers, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

// Components & Sections Imports
// @ts-ignore
import Landscape3D from "./components/Landscape3D";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";

import { getProfile, getExperiences, getTechStack, getPortfolioItems, getSocialLinks } from "./services/portfolioApi";
import { useApi } from "./hooks/useApi";

import { audio } from "./lib/audio";
import { useTheme } from "./lib/theme";
import Loading from "./sections/Loading";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";

const listSections = [
  { id: "peak", label: "Home" },
  { id: "one-pool", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "liquidity-flows", label: "Tech Stack" },
  { id: "redefined", label: "Projects" },
  { id: "climb", label: "Contact" }
];

const TypewriterText = ({ text, delay = 15 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <span>{displayed}</span>;
};

export default function App() {
  const { activeTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("peak");
  const [isDappOpen, setIsDappOpen] = useState(false); // Terminal simulator state

  // API Data Fetching
  const { data: profile } = useApi(getProfile, true, null);
  const { data: experiencesData } = useApi(getExperiences, true, []);
  const { data: skillsData } = useApi(() => getTechStack({ ordering: '-proficiency' }), true, []);
  const { data: projectsData } = useApi(() => getPortfolioItems({ featured: true }), true, []);
  const { data: socialLinksData } = useApi(getSocialLinks, true, []);

  const experiences = experiencesData?.results || experiencesData || [];
  const skills = Array.isArray(skillsData) ? skillsData : (skillsData?.results || []);
  const projects = projectsData?.results || projectsData || [];
  const socialLinks = socialLinksData?.results || socialLinksData || [];

  // Simulated Terminal state
  const [terminalLogs, setTerminalLogs] = useState([
    "Initializing HC Core v2.4...",
    "Retrieving full stack system configurations...",
    "System status: ACTIVE // 100% Integrity.",
    "Ready. Type 'help' or click suggestions below."
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [isCompilingDemo, setIsCompilingDemo] = useState(false);
  const logsEndRef = useRef(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs, isDappOpen]);

  const handleTerminalSubmit = (cmd) => {
    audio.playTerminalClick();
    const input = (typeof cmd === 'string' ? cmd : terminalInput).trim().toLowerCase();
    if (!input) return;

    let response = "";
    if (input === "help") {
      response = "Available: 'help' (shows list), 'about' (overview), 'skills' (stack list), 'projects' (works), 'contact' (social/mail), 'clear' (clears screen)";
    } else if (input === "about") {
      response = profile?.about_description || "";
    } else if (input === "skills") {
      response = `Tech Stack: ${skills.map(s => s.name).join(', ') || 'None found.'}`;
    } else if (input === "projects") {
      response = `Completed works: ${projects.map(p => p.title).join(', ') || 'None found.'}`;
    } else if (input === "contact") {
      response = `Reach me at ${profile?.email || ''}`;
    } else if (input === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else {
      response = `Command not found: '${input}'. Type 'help' for available triggers.`;
    }

    setTerminalLogs(prev => [
      ...prev,
      `hc_guest@root:~$ ${input}`,
      response
    ]);
    setTerminalInput("");
  };

  const { scrollYProgress } = useScroll();
  const adjustedScrollProgress = useTransform(scrollYProgress, [0, 0.98], [0, 1]);

  const handleDotClick = (id) => {
    setActiveSection(id);
    audio.playDotClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Setup intersection observer for sections
  useEffect(() => {
    if (isLoading) return;

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
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-transparent text-white selection:bg-emerald-500 selection:text-black font-sans antialiased overflow-x-hidden">
      
      {/* Cinematic Load Overlay Gate */}
      <Loading onComplete={() => setIsLoading(false)} />

      {/* Homepage UI - Rendered immediately underneath the glassmorphic loader */}
      <CustomCursor />
      <SmoothScroll />
      
      {/* Unified Dynamic Cinematic 3D WebGL Flight Background */}
      <Landscape3D scrollProgress={scrollYProgress} />
      <div className="fixed inset-0 bg-transparent pointer-events-none z-[1]" />

      {/* Top navigation container */}
      <Navbar 
        onLaunchApp={() => setIsDappOpen(true)} 
        sections={listSections}
        activeSection={activeSection}
        onSectionClick={handleDotClick}
      />

      {/* Left Vertical Circles Dot Navigator */}
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
                  className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-10"
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

      {/* Core Interactive Scrolling Layout Vector Matrix */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full"
      >
        <Hero profile={profile} />
        <About profile={profile} />
        <Experience experiences={experiences} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Contact profile={profile} socialLinks={socialLinks} />
      </motion.main>

      {/* Bottom Scroll Progress Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 w-screen h-1 sm:h-1.5 z-40 origin-left pointer-events-none"
        style={{ 
          scaleX: adjustedScrollProgress,
          backgroundColor: activeTheme.sky.start || 'white',
          boxShadow: `0 0 10px ${activeTheme.sky.start || 'white'}`
        }}
      />

      {/* INTERACTIVE DEVELOPER CONSOLE TERMINAL SIMULATOR MODAL */}
      <AnimatePresence>
        {isDappOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-3xl border border-purple-500/25 bg-neutral-950 p-6 sm:p-8 text-white shadow-2xl overflow-hidden font-mono"
            >
              {/* Glowing core effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header Row */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 bg-white/10 border border-white/30 rounded flex items-center justify-center rotate-45 ${activeTheme.ui.accent}`}>
                    <Flame className="w-4 h-4 -rotate-45" />
                  </div>
                  <div className="text-left font-mono">
                    <h3 className="text-sm font-bold text-white tracking-tight">hc_terminal_console</h3>
                    <span className={`text-[9px] uppercase tracking-wider block ${activeTheme.ui.accent}`}>SECURE SSH NODE // VER 2.4</span>
                  </div>
                </div>
                
                {/* Close Trigger */}
                <button
                  onClick={() => {
                    audio.playTerminalClick();
                    setIsDappOpen(false);
                  }}
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Commands / suggestion chips */}
              <div className="mb-4">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-2 text-left">SUGGESTED FILTERS / SHORTCUTS:</span>
                <div className="flex flex-wrap gap-1.5 justify-start">
                  {["help", "about", "skills", "projects", "contact", "clear"].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleTerminalSubmit(cmd)}
                      className={`px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] hover:bg-white/10 hover:border-white/30 transition-all font-mono lowercase cursor-pointer ${activeTheme.ui.accent}`}
                    >
                      {cmd}()
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Log stream */}
              <div className="h-60 rounded-xl bg-black/60 border border-white/5 p-4 overflow-y-auto space-y-2 text-left text-xs mb-4 scrollbar-thin scrollbar-thumb-zinc-800">
                {terminalLogs.map((log, index) => {
                  const isInput = log.startsWith("hc_guest@root:");
                  return (
                    <div 
                      key={index} 
                      className={`${
                        isInput ? `${activeTheme.ui.accent} font-semibold` : "text-zinc-300 leading-relaxed pl-2 border-l border-white/5"
                      }`}
                    >
                      {isInput ? log : <TypewriterText text={log} delay={10} />}
                    </div>
                  );
                })}
                <div ref={logsEndRef} />
              </div>

              {/* Input line field form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTerminalSubmit();
                }}
                className={`flex items-center gap-1.5 p-1 bg-white/[0.02] border border-white/10 rounded-2xl ${activeTheme.ui.borderFocus} transition-all`}
              >
                <span className={`${activeTheme.ui.accent} pl-3 font-semibold font-mono text-xs select-none`}>hc_guest@root:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type info command..."
                  className="bg-transparent border-none outline-none font-mono text-xs flex-1 text-white p-2 min-w-0"
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-xl text-black text-[10px] uppercase font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer font-sans`}
                  style={{ backgroundColor: activeTheme.sky.start }}
                >
                  EXECUTE
                </button>
              </form>

              {/* Footer node */}
              <div className="text-center font-mono text-[8px] text-white/15 mt-5 border-t border-white/5 pt-3 uppercase tracking-widest">
                CONNECTED VIA STANDALONE SANDBOX ENVIRONMENT // HOST ROOT
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
