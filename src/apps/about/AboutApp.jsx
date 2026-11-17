import {
  Brain,
  GraduationCap,
  Download,
  Mail,
  Terminal,
  Compass,
  ArrowRight,
} from 'lucide-react'
import profileData from '../../data/profile.json'
import useOSStore from '../../store/useOSStore'
import { playClickSound } from '../../utils/sound'

export default function AboutApp() {
  const openApp = useOSStore((s) => s.openApp)

  return (
    <div className="p-6 md:p-8 space-y-6 text-[#e8e8f0] font-sans">
      {/* Hero Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/8">
        <div className="flex items-center gap-4">
          {/* Avatar / Holographic Neural Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e2840] to-[#121624] border border-[#4f9eff]/30 flex items-center justify-center text-[#4f9eff] shadow-xl glow-accent-subtle shrink-0">
            <Brain className="w-8 h-8" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">{profileData.name}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#4f9eff]/15 text-[#4f9eff] border border-[#4f9eff]/30">
                AI/ML Engineer
              </span>
            </div>
            <p className="text-sm text-[#4f9eff] font-medium mt-0.5">
              {profileData.specialization}
            </p>
            <p className="text-xs text-[#6b6b80] mt-0.5">
              {profileData.role} • {profileData.location}
            </p>
          </div>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <a
            href={profileData.contacts.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-[#4f9eff] hover:bg-[#3d8ef5] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>

          <button
            onClick={() => { playClickSound(); openApp('contact') }}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-[#1e1e24] hover:bg-[#282832] border border-white/10 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#4f9eff]" />
            <span>Connect</span>
          </button>
        </div>
      </div>

      {/* Bio Narrative */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#6b6b80]">
          Executive Summary
        </h3>
        <p className="text-sm text-neutral-300 leading-relaxed font-light">
          {profileData.bio}
        </p>
      </div>

      {/* 2-Column Grid: Education & Research Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Academic Foundation Card */}
        <div className="p-4 rounded-xl bg-[#181820]/80 border border-white/8 space-y-3">
          <div className="flex items-center gap-2 text-white">
            <GraduationCap className="w-4 h-4 text-[#4f9eff]" />
            <h4 className="text-xs font-semibold tracking-wide uppercase">Academic Foundation</h4>
          </div>

          <div>
            <div className="text-sm font-medium text-white">{profileData.education.degree}</div>
            <div className="text-xs text-[#4f9eff] font-mono mt-0.5">{profileData.education.institution}</div>
            <div className="text-[11px] text-[#6b6b80] mt-0.5">{profileData.education.timeline}</div>
          </div>

          <div className="pt-2 border-t border-white/6">
            <span className="text-[11px] font-mono text-[#6b6b80] block mb-1.5">
              Highlighted Coursework:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {profileData.education.coursework.map((course, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#141418] border border-white/8 text-[11px] text-neutral-300 font-mono"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Research & Deep Learning Interests */}
        <div className="p-4 rounded-xl bg-[#181820]/80 border border-white/8 space-y-3">
          <div className="flex items-center gap-2 text-white">
            <Compass className="w-4 h-4 text-indigo-400" />
            <h4 className="text-xs font-semibold tracking-wide uppercase">Research & Technical Focus</h4>
          </div>

          <p className="text-xs text-[#6b6b80]">
            Core theoretical and applied domains under active research:
          </p>

          <div className="space-y-2">
            {profileData.researchInterests.map((interest, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-[#141418] border border-white/6 flex items-center justify-between text-xs"
              >
                <span className="text-neutral-200 font-medium">{interest}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4f9eff]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explore More OS Shortcuts */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#181824] to-[#14141c] border border-[#4f9eff]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#4f9eff]" />
          <div>
            <div className="text-xs font-semibold text-white">Prefer the Command Line?</div>
            <div className="text-[11px] text-[#6b6b80]">
              Run interactive bash commands like <code className="text-[#4f9eff] font-mono">bio</code>, <code className="text-[#4f9eff] font-mono">projects</code>, and <code className="text-[#4f9eff] font-mono">neofetch</code>
            </div>
          </div>
        </div>

        <button
          onClick={() => { playClickSound(); openApp('terminal') }}
          className="px-3.5 py-1.5 rounded-lg bg-[#4f9eff]/15 hover:bg-[#4f9eff]/25 text-[#4f9eff] text-xs font-semibold flex items-center gap-1.5 border border-[#4f9eff]/30 transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Open Terminal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
