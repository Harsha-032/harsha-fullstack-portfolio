import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function AboutSection({ profile }) {
  const containerRef = useRef(null);

  const photo = profile?.profile_photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=600&auto=format&fit=crop";
  const bio = profile?.about_description || "Passionate about building scalable backend systems, elegant frontends, and converting logics into premium dimensions.";

  return (
    <section 
      id="about-section" 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-transparent py-24 text-white"
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

      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -100, y: 150, rotate: -5 }}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
        viewport={{ margin: "0px 0px -100px 0px", once: false }}
        transition={{ duration: 1.0, type: "spring", bounce: 0.3 }}
        className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none select-none max-w-4xl px-4"
      >
        <div className="relative inline-flex flex-col items-center justify-center">
          <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-light text-white tracking-tight drop-shadow-md relative leading-none text-center">
            About<span className="opacity-0 w-2 inline-block"> </span>Me
            
            {/* Extended vertical line through the text */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[100%] bg-gradient-to-b from-transparent via-white/70 to-transparent" />
          </h2>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 50, scale: 0.9 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           viewport={{ once: false }}
           transition={{ delay: 0.1, duration: 1.0, type: "spring", bounce: 0.3 }}
           className="mt-12 sm:mt-16 relative pointer-events-auto"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)] group cursor-pointer" title="Profile Photo">
             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
             <img 
               src={photo} 
               alt="Profile" 
               className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
               referrerPolicy="no-referrer"
             />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: 100, y: -100 }}
          whileInView={{ opacity: 0.8, x: 0, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2, duration: 1.0, type: "spring", bounce: 0.3 }}
          className="text-white font-sans font-light tracking-[0.02em] text-sm sm:text-base md:text-xl mt-12 sm:mt-16 max-w-xl text-center leading-relaxed drop-shadow-sm whitespace-pre-line"
        >
          {bio}
        </motion.p>
      </motion.div>
    </section>
  );
}
