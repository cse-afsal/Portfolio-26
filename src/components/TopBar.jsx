import { useState, useEffect } from 'react'
import {
  Terminal,
  Wifi,
  Battery,
  Volume2,
  VolumeX,
  Sliders,
  Sparkles,
} from 'lucide-react'
import useOSStore, { APP_CONFIGS } from '../store/useOSStore'
import { playClickSound } from '../utils/sound'

export default function TopBar() {
  const activeAppId = useOSStore((s) => s.activeAppId)
  const soundEnabled = useOSStore((s) => s.soundEnabled)
  const toggleSound = useOSStore((s) => s.toggleSound)
  const toggleControlCenter = useOSStore((s) => s.toggleControlCenter)
  const toggleStartMenu = useOSStore((s) => s.toggleStartMenu)
  const openApp = useOSStore((s) => s.openApp)

  const [timeStr, setTimeStr] = useState('')
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      )
      setDateStr(
        now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const activeApp = activeAppId ? APP_CONFIGS[activeAppId] : null
  const activeTitle = activeApp ? activeApp.title.split('—')[0].trim() : 'Afsal OS'

  return (
    <header className="h-8 px-3 w-full bg-[#141418]/90 backdrop-blur-md border-b border-white/8 flex items-center justify-between text-xs text-[#e8e8f0] select-none z-50 fixed top-0 left-0">
      {/* Left Menu Items */}
      <div className="flex items-center gap-4">
        {/* Apple/OS Icon */}
        <button
          onClick={() => {
            playClickSound()
            toggleStartMenu()
          }}
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 transition-colors font-semibold text-[#4f9eff] cursor-pointer"
          title="Afsal OS Launcher"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="tracking-wide">AfsalOS</span>
        </button>

        {/* Current Active App Title */}
        <span className="font-semibold text-white/90 hidden sm:inline">
          {activeTitle}
        </span>

        {/* System Menu items */}
        <div className="hidden md:flex items-center gap-1 text-[#6b6b80]">
          <button
            onClick={() => { playClickSound(); openApp('about') }}
            className="px-2 py-0.5 rounded hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => { playClickSound(); openApp('projects') }}
            className="px-2 py-0.5 rounded hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => { playClickSound(); openApp('skills') }}
            className="px-2 py-0.5 rounded hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Skills
          </button>
          <button
            onClick={() => { playClickSound(); openApp('terminal') }}
            className="px-2 py-0.5 rounded hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Terminal
          </button>
          <button
            onClick={() => { playClickSound(); openApp('contact') }}
            className="px-2 py-0.5 rounded hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Right System Tray */}
      <div className="flex items-center gap-3 text-[#6b6b80]">
        {/* Terminal Quick Launcher */}
        <button
          onClick={() => {
            playClickSound()
            openApp('terminal')
          }}
          className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          title="Launch Terminal"
        >
          <Terminal className="w-3.5 h-3.5" />
        </button>

        {/* Audio Mute/Unmute */}
        <button
          onClick={() => {
            toggleSound()
          }}
          className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          title={soundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#4f9eff]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
          )}
        </button>

        {/* Wi-Fi & Battery */}
        <div className="hidden sm:flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" title="Neural Mesh Connected" />
          <div className="flex items-center gap-1">
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400/90">100%</span>
          </div>
        </div>

        {/* Control Center Pill */}
        <button
          onClick={() => {
            playClickSound()
            toggleControlCenter()
          }}
          className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          title="Control Center"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Date and Live Clock */}
        <div className="flex items-center gap-2 text-[11px] font-medium text-white/90 pl-1 border-l border-white/10">
          <span className="hidden sm:inline font-light text-[#6b6b80]">{dateStr}</span>
          <span className="font-mono tracking-wider">{timeStr}</span>
        </div>
      </div>
    </header>
  )
}
