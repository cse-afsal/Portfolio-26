import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import useGameStore from '../store/useGameStore'

export default function PauseMenu({ isMobile }) {
  const isPaused = useGameStore((s) => s.isPaused)
  const isTitleScreen = useGameStore((s) => s.isTitleScreen)
  const setIsPaused = useGameStore((s) => s.setIsPaused)
  const setIsTitleScreen = useGameStore((s) => s.setIsTitleScreen)
  const setQuickMenuOpen = useGameStore((s) => s.setQuickMenuOpen)
  const setShowControlsGuide = useGameStore((s) => s.setShowControlsGuide)
  const graphicsQuality = useGameStore((s) => s.graphicsQuality)
  const setGraphicsQuality = useGameStore((s) => s.setGraphicsQuality)
  const reducedMotion = useGameStore((s) => s.reducedMotion)
  const setReducedMotion = useGameStore((s) => s.setReducedMotion)
  const saveProgress = useGameStore((s) => s.saveProgress)
  const resetProgress = useGameStore((s) => s.resetProgress)

  const [savedBanner, setSavedBanner] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (isPaused && !isTitleScreen && containerRef.current) {
      if (reducedMotion) {
        gsap.set(containerRef.current, { opacity: 1, scale: 1 })
      } else {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
        )
      }
    }
  }, [isPaused, isTitleScreen, reducedMotion])

  if (!isPaused || isTitleScreen) return null

  const handleResume = () => {
    setIsPaused(false)
    if (!isMobile) {
      setTimeout(() => {
        document.body.requestPointerLock?.()
      }, 50)
    }
  }

  const handleOpenQuickMenu = () => {
    setQuickMenuOpen(true)
  }

  const handleOpenControls = () => {
    setShowControlsGuide(true)
  }

  const handleSaveProgress = () => {
    saveProgress()
    setSavedBanner(true)
    setTimeout(() => setSavedBanner(false), 2200)
  }

  const handleResetProgress = () => {
    if (window.confirm('Reset character position and progress to default street spawn?')) {
      resetProgress()
      setIsPaused(false)
      if (!isMobile) {
        setTimeout(() => {
          document.body.requestPointerLock?.()
        }, 50)
      }
    }
  }

  const handleQuitToTitle = () => {
    saveProgress()
    setIsPaused(false)
    setIsTitleScreen(true)
    if (document.exitPointerLock) {
      document.exitPointerLock()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pause Menu"
      onClick={handleResume}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md select-none px-4 overflow-y-auto py-6"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="text-center text-white bg-neutral-900/95 p-6 sm:p-8 rounded-3xl border border-neutral-700/80 shadow-2xl max-w-sm w-full mx-4 relative overflow-hidden my-auto"
      >
        {/* Decorative warm glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-mono tracking-wider uppercase mb-2 border border-white/10">
          Game Paused
        </div>
        <h2 className="text-2xl sm:text-3xl font-light mb-1 tracking-widest text-neutral-100">PAUSED</h2>
        <p className="text-xs text-neutral-400 mb-4 font-light">
          Take your time exploring the residential neighbourhood
        </p>

        {/* Saved Banner Toast */}
        {savedBanner && (
          <div className="mb-3 py-1.5 px-3 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-mono animate-fade-in">
            ✓ Position & progress saved to browser!
          </div>
        )}

        <div className="space-y-2">
          {/* Resume */}
          <button
            onClick={handleResume}
            className="w-full py-2.5 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold text-sm rounded-xl transition-all cursor-pointer shadow hover:shadow-md focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            Resume Exploration
          </button>

          {/* Quick Portfolio */}
          <button
            onClick={handleOpenQuickMenu}
            className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700/90 text-amber-200 font-medium text-xs sm:text-sm rounded-xl border border-neutral-700 transition-all cursor-pointer flex items-center justify-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            <span>⚡ Quick Portfolio</span>
            <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-[10px] font-mono text-neutral-400">
              Tab
            </kbd>
          </button>

          {/* Controls Guide */}
          <button
            onClick={handleOpenControls}
            className="w-full py-2 bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-xs rounded-xl border border-neutral-700/60 transition-all cursor-pointer focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            Controls & Guidance
          </button>

          {/* Save Progress Button */}
          <button
            onClick={handleSaveProgress}
            className="w-full py-2 bg-neutral-800/40 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-xs rounded-xl border border-neutral-700/50 transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            <span>💾 Save Current Position</span>
          </button>

          {/* Quality & Accessibility In-Game Toggle */}
          <div className="pt-2 pb-1 border-t border-neutral-800 text-left">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
              <span>GRAPHICS QUALITY</span>
              <div className="flex gap-1">
                {['low', 'medium', 'high'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setGraphicsQuality(q)}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono transition-all cursor-pointer ${
                      graphicsQuality === q
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>REDUCED MOTION</span>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  reducedMotion
                    ? 'bg-emerald-400 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {reducedMotion ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Reset / Respawn */}
          <button
            onClick={handleResetProgress}
            className="w-full py-1.5 text-neutral-500 hover:text-neutral-300 text-[11px] font-mono transition-colors cursor-pointer"
          >
            ↺ Respawn at Main Street
          </button>

          {/* Return to Title */}
          <button
            onClick={handleQuitToTitle}
            className="w-full py-2 bg-transparent hover:bg-red-500/10 text-neutral-400 hover:text-red-300 font-medium text-xs rounded-xl border border-transparent hover:border-red-500/30 transition-all cursor-pointer focus:ring-2 focus:ring-red-400 focus:outline-none"
          >
            Quit to Title Screen
          </button>
        </div>

        <div className="text-[11px] text-neutral-500 pt-3 mt-2 border-t border-neutral-800">
          Press <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 rounded text-neutral-300 font-mono">ESC</kbd> or click outside to resume
        </div>
      </div>
    </div>
  )
}
