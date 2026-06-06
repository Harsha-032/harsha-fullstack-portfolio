import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, Code, Terminal, Circle } from "lucide-react";
import { useTheme } from "../lib/theme";

export default function Experience({ experiences = [] }) {
  const containerRef = useRef(null);
  const { activeTheme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const getIcon = (type) => {
    switch (type) {
      case "Freelance": return Code;
      case "Contract": return Terminal;
      default: return Briefcase;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  const displayExperiences = experiences.length ? experiences : [];

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-start items-center bg-transparent py-24 sm:py-32 text-white"
    >
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" 
          style={{ backgroundColor: activeTheme.sky.start }} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "0px 0px -100px 0px", once: false }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-start flex-1 px-4 sm:px-12 md:px-16 pointer-events-auto"
      >
        <div className="text-center pt-2 select-none mb-16 sm:mb-24">
          <span className={`font-sans text-[10px] font-bold uppercase tracking-[0.4em] ${activeTheme.ui.badgeText} ${activeTheme.ui.badgeBg} border ${activeTheme.ui.badgeBorder} rounded-full px-5 py-1.5 backdrop-blur-md`}>
            EXPERIENCE
          </span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white drop-shadow-lg max-w-2xl mx-auto leading-tight">
            Career Journey
          </h2>
        </div>

        <div className="relative w-full">
          {/* Vertical Assisting Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2" />
          <motion.div 
            className={`absolute left-6 md:left-1/2 top-0 w-0.5 ${activeTheme.ui.accent.replace('text-', 'bg-')} md:-translate-x-1/2 origin-top shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-12 sm:gap-24">
            {displayExperiences.map((exp, i) => {
              const isEven = i % 2 === 0;
              const Icon = getIcon(exp.employment_type);
              const dateStr = `${formatDate(exp.start_date)} - ${formatDate(exp.end_date)}`;

              return (
                <div key={i} className={`relative flex items-center justify-start md:justify-between w-full group ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Node */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-black border-2 border-white/20 group-hover:border-white/60 transition-colors duration-300 z-10"
                  >
                    <div className="absolute inset-0 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
                      <Icon className={`w-4 h-4 md:w-6 md:h-6 ${activeTheme.ui.accent} opacity-80 group-hover:opacity-100 transition-opacity`} />
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                    className={`w-full md:w-[45%] pl-16 md:pl-0 ${!isEven ? 'md:text-right' : 'md:text-left'} flex flex-col gap-3 md:gap-4`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className={`text-xs md:text-sm font-mono tracking-widest uppercase ${activeTheme.ui.accent}`}>
                        {dateStr}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-white group-hover:text-white/90 transition-colors">
                        {exp.role}
                      </h3>
                      <h4 className="font-sans text-sm md:text-base text-white/50 font-medium">
                        {exp.company}
                      </h4>
                    </div>
                    
                    <div className={`p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 shadow-xl`} >
                      <p className={`font-sans text-sm md:text-base text-white/60 font-light leading-relaxed whitespace-pre-line`}>
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
