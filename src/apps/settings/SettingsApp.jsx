import {
  Monitor,
  Volume2,
  VolumeX,
  Cpu,
  Info,
  Check,
} from 'lucide-react'
import useOSStore from '../../store/useOSStore'
import systemData from '../../data/system.json'
import { playClickSound, playWindowOpenSound } from '../../utils/sound'

export default function SettingsApp() {
  const wallpaper = useOSStore((s) => s.wallpaper)
  const setWallpaper = useOSStore((s) => s.setWallpaper)
  const soundEnabled = useOSStore((s) => s.soundEnabled)
  const toggleSound = useOSStore((s) => s.toggleSound)

  const wallpapers = systemData.wallpapers || []
  const specs = systemData.os.specs || {}

  const handleWallpaperChange = (id) => {
    playClickSound()
    setWallpaper(id)
  }

  const handleSoundToggle = () => {
    toggleSound()
    if (!soundEnabled) {
      setTimeout(() => playClickSound(), 50)
    }
  }

  const handleTestSound = () => {
    playWindowOpenSound()
  }

  return (
    <div className="p-6 md:p-8 space-y-6 text-[#e8e8f0] font-sans">
      {/* Header */}
      <div className="pb-6 border-b border-white/8">
        <h1 className="text-2xl font-bold tracking-tight text-white">System Preferences</h1>
        <p className="text-xs text-[#6b6b80] mt-1">
          Customize desktop environment visual theme, audio feedback, and inspect system telemetry.
        </p>
      </div>

      {/* Section 1: Desktop Wallpaper */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-[#4f9eff]" />
          <h2 className="text-sm font-semibold text-white tracking-tight">Desktop Wallpaper</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {wallpapers.map((w) => {
            const isSelected = wallpaper === w.id
            return (
              <button
                key={w.id}
                onClick={() => handleWallpaperChange(w.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'border-[#4f9eff] bg-[#1a2336]/60 shadow-lg shadow-blue-500/10'
                    : 'border-white/10 hover:border-white/20 bg-[#141418]'
                }`}
              >
                {/* Mini wallpaper preview box */}
                <div
                  className="w-full h-16 rounded-lg mb-2.5 border border-white/10 relative"
                  style={{ background: w.style }}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#4f9eff] text-black flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="text-xs font-semibold text-white truncate">{w.name}</div>
                <div className="text-[10px] font-mono text-[#6b6b80] mt-0.5">
                  {isSelected ? 'Active Wallpaper' : 'Click to Apply'}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Section 2: Audio Preferences */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-[#4f9eff]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#6b6b80]" />
          )}
          <h2 className="text-sm font-semibold text-white tracking-tight">Audio & Feedback</h2>
        </div>

        <div className="bg-[#141418] border border-white/8 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-white">Synthesized Audio Effects</div>
            <p className="text-[11px] text-[#6b6b80] mt-0.5 max-w-md">
              Procedural Web Audio API sound triggers for clicks, window gestures, and terminal keystrokes. Zero external asset downloads.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {soundEnabled && (
              <button
                onClick={handleTestSound}
                className="px-3 py-1.5 rounded-lg bg-[#1e1e24] hover:bg-[#282834] border border-white/10 text-xs text-[#8e8ea0] hover:text-white transition-colors cursor-pointer"
              >
                Test Sound
              </button>
            )}

            <button
              onClick={handleSoundToggle}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#4f9eff] text-black shadow-md shadow-blue-500/20'
                  : 'bg-[#1e1e24] text-[#8e8ea0] border border-white/10 hover:text-white'
              }`}
            >
              {soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Hardware Specifications */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#4f9eff]" />
          <h2 className="text-sm font-semibold text-white tracking-tight">Hardware & Workstation Specs</h2>
        </div>

        <div className="bg-[#141418] border border-white/8 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-2.5 rounded-lg bg-[#1e1e24]/60 border border-white/5">
            <span className="text-[10px] font-mono text-[#6b6b80] uppercase tracking-wider block">Host Node</span>
            <span className="text-xs font-mono text-white mt-0.5 block truncate">{specs.host}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#1e1e24]/60 border border-white/5">
            <span className="text-[10px] font-mono text-[#6b6b80] uppercase tracking-wider block">Neural Engine</span>
            <span className="text-xs font-mono text-[#4f9eff] mt-0.5 block truncate">{specs.cpu}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#1e1e24]/60 border border-white/5">
            <span className="text-[10px] font-mono text-[#6b6b80] uppercase tracking-wider block">Acceleration</span>
            <span className="text-xs font-mono text-cyan-400 mt-0.5 block truncate">{specs.gpu}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#1e1e24]/60 border border-white/5">
            <span className="text-[10px] font-mono text-[#6b6b80] uppercase tracking-wider block">Memory Buffer</span>
            <span className="text-xs font-mono text-white mt-0.5 block truncate">{specs.memory}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#1e1e24]/60 border border-white/5">
            <span className="text-[10px] font-mono text-[#6b6b80] uppercase tracking-wider block">Kernel</span>
            <span className="text-xs font-mono text-white mt-0.5 block truncate">{specs.kernel}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#1e1e24]/60 border border-white/5">
            <span className="text-[10px] font-mono text-[#6b6b80] uppercase tracking-wider block">Shell</span>
            <span className="text-xs font-mono text-emerald-400 mt-0.5 block truncate">{specs.shell}</span>
          </div>
        </div>
      </div>

      {/* Section 4: OS Metadata */}
      <div className="pt-2 border-t border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6b6b80]">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#4f9eff]" />
          <span>Afsal OS {systemData.os.version} ({systemData.os.codename})</span>
        </div>
        <span className="font-mono text-[10px]">Built with React, Vite, Tailwind CSS, Framer Motion & Zustand</span>
      </div>
    </div>
  )
}
