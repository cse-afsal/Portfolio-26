import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import useOSStore from '../store/useOSStore'
import { playClickSound } from '../utils/sound'

export default function TopBar() {
  const soundEnabled = useOSStore((s) => s.soundEnabled)
  const toggleSound = useOSStore((s) => s.toggleSound)

  const [timeStr, setTimeStr] = useState('')
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      )
      setDateStr(
        now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="h-[20px] px-3 w-full bg-[#101014]/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between text-[11px] text-[#e8e8f0] select-none z-50 fixed top-0 left-0">
      {/* Left Menu: Brand */}
      <div className="flex items-center gap-3">
        <span className="font-bold tracking-wider text-white text-[11px] flex items-center gap-1.5 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f9eff] inline-block shadow-[0_0_6px_#4f9eff]" />
          AFSAL OS
        </span>
      </div>

      {/* Right Menu: Sound Toggle & Live Date / Time */}
      <div className="flex items-center gap-3 text-[10px] font-mono text-[#8e8ea0]">
        <button
          onClick={() => {
            toggleSound()
            playClickSound()
          }}
          title={soundEnabled ? 'Mute system audio' : 'Enable system audio'}
          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
        >
          {soundEnabled ? (
            <Volume2 className="w-3 h-3 text-[#4f9eff]" />
          ) : (
            <VolumeX className="w-3 h-3 text-[#6b6b80]" />
          )}
        </button>

        <span className="text-[#3a3a48]">|</span>

        <span className="text-[#8e8ea0] hover:text-white transition-colors">
          {dateStr}
        </span>

        <span className="text-white font-medium tracking-wide">
          {timeStr}
        </span>
      </div>
    </header>
  )
}
