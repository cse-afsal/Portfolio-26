import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useGameStore, { PORTFOLIO_SECTIONS } from '../store/useGameStore'

export default function QuickMenu() {
  const quickMenuOpen = useGameStore((s) => s.quickMenuOpen)
  const setQuickMenuOpen = useGameStore((s) => s.setQuickMenuOpen)
  const teleportToSection = useGameStore((s) => s.teleportToSection)
  const visitedSections = useGameStore((s) => s.visitedSections)
  const reducedMotion = useGameStore((s) => s.reducedMotion)

  const backdropRef = useRef(null)
  const containerRef = useRef(null)

  // GSAP Entrance
  useEffect(() => {
    if (quickMenuOpen && backdropRef.current && containerRef.current) {
      if (reducedMotion) {
        gsap.set(backdropRef.current, { opacity: 1 })
        gsap.set(containerRef.current, { opacity: 1, y: 0, scale: 1 })
      } else {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        )
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 25, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
        )
      }
    }
  }, [quickMenuOpen, reducedMotion])

  if (!quickMenuOpen) return null

  const handleClose = () => {
    if (!reducedMotion && backdropRef.current && containerRef.current) {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' })
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 18,
        scale: 0.97,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setQuickMenuOpen(false)
          // Re-lock pointer if closing back to gameplay
          const s = useGameStore.getState()
          if (!s.isTitleScreen && !s.isPaused) {
            document.body.requestPointerLock?.()
          }
        },
      })
    } else {
      setQuickMenuOpen(false)
      const s = useGameStore.getState()
      if (!s.isTitleScreen && !s.isPaused) {
        document.body.requestPointerLock?.()
      }
    }
  }

  const handleSelect = (sectionId) => {
    teleportToSection(sectionId)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick Portfolio Navigation"
      ref={backdropRef}
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto select-none"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-neutral-900/95 border border-neutral-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl backdrop-blur-md overflow-hidden my-auto"
      >
        {/* Decorative architectural ambient glow */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-wider uppercase mb-2">
              <span>⚡ Recruiter Fast-Travel System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-neutral-100">
              Quick Portfolio Menu
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Select any section below to immediately teleport to its building and open its interactive portfolio display.
            </p>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close Quick Menu"
            className="p-2 -mr-2 -mt-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all cursor-pointer text-xl leading-none flex items-center justify-center w-10 h-10 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* 6 Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 relative z-10">
          {PORTFOLIO_SECTIONS.map((sec) => {
            const isVisited = visitedSections.includes(sec.id)
            return (
              <button
                key={sec.id}
                onClick={() => handleSelect(sec.id)}
                className="group relative p-4 rounded-2xl bg-neutral-800/60 hover:bg-neutral-800/90 border border-neutral-700/60 hover:border-amber-400/50 transition-all text-left flex flex-col justify-between cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-white/10 text-neutral-300 border border-white/10 group-hover:bg-amber-400/20 group-hover:text-amber-200 group-hover:border-amber-400/30 transition-colors">
                        {sec.badge}
                      </span>
                      {isVisited && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          ✓ Visited
                        </span>
                      )}
                    </div>
                    <span className="w-5 h-5 rounded-md bg-neutral-700/60 group-hover:bg-amber-400 group-hover:text-neutral-950 text-neutral-300 text-[11px] font-mono font-bold flex items-center justify-center transition-all">
                      {sec.key}
                    </span>
                  </div>

                  <h3 className="text-base font-medium text-white group-hover:text-amber-200 transition-colors">
                    {sec.name}
                  </h3>
                  <div className="text-xs text-neutral-400 mt-0.5 font-light">
                    {sec.subtitle}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-700/40 flex items-center justify-between text-xs text-neutral-400 group-hover:text-amber-300 transition-colors">
                  <span className="font-mono text-[11px]">{sec.building}</span>
                  <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer shortcuts hint */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400 relative z-10">
          <div className="flex items-center gap-4">
            <span>
              Press numbers <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 rounded text-neutral-200 font-mono">1</kbd> to <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 rounded text-neutral-200 font-mono">6</kbd> to jump instantly
            </span>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 rounded text-neutral-200 font-mono">Tab</kbd> or <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 rounded text-neutral-200 font-mono">Esc</kbd> to close
            </span>
          </div>

          <button
            onClick={handleClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl transition-all cursor-pointer font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
