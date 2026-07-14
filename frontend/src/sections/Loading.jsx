import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const bootLogs = [
  "hc_guest@root:~$ init hc_core_system --verbose",
  "[ OK ] Mounting virtual file systems...",
  "[ OK ] Initializing network interfaces...",
  "[ OK ] Loading secure SSH node protocols...",
  "[ OK ] Compiling WebGL landscape shaders...",
  "[ OK ] Fetching portfolio data from origin...",
  "Verifying full-stack system integrity: 100%",
  "Boot sequence complete. Access granted."
];

export default function Loading({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let currentLog = 0;
    let timeoutId;
    let isCancelled = false;
    
    const showNextLog = () => {
      if (isCancelled) return;
      if (currentLog < bootLogs.length) {
        // Capture the exact string synchronously to prevent async updater race conditions
        const logToAppend = bootLogs[currentLog];
        
        setLogs(prev => {
          if (prev.includes(logToAppend)) return prev;
          return [...prev, logToAppend];
        });
        
        currentLog++;
        
        // Randomize the typing speed for realism
        const delay = currentLog === bootLogs.length ? 600 : Math.random() * 250 + 100;
        timeoutId = setTimeout(showNextLog, delay);
      } else {
        timeoutId = setTimeout(() => {
          if (isCancelled) return;
          setIsFinished(true);
          timeoutId = setTimeout(() => {
            if (isCancelled) return;
            onComplete();
          }, 800); // Wait for the exit fade animation
        }, 500);
      }
    };

    // Start boot sequence after short delay
    timeoutId = setTimeout(showNextLog, 400);
    
    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  // We explicitly exclude onComplete to prevent re-triggering the boot sequence
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl select-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl mx-4 rounded-xl border border-emerald-500/30 bg-black/90 p-6 shadow-[0_0_40px_rgba(16,185,129,0.15)] font-mono text-sm overflow-hidden relative"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-emerald-500/20 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-2 text-[10px] text-emerald-500/60 uppercase tracking-widest font-bold">hc_terminal_boot_sequence</span>
            </div>

            <div className="space-y-3 min-h-[260px] flex flex-col justify-end overflow-hidden">
              {logs.map((log, index) => {
                const isCommand = index === 0;
                const isSuccess = log.includes("[ OK ]");
                const isComplete = index === bootLogs.length - 1;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`break-words text-xs sm:text-sm leading-relaxed
                      ${isCommand ? "text-white font-bold" : ""}
                      ${isSuccess ? "text-emerald-400" : ""}
                      ${isComplete ? "text-emerald-300 font-bold" : ""}
                      ${!isCommand && !isSuccess && !isComplete ? "text-emerald-500/80" : ""}
                    `}
                  >
                    {log}
                  </motion.div>
                );
              })}
              
              {/* Blinking Cursor */}
              {logs.length < bootLogs.length && (
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2.5 h-4 bg-emerald-400 mt-2 shrink-0"
                />
              )}
            </div>
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_51%)] bg-[length:100%_4px]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
