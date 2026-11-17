import { useState } from 'react'
import {
  User,
  Terminal,
  Layers,
  Cpu,
  Mail,
  Settings,
} from 'lucide-react'
import useOSStore from '../store/useOSStore'
import systemData from '../data/system.json'
import { playClickSound, playWindowOpenSound } from '../utils/sound'

const DESKTOP_SHORTCUTS = [
  { id: 'about', label: 'About Afsal', icon: User, color: 'text-[#4f9eff]' },
  { id: 'projects', label: 'AI Projects', icon: Layers, color: 'text-cyan-400' },
  { id: 'skills', label: 'Neural Stack', icon: Cpu, color: 'text-indigo-400' },
  { id: 'terminal', label: 'Terminal.zsh', icon: Terminal, color: 'text-emerald-400' },
  { id: 'contact', label: 'Contact Afsal', icon: Mail, color: 'text-teal-400' },
  { id: 'settings', label: 'System Prefs', icon: Settings, color: 'text-neutral-400' },
]

export default function Desktop({ children }) {
  const wallpaperId = useOSStore((s) => s.wallpaper)
  const openApp = useOSStore((s) => s.openApp)
  const openContextMenu = useOSStore((s) => s.openContextMenu)
  const closeContextMenu = useOSStore((s) => s.closeContextMenu)
  const setStartMenuOpen = useOSStore((s) => s.setStartMenuOpen)

  const [selectedIconId, setSelectedIconId] = useState(null)

  const currentWallpaper =
    systemData.wallpapers.find((w) => w.id === wallpaperId) || systemData.wallpapers[0]

  const handleDesktopClick = () => {
    setSelectedIconId(null)
    closeContextMenu()
    setStartMenuOpen(false)
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    openContextMenu(e.clientX, e.clientY)
  }

  const handleIconClick = (e, id) => {
    e.stopPropagation()
    playClickSound()
    setSelectedIconId(id)
  }

  const handleIconDoubleClick = (e, id) => {
    e.stopPropagation()
    playClickSound()
    playWindowOpenSound()
    openApp(id)
  }

  return (
    <div
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      style={{
        background: currentWallpaper.style,
      }}
      className="w-full h-full relative overflow-hidden select-none"
    >
      {/* Subtle Neural Grid Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(rgba(79, 158, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Subtle Central Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4f9eff]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Desktop App Icons Grid (Top Left) */}
      <div className="absolute top-12 left-5 z-10 flex flex-col gap-4">
        {DESKTOP_SHORTCUTS.map((item) => {
          const Icon = item.icon
          const isSelected = selectedIconId === item.id

          return (
            <div
              key={item.id}
              onClick={(e) => handleIconClick(e, item.id)}
              onDoubleClick={(e) => handleIconDoubleClick(e, item.id)}
              onTouchEnd={(e) => handleIconDoubleClick(e, item.id)}
              className={`w-22 p-2 rounded-xl flex flex-col items-center gap-1.5 transition-all cursor-pointer group text-center ${
                isSelected
                  ? 'bg-[#4f9eff]/20 ring-1 ring-[#4f9eff]/50'
                  : 'hover:bg-white/5'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center bg-[#181820]/90 border border-white/10 shadow-lg group-hover:scale-105 transition-transform ${
                  isSelected ? 'border-[#4f9eff]/60 glow-accent-subtle' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>

              {/* Icon Label */}
              <span
                className={`text-[11px] font-medium tracking-tight px-1.5 py-0.5 rounded leading-tight drop-shadow max-w-full truncate ${
                  isSelected ? 'bg-[#4f9eff] text-black font-semibold' : 'text-[#e8e8f0]'
                }`}
              >
                {item.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* OS Center Watermark Brand (Subtle) */}
      <div className="absolute bottom-24 right-8 pointer-events-none text-right z-0 opacity-20">
        <div className="text-3xl font-light tracking-widest text-[#e8e8f0]">AFSAL OS</div>
        <div className="text-xs font-mono text-[#4f9eff] mt-0.5">Neural Workstation • v1.0.0</div>
      </div>

      {/* Windows Layer Container */}
      <div className="w-full h-full relative z-20 pointer-events-none">
        <div className="w-full h-full relative pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
