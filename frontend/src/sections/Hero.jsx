import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function Hero({ profile }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const titleRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      id="peak" 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between overflow-hidden bg-transparent py-16 sm:py-20 text-white"
    >
      {/* Cinematic Ambient Atmosphere Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60" />
        <div className="absolute top-[20%] left-1/4 w-[500px] h-20 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute top-[35%] right-10 w-[400px] h-16 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: "18s" }} />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-between flex-1 select-none pt-20 sm:pt-24 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: isMobile ? 0.8 : 1.4, delay: isMobile ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-center mt-8 sm:mt-12 group"
        >
          <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-brand-cyan/20 transition-all duration-700 rounded-full" />
          <span className="relative font-serif text-xs font-bold tracking-[0.25em] uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-6 py-2 border border-white/20 bg-white/10 rounded-full backdrop-blur-md">
            {profile?.headline || ""}
          </span>
        </motion.div>

        <div 
          className="relative text-center flex-1 flex flex-col items-center justify-center -mt-8 px-4 pointer-events-none"
        >
          {/* Flashlight Title Container */}
          <div 
            ref={titleRef}
            className="relative pointer-events-auto cursor-default flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Back Layer: Stroke Outline Title */}
            <h1 
              className="font-serif text-5xl sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-light leading-none text-center select-none tracking-tight flex flex-wrap justify-center text-transparent"
              style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)" }}
            >
              {Array.from(profile?.full_name || "").map((letter, i) => (
                <motion.span 
                  key={`stroke-${i}`} 
                  className={letter === " " ? "w-4 sm:w-10" : "inline-block"}
                  initial={{ opacity: 0, y: 60, scale: 0.9, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: isMobile ? 0.8 : 1.6, delay: isMobile ? 0.4 + i * 0.05 : 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            {/* Front Layer: Solid Fill Title with Mask */}
            <h1 
              className="absolute inset-0 font-serif text-5xl sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-light leading-none text-center select-none tracking-tight flex flex-wrap justify-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] pointer-events-none"
              style={{
                WebkitMaskImage: isHovered 
                  ? `radial-gradient(circle 90px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 60px, black 100px)`
                  : "none",
                maskImage: isHovered 
                  ? `radial-gradient(circle 90px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 60px, black 100px)`
                  : "none"
              }}
            >
              {Array.from(profile?.full_name || "").map((letter, i) => (
                <motion.span 
                  key={`solid-${i}`} 
                  className={letter === " " ? "w-4 sm:w-10" : "inline-block"}
                  initial={{ opacity: 0, y: 60, scale: 0.9, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: isMobile ? 0.8 : 1.6, delay: isMobile ? 0.4 + i * 0.05 : 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: isMobile ? 0.8 : 1.4, delay: isMobile ? 0.8 : 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center gap-10 mb-4 select-none pointer-events-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button 
              onClick={() => document.getElementById("one-pool")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 bg-white text-black font-semibold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer"
            >
              Explore Horizon
            </button>
            <button 
              onClick={() => document.getElementById("climb")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 bg-transparent border border-white/20 text-white font-semibold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              Connect
            </button>
          </div>


        </motion.div>
      </div>
    </section>
  );
}
