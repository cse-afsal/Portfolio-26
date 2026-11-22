import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal,
  Image,
  Info,
  RefreshCw,
} from 'lucide-react'
import useOSStore, { WALLPAPERS } from '../store/useOSStore'
import { playClickSound } from '../utils/sound'

export default function ContextMenu() {
  const contextMenu = useOSStore((s) => s.contextMenu)
  const closeContextMenu = useOSStore((s) => s.closeContextMenu)
  const openApp = useOSStore((s) => s.openApp)
  const cycleWallpaper = useOSStore((s) => s.cycleWallpaper)
  const wallpaperIndex = useOSStore((s) => s.wallpaperIndex)
  const notify = useOSStore((s) => s.notify)

  if (!contextMenu.visible) return null

  // Ensure menu stays within screen boundaries
  const x = Math.min(window.innerWidth - 230, Math.max(10, contextMenu.x))
  const y = Math.min(window.innerHeight - 240, Math.max(30, contextMenu.y))

  const handleAction = (callback) => {
    playClickSound()
    callback()
    closeContextMenu()
  }

  const currentWallpaper = WALLPAPERS[wallpaperIndex] || WALLPAPERS[0]

  return (
    <AnimatePresence>
      <div
        onClick={closeContextMenu}
        onContextMenu={(e) => {
          e.preventDefault()
          closeContextMenu()
        }}
        className="fixed inset-0 z-[80] bg-transparent"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
          style={{ left: x, top: y }}
          onClick={(e) => e.stopPropagation()}
          className="fixed z-[90] w-56 p-1.5 rounded-2xl bg-[#181820]/95 border border-white/10 shadow-2xl backdrop-blur-2xl text-xs text-[#e8e8f0] select-none font-sans"
        >
          {/* New Terminal Window */}
          <button
            onClick={() => handleAction(() => openApp('terminal'))}
            className="w-full px-3 py-2 rounded-xl flex items-center justify-between hover:bg-[#4f9eff] hover:text-black transition-colors cursor-pointer text-left group"
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-3.5 h-3.5 text-[#4f9eff] group-hover:text-black transition-colors" />
              <span className="font-medium">New Terminal Window</span>
            </div>
            <span className="text-[10px] font-mono opacity-60">zsh</span>
          </button>

          {/* Change Wallpaper */}
          <button
            onClick={() => handleAction(() => cycleWallpaper())}
            className="w-full px-3 py-2 rounded-xl flex items-center justify-between hover:bg-[#4f9eff] hover:text-black transition-colors cursor-pointer text-left group"
          >
            <div className="flex items-center gap-2.5">
              <Image className="w-3.5 h-3.5 text-[#4f9eff] group-hover:text-black transition-colors" />
              <span className="font-medium">Change Wallpaper</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 group-hover:bg-black/20 truncate max-w-[70px]">
              {currentWallpaper.name.split(' ')[0]}
            </span>
          </button>

          <div className="h-px bg-white/8 my-1" />

          {/* About This Portfolio */}
          <button
            onClick={() => handleAction(() => openApp('about'))}
            className="w-full px-3 py-2 rounded-xl flex items-center gap-2.5 hover:bg-white/10 transition-colors cursor-pointer text-left"
          >
            <Info className="w-3.5 h-3.5 text-[#6b6b80]" />
            <span>About This Portfolio</span>
          </button>

          {/* Refresh Desktop */}
          <button
            onClick={() =>
              handleAction(() => {
                notify('Desktop refreshed')
              })
            }
            className="w-full px-3 py-2 rounded-xl flex items-center gap-2.5 hover:bg-white/10 transition-colors cursor-pointer text-left text-[#8e8ea0] hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Desktop</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
