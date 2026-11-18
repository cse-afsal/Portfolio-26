import { Sparkles, Terminal, ArrowRight } from 'lucide-react'

export default function PlaceholderApp({ title, phaseNote, icon: Icon }) {
  return (
    <div className="flex-1 w-full h-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center select-none">
      {/* Icon with glowing backdrop */}
      <div className="relative mb-5">
        <div className="w-16 h-16 rounded-2xl bg-[#181822] border border-white/10 flex items-center justify-center text-[#4f9eff] shadow-2xl relative z-10 glow-accent-subtle">
          {Icon ? <Icon className="w-8 h-8" /> : <Terminal className="w-8 h-8" />}
        </div>
        <div className="absolute inset-0 bg-[#4f9eff]/20 rounded-2xl blur-xl pointer-events-none" />
      </div>

      {/* Main Title & Phase Note */}
      <h2 className="text-xl font-bold tracking-tight text-white mb-2 font-sans">
        {title}
      </h2>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#4f9eff]/30 text-xs font-mono text-[#4f9eff] mb-4 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>{phaseNote}</span>
      </div>

      <p className="text-xs text-[#8e8ea0] max-w-sm leading-relaxed mb-6">
        This application module will be built out in the upcoming phase. Window management, dragging, minimization, and maximization are fully active.
      </p>

      {/* Interactive Window Tip */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141418] border border-white/5 text-[11px] font-mono text-[#6b6b80]">
        <ArrowRight className="w-3 h-3 text-[#4f9eff]" />
        <span>Try dragging the title bar or clicking the traffic light buttons</span>
      </div>
    </div>
  )
}
