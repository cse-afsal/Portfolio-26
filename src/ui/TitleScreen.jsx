import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useGameStore from '../store/useGameStore'

export default function TitleScreen({ isMobile }) {
  const isTitleScreen = useGameStore((s) => s.isTitleScreen)
  const setIsTitleScreen = useGameStore((s) => s.setIsTitleScreen)
  const setQuickMenuOpen = useGameStore((s) => s.setQuickMenuOpen)
  const setShowControlsGuide = useGameStore((s) => s.setShowControlsGuide)

  const containerRef = useRef(null)

  useEffect(() => {
    if (isTitleScreen && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [isTitleScreen])

  if (!isTitleScreen) return null

  const handleStartExploring = () => {
    setIsTitleScreen(false)
    if (!isMobile) {
      setTimeout(() => {
        document.body.requestPointerLock?.()
      }, 50)
    }
  }

  const handleOpenQuickMenu = () => {
    setQuickMenuOpen(true)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md select-none px-4">
      <div
        ref={containerRef}
        className="text-center text-white p-6 sm:p-10 max-w-xl bg-neutral-900/85 border border-neutral-700/60 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden"
      >
        {/* Subtle decorative warm background glow */}
        <div className="absolute -top-28 -right-28 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Phase / Version Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-mono tracking-wider uppercase mb-5 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive 3D Portfolio</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl font-light tracking-widest text-neutral-100 mb-2">
          MY WORLD
        </h1>
        <p className="text-sm sm:text-base text-amber-200/90 font-light mb-4 tracking-wide">
          A Playable Residential Neighbourhood & Portfolio
        </p>
        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-8 max-w-md mx-auto">
          Explore a grounded, peaceful residential district in third-person. Walk into architectural buildings to inspect live project stations, technical skills, academic credentials, and contact channels.
        </p>

        {/* Primary & Secondary Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <button
            onClick={handleStartExploring}
            className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-sm font-semibold rounded-2xl transition-all cursor-pointer shadow-lg hover:shadow-amber-400/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Start Exploring</span>
            <span className="text-xs">→</span>
          </button>

          <button
            onClick={handleOpenQuickMenu}
            className="w-full sm:w-auto px-6 py-3.5 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white text-sm font-medium rounded-2xl border border-neutral-700/80 hover:border-amber-400/40 transition-all cursor-pointer shadow flex items-center justify-center gap-2"
          >
            <span>⚡ Quick Portfolio</span>
            <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-[11px] font-mono text-neutral-400">
              Tab
            </kbd>
          </button>
        </div>

        {/* Short Controls Cheat Sheet */}
        <div className="pt-6 border-t border-neutral-800/80 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              Quick Controls
            </span>
            <button
              onClick={() => setShowControlsGuide(true)}
              className="text-[11px] text-amber-300 hover:underline cursor-pointer"
            >
              Full Guide →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-neutral-300">
            <div className="p-2 bg-neutral-800/40 rounded-lg border border-neutral-700/30">
              <strong className="text-white">WASD:</strong> Move
            </div>
            <div className="p-2 bg-neutral-800/40 rounded-lg border border-neutral-700/30">
              <strong className="text-white">Shift:</strong> Run
            </div>
            <div className="p-2 bg-neutral-800/40 rounded-lg border border-neutral-700/30">
              <strong className="text-white">Space:</strong> Jump
            </div>
            <div className="p-2 bg-neutral-800/40 rounded-lg border border-neutral-700/30">
              <strong className="text-white">E:</strong> Interact
            </div>
            <div className="p-2 bg-neutral-800/40 rounded-lg border border-neutral-700/30">
              <strong className="text-white">Tab:</strong> Fast-Travel
            </div>
            <div className="p-2 bg-neutral-800/40 rounded-lg border border-neutral-700/30">
              <strong className="text-white">Esc:</strong> Pause
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
