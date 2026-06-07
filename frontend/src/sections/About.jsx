import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FileText } from "lucide-react";
import { getSystematicRandomProps } from "../utils/animations";
import { resolveImageUrl } from "../utils/helpers";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function About({ profile }) {
  const containerRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section 
      id="one-pool" 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-transparent py-16 sm:py-24 text-white"
    >
      {/* Animated Orbit Glimmers */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-end justify-center select-none overflow-hidden">
        {/* Flying bird (dove/seagull) animation following details */}
        <motion.div
          animate={{
            x: ["-10vw", "110vw"],
            y: ["65vh", "25vh"],
            scale: [0.45, 0.65, 0.45],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
          className="absolute z-20 pointer-events-none drop-shadow-[0_4px_10px_rgba(255,255,255,0.15)] select-none opacity-100"
        >
          <svg width="140" height="70" viewBox="0 0 120 60">
            <path d="M 10,30 Q 35,5 60,30 Q 85,5 110,30 Q 85,15 60,30 Q 35,15 10,30 Z" fill="#f8fafc" opacity="0.95">
              <animate 
                attributeName="d" 
                dur="1.4s" 
                repeatCount="indefinite"
                values="
                  M 10,30 Q 35,5 60,30 Q 85,5 110,30 Q 85,15 60,30 Q 35,15 10,30 Z;
                  M 10,30 Q 35,25 60,30 Q 85,25 110,30 Q 85,35 60,30 Q 35,35 10,30 Z;
                  M 10,30 Q 35,5 60,30 Q 85,5 110,30 Q 85,15 60,30 Q 35,15 10,30 Z
                "
              />
            </path>
          </svg>
        </motion.div>

        {/* Dynamic diagonal white light streak representing flying orbit ray */}
        <motion.div 
          animate={{
            x: ["-20vw", "120vw"],
            y: ["75vh", "35vh"],
          }}
          transition={{
            repeat: Infinity,
            duration: 11,
            ease: "linear",
          }}
          className="absolute h-[2px] w-[300px] bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 z-10 blur-[1px]"
        />
      </div>

      <div
        className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none select-none max-w-4xl px-4"
      >
        <motion.div 
          {...getSystematicRandomProps("about-title")}
          viewport={{ once: false, margin: "100px" }}
          transition={{ duration: isMobile ? 0.8 : 1.2, type: "spring", bounce: isMobile ? 0.2 : 0.4 }}
          className="relative inline-flex flex-col items-center justify-center"
        >
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-light text-white tracking-tight drop-shadow-md relative leading-none text-center">
            About<span className="opacity-0 w-2 inline-block"> </span>Me
            
            {/* Extended vertical line through the text */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[100%] bg-gradient-to-b from-transparent via-white/70 to-transparent" />
          </h2>
        </motion.div>

        {profile?.profile_photo && (
        <motion.div
           {...getSystematicRandomProps("about-photo")}
           viewport={{ once: false }}
           transition={{ delay: 0.1, duration: isMobile ? 0.8 : 1.2, type: "spring", bounce: isMobile ? 0.2 : 0.5 }}
           className="mt-12 sm:mt-16 relative pointer-events-auto"
        >
          <div className="relative w-32 h-32 min-w-[128px] min-h-[128px] max-w-[128px] max-h-[128px] sm:w-40 sm:h-40 sm:min-w-[160px] sm:min-h-[160px] sm:max-w-[160px] sm:max-h-[160px] md:w-48 md:h-48 md:min-w-[192px] md:min-h-[192px] md:max-w-[192px] md:max-h-[192px] rounded-full overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)] group cursor-pointer shrink-0 aspect-square" title={profile?.full_name || ""}>
             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
             <img 
               src={resolveImageUrl(profile?.profile_photo)}
               alt={profile?.full_name || ""} 
               className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
               referrerPolicy="no-referrer"
             />
          </div>
        </motion.div>
        )}

        <motion.p
          {...getSystematicRandomProps("about-desc")}
          whileInView={{ ...getSystematicRandomProps("about-desc").whileInView, opacity: 0.8 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2, duration: isMobile ? 0.8 : 1.2, type: "spring", bounce: isMobile ? 0.2 : 0.4 }}
          className="text-white font-sans font-light tracking-[0.02em] text-sm sm:text-base md:text-xl mt-12 sm:mt-16 max-w-xl text-center leading-relaxed drop-shadow-sm"
        >
          {profile?.about_description || ""}
        </motion.p>

        <motion.div
          {...getSystematicRandomProps("about-resume")}
          viewport={{ once: false }}
          transition={{ delay: isMobile ? 0.2 : 0.4, duration: isMobile ? 0.6 : 1.0, type: "spring", bounce: isMobile ? 0.3 : 0.6 }}
          className="mt-10 pointer-events-auto"
        >
          <a 
            href={profile?.resume_url ? resolveImageUrl(profile.resume_url) : "#"} 
            target="_blank" 
            rel="noreferrer"
            className="px-8 py-3 bg-white/5 border border-white/20 text-white font-semibold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm cursor-pointer flex items-center gap-2 hover:border-white/40"
          >
            Resume
            <FileText className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
