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

  // Render wallpaper variants onto the high-performance background canvas
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

    // Variant 1: Particles setup
    const particleCount = 38
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.35 + 0.1,
      })
    }

    let tick = 0

    const render = () => {
      tick += 0.008
      ctx.clearRect(0, 0, width, height)

      if (wallpaperIndex === 0) {
        // --- Variant 1: Slow-moving particle field (Default) ---
        ctx.fillStyle = '#09090c'
        ctx.fillRect(0, 0, width, height)

        const grad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.35,
          0,
          width * 0.5,
          height * 0.35,
          width * 0.8
        )
        grad.addColorStop(0, '#141826')
        grad.addColorStop(0.6, '#0c0e14')
        grad.addColorStop(1, '#070709')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)

        // Draw and update drifting particles
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
          ctx.fillStyle = `rgba(79, 158, 255, ${p.alpha})`
          ctx.fill()

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 130) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(79, 158, 255, ${0.08 * (1 - dist / 130)})`
              ctx.lineWidth = 0.6
              ctx.stroke()
            }
          }
        }
      } else if (wallpaperIndex === 1) {
        // --- Variant 2: Subtle animated gradient (deep blue to dark purple, very slow) ---
        const cx = width * 0.5 + Math.sin(tick * 0.6) * (width * 0.18)
        const cy = height * 0.45 + Math.cos(tick * 0.4) * (height * 0.15)
        const radius = Math.max(width, height) * 0.95

        const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, radius)
        grad.addColorStop(0, '#1c1032') // Dark purple core
        grad.addColorStop(0.35, '#0e1834') // Deep royal blue
        grad.addColorStop(0.7, '#070c1c') // Dark navy
        grad.addColorStop(1, '#04050a') // Deep midnight

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)

        // Secondary subtle aurora drift
        const grad2 = ctx.createLinearGradient(
          0,
          0,
          width * Math.cos(tick * 0.2),
          height
        )
        grad2.addColorStop(0, 'rgba(120, 50, 220, 0.04)')
        grad2.addColorStop(0.5, 'rgba(40, 120, 255, 0.05)')
        grad2.addColorStop(1, 'rgba(10, 10, 20, 0)')
        ctx.fillStyle = grad2
        ctx.fillRect(0, 0, width, height)
      } else {
        // --- Variant 3: Static dark geometric tech pattern ---
        ctx.fillStyle = '#08080c'
        ctx.fillRect(0, 0, width, height)

        // Draw static tech grid
        const gridSize = 48
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.lineWidth = 0.8

        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
          ctx.stroke()
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.stroke()
        }

        // Draw static geometric intersection marks
        ctx.fillStyle = 'rgba(79, 158, 255, 0.22)'
        for (let x = 0; x < width; x += gridSize * 2) {
          for (let y = 0; y < height; y += gridSize * 2) {
            ctx.fillRect(x - 1, y - 1, 2, 2)
          }
        }

        // Vignette gradient to blend edges
        const vig = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          width * 0.2,
          width * 0.5,
          height * 0.5,
          width * 0.75
        )
        vig.addColorStop(0, 'rgba(8, 8, 12, 0)')
        vig.addColorStop(1, 'rgba(4, 4, 6, 0.75)')
        ctx.fillStyle = vig
        ctx.fillRect(0, 0, width, height)
      }

      // Only continue loop if particle or gradient needs continuous animation
      if (wallpaperIndex === 0 || wallpaperIndex === 1) {
        animationFrameId = requestAnimationFrame(render)
      }
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

  const handleResumeDownload = (e) => {
    e.stopPropagation()
    playClickSound()
    setSelectedIconId('resume')
    notify('Downloading Afsal_Resume.pdf...')

    // Trigger real PDF download
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Afsal_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
      {/* Dynamic Background Wallpaper Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Desktop File Shortcuts (Top Left) */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-4">
        {/* Shortcut 1: Resume.pdf with Real Download */}
        <div
          onClick={handleResumeDownload}
          onDoubleClick={handleResumeDownload}
          title="Click to download Afsal_Resume.pdf"
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
          title="Open README.txt"
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
