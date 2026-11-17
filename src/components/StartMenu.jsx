import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Terminal,
  Layers,
  Cpu,
  Mail,
  Settings,
  Search,
  Sparkles,
} from 'lucide-react'
import useOSStore from '../store/useOSStore'
import { playClickSound, playWindowOpenSound } from '../utils/sound'

const APPS_LIST = [
  { id: 'about', name: 'About Afsal', desc: 'Bio, education & AI/ML specialization', icon: User, color: 'text-[#4f9eff]' },
  { id: 'projects', name: 'Projects', desc: 'Deep Learning, Vision & NLP showcases', icon: Layers, color: 'text-cyan-400' },
  { id: 'skills', name: 'Neural Stack', desc: 'PyTorch, ML tooling & math foundations', icon: Cpu, color: 'text-indigo-400' },
  { id: 'terminal', name: 'Terminal (zsh)', desc: 'Interactive developer console & commands', icon: Terminal, color: 'text-emerald-400' },
  { id: 'contact', name: 'Contact & Links', desc: 'Inquiries, GitHub, LinkedIn & resume', icon: Mail, color: 'text-teal-400' },
  { id: 'settings', name: 'Preferences', desc: 'Wallpapers, sounds & system info', icon: Settings, color: 'text-neutral-400' },
]

export default function StartMenu() {
  const isStartMenuOpen = useOSStore((s) => s.isStartMenuOpen)
  const setStartMenuOpen = useOSStore((s) => s.setStartMenuOpen)
  const openApp = useOSStore((s) => s.openApp)

  const [query, setQuery] = useState('')

  if (!isStartMenuOpen) return null

  const filteredApps = APPS_LIST.filter(
    (app) =>
      app.name.toLowerCase().includes(query.toLowerCase()) ||
      app.desc.toLowerCase().includes(query.toLowerCase())
  )

  const handleLaunch = (appId) => {
    playClickSound()
    playWindowOpenSound()
    openApp(appId)
    setStartMenuOpen(false)
  }

  return (
    <AnimatePresence>
      <div
        onClick={() => setStartMenuOpen(false)}
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]"
      >
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-10 left-3 w-84 p-4 rounded-2xl bg-[#181820]/95 border border-white/10 shadow-2xl backdrop-blur-2xl text-[#e8e8f0]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#4f9eff]/15 flex items-center justify-center text-[#4f9eff]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Afsal OS</h3>
                <p className="text-[10px] text-[#6b6b80] font-mono">AI/ML Engineering Workstation</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <Search className="w-3.5 h-3.5 text-[#6b6b80] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search apps, commands, skills..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-[#141418] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#6b6b80] focus:outline-none focus:border-[#4f9eff]/60 focus:ring-1 focus:ring-[#4f9eff]/30"
            />
          </div>

          {/* Apps List */}
          <div className="mt-3 space-y-1 max-h-64 overflow-y-auto pr-1">
            {filteredApps.map((app) => {
              const Icon = app.icon
              return (
                <button
                  key={app.id}
                  onClick={() => handleLaunch(app.id)}
                  className="w-full p-2 rounded-xl flex items-center gap-3 hover:bg-white/6 hover:border-white/10 border border-transparent transition-all cursor-pointer text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#202028] flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                    <Icon className={`w-4 h-4 ${app.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-white group-hover:text-[#4f9eff] transition-colors truncate">
                      {app.name}
                    </div>
                    <div className="text-[10px] text-[#6b6b80] truncate font-light">
                      {app.desc}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Footer Status */}
          <div className="mt-3 pt-2.5 border-t border-white/8 flex items-center justify-between text-[10px] text-[#6b6b80] font-mono">
            <span>Status: Online</span>
            <span>Kernel 6.8 (Neural)</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
