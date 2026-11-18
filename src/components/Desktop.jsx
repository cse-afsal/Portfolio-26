import { useState, useEffect, useRef } from 'react'
import {
  Terminal,
  User,
  Layers,
  Cpu,
  GraduationCap,
  Award,
  Mail,
  FolderTree,
} from 'lucide-react'
import useOSStore from '../store/useOSStore'
import { playClickSound, playWindowOpenSound } from '../utils/sound'

const DESKTOP_SHORTCUTS = [
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'text-emerald-400' },
  { id: 'about', label: 'About Me', icon: User, color: 'text-[#4f9eff]' },
  { id: 'projects', label: 'Projects', icon: Layers, color: 'text-cyan-400' },
  { id: 'skills', label: 'Skills', icon: Cpu, color: 'text-indigo-400' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-amber-400' },
  { id: 'achievements', label: 'Achievements', icon: Award, color: 'text-yellow-400' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'text-teal-400' },
  { id: 'finder', label: 'Finder', icon: FolderTree, color: 'text-blue-400' },
]

export default function Desktop({ children }) {
  const openApp = useOSStore((s) => s.openApp)
  const openContextMenu = useOSStore((s) => s.openContextMenu)
  const closeContextMenu = useOSStore((s) => s.closeContextMenu)

  const [selectedIconId, setSelectedIconId] = useState(null)
  const canvasRef = useRef(null)

  // Subtle dark animated particle wallpaper
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
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.35 + 0.1,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Very subtle radial background glow
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.35,
        width * 0.8
      )
      grad.addColorStop(0, '#12141c')
      grad.addColorStop(0.5, '#0e0f14')
      grad.addColorStop(1, '#09090c')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Draw subtle particles and faint connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Wrap edges smoothly
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Particle circle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(79, 158, 255, ${p.alpha})`
        ctx.fill()

        // Connecting lines for close particles
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

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleDesktopClick = () => {
    setSelectedIconId(null)
    closeContextMenu()
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    openContextMenu(e.clientX, e.clientY)
  }

  const handleIconClick = (e, id) => {
    e.stopPropagation()
    playClickSound()
    setSelectedIconId(id)
  }

  const handleIconDoubleClick = (e, id) => {
    e.stopPropagation()
    playClickSound()
    playWindowOpenSound()
    openApp(id)
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
        className="absolute inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(79, 158, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Desktop App Icons Grid (Top Left, below 20px menubar) */}
      <div className="absolute top-8 left-5 z-10 flex flex-col gap-3">
        {DESKTOP_SHORTCUTS.map((item) => {
          const Icon = item.icon
          const isSelected = selectedIconId === item.id

          return (
            <div
              key={item.id}
              onClick={(e) => handleIconClick(e, item.id)}
              onDoubleClick={(e) => handleIconDoubleClick(e, item.id)}
              onTouchEnd={(e) => handleIconDoubleClick(e, item.id)}
              className={`w-20 p-2 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer group text-center ${
                isSelected
                  ? 'bg-[#4f9eff]/20 ring-1 ring-[#4f9eff]/50'
                  : 'hover:bg-white/5'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[#141418]/90 border border-white/10 shadow-lg group-hover:scale-105 transition-transform ${
                  isSelected ? 'border-[#4f9eff]/60' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>

              <span
                className={`text-[10px] font-medium tracking-tight px-1.5 py-0.5 rounded leading-tight drop-shadow truncate max-w-full ${
                  isSelected ? 'bg-[#4f9eff] text-black font-semibold' : 'text-[#e8e8f0]'
                }`}
              >
                {item.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Subtle Watermark in bottom right */}
      <div className="absolute bottom-20 right-8 pointer-events-none text-right z-0 opacity-15">
        <div className="text-2xl font-light tracking-widest text-[#e8e8f0] font-mono">AFSAL OS</div>
        <div className="text-[10px] font-mono text-[#4f9eff]">v1.0 • Neural Environment</div>
      </div>

      {/* Windows Layer Container (Center zone) */}
      <div className="w-full h-full relative z-20 pointer-events-none">
        <div className="w-full h-full relative pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
