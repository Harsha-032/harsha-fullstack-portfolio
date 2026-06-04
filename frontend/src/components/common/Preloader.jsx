import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // 'loading' | 'reveal' | 'done'

  useEffect(() => {
    const duration = 2200
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const p = Math.min(elapsed / duration, 1)
      // Ease-out curve for natural feel
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.round(eased * 100))

      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        setPhase('reveal')
        setTimeout(() => {
          setPhase('done')
          onComplete?.()
        }, 600)
      }
    }

    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/[0.04] blur-[120px]" />
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Name */}
            <div className="text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-white"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                HARSHA C
              </motion.h1>
              
              <motion.p
                className="mt-3 text-sm md:text-base tracking-[0.35em] uppercase text-zinc-500 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Full Stack Developer
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] rounded-full origin-left"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.span
              className="text-xs tracking-[0.3em] text-zinc-600 font-mono tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {progress}%
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
