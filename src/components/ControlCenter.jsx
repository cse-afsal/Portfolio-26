import { motion, AnimatePresence } from 'framer-motion'
import {
  Volume2,
  VolumeX,
  Maximize,
  Cpu,
  Activity,
  Download,
} from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import useOSStore from '../store/useOSStore'
import profileData from '../data/profile.json'
import { playClickSound } from '../utils/sound'

export default function ControlCenter() {
  const isControlCenterOpen = useOSStore((s) => s.isControlCenterOpen)
  const setControlCenterOpen = useOSStore((s) => s.setControlCenterOpen)
  const soundEnabled = useOSStore((s) => s.soundEnabled)
  const toggleSound = useOSStore((s) => s.toggleSound)

  if (!isControlCenterOpen) return null

  const toggleFullscreen = () => {
    playClickSound()
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  return (
    <AnimatePresence>
      <div
        onClick={() => setControlCenterOpen(false)}
        className="fixed inset-0 z-50 bg-black/20"
      >
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-10 right-3 w-80 p-4 rounded-2xl bg-[#181820]/95 border border-white/10 shadow-2xl backdrop-blur-2xl text-[#e8e8f0]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <span className="text-xs font-semibold text-white tracking-wide">Control Center</span>
            <span className="text-[10px] font-mono text-[#4f9eff] bg-[#4f9eff]/15 px-2 py-0.5 rounded-full">
              Connected
            </span>
          </div>

          {/* Quick Toggles 2x2 Grid */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => { playClickSound(); toggleSound() }}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#4f9eff]/15 border-[#4f9eff]/40 text-[#4f9eff]'
                  : 'bg-[#141418] border-white/8 text-[#6b6b80] hover:bg-white/5'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              <span className="text-xs font-medium text-white">Sound FX</span>
              <span className="text-[10px] font-mono opacity-80">{soundEnabled ? 'Enabled' : 'Muted'}</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-xl bg-[#141418] border border-white/8 hover:bg-white/5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer text-[#6b6b80] hover:text-white"
            >
              <Maximize className="w-5 h-5 text-neutral-300" />
              <span className="text-xs font-medium text-white">Display</span>
              <span className="text-[10px] font-mono opacity-80">Toggle Fullscreen</span>
            </button>
          </div>

          {/* Telemetry Resource Monitor */}
          <div className="mt-3 p-3 bg-[#141418] rounded-xl border border-white/8 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#6b6b80]">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#4f9eff]" />
                <span>Tensor Neural Core</span>
              </span>
              <span className="text-emerald-400 font-semibold">18% Load</span>
            </div>
            <div className="w-full bg-[#1e1e24] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#4f9eff] h-full w-[18%]" />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#6b6b80] pt-1">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
                <span>CUDA Memory</span>
              </span>
              <span className="text-[#e8e8f0]">12.4 / 32 GB</span>
            </div>
            <div className="w-full bg-[#1e1e24] h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[38%]" />
            </div>
          </div>

          {/* Direct Profile Actions */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <a
              href={profileData.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#1e1e24] hover:bg-[#282832] border border-white/8 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
            >
              <GithubIcon className="w-3.5 h-3.5 text-[#4f9eff]" />
              <span>GitHub</span>
            </a>
            <a
              href={profileData.contacts.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#4f9eff] hover:bg-[#3d8ef5] text-black font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
