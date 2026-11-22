import { FileText, Terminal, Command, MousePointer } from 'lucide-react'

export default function ReadmeViewer() {
  return (
    <div className="w-full h-full overflow-y-auto p-5 md:p-7 text-[#e8e8f0] font-mono text-xs leading-relaxed select-text bg-[#0d0d10]">
      {/* File Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-white/8 mb-5 text-[#8e8ea0]">
        <FileText className="w-4 h-4 text-[#4f9eff]" />
        <span className="text-white font-bold">README.txt</span>
        <span className="text-[10px] text-[#505060]">— User Guide & Documentation</span>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Intro */}
        <div>
          <div className="text-white font-bold text-sm mb-1">
            === AFSAL OS v1.0 — PORTFOLIO ENVIRONMENT ===
          </div>
          <p className="text-[#a0a0b0]">
            Welcome to my interactive desktop operating system portfolio. This environment is designed to showcase my deep learning engineering projects, technical skills, and research background in a hands-on, realistic interface.
          </p>
        </div>

        {/* Navigation & Controls */}
        <div className="space-y-2">
          <div className="text-[#4f9eff] font-bold flex items-center gap-2">
            <MousePointer className="w-3.5 h-3.5" />
            <span>[ NAVIGATION & CONTROLS ]</span>
          </div>
          <ul className="space-y-1.5 pl-4 list-disc text-[#a0a0b0]">
            <li>
              <strong className="text-white">Desktop Windows:</strong> Windows can be freely dragged by their title bar, minimized to the bottom dock, maximized to fullscreen, and brought to focus by clicking anywhere inside.
            </li>
            <li>
              <strong className="text-white">Bottom Dock:</strong> Hover over dock icons to experience macOS-style spring magnification. Click any icon to launch or restore its window.
            </li>
            <li>
              <strong className="text-white">Right-Click Menu:</strong> Right-click anywhere on the desktop wallpaper to open the OS context menu to cycle dark wallpapers or launch a new terminal.
            </li>
          </ul>
        </div>

        {/* Shortcuts */}
        <div className="space-y-2">
          <div className="text-[#4f9eff] font-bold flex items-center gap-2">
            <Command className="w-3.5 h-3.5" />
            <span>[ SYSTEM SHORTCUTS ]</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-[#141418] border border-white/5">
              <span className="text-white font-semibold block">Cmd/Ctrl + K</span>
              <span className="text-[#6b6b80]">Toggle Spotlight Search overlay</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#141418] border border-white/5">
              <span className="text-white font-semibold block">Esc Key</span>
              <span className="text-[#6b6b80]">Dismiss modals & spotlight search</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#141418] border border-white/5">
              <span className="text-white font-semibold block">Terminal: Up/Down</span>
              <span className="text-[#6b6b80]">Cycle through typed command history</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#141418] border border-white/5">
              <span className="text-white font-semibold block">Terminal: Tab</span>
              <span className="text-[#6b6b80]">Autocomplete known commands</span>
            </div>
          </div>
        </div>

        {/* Terminal Easter Eggs */}
        <div className="space-y-2">
          <div className="text-emerald-400 font-bold flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>[ TERMINAL COMMANDS & SECRETS ]</span>
          </div>
          <p className="text-[#a0a0b0]">
            Launch the Terminal app and try typing commands like:
          </p>
          <div className="p-3 rounded-lg bg-[#141418] border border-white/5 text-[11px] space-y-1 text-[#8e8ea0]">
            <div>• <span className="text-[#4f9eff]">neofetch</span> — Render styled system hardware & OS banner</div>
            <div>• <span className="text-[#4f9eff]">skills</span> — Inspect categorized technical capabilities</div>
            <div>• <span className="text-[#4f9eff]">sudo hire afsal</span> — Unlock direct recruiter authorization</div>
            <div>• <span className="text-[#4f9eff]">open [app]</span> — Launch any portfolio application</div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/8 text-[10px] text-[#505060]">
          AFSAL OS Kernel 6.8 • Built with React 19, Vite 8, Tailwind CSS, Framer Motion & Zustand.
        </div>
      </div>
    </div>
  )
}
