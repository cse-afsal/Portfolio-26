import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Terminal,
  User,
  Layers,
  Cpu,
  GraduationCap,
  Award,
  Mail,
  FolderTree,
} from 'lucide-react'
import useOSStore from '../store/useOSStore'
import { playClickSound, playWindowOpenSound } from '../utils/sound'

const DOCK_APPS = [
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'text-emerald-400', bg: 'bg-[#181820]' },
  { id: 'about', label: 'About Me', icon: User, color: 'text-[#4f9eff]', bg: 'bg-[#181820]' },
  { id: 'projects', label: 'Projects', icon: Layers, color: 'text-cyan-400', bg: 'bg-[#181820]' },
  { id: 'skills', label: 'Skills', icon: Cpu, color: 'text-indigo-400', bg: 'bg-[#181820]' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-amber-400', bg: 'bg-[#181820]' },
  { id: 'achievements', label: 'Achievements', icon: Award, color: 'text-yellow-400', bg: 'bg-[#181820]' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'text-teal-400', bg: 'bg-[#181820]' },
  { id: 'finder', label: 'Finder', icon: FolderTree, color: 'text-blue-400', bg: 'bg-[#181820]' },
]

export default function Dock() {
  const windows = useOSStore((s) => s.windows)
  const openApp = useOSStore((s) => s.openApp)
  const focusApp = useOSStore((s) => s.focusApp)
  const activeAppId = useOSStore((s) => s.activeAppId)
  const bouncingAppId = useOSStore((s) => s.bouncingAppId)

  const [hoveredAppId, setHoveredAppId] = useState(null)

  const handleAppClick = (appId) => {
    playClickSound()
    playWindowOpenSound()

    const windowState = windows[appId]
    if (windowState && windowState.isOpen) {
      if (windowState.isMinimized) {
        focusApp(appId)
      } else if (activeAppId === appId) {
        // already active, keep it in front
        focusApp(appId)
      } else {
        focusApp(appId)
      }
    } else {
      openApp(appId)
    }
  }

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 select-none">
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="glass-dock px-3 py-2 rounded-2xl flex items-end gap-2.5 backdrop-blur-2xl shadow-2xl relative border border-white/10"
      >
        {DOCK_APPS.map((app, index) => {
          const Icon = app.icon
          const isOpen = windows[app.id]?.isOpen
          const isFocused = activeAppId === app.id && isOpen && !windows[app.id]?.isMinimized
          const isHovered = hoveredAppId === app.id
          const isBouncing = bouncingAppId === app.id

          // Magnification: hovered icon scales to 1.25, adjacent neighbors scale slightly
          const hoveredIndex = DOCK_APPS.findIndex((a) => a.id === hoveredAppId)
          let scale = 1
          if (hoveredAppId !== null) {
            const distance = Math.abs(index - hoveredIndex)
            if (distance === 0) scale = 1.25
            else if (distance === 1) scale = 1.12
            else if (distance === 2) scale = 1.04
          }

          return (
            <div
              key={app.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredAppId(app.id)}
              onMouseLeave={() => setHoveredAppId(null)}
            >
              {/* Tooltip Label */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -top-9 px-2.5 py-1 rounded-md bg-[#141418]/95 border border-white/10 text-white text-[10px] font-medium tracking-tight whitespace-nowrap shadow-xl pointer-events-none z-50 font-sans"
                >
                  {app.label}
                </motion.div>
              )}

              {/* Icon Container with macOS magnification and bounce */}
              <motion.button
                onClick={() => handleAppClick(app.id)}
                animate={
                  isBouncing
                    ? { y: [0, -18, 0, -10, 0, -4, 0], scale: [1, 1.1, 1, 1.05, 1, 1, 1] }
                    : { scale }
                }
                transition={
                  isBouncing
                    ? { duration: 0.9, ease: 'easeInOut' }
                    : { type: 'spring', stiffness: 350, damping: 25 }
                }
                aria-label={app.label}
                className={`w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 shadow-lg cursor-pointer transition-colors relative ${app.bg} ${
                  isFocused ? 'ring-1 ring-[#4f9eff]/60 shadow-[0_0_15px_rgba(79,158,255,0.25)]' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${app.color}`} />
              </motion.button>

              {/* Active Dot Indicator below icon */}
              <div className="h-1.5 flex items-center justify-center mt-1">
                {isOpen && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-1.5 h-1.5 rounded-full ${
                      isFocused ? 'bg-[#4f9eff] shadow-[0_0_6px_#4f9eff]' : 'bg-white/40'
                    }`}
                  />
                )}
              </div>
            </div>
          )
        })}
      </motion.nav>
    </div>
  )
}
