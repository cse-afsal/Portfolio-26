import { useState, useEffect, useRef } from 'react'
import useGameStore from '../store/useGameStore'
import InteractionModal from './InteractionModal'
import homeData from '../data/home.json'

export default function HUD() {
  const isPointerLocked = useGameStore((s) => s.isPointerLocked)
  const isPaused = useGameStore((s) => s.isPaused)
  const isRunning = useGameStore((s) => s.isRunning)
  const activeInteraction = useGameStore((s) => s.activeInteraction)
  const nearbyInteractable = useGameStore((s) => s.nearbyInteractable)
  const transitionFadeOpacity = useGameStore((s) => s.transitionFadeOpacity)
  const [isMobile, setIsMobile] = useState(false)

  // Joystick touch state
  const joystickBaseRef = useRef(null)
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 })
  const [joystickActive, setJoystickActive] = useState(false)
  const touchIdRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Touch joystick handlers
  const handleJoystickStart = (e) => {
    e.stopPropagation()
    const touch = e.targetTouches[0]
    touchIdRef.current = touch.identifier
    setJoystickActive(true)
    updateJoystick(touch)
  }

  const handleJoystickMove = (e) => {
    e.stopPropagation()
    if (!joystickActive) return
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === touchIdRef.current) {
        updateJoystick(e.touches[i])
        break
      }
    }
  }

  const handleJoystickEnd = (e) => {
    e.stopPropagation()
    setJoystickActive(false)
    setJoystickPos({ x: 0, y: 0 })
    touchIdRef.current = null
    useGameStore.getState().setTouchMove({ x: 0, y: 0 })
  }

  const updateJoystick = (touch) => {
    if (!joystickBaseRef.current) return
    const rect = joystickBaseRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const maxRadius = rect.width / 2

    let dx = touch.clientX - centerX
    let dy = touch.clientY - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > maxRadius) {
      dx = (dx / dist) * maxRadius
      dy = (dy / dist) * maxRadius
    }

    setJoystickPos({ x: dx, y: dy })

    // Normalize -1 to 1 for game movement
    useGameStore.getState().setTouchMove({
      x: dx / maxRadius,
      y: dy / maxRadius,
    })
  }

  // Handle clicking the interactive prompt
  const handlePromptClick = () => {
    if (nearbyInteractable) {
      if (nearbyInteractable.onInteract) {
        nearbyInteractable.onInteract()
      } else if (nearbyInteractable.id && homeData[nearbyInteractable.id]) {
        useGameStore.getState().setActiveInteraction(homeData[nearbyInteractable.id])
      }
    }
  }

  // --- Pause Overlay ---
  if (isPaused) {
    return (
      <div 
        onClick={() => {
          useGameStore.getState().setIsPaused(false)
          if (!isMobile) document.body.requestPointerLock()
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm select-none cursor-pointer"
      >
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="text-center text-white bg-neutral-900/90 p-8 rounded-2xl border border-neutral-700/60 shadow-2xl max-w-sm mx-4"
        >
          <h2 className="text-3xl font-light mb-2 tracking-widest">PAUSED</h2>
          <p className="text-sm text-neutral-400 mb-6">Explore the peaceful neighbourhood at your pace</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                useGameStore.getState().setIsPaused(false)
                if (!isMobile) document.body.requestPointerLock()
              }}
              className="w-full py-3 bg-neutral-100 hover:bg-white text-neutral-900 font-medium rounded-xl transition-all cursor-pointer shadow"
            >
              Resume
            </button>
            <div className="text-xs text-neutral-400 pt-2">
              Press ESC or tap anywhere to resume
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- Initial Start / Welcome Overlay (Desktop) ---
  if (!isPointerLocked && !isMobile && !activeInteraction) {
    return (
      <div 
        onClick={() => {
          document.body.requestPointerLock()
        }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 backdrop-blur-[2px] cursor-pointer select-none"
      >
        <div className="text-center text-white p-8 max-w-lg">
          <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs tracking-wider uppercase mb-4 text-neutral-300 border border-white/10">
            Phase 3 • The Connected Neighbourhood
          </div>
          <h1 className="text-6xl font-light mb-3 tracking-widest text-neutral-100">MY WORLD</h1>
          <p className="text-base text-neutral-300 font-light mb-8">
            Walk along the continuous residential avenue to explore the Project Studio, Skills House, Education House, Achievement Gallery, and Contact House.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition-all backdrop-blur-md border border-white/30 shadow-lg">
            <span>Click Anywhere to Explore</span>
            <span className="text-xs opacity-75">↗</span>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 text-xs text-neutral-300 bg-black/40 p-4 rounded-xl border border-white/10 text-left">
            <div><strong className="text-white">W A S D:</strong> Move</div>
            <div><strong className="text-white">Shift:</strong> Run</div>
            <div><strong className="text-white">Space:</strong> Jump</div>
            <div><strong className="text-white">E:</strong> Interact / Explore</div>
            <div><strong className="text-white">Mouse:</strong> Look around</div>
            <div><strong className="text-white">Esc:</strong> Close panel / Pause</div>
          </div>
        </div>
      </div>
    )
  }

  // --- Active In-Game HUD ---
  return (
    <>
      {/* Smooth Door Transition Screen Fade Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 bg-neutral-950 transition-opacity duration-300 ease-in-out"
        style={{ opacity: transitionFadeOpacity }}
      />

      {/* Top subtle branding */}
      <div className="fixed top-5 left-6 z-30 pointer-events-none select-none">
        <div className="text-white/80 font-medium tracking-wider text-sm drop-shadow">MY WORLD</div>
        <div className="text-white/40 text-xs">Connected Residential District • All Buildings</div>
      </div>

      {/* Speed & status indicator */}
      <div className="fixed top-5 right-6 z-30 pointer-events-none select-none flex items-center gap-2">
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider transition-colors ${
          isRunning ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40' : 'bg-white/10 text-white/50 border border-white/10'
        }`}>
          {isRunning ? 'RUNNING' : 'WALKING'}
        </span>
      </div>

      {/* ======================================================== */}
      {/* --- INTERACTION PROMPT PILL (CENTER SCREEN) --- */}
      {/* ======================================================== */}
      {nearbyInteractable && !activeInteraction && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 select-none animate-bounce duration-700">
          <button
            onClick={handlePromptClick}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-amber-400/60 shadow-2xl backdrop-blur-md transition-all cursor-pointer group"
          >
            <span className="w-6 h-6 rounded-full bg-amber-400 text-neutral-950 text-xs font-bold flex items-center justify-center shadow-xs">
              E
            </span>
            <div className="text-left">
              <div className="text-xs font-medium text-amber-200 group-hover:text-amber-100">
                {nearbyInteractable.prompt || 'Press E to Explore'}
              </div>
              <div className="text-[11px] text-neutral-400">
                {nearbyInteractable.name}
              </div>
            </div>
            <span className="text-xs text-amber-300 opacity-60 group-hover:opacity-100 ml-1">
              ↵
            </span>
          </button>
        </div>
      )}

      {/* Desktop bottom controls helper */}
      {!isMobile && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/60 text-xs shadow-md">
            <span>WASD Walk</span>
            <span className="text-white/20">•</span>
            <span>Shift Run</span>
            <span className="text-white/20">•</span>
            <span>Space Jump</span>
            <span className="text-white/20">•</span>
            <span className="text-amber-300 font-medium">E Interact</span>
            <span className="text-white/20">•</span>
            <span>Scroll Zoom</span>
            <span className="text-white/20">•</span>
            <span>Esc Pause</span>
          </div>
        </div>
      )}

      {/* Mobile virtual controls */}
      {isMobile && (
        <div className="fixed inset-0 z-30 pointer-events-none select-none">
          {/* Virtual Joystick (Bottom Left) */}
          <div
            ref={joystickBaseRef}
            onTouchStart={handleJoystickStart}
            onTouchMove={handleJoystickMove}
            onTouchEnd={handleJoystickEnd}
            className="pointer-events-auto absolute bottom-8 left-8 w-32 h-32 rounded-full bg-white/10 border-2 border-white/20 backdrop-blur-sm flex items-center justify-center touch-none"
          >
            <div
              style={{
                transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)`,
                transition: joystickActive ? 'none' : 'transform 0.15s ease-out',
              }}
              className="w-14 h-14 rounded-full bg-white/60 shadow-lg border border-white/80 pointer-events-none"
            />
          </div>

          {/* Action buttons (Bottom Right) */}
          <div className="pointer-events-auto absolute bottom-8 right-8 flex flex-col gap-3">
            {/* Interact Button (appears when nearby) */}
            {nearbyInteractable && (
              <button
                onTouchStart={handlePromptClick}
                className="w-16 h-16 rounded-full bg-amber-500/80 backdrop-blur-sm border-2 border-amber-300 text-neutral-950 text-xs font-black flex items-center justify-center active:bg-amber-400 shadow-xl touch-none animate-pulse"
              >
                INTERACT
              </button>
            )}
            {/* Run Toggle Button */}
            <button
              onTouchStart={() => useGameStore.getState().setTouchRun(true)}
              onTouchEnd={() => useGameStore.getState().setTouchRun(false)}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold flex items-center justify-center active:bg-amber-500/50 shadow-md touch-none"
            >
              RUN
            </button>
            {/* Jump Button */}
            <button
              onTouchStart={() => useGameStore.getState().setTouchJump(true)}
              onTouchEnd={() => useGameStore.getState().setTouchJump(false)}
              className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 text-white text-xs font-bold flex items-center justify-center active:bg-white/60 shadow-md touch-none"
            >
              JUMP
            </button>
          </div>

          {/* Swipe hint */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-white/50 text-[11px] bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
            Swipe screen to rotate camera
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* --- ACTIVE INTERACTION MODAL POPUP --- */}
      {/* ======================================================== */}
      <InteractionModal />
    </>
  )
}
