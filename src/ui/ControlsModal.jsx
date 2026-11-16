import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useGameStore from '../store/useGameStore'

export default function ControlsModal() {
  const showControlsGuide = useGameStore((s) => s.showControlsGuide)
  const setShowControlsGuide = useGameStore((s) => s.setShowControlsGuide)

  const backdropRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (showControlsGuide && backdropRef.current && modalRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      )
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
      )
    }
  }, [showControlsGuide])

  if (!showControlsGuide) return null

  const handleClose = () => {
    if (backdropRef.current && modalRef.current) {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' })
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 16,
        scale: 0.96,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setShowControlsGuide(false),
      })
    } else {
      setShowControlsGuide(false)
    }
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto select-none"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-neutral-900/95 border border-neutral-700/80 rounded-2xl p-6 sm:p-8 text-white shadow-2xl backdrop-blur-md my-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Guidance & Navigation
            </span>
            <h2 className="text-2xl font-light tracking-wide text-neutral-100 mt-1">
              Controls & Interactions
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 -mr-2 -mt-2 text-neutral-400 hover:text-white rounded-xl transition-all cursor-pointer text-xl flex items-center justify-center w-8 h-8"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300/80 mb-2">
              Desktop Priority Controls
            </h3>
            <div className="grid grid-cols-2 gap-2 text-neutral-300">
              <div className="p-2.5 bg-neutral-800/60 rounded-xl border border-neutral-700/40 flex items-center justify-between">
                <span>Move</span>
                <span className="font-mono text-amber-200 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700/50">W A S D</span>
              </div>
              <div className="p-2.5 bg-neutral-800/60 rounded-xl border border-neutral-700/40 flex items-center justify-between">
                <span>Sprint / Run</span>
                <span className="font-mono text-amber-200 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700/50">Shift</span>
              </div>
              <div className="p-2.5 bg-neutral-800/60 rounded-xl border border-neutral-700/40 flex items-center justify-between">
                <span>Jump</span>
                <span className="font-mono text-amber-200 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700/50">Space</span>
              </div>
              <div className="p-2.5 bg-neutral-800/60 rounded-xl border border-neutral-700/40 flex items-center justify-between">
                <span>Interact / Open</span>
                <span className="font-mono text-amber-200 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700/50">E</span>
              </div>
              <div className="p-2.5 bg-neutral-800/60 rounded-xl border border-neutral-700/40 flex items-center justify-between">
                <span>Quick Portfolio</span>
                <span className="font-mono text-amber-200 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700/50">Tab</span>
              </div>
              <div className="p-2.5 bg-neutral-800/60 rounded-xl border border-neutral-700/40 flex items-center justify-between">
                <span>Close / Pause</span>
                <span className="font-mono text-amber-200 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700/50">Esc</span>
              </div>
              <div className="p-2.5 bg-neutral-800/60 rounded-xl border border-neutral-700/40 flex items-center justify-between col-span-2">
                <span>Orbit Camera & Zoom</span>
                <span className="font-mono text-amber-200 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700/50">Mouse Look & Scroll</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Mobile Secondary Controls
            </h3>
            <div className="p-3 bg-neutral-800/40 rounded-xl border border-neutral-700/30 text-neutral-300 space-y-1 text-xs">
              <div>• <strong>Virtual Joystick (Bottom Left):</strong> Touch & drag to walk in any direction.</div>
              <div>• <strong>Action Buttons (Bottom Right):</strong> Run toggle, Jump, and Interact.</div>
              <div>• <strong>Camera Rotation:</strong> Drag single finger across screen to orbit.</div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Smart World Features
            </h3>
            <div className="p-3 bg-neutral-800/30 rounded-xl border border-neutral-700/20 text-neutral-400 text-xs space-y-1">
              <div>• <strong>Zero Loading Screens:</strong> All buildings, interiors, stairs, and streets are connected in one single continuous physics environment.</div>
              <div>• <strong>Anti-Clipping Camera:</strong> Raycasts pull the camera closer when near walls, preventing clipping through ceilings or geometry.</div>
              <div>• <strong>Recruiter Fast-Travel:</strong> Press <code className="text-amber-200 font-mono">Tab</code> anytime to teleport directly to any section.</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 bg-neutral-100 hover:bg-white text-neutral-900 font-medium text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  )
}
