import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useGameStore from '../store/useGameStore'

export default function PauseMenu({ isMobile }) {
  const isPaused = useGameStore((s) => s.isPaused)
  const isTitleScreen = useGameStore((s) => s.isTitleScreen)
  const setIsPaused = useGameStore((s) => s.setIsPaused)
  const setIsTitleScreen = useGameStore((s) => s.setIsTitleScreen)
  const setQuickMenuOpen = useGameStore((s) => s.setQuickMenuOpen)
  const setShowControlsGuide = useGameStore((s) => s.setShowControlsGuide)

  const containerRef = useRef(null)

  useEffect(() => {
    if (isPaused && !isTitleScreen && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
      )
    }
  }, [isPaused, isTitleScreen])

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

  const handleQuitToTitle = () => {
    setIsPaused(false)
    setIsTitleScreen(true)
    if (document.exitPointerLock) {
      document.exitPointerLock()
    }
  }

  return (
    <div
      onClick={handleResume}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md select-none px-4"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="text-center text-white bg-neutral-900/95 p-8 sm:p-10 rounded-3xl border border-neutral-700/80 shadow-2xl max-w-sm w-full mx-4 relative overflow-hidden"
      >
        {/* Decorative warm glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-mono tracking-wider uppercase mb-3 border border-white/10">
          Game Paused
        </div>
        <h2 className="text-3xl font-light mb-1 tracking-widest text-neutral-100">PAUSED</h2>
        <p className="text-xs text-neutral-400 mb-6 font-light">
          Take your time exploring the residential neighbourhood
        </p>

        <div className="space-y-2.5">
          {/* Resume */}
          <button
            onClick={handleResume}
            className="w-full py-3 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold text-sm rounded-xl transition-all cursor-pointer shadow hover:shadow-md"
          >
            Resume Exploration
          </button>

          {/* Quick Portfolio */}
          <button
            onClick={handleOpenQuickMenu}
            className="w-full py-3 bg-neutral-800 hover:bg-neutral-700/90 text-amber-200 font-medium text-sm rounded-xl border border-neutral-700 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>⚡ Quick Portfolio</span>
            <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-[10px] font-mono text-neutral-400">
              Tab
            </kbd>
          </button>

          {/* Controls Guide */}
          <button
            onClick={handleOpenControls}
            className="w-full py-2.5 bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-xs rounded-xl border border-neutral-700/60 transition-all cursor-pointer"
          >
            Controls & Guidance
          </button>

          {/* Return to Title */}
          <button
            onClick={handleQuitToTitle}
            className="w-full py-2.5 bg-transparent hover:bg-red-500/10 text-neutral-400 hover:text-red-300 font-medium text-xs rounded-xl border border-transparent hover:border-red-500/30 transition-all cursor-pointer"
          >
            Quit to Title Screen
          </button>
        </div>

        <div className="text-[11px] text-neutral-500 pt-5 mt-2 border-t border-neutral-800">
          Press <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 rounded text-neutral-300 font-mono">ESC</kbd> or click outside to resume
        </div>
      </div>
    </div>
  )
}
