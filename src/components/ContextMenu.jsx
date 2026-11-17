import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal,
  Layers,
  Settings,
  Volume2,
  VolumeX,
  RefreshCw,
  Info,
} from 'lucide-react'
import useOSStore from '../store/useOSStore'
import { playClickSound } from '../utils/sound'

export default function ContextMenu() {
  const contextMenu = useOSStore((s) => s.contextMenu)
  const closeContextMenu = useOSStore((s) => s.closeContextMenu)
  const openApp = useOSStore((s) => s.openApp)
  const soundEnabled = useOSStore((s) => s.soundEnabled)
  const toggleSound = useOSStore((s) => s.toggleSound)

  if (!contextMenu.visible) return null

  // Ensure menu stays within screen boundaries
  const x = Math.min(window.innerWidth - 220, Math.max(10, contextMenu.x))
  const y = Math.min(window.innerHeight - 260, Math.max(40, contextMenu.y))

  const handleAction = (callback) => {
    playClickSound()
    callback()
    closeContextMenu()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.12 }}
        style={{ left: x, top: y }}
        onClick={(e) => e.stopPropagation()}
        className="fixed z-50 w-52 p-1.5 rounded-xl bg-[#1e1e24]/95 border border-white/10 shadow-2xl backdrop-blur-xl text-xs text-[#e8e8f0] select-none"
      >
        <button
          onClick={() => handleAction(() => openApp('terminal'))}
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#4f9eff]/20 hover:text-[#4f9eff] transition-colors cursor-pointer text-left"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Open Terminal</span>
        </button>

        <button
          onClick={() => handleAction(() => openApp('projects'))}
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#4f9eff]/20 hover:text-[#4f9eff] transition-colors cursor-pointer text-left"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>View AI Projects</span>
        </button>

        <div className="h-px bg-white/8 my-1" />

        <button
          onClick={() => handleAction(() => openApp('settings'))}
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer text-left"
        >
          <Settings className="w-3.5 h-3.5 text-[#6b6b80]" />
          <span>Change Wallpaper...</span>
        </button>

        <button
          onClick={() => handleAction(() => toggleSound())}
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-2">
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#4f9eff]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#6b6b80]" />
            )}
            <span>Sound Effects</span>
          </div>
          <span className="text-[10px] text-[#6b6b80] font-mono">
            {soundEnabled ? 'ON' : 'OFF'}
          </span>
        </button>

        <div className="h-px bg-white/8 my-1" />

        <button
          onClick={() => handleAction(() => openApp('about'))}
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer text-left"
        >
          <Info className="w-3.5 h-3.5 text-[#6b6b80]" />
          <span>About Afsal OS</span>
        </button>

        <button
          onClick={() => handleAction(() => window.location.reload())}
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer text-left text-[#6b6b80] hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Desktop</span>
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
