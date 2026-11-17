import { useState, useEffect, useRef } from 'react'
import useGameStore from '../store/useGameStore'
import InteractionModal from './InteractionModal'
import QuickMenu from './QuickMenu'
import TitleScreen from './TitleScreen'
import PauseMenu from './PauseMenu'
import ControlsModal from './ControlsModal'
import homeData from '../data/home.json'

export default function HUD() {
  const isTitleScreen = useGameStore((s) => s.isTitleScreen)
  const isPaused = useGameStore((s) => s.isPaused)
  const isRunning = useGameStore((s) => s.isRunning)
  const activeInteraction = useGameStore((s) => s.activeInteraction)
  const nearbyInteractable = useGameStore((s) => s.nearbyInteractable)
  const transitionFadeOpacity = useGameStore((s) => s.transitionFadeOpacity)
  const reducedMotion = useGameStore((s) => s.reducedMotion)
  const setQuickMenuOpen = useGameStore((s) => s.setQuickMenuOpen)
  const setShowControlsGuide = useGameStore((s) => s.setShowControlsGuide)
  const setIsPaused = useGameStore((s) => s.setIsPaused)

  const [isMobile, setIsMobile] = useState(false)

  // Joystick touch state for mobile
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

  return (
    <>
      {/* Smooth Door / Teleport Transition Screen Fade Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 bg-neutral-950 transition-opacity duration-300 ease-in-out"
        style={{ opacity: transitionFadeOpacity }}
      />

      {/* --- TITLE / START SCREEN --- */}
      <TitleScreen isMobile={isMobile} />

      {/* --- PAUSE MENU --- */}
      <PauseMenu isMobile={isMobile} />

      {/* --- QUICK PORTFOLIO NAVIGATION MENU --- */}
      <QuickMenu />

      {/* --- CONTROLS GUIDANCE MODAL --- */}
      <ControlsModal />

      {/* --- INTERACTION MODAL POPUP --- */}
      <InteractionModal />

      {/* ======================================================== */}
      {/* --- IN-GAME ACTIVE HUD (Only if not in title screen) --- */}
      {/* ======================================================== */}
      {!isTitleScreen && (
        <>
          {/* Top subtle branding */}
          <div className="fixed top-5 left-6 z-30 pointer-events-none select-none">
            <div className="text-white/80 font-medium tracking-wider text-sm drop-shadow">
              MY WORLD
            </div>
            <div className="text-white/40 text-xs">
              Connected Residential District • All Buildings
            </div>
          </div>

          {/* Top Right Quick Actions & Status Bar */}
          <div className="fixed top-5 right-6 z-30 select-none flex items-center gap-2">
            {/* Quick Menu Button */}
            <button
              onClick={() => setQuickMenuOpen(true)}
              className="px-3 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-amber-200 text-xs font-medium border border-amber-400/40 shadow backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>⚡ Quick Portfolio</span>
              <kbd className="hidden sm:inline px-1 py-0.2 bg-neutral-800 rounded text-[10px] font-mono text-neutral-400">
                Tab
              </kbd>
            </button>

            {/* Controls Guide Button */}
            <button
              onClick={() => setShowControlsGuide(true)}
              className="px-2.5 py-1.5 rounded-full bg-neutral-900/70 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700 shadow backdrop-blur-md transition-all cursor-pointer hidden sm:flex items-center gap-1"
            >
              <span>?</span>
            </button>

            {/* Pause Button */}
            <button
              onClick={() => setIsPaused(true)}
              className="px-2.5 py-1.5 rounded-full bg-neutral-900/70 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700 shadow backdrop-blur-md transition-all cursor-pointer flex items-center gap-1"
            >
              <span>⏸</span>
            </button>

            {/* Speed indicator */}
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider transition-colors pointer-events-none ${
                isRunning
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40'
                  : 'bg-white/10 text-white/50 border border-white/10'
              }`}
            >
              {isRunning ? 'RUN' : 'WALK'}
            </span>
          </div>

          {/* Center Interaction Prompt Pill */}
          {nearbyInteractable && !activeInteraction && !isPaused && (
            <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-40 select-none ${reducedMotion ? '' : 'animate-bounce duration-700'}`}>
              <button
                onClick={handlePromptClick}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-amber-400/60 shadow-2xl backdrop-blur-md transition-all cursor-pointer group focus:ring-2 focus:ring-amber-400 focus:outline-none"
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

          {/* Desktop Bottom Controls Bar */}
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
                <span className="text-amber-200 font-medium">Tab Quick Menu</span>
                <span className="text-white/20">•</span>
                <span>Esc Pause</span>
              </div>
            </div>
          )}

          {/* Mobile Virtual Controls */}
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
                {/* Interact Button */}
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
        </>
      )}
    </>
  )
}
