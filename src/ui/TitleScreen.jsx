import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useGameStore from '../store/useGameStore'

export default function TitleScreen({ isMobile }) {
  const isTitleScreen = useGameStore((s) => s.isTitleScreen)
  const setIsTitleScreen = useGameStore((s) => s.setIsTitleScreen)
  const setQuickMenuOpen = useGameStore((s) => s.setQuickMenuOpen)
  const setShowControlsGuide = useGameStore((s) => s.setShowControlsGuide)
  const hasSavedSession = useGameStore((s) => s.hasSavedSession)
  const resumeSavedSession = useGameStore((s) => s.resumeSavedSession)
  const graphicsQuality = useGameStore((s) => s.graphicsQuality)
  const setGraphicsQuality = useGameStore((s) => s.setGraphicsQuality)
  const reducedMotion = useGameStore((s) => s.reducedMotion)
  const setReducedMotion = useGameStore((s) => s.setReducedMotion)

  const containerRef = useRef(null)

  useEffect(() => {
    if (isTitleScreen && containerRef.current) {
      if (reducedMotion) {
        gsap.set(containerRef.current, { opacity: 1, y: 0 })
      } else {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
      }
    }
  }, [isTitleScreen, reducedMotion])

  if (!isTitleScreen) return null

  const handleStartExploring = () => {
    setIsTitleScreen(false)
    if (!isMobile) {
      setTimeout(() => {
        document.body.requestPointerLock?.()
      }, 50)
    }
  }

  const handleResumeSaved = () => {
    resumeSavedSession()
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
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to My World"
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md select-none px-4 overflow-y-auto py-6"
    >
      <div
        ref={containerRef}
        className="text-center text-white p-6 sm:p-9 max-w-xl bg-neutral-900/90 border border-neutral-700/70 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden my-auto w-full"
      >
        {/* Decorative warm background glow */}
        <div className="absolute -top-28 -right-28 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Status Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-mono tracking-wider uppercase mb-4 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive 3D Portfolio • Release Candidate</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-light tracking-widest text-neutral-100 mb-1">
          MY WORLD
        </h1>
        <p className="text-sm sm:text-base text-amber-200/90 font-light mb-3 tracking-wide">
          A Playable Residential Neighbourhood & Portfolio
        </p>
        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6 max-w-md mx-auto">
          Explore a grounded, peaceful residential district in third-person. Walk into architectural buildings to inspect live project stations, technical skills, academic credentials, and contact channels.
        </p>

        {/* Quality & Accessibility Quick Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 p-2 bg-neutral-800/50 rounded-2xl border border-neutral-700/50 text-xs text-neutral-300">
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider ml-1 mr-1">
            Quality:
          </span>
          {['low', 'medium', 'high'].map((q) => (
            <button
              key={q}
              onClick={() => setGraphicsQuality(q)}
              className={`px-3 py-1 rounded-xl text-xs font-mono capitalize transition-all cursor-pointer focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                graphicsQuality === q
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow'
                  : 'bg-neutral-850 hover:bg-neutral-750 text-neutral-400'
              }`}
            >
              {q}
            </button>
          ))}

          <span className="text-neutral-600 mx-1">|</span>

          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-mono transition-all cursor-pointer focus:ring-2 focus:ring-amber-400 focus:outline-none ${
              reducedMotion
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {reducedMotion ? '✓ Reduced Motion' : 'Reduced Motion: Off'}
          </button>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          {hasSavedSession && (
            <button
              onClick={handleResumeSaved}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-semibold rounded-2xl transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            >
              <span>Resume Last Save</span>
              <span className="text-xs">↺</span>
            </button>
          )}

          <button
            onClick={handleStartExploring}
            className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-sm font-semibold rounded-2xl transition-all cursor-pointer shadow-lg hover:shadow-amber-400/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            <span>{hasSavedSession ? 'New Run' : 'Start Exploring'}</span>
            <span className="text-xs">→</span>
          </button>

          <button
            onClick={handleOpenQuickMenu}
            className="w-full sm:w-auto px-5 py-3.5 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white text-sm font-medium rounded-2xl border border-neutral-700/80 hover:border-amber-400/40 transition-all cursor-pointer shadow flex items-center justify-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            <span>⚡ Quick Portfolio</span>
            <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-[11px] font-mono text-neutral-400">
              Tab
            </kbd>
          </button>
        </div>

        {/* Short Controls Cheat Sheet */}
        <div className="pt-5 border-t border-neutral-800/80 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              Quick Controls
            </span>
            <button
              onClick={() => setShowControlsGuide(true)}
              className="text-[11px] text-amber-300 hover:underline cursor-pointer focus:ring-1 focus:ring-amber-400 focus:outline-none rounded px-1"
            >
              Full Guide & Settings →
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
