import { useRef } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { Minus, Square, X } from 'lucide-react'
import useOSStore from '../store/useOSStore'
import { playClickSound, playWindowCloseSound } from '../utils/sound'

export default function Window({ id, title, icon: Icon, children }) {
  const windowState = useOSStore((s) => s.windows[id])
  const activeAppId = useOSStore((s) => s.activeAppId)
  const focusApp = useOSStore((s) => s.focusApp)
  const closeApp = useOSStore((s) => s.closeApp)
  const minimizeApp = useOSStore((s) => s.minimizeApp)
  const toggleMaximizeApp = useOSStore((s) => s.toggleMaximizeApp)
  const updateWindowPosition = useOSStore((s) => s.updateWindowPosition)

  const dragControls = useDragControls()
  const windowRef = useRef(null)

  if (!windowState || !windowState.isOpen) return null

  const isFocused = activeAppId === id
  const { isMinimized, isMaximized, defaultPosition, defaultSize, zIndex } = windowState

  const handleFocus = () => {
    if (!isFocused) {
      focusApp(id)
    }
  }

  const handleClose = (e) => {
    e.stopPropagation()
    playWindowCloseSound()
    closeApp(id)
  }

  const handleMinimize = (e) => {
    e.stopPropagation()
    playClickSound()
    minimizeApp(id)
  }

  const handleMaximize = (e) => {
    e.stopPropagation()
    playClickSound()
    toggleMaximizeApp(id)
  }

  // Animation variants (Task 4: smooth scale + fade open/close, scale-down towards dock on minimize)
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 14,
      transition: { duration: 0.18, ease: 'easeInOut' },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
    },
    minimized: {
      opacity: 0,
      scale: 0.35,
      y: 350,
      transition: { duration: 0.22, ease: 'easeInOut' },
    },
  }

  // Width & height (Default: 720x480, Min: 400x300)
  const currentWidth = windowState.size?.width ?? defaultSize?.width ?? 720
  const currentHeight = windowState.size?.height ?? defaultSize?.height ?? 480
  const posX = windowState.position?.x ?? defaultPosition?.x ?? 120
  const posY = windowState.position?.y ?? defaultPosition?.y ?? 80

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          ref={windowRef}
          onMouseDown={handleFocus}
          onTouchStart={handleFocus}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          drag={!isMaximized}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0.05}
          onDragEnd={(e, info) => {
            if (!isMaximized) {
              const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200
              const screenH = typeof window !== 'undefined' ? window.innerHeight : 800
              const rawX = posX + info.offset.x
              const rawY = posY + info.offset.y
              // Prevent window from being dragged off-screen
              const clampedX = Math.max(0, Math.min(screenW - 140, rawX))
              const clampedY = Math.max(20, Math.min(screenH - 100, rawY))
              updateWindowPosition(id, { x: clampedX, y: clampedY })
            }
          }}
          style={{
            zIndex,
            position: 'absolute',
            ...(isMaximized
              ? {
                  top: 20,
                  left: 0,
                  width: '100vw',
                  height: 'calc(100vh - 20px - 65px)',
                }
              : {
                  left: posX,
                  top: posY,
                  width: currentWidth,
                  height: currentHeight,
                  minWidth: 400,
                  minHeight: 300,
                  maxWidth: 'calc(100vw - 16px)',
                  maxHeight: 'calc(100vh - 90px)',
                }),
          }}
          className={`flex flex-col rounded-xl overflow-hidden glass-window select-none transition-shadow duration-200 border border-white/10 ${
            isFocused
              ? 'ring-1 ring-[#4f9eff]/50 shadow-2xl shadow-black/80'
              : 'opacity-95 shadow-xl shadow-black/50'
          }`}
        >
          {/* Window Title Bar (Draggable handle) */}
          <div
            onPointerDown={(e) => {
              handleFocus()
              if (!isMaximized) {
                dragControls.start(e)
              }
            }}
            onDoubleClick={handleMaximize}
            className={`h-9 px-3.5 flex items-center justify-between border-b transition-colors cursor-grab active:cursor-grabbing shrink-0 ${
              isFocused
                ? 'bg-[#181820]/95 border-white/10'
                : 'bg-[#141418]/85 border-white/5 text-[#6b6b80]'
            }`}
          >
            {/* macOS-style Traffic Light Buttons */}
            <div className="flex items-center gap-2 group/lights">
              {/* Close Button */}
              <button
                onClick={handleClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close window"
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4338] border border-[#e0443e] flex items-center justify-center transition-all cursor-pointer group-hover/lights:opacity-100"
              >
                <X className="w-2 h-2 text-[#4d0000] opacity-0 group-hover/lights:opacity-100 transition-opacity" />
              </button>
              {/* Minimize Button */}
              <button
                onClick={handleMinimize}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Minimize window"
                className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#e6a823] border border-[#dea123] flex items-center justify-center transition-all cursor-pointer group-hover/lights:opacity-100"
              >
                <Minus className="w-2 h-2 text-[#543b00] opacity-0 group-hover/lights:opacity-100 transition-opacity" />
              </button>
              {/* Maximize Button */}
              <button
                onClick={handleMaximize}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Maximize window"
                className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#1db333] border border-[#1aab29] flex items-center justify-center transition-all cursor-pointer group-hover/lights:opacity-100"
              >
                <Square className="w-1.5 h-1.5 text-[#004d10] opacity-0 group-hover/lights:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Window Center Title & Icon */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide truncate max-w-[65%]">
              {Icon && (
                <Icon className={`w-3.5 h-3.5 ${isFocused ? 'text-[#4f9eff]' : 'text-[#6b6b80]'}`} />
              )}
              <span className={`truncate ${isFocused ? 'text-[#e8e8f0]' : 'text-[#6b6b80]'}`}>
                {title}
              </span>
            </div>

            {/* Right Status Dot */}
            <div className="w-12 flex justify-end items-center text-[10px] font-mono text-[#6b6b80]">
              {isFocused && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#4f9eff] shadow-[0_0_6px_#4f9eff] animate-pulse" />
              )}
            </div>
          </div>

          {/* Window Body Content */}
          <div className="flex-1 overflow-auto bg-[#121216]/95 text-[#e8e8f0] relative flex flex-col">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
