import { useState, useMemo } from 'react'
import {
  Cpu,
  Brain,
  Database,
  Eye,
  Code2,
  Terminal,
  Binary,
  Search,
  CheckCircle2,
  Layers,
} from 'lucide-react'
import skillsData from '../../data/skills.json'
import { playClickSound } from '../../utils/sound'

const DOMAINS = skillsData.domains || []

const DOMAIN_ICONS = {
  deep_learning: Brain,
  machine_learning: Database,
  domains_cv_nlp: Eye,
  languages: Code2,
  mlops_tooling: Terminal,
  mathematics: Binary,
}

export default function SkillsApp() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const domains = DOMAINS

  const filteredDomains = useMemo(() => {
    return domains
      .filter((domain) => {
        if (activeFilter === 'all') return true
        return domain.id === activeFilter
      })
      .map((domain) => {
        if (!searchQuery.trim()) return domain
        const q = searchQuery.toLowerCase()
        const matchesDomain = domain.name.toLowerCase().includes(q)
        const matchingSkills = domain.skills.filter((s) => s.toLowerCase().includes(q))
        if (matchesDomain || matchingSkills.length > 0) {
          return {
            ...domain,
            skills: matchesDomain ? domain.skills : matchingSkills,
          }
        }
        return null
      })
      .filter(Boolean)
  }, [domains, activeFilter, searchQuery])

  const totalSkillsCount = useMemo(() => {
    return domains.reduce((acc, d) => acc + d.skills.length, 0)
  }, [domains])

  return (
    <div className="p-6 md:p-8 space-y-6 text-[#e8e8f0] font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">AI / ML Technical Stack</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#4f9eff]/15 text-[#4f9eff] border border-[#4f9eff]/30">
              {totalSkillsCount} Capabilities
            </span>
          </div>
          <p className="text-xs text-[#6b6b80] mt-1 max-w-xl">
            Applied competencies across deep neural architectures, production MLOps, statistical modeling, and mathematical rigor.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#6b6b80] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search frameworks, models..."
            className="w-full bg-[#141418] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#6b6b80] focus:outline-none focus:border-[#4f9eff] transition-colors"
          />
        </div>
      </div>

      {/* Domain Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => { playClickSound(); setActiveFilter('all') }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight whitespace-nowrap transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#4f9eff] text-black font-semibold shadow-md'
              : 'bg-[#141418] hover:bg-[#1e1e24] text-[#8e8ea0] border border-white/5'
          }`}
        >
          All Domains
        </button>
        {domains.map((dom) => {
          const Icon = DOMAIN_ICONS[dom.id] || Layers
          const isActive = activeFilter === dom.id
          return (
            <button
              key={dom.id}
              onClick={() => { playClickSound(); setActiveFilter(dom.id) }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#4f9eff] text-black font-semibold shadow-md'
                  : 'bg-[#141418] hover:bg-[#1e1e24] text-[#8e8ea0] border border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{dom.name.split('&')[0].trim()}</span>
            </button>
          )
        })}
      </div>

      {/* Skills Grid */}
      {filteredDomains.length === 0 ? (
        <div className="py-16 text-center text-[#6b6b80] text-sm font-mono">
          No skills found matching &quot;{searchQuery}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDomains.map((domain) => {
            const Icon = DOMAIN_ICONS[domain.id] || Cpu
            return (
              <div
                key={domain.id}
                className="bg-[#141418]/80 hover:bg-[#181820] border border-white/8 hover:border-[#4f9eff]/30 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#1e1e24] border border-white/10 flex items-center justify-center text-[#4f9eff] group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h2 className="text-sm font-semibold text-white tracking-tight">
                        {domain.name}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs text-[#8e8ea0] leading-relaxed mb-4">
                    {domain.description}
                  </p>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {domain.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#1e1e24] hover:bg-[#252530] text-[#d0d0e0] hover:text-[#4f9eff] border border-white/5 hover:border-[#4f9eff]/30 transition-colors"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#4f9eff] opacity-75 shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Engineering Philosophy Callout */}
      <div className="p-4 rounded-xl bg-[#141418]/50 border border-white/5 flex items-center justify-between text-xs text-[#6b6b80]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4f9eff] animate-pulse" />
          <span>Core philosophy: Math-first understanding, PyTorch-first implementation, production-first MLOps.</span>
        </div>
        <span className="font-mono text-[10px] text-[#4f9eff]">No arbitrary % meters</span>
      </div>
    </div>
  )
}
