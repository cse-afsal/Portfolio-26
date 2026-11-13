import { useState, useEffect, useRef } from 'react'
import useGameStore from '../store/useGameStore'

export default function HUD() {
  const isPointerLocked = useGameStore((s) => s.isPointerLocked)
  const isPaused = useGameStore((s) => s.isPaused)
  const isRunning = useGameStore((s) => s.isRunning)
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
          className="text-center text-white bg-neutral-900/80 p-8 rounded-2xl border border-neutral-700/60 shadow-2xl max-w-sm mx-4"
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
  if (!isPointerLocked && !isMobile) {
    return (
      <div 
        onClick={() => {
          document.body.requestPointerLock()
        }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer select-none"
      >
        <div className="text-center text-white p-8 max-w-lg">
          <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs tracking-wider uppercase mb-4 text-neutral-300 border border-white/10">
            Phase 1 • Playable World
          </div>
          <h1 className="text-6xl font-light mb-3 tracking-widest text-neutral-100">MY WORLD</h1>
          <p className="text-base text-neutral-300 font-light mb-8">
            An open 3D residential neighbourhood to explore my portfolio.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition-all backdrop-blur-md border border-white/30 shadow-lg">
            <span>Click Anywhere to Start</span>
            <span className="text-xs opacity-75">↗</span>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 text-xs text-neutral-300 bg-black/40 p-4 rounded-xl border border-white/10 text-left">
            <div><strong className="text-white">W A S D:</strong> Move</div>
            <div><strong className="text-white">Shift:</strong> Run</div>
            <div><strong className="text-white">Space:</strong> Jump</div>
            <div><strong className="text-white">Mouse:</strong> Look around</div>
            <div><strong className="text-white">Scroll:</strong> Zoom camera</div>
            <div><strong className="text-white">Esc:</strong> Pause</div>
          </div>
        </div>
      </div>
    )
  }

  // --- Active In-Game HUD ---
  return (
    <>
      {/* Top subtle branding */}
      <div className="fixed top-5 left-6 z-30 pointer-events-none select-none">
        <div className="text-white/80 font-medium tracking-wider text-sm drop-shadow">MY WORLD</div>
        <div className="text-white/40 text-xs">Residential District • Phase 1</div>
      </div>

      {/* Speed indicator / status */}
      <div className="fixed top-5 right-6 z-30 pointer-events-none select-none">
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider transition-colors ${
          isRunning ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40' : 'bg-white/10 text-white/50 border border-white/10'
        }`}>
          {isRunning ? 'RUNNING' : 'WALKING'}
        </span>
      </div>

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
    </>
  )
}
