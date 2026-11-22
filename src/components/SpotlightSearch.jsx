import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Terminal,
  User,
  FolderTree,
  Cpu,
  GraduationCap,
  Award,
  Mail,
  FileCode,
  ArrowRight,
  Command,
} from 'lucide-react'
import useOSStore from '../store/useOSStore'
import { playClickSound, playWindowOpenSound } from '../utils/sound'

const SEARCH_APPS = [
  { id: 'terminal', name: 'Terminal', desc: 'Interactive zsh developer console & commands', icon: Terminal, color: 'text-emerald-400' },
  { id: 'about', name: 'About Me', desc: 'Bio, background, stats & active projects', icon: User, color: 'text-[#4f9eff]' },
  { id: 'finder', name: 'Finder — Projects', desc: 'File-explorer project catalog & architecture specs', icon: FolderTree, color: 'text-blue-400' },
  { id: 'skills', name: 'Skills.exe', desc: 'Technical stack, neural frameworks & tools', icon: Cpu, color: 'text-indigo-400' },
  { id: 'education', name: 'Education', desc: 'Academic timeline, degrees & certifications', icon: GraduationCap, color: 'text-amber-400' },
  { id: 'achievements', name: 'Achievements', desc: 'Competitive hackathon awards & distinctions', icon: Award, color: 'text-yellow-400' },
  { id: 'contact', name: 'Mail — Contact', desc: 'Direct message dispatcher & verification links', icon: Mail, color: 'text-teal-400' },
  { id: 'readme', name: 'README.txt', desc: 'How to use and navigate AFSAL OS portfolio', icon: FileCode, color: 'text-rose-400' },
]

function SpotlightModal({ onClose }) {
  const openApp = useOSStore((s) => s.openApp)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filteredApps = SEARCH_APPS.filter(
    (app) =>
      app.name.toLowerCase().includes(query.toLowerCase()) ||
      app.desc.toLowerCase().includes(query.toLowerCase())
  )

  const handleLaunch = (appId) => {
    playClickSound()
    playWindowOpenSound()
    openApp(appId)
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredApps.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredApps.length - 1) : prev - 1
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredApps.length > 0) {
        const target = filteredApps[selectedIndex] || filteredApps[0]
        handleLaunch(target.id)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4 select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -15 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-[#14141c]/95 border border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden text-[#e8e8f0] font-sans"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
          <Search className="w-5 h-5 text-[#4f9eff] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search apps, commands, or sections..."
            className="w-full bg-transparent text-sm text-white placeholder-[#606070] outline-none font-mono"
          />
          <div className="flex items-center gap-1 text-[10px] font-mono text-[#606070] bg-[#1e1e24] px-2 py-0.5 rounded border border-white/5 shrink-0">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredApps.length === 0 ? (
            <div className="py-10 text-center text-xs font-mono text-[#606070]">
              No application found matching &quot;{query}&quot;
            </div>
          ) : (
            filteredApps.map((app, idx) => {
              const Icon = app.icon
              const isSelected = selectedIndex === idx

              return (
                <div
                  key={app.id}
                  onClick={() => handleLaunch(app.id)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-[#4f9eff] text-black shadow-md'
                      : 'hover:bg-white/5 text-[#a0a0b0]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-black/20 border-black/20 text-black'
                          : 'bg-[#181822] border-white/10'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : app.color}`} />
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`text-xs font-semibold truncate ${
                          isSelected ? 'text-black' : 'text-white'
                        }`}
                      >
                        {app.name}
                      </div>
                      <div
                        className={`text-[11px] truncate ${
                          isSelected ? 'text-black/80' : 'text-[#6b6b80]'
                        }`}
                      >
                        {app.desc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-black/20 text-black' : 'text-[#606070]'
                      }`}
                    >
                      Launch
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-black' : 'text-[#606070]'
                      }`}
                    />
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2 bg-[#101016] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#606070]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>
          <span>Spotlight Search</span>
        </div>
      </motion.div>
    </div>
  )
}

export default function SpotlightSearch() {
  const isSpotlightOpen = useOSStore((s) => s.isSpotlightOpen)
  const setSpotlightOpen = useOSStore((s) => s.setSpotlightOpen)

  // Listen for Cmd/Ctrl+K and Esc globally
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSpotlightOpen(!isSpotlightOpen)
      } else if (e.key === 'Escape' && isSpotlightOpen) {
        e.preventDefault()
        setSpotlightOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSpotlightOpen, setSpotlightOpen])

  return (
    <AnimatePresence>
      {isSpotlightOpen && (
        <SpotlightModal onClose={() => setSpotlightOpen(false)} />
      )}
    </AnimatePresence>
  )
}
