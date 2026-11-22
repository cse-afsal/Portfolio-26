import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, Cpu, HardDrive, ShieldCheck } from 'lucide-react'
import useOSStore from '../store/useOSStore'
import { playClickSound } from '../utils/sound'

export default function AboutThisOSModal() {
  const isAboutThisOSOpen = useOSStore((s) => s.isAboutThisOSOpen)
  const setAboutThisOSOpen = useOSStore((s) => s.setAboutThisOSOpen)

  if (!isAboutThisOSOpen) return null

  const handleClose = () => {
    playClickSound()
    setAboutThisOSOpen(false)
  }

  return (
    <AnimatePresence>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-2xl bg-[#14141a]/95 border border-white/10 shadow-2xl backdrop-blur-2xl p-6 text-[#e8e8f0] font-sans relative overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 text-[#606070] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo / Badge */}
          <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-white/8">
            <div className="w-14 h-14 rounded-2xl bg-[#1a1a24] border border-[#4f9eff]/30 flex items-center justify-center text-[#4f9eff] shadow-xl glow-accent-subtle">
              <Terminal className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white font-mono">
                AFSAL OS
              </h2>
              <span className="text-xs font-mono text-[#4f9eff]">
                v1.0.0 (Neural Kernel)
              </span>
            </div>

            <p className="text-xs text-[#a0a0b0] leading-relaxed max-w-xs">
              Personal AI/ML Engineering Workstation & Portfolio for Afsal, specializing in Deep Learning and Data Science.
            </p>
          </div>

          {/* System Specs Overview */}
          <div className="py-4 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-[#8e8ea0]">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#4f9eff]" />
                Neural Engine:
              </span>
              <span className="text-white">PyTorch • CUDA 12.4</span>
            </div>

            <div className="flex items-center justify-between text-[#8e8ea0]">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-[#4f9eff]" />
                Architecture:
              </span>
              <span className="text-white">React 19 • Vite 8 • Tailwind</span>
            </div>

            <div className="flex items-center justify-between text-[#8e8ea0]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Status:
              </span>
              <span className="text-emerald-400 font-semibold">Active & Stable</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 text-center">
            <span className="text-[10px] font-mono text-[#505060]">
              © 2026 Afsal. All systems nominal.
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
