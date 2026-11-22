import { useState, useMemo } from 'react'
import {
  Trophy,
  Medal,
  Star,
  Award,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import achievementsData from '../../data/achievements.json'
import { playClickSound } from '../../utils/sound'

const TABS = ['All', 'Competitions', 'Certifications', 'Recognition', 'Activities']

const CATEGORY_ICONS = {
  Competitions: Trophy,
  Certifications: Medal,
  Recognition: Star,
  Activities: Award,
}

const CATEGORY_COLORS = {
  Competitions: 'text-amber-400',
  Certifications: 'text-cyan-400',
  Recognition: 'text-[#4f9eff]',
  Activities: 'text-emerald-400',
}

export default function AchievementsApp() {
  const [activeTab, setActiveTab] = useState('All')

  const items = useMemo(() => achievementsData.achievements || [], [])

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return items
    return items.filter((item) => item.category === activeTab)
  }, [items, activeTab])

  const handleTabClick = (tab) => {
    playClickSound()
    setActiveTab(tab)
  }

  return (
    <div className="w-full h-full overflow-y-auto p-5 md:p-8 text-[#e8e8f0] font-sans select-none flex flex-col justify-between">
      <div className="space-y-6">
        {/* Top Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#4f9eff]" />
              <h1 className="text-xl font-bold tracking-tight text-white font-mono">
                Honors & Achievements
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#4f9eff]/15 text-[#4f9eff] border border-[#4f9eff]/30">
                {items.length} Honors
              </span>
            </div>
            <p className="text-xs text-[#6b6b80] mt-0.5 font-mono">
              Competitive hackathon awards, academic distinctions, and leadership milestones.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {TABS.map((tab) => {
              const isActive = activeTab === tab
              const count =
                tab === 'All' ? items.length : items.filter((i) => i.category === tab).length

              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium tracking-tight whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#4f9eff] text-black font-semibold shadow-md shadow-blue-500/20'
                      : 'bg-[#141418] hover:bg-[#1e1e24] text-[#8e8ea0] border border-white/5'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-black/20 text-black' : 'text-[#6b6b80]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Clean Grid of Achievement Cards */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center text-[#6b6b80] text-xs font-mono">
            No achievements found under category &quot;{activeTab}&quot;
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const Icon = CATEGORY_ICONS[item.category] || Sparkles
              const iconColor = CATEGORY_COLORS[item.category] || 'text-[#4f9eff]'

              return (
                <div
                  key={item.id}
                  className="bg-[#141418]/85 hover:bg-[#181822] border border-white/8 hover:border-[#4f9eff]/40 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group shadow-lg hover:shadow-[0_0_20px_rgba(79,158,255,0.15)] relative overflow-hidden"
                >
                  {/* Subtle Top-Right Ambient Glow on Hover */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#4f9eff]/5 rounded-full blur-2xl group-hover:bg-[#4f9eff]/15 transition-all pointer-events-none" />

                  <div>
                    {/* Header: Icon, Category Badge & Year */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#1e1e24] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8e8ea0] border border-white/5">
                          {item.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#4f9eff] font-medium">
                          {item.year}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-[#4f9eff] transition-colors mb-1">
                      {item.title}
                    </h3>

                    {/* Organization */}
                    <div className="text-xs font-mono text-[#8e8ea0] mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#4f9eff] opacity-75 shrink-0" />
                      <span className="truncate">{item.organization}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#a0a0b0] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer Callout */}
      <div className="mt-8 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#6b6b80] font-mono">
        <span>Verified collegiate and competitive recognitions</span>
        <span className="text-[#4f9eff]">Afsal OS Portfolio</span>
      </div>
    </div>
  )
}
