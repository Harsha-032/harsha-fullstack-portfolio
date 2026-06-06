import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Loading({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 8) + 3;
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setComplete(true);
          onComplete(); // Trigger app mount instantly to overlap transition
        }, 500);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          <div className="relative flex flex-col items-center justify-center max-w-lg w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-24 h-24 mb-10 flex items-center justify-center rounded-full"
            >
              <span className="font-serif text-3xl font-bold text-white tracking-widest">HC</span>
            </motion.div>

            <div className="text-center space-y-3 mb-10">
              <motion.h1
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0.35em", opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white leading-none pl-[0.35em]"
              >
                HARSHA C
              </motion.h1>
            </div>

            <div className="w-full max-w-xs space-y-4">
              <div className="flex justify-between items-baseline font-mono text-[11px] text-white/40">
                <span>INITIALIZING SYSTEM</span>
                <span className="text-emerald-400 tracking-wider font-bold">{progress}%</span>
              </div>
              
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400 to-[#22d3ee]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
