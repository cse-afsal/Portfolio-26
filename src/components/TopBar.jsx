import { useState, useEffect } from 'react'
import {
  Volume2,
  VolumeX,
  Wifi,
  Battery,
  Search,
} from 'lucide-react'
import useOSStore from '../store/useOSStore'
import { playClickSound } from '../utils/sound'

export default function TopBar() {
  const soundEnabled = useOSStore((s) => s.soundEnabled)
  const toggleSound = useOSStore((s) => s.toggleSound)
  const toggleSpotlight = useOSStore((s) => s.toggleSpotlight)
  const setAboutThisOSOpen = useOSStore((s) => s.setAboutThisOSOpen)

  const [timeStr, setTimeStr] = useState('')
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
      setDateStr(
        now.toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleBrandClick = () => {
    playClickSound()
    setAboutThisOSOpen(true)
  }

  const handleSearchClick = () => {
    playClickSound()
    toggleSpotlight()
  }

  return (
    <header className="h-[22px] px-3 w-full bg-[#101014]/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between text-[11px] text-[#e8e8f0] select-none z-50 fixed top-0 left-0">
      {/* Left Menu: Brand that opens About This OS */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBrandClick}
          title="About This OS"
          className="font-bold tracking-wider text-white text-[11px] flex items-center gap-1.5 font-mono hover:text-[#4f9eff] transition-colors cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f9eff] inline-block shadow-[0_0_6px_#4f9eff]" />
          AFSAL OS
        </button>
      </div>

      {/* Right Menu: Controls, Wi-Fi, Battery, Clock & Spotlight Search */}
      <div className="flex items-center gap-3 text-[10px] font-mono text-[#8e8ea0]">
        {/* Spotlight Search Icon Button */}
        <button
          onClick={handleSearchClick}
          title="Spotlight Search (Cmd/Ctrl + K)"
          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 p-0.5"
        >
          <Search className="w-3 h-3 text-[#4f9eff]" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => {
            toggleSound()
            playClickSound()
          }}
          title={soundEnabled ? 'Mute system audio' : 'Enable system audio'}
          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 p-0.5"
        >
          {soundEnabled ? (
            <Volume2 className="w-3 h-3 text-[#4f9eff]" />
          ) : (
            <VolumeX className="w-3 h-3 text-[#6b6b80]" />
          )}
        </button>

        {/* Decorative Wi-Fi Icon */}
        <div title="Wi-Fi: Connected (High-Speed)" className="flex items-center">
          <Wifi className="w-3 h-3 text-emerald-400" />
        </div>

        {/* Decorative Battery Icon */}
        <div
          title="Battery: 100% (Plugged In)"
          className="flex items-center gap-1 text-[#8e8ea0]"
        >
          <Battery className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline text-[9px]">100%</span>
        </div>

        <span className="text-[#3a3a48]">|</span>

        {/* Live Date */}
        <span className="text-[#8e8ea0] hover:text-white transition-colors hidden sm:inline">
          {dateStr}
        </span>

        {/* Live 24h Clock */}
        <span className="text-white font-medium tracking-wide">
          {timeStr}
        </span>
      </div>
    </header>
  )
}
