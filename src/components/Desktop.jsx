import { useState, useEffect, useRef } from 'react'
import {
  FileText,
  FileCode,
} from 'lucide-react'
import useOSStore, { WALLPAPERS } from '../store/useOSStore'
import { playClickSound, playWindowOpenSound } from '../utils/sound'

export default function Desktop({ children }) {
  const openApp = useOSStore((s) => s.openApp)
  const openContextMenu = useOSStore((s) => s.openContextMenu)
  const closeContextMenu = useOSStore((s) => s.closeContextMenu)
  const wallpaperIndex = useOSStore((s) => s.wallpaperIndex)
  const notify = useOSStore((s) => s.notify)

  const [selectedIconId, setSelectedIconId] = useState(null)
  const canvasRef = useRef(null)

  const activeWallpaper = WALLPAPERS[wallpaperIndex] || WALLPAPERS[0]

  // Subtle dark animated particle wallpaper that updates according to active wallpaper
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Generate ~35 slow-moving particles
    const particleCount = 35
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.35 + 0.1,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Background fill from active wallpaper
      ctx.fillStyle = activeWallpaper.bg
      ctx.fillRect(0, 0, width, height)

      // Radial or gradient overlay
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.35,
        width * 0.8
      )
      if (wallpaperIndex === 1) {
        // Deep Midnight
        grad.addColorStop(0, '#10131f')
        grad.addColorStop(0.6, '#08090f')
        grad.addColorStop(1, '#040507')
      } else if (wallpaperIndex === 2) {
        // Cyber Blue Glow
        grad.addColorStop(0, '#122544')
        grad.addColorStop(0.55, '#0a101d')
        grad.addColorStop(1, '#04070e')
      } else {
        // Neural Mesh
        grad.addColorStop(0, '#141826')
        grad.addColorStop(0.6, '#0c0e14')
        grad.addColorStop(1, '#070709')
      }
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Subtle particles and connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          wallpaperIndex === 2
            ? `rgba(56, 189, 248, ${p.alpha})`
            : wallpaperIndex === 1
            ? `rgba(129, 140, 248, ${p.alpha})`
            : `rgba(79, 158, 255, ${p.alpha})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 125) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(79, 158, 255, ${0.07 * (1 - dist / 125)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [activeWallpaper, wallpaperIndex])

  const handleDesktopClick = () => {
    setSelectedIconId(null)
    closeContextMenu()
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    openContextMenu(e.clientX, e.clientY)
  }

  const handleResumeClick = (e) => {
    e.stopPropagation()
    playClickSound()
    setSelectedIconId('resume')
    notify('Resume.pdf: Resume coming soon')
  }

  const handleReadmeClick = (e) => {
    e.stopPropagation()
    playClickSound()
    playWindowOpenSound()
    setSelectedIconId('readme')
    openApp('readme')
  }

  return (
    <div
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      className="w-full h-full relative overflow-hidden select-none bg-[#09090c]"
    >
      {/* Animated Wallpaper Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(79, 158, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Desktop File Shortcuts (Top Left) */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-4">
        {/* Shortcut 1: Resume.pdf */}
        <div
          onClick={handleResumeClick}
          onDoubleClick={handleResumeClick}
          className={`w-20 p-2 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer group text-center ${
            selectedIconId === 'resume'
              ? 'bg-[#4f9eff]/20 ring-1 ring-[#4f9eff]/50'
              : 'hover:bg-white/5'
          }`}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#141418]/90 border border-white/10 shadow-lg group-hover:scale-105 transition-transform relative">
            <FileText className="w-5 h-5 text-rose-400" />
            <span className="absolute bottom-1 right-1 text-[7px] font-mono font-bold bg-rose-500/20 text-rose-400 px-0.5 rounded border border-rose-500/30">
              PDF
            </span>
          </div>

          <span
            className={`text-[10px] font-mono tracking-tight px-1.5 py-0.5 rounded leading-tight drop-shadow truncate max-w-full ${
              selectedIconId === 'resume'
                ? 'bg-[#4f9eff] text-black font-semibold'
                : 'text-[#e8e8f0]'
            }`}
          >
            Resume.pdf
          </span>
        </div>

        {/* Shortcut 2: README.txt */}
        <div
          onClick={handleReadmeClick}
          onDoubleClick={handleReadmeClick}
          className={`w-20 p-2 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer group text-center ${
            selectedIconId === 'readme'
              ? 'bg-[#4f9eff]/20 ring-1 ring-[#4f9eff]/50'
              : 'hover:bg-white/5'
          }`}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#141418]/90 border border-white/10 shadow-lg group-hover:scale-105 transition-transform relative">
            <FileCode className="w-5 h-5 text-[#4f9eff]" />
            <span className="absolute bottom-1 right-1 text-[7px] font-mono font-bold bg-[#4f9eff]/20 text-[#4f9eff] px-0.5 rounded border border-[#4f9eff]/30">
              TXT
            </span>
          </div>

          <span
            className={`text-[10px] font-mono tracking-tight px-1.5 py-0.5 rounded leading-tight drop-shadow truncate max-w-full ${
              selectedIconId === 'readme'
                ? 'bg-[#4f9eff] text-black font-semibold'
                : 'text-[#e8e8f0]'
            }`}
          >
            README.txt
          </span>
        </div>
      </div>

      {/* Subtle Watermark in bottom right */}
      <div className="absolute bottom-20 right-8 pointer-events-none text-right z-0 opacity-15">
        <div className="text-2xl font-light tracking-widest text-[#e8e8f0] font-mono">
          AFSAL OS
        </div>
        <div className="text-[10px] font-mono text-[#4f9eff]">
          {activeWallpaper.name} • v1.0
        </div>
      </div>

      {/* Windows Layer Container */}
      <div className="w-full h-full relative z-20 pointer-events-none">
        <div className="w-full h-full relative pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
