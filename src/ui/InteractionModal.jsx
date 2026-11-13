import { useEffect } from 'react'
import useGameStore from '../store/useGameStore'

export default function InteractionModal() {
  const activeInteraction = useGameStore((s) => s.activeInteraction)
  const closeInteraction = useGameStore((s) => s.closeInteraction)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.code === 'KeyE') {
        closeInteraction()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeInteraction])

  if (!activeInteraction) return null

  const {
    name,
    title,
    subtitle,
    category,
    content,
    highlights,
    footerNote,
  } = activeInteraction

  return (
    <div
      onClick={closeInteraction}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-neutral-900/95 border border-neutral-700/80 rounded-2xl p-6 sm:p-8 text-white shadow-2xl backdrop-blur-md overflow-hidden"
      >
        {/* Subtle decorative warm background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header bar */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {category && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-2">
                {category}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-neutral-100">
              {title || name}
            </h2>
            {subtitle && (
              <p className="text-sm text-neutral-400 mt-0.5">{subtitle}</p>
            )}
          </div>

          {/* Close button (top right) */}
          <button
            onClick={closeInteraction}
            aria-label="Close"
            className="p-2 -mr-2 -mt-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Object Identifier Tag */}
        <div className="text-xs text-neutral-400 bg-neutral-800/60 px-3 py-1.5 rounded-lg border border-neutral-700/50 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Object: <strong className="text-neutral-200">{name}</strong></span>
        </div>

        {/* Main Content Body */}
        <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
          <p>{content}</p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="mt-4 pt-4 border-t border-neutral-800">
              <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2.5">
                Key Details
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Placeholder disclaimer footer */}
        {footerNote && (
          <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400 italic">
            {footerNote}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={closeInteraction}
            className="px-5 py-2.5 bg-neutral-100 hover:bg-white text-neutral-900 font-medium text-sm rounded-xl transition-all cursor-pointer shadow-md"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  )
}

