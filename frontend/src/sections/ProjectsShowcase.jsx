import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, Database, Sparkles, Globe } from "lucide-react";
import { useTheme } from "../lib/theme";

export default function ProjectsShowcase({ projects = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { activeTheme } = useTheme();

  return (
    <section 
      id="redefined" 
      className="relative py-24 sm:py-32 bg-transparent overflow-hidden flex items-center justify-center pt-32 sm:pt-40 text-white"
    >
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full filter blur-[150px] pointer-events-none opacity-10" 
        style={{ backgroundColor: activeTheme.sky.start }} 
      />
      <div 
        className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full filter blur-[120px] pointer-events-none opacity-10" 
        style={{ backgroundColor: activeTheme.sky.mid }} 
      />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 relative z-10">
        
        {/* Head Block */}
        <div className="max-w-2xl text-left mb-16 sm:mb-24">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${activeTheme.ui.badgeText} ${activeTheme.ui.badgeBg} border ${activeTheme.ui.badgeBorder} rounded-full px-5 py-1.5 backdrop-blur-md inline-block mb-4`}>
            Projects
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Creative Showcase
          </h2>
          <p className="font-sans text-[#a0a0ab] text-base sm:text-lg mt-6 font-light leading-relaxed">
            A hand-picked selection of complex full-stack products, built to withstand heavy computational loads with beautiful, interactive interfaces.
          </p>
        </div>

        {/* Cinematic Grid of Columns (Apple Style Card Matrix) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pointer-events-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.slug || project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md group overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-500 hover:border-white/20"
              style={{
                boxShadow: hoveredIndex === idx 
                  ? `0 20px 40px -10px ${activeTheme.sky.start}40` 
                  : "0 20px 40px -20px rgba(0, 0, 0, 0.4)",
              }}
              data-cursor="pointer"
              data-cursor-text="VIEW"
            >
              {/* Radial gradient background behind card */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${activeTheme.sky.start}, transparent 70%)` }}
              />

              {/* Product Design Mock Canvas representation */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden border-b border-white/5 bg-transparent">
                {project.image ? (
                  <>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105" />
                    {/* Hover Blur Overlay to make the image appear blurred behind buttons */}
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
                  </>
                ) : (
                  <div className="w-full h-full bg-transparent flex flex-col items-center justify-center p-6 relative">
                    <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at center, ${activeTheme.sky.start}, transparent 80%)` }} />
                    <Sparkles className={`w-8 h-8 mb-4 opacity-50 ${activeTheme.ui.accent}`} />
                    <span className="text-white/30 font-mono text-xs text-center z-10">IMAGE SYSTEM PENDING</span>
                  </div>
                )}
                
                {/* Floating tags */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 backdrop-blur-md text-[8px] font-mono font-bold tracking-widest text-[#f5f5f5]/80 uppercase">
                    PROD_READY
                  </span>
                </div>

                {/* Hover Overlay Buttons */}
                <div className="absolute bottom-4 left-4 z-30 flex items-center gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                  <a
                    href={project.live_url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md text-black rounded-full font-serif font-medium text-xs hover:bg-white hover:scale-105 active:scale-95 transition-all outline-none"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live
                  </a>
                  <a
                    href={project.github_url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/20 text-white rounded-full font-serif font-medium text-xs hover:bg-black/70 active:scale-95 transition-all backdrop-blur-md outline-none"
                  >
                    <Code className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Information Body details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 relative z-20">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-serif text-xl font-bold text-white tracking-tight ${activeTheme.ui.textHover} transition-colors duration-300`}>
                      {project.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" />
                  </div>
                  <p className="font-sans text-xs text-[#a0a0ab] leading-relaxed">
                    {project.description || project.tagline}
                  </p>
                </div>

                {/* Technology Badges list */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech_stack?.map((t) => (
                    <span 
                      key={t.id || t.name}
                      className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 font-mono text-[9px] text-white/50"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
