import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Terminal,
  Layers,
  Cpu,
  Mail,
  Settings,
} from 'lucide-react'
import useOSStore from '../store/useOSStore'
import { playClickSound, playWindowOpenSound } from '../utils/sound'

const ICONS = {
  about: User,
  terminal: Terminal,
  projects: Layers,
  skills: Cpu,
  contact: Mail,
  settings: Settings,
}

const DOCK_APPS = [
  { id: 'about', label: 'About Me', color: 'from-blue-600 to-indigo-600' },
  { id: 'projects', label: 'AI Projects', color: 'from-cyan-600 to-blue-600' },
  { id: 'skills', label: 'Neural Stack', color: 'from-indigo-600 to-purple-600' },
  { id: 'terminal', label: 'Zsh Terminal', color: 'from-neutral-800 to-neutral-900' },
  { id: 'contact', label: 'Get in Touch', color: 'from-emerald-600 to-teal-600' },
  { id: 'settings', label: 'Preferences', color: 'from-neutral-700 to-neutral-800' },
]

export default function Dock() {
  const windows = useOSStore((s) => s.windows)
  const openApp = useOSStore((s) => s.openApp)
  const activeAppId = useOSStore((s) => s.activeAppId)

  const [hoveredAppId, setHoveredAppId] = useState(null)

  const handleAppClick = (appId) => {
    playClickSound()
    playWindowOpenSound()
    openApp(appId)
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 select-none">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="glass-dock px-3 py-2 rounded-2xl flex items-end gap-2.5 backdrop-blur-2xl shadow-2xl relative"
      >
        {DOCK_APPS.map((app) => {
          const Icon = ICONS[app.id]
          const isOpen = windows[app.id]?.isOpen
          const isFocused = activeAppId === app.id
          const isHovered = hoveredAppId === app.id

          return (
            <div key={app.id} className="relative flex flex-col items-center group">
              {/* Tooltip on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -top-10 px-2.5 py-1 rounded-md bg-[#1e1e24] border border-white/10 text-white text-[11px] font-medium shadow-xl pointer-events-none whitespace-nowrap z-50"
                >
                  {app.label}
                </motion.div>
              )}

              {/* App Icon Button */}
              <motion.button
                onClick={() => handleAppClick(app.id)}
                onMouseEnter={() => setHoveredAppId(app.id)}
                onMouseLeave={() => setHoveredAppId(null)}
                whileHover={{ scale: 1.18, y: -4 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${app.color} shadow-lg border border-white/15 cursor-pointer relative overflow-hidden transition-shadow ${
                  isFocused ? 'ring-2 ring-[#4f9eff] shadow-blue-500/20' : ''
                }`}
                aria-label={`Open ${app.label}`}
              >
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                {Icon && <Icon className="w-5 h-5 text-white drop-shadow relative z-10" />}
              </motion.button>

              {/* Active / Running Indicator Dot */}
              <div className="h-1 mt-1 flex items-center justify-center">
                {isOpen && (
                  <motion.div
                    layoutId={`dot-${app.id}`}
                    className={`w-1 h-1 rounded-full ${
                      isFocused ? 'bg-[#4f9eff] glow-accent scale-125' : 'bg-white/60'
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
