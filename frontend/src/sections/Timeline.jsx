import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MountainSnow } from "lucide-react";
import { useTheme } from "../lib/theme";

export default function Timeline({ onScrollToTop }) {
  const containerRef = useRef(null);
  const { activeTheme } = useTheme();

  return (
    <section 
      id="climb" 
      ref={containerRef}
      className="relative min-h-[80dvh] w-full flex flex-col justify-center items-center overflow-hidden bg-transparent py-14 text-white"
    >
      <motion.div
        initial={{ opacity: 0, x: -50, y: 100, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ margin: "0px 0px -100px 0px", once: false }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="relative z-10 w-full flex flex-col justify-center items-center flex-1 px-6 text-center"
      >
        <MountainSnow className={`w-16 h-16 ${activeTheme.ui.accent} mb-6 drop-shadow-md`} />
        
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-none">
          Contact.<br />
          <span className="text-white/60">Let's Connect.</span>
        </h2>
        
        <p className="font-sans text-lg text-white/50 max-w-lg mb-10">
          Reach out if you want to collaborate on building next-gen scalable systems or elegant interfaces.
        </p>
        
        <button onClick={onScrollToTop} className="px-8 py-3 rounded-full bg-white text-black font-bold uppercase tracking-wider text-sm hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer">
          Scroll to Top
        </button>
      </motion.div>
    </section>
  );
}
