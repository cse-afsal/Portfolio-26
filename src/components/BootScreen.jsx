import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, FastForward } from 'lucide-react'

const BOOT_LOGS = [
  '[ OK ] Loading kernel modules...',
  '[ OK ] Mounting file systems...',
  '[ OK ] Starting session manager...',
  '[ OK ] Welcome, Afsal.',
]

export default function BootScreen({ onBootComplete }) {
  const [currentLogIndex, setCurrentLogIndex] = useState(0)
  const [isSkipped, setIsSkipped] = useState(false)

  const handleFinish = useCallback(() => {
    setIsSkipped(true)
    setTimeout(() => {
      onBootComplete()
    }, 200)
  }, [onBootComplete])

  // Keyboard shortcut: Esc or Space to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleFinish()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleFinish])

  // Step through boot logs sequentially over 2.5s
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentLogIndex(1), 500),
      setTimeout(() => setCurrentLogIndex(2), 1100),
      setTimeout(() => setCurrentLogIndex(3), 1800),
      setTimeout(() => setCurrentLogIndex(4), 2400),
      setTimeout(() => {
        handleFinish()
      }, 2900),
    ]

    return () => timers.forEach(clearTimeout)
  }, [handleFinish])

  return (
    <AnimatePresence>
      {!isSkipped && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#0d0d0f] flex flex-col items-center justify-center select-none text-[#e8e8f0] font-mono px-4"
        >
          {/* Skip Button */}
          <button
            onClick={handleFinish}
            className="absolute top-6 right-6 px-3.5 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1e1e24] border border-white/10 hover:border-[#4f9eff]/40 text-xs text-[#8e8ea0] hover:text-[#4f9eff] transition-all flex items-center gap-2 cursor-pointer group shadow-lg"
          >
            <span>Skip Boot</span>
            <FastForward className="w-3.5 h-3.5 text-[#4f9eff] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Central Boot Container */}
          <div className="w-full max-w-md flex flex-col items-center text-center space-y-6">
            {/* Terminal Logo Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-2xl bg-[#141418] border border-white/10 flex items-center justify-center text-[#4f9eff] shadow-2xl glow-accent-subtle"
            >
              <Terminal className="w-7 h-7" />
            </motion.div>

            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-mono">
                AFSAL OS <span className="text-[#4f9eff] text-lg font-normal">v1.0</span>
              </h1>
              <p className="text-xs text-[#6b6b80] mt-1 font-mono tracking-wider uppercase">
                Neural Workstation Environment
              </p>
            </div>

            {/* Progress Bar (2.5s duration) */}
            <div className="w-64 sm:w-72 h-1.5 bg-[#141418] border border-white/10 rounded-full overflow-hidden p-[1px] relative shadow-inner">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#2055a5] to-[#4f9eff] rounded-full shadow-[0_0_12px_rgba(79,158,255,0.8)]"
              />
            </div>

            {/* Fake Boot Logs that type out one by one */}
            <div className="h-28 w-full max-w-sm flex flex-col items-start justify-start text-[11px] font-mono space-y-1.5 px-3 py-2 bg-[#121216]/60 rounded-xl border border-white/5 text-left overflow-hidden">
              {BOOT_LOGS.slice(0, currentLogIndex).map((log, index) => {
                const isLatest = index === currentLogIndex - 1
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex items-center gap-2 ${
                      isLatest ? 'text-white' : 'text-[#6b6b80]'
                    }`}
                  >
                    <span className="text-[#4f9eff] font-semibold">[ OK ]</span>
                    <span>{log.replace('[ OK ] ', '')}</span>
                  </motion.div>
                )
              })}
              {currentLogIndex < BOOT_LOGS.length && (
                <div className="flex items-center gap-1 text-[#6b6b80] text-[10px]">
                  <span className="inline-block w-1.5 h-3 bg-[#4f9eff] animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Footer build tag */}
          <div className="absolute bottom-6 text-[10px] text-[#404050] font-mono">
            BUILD 2026.11-RELEASE • KERNEL 6.8-NEURAL
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
