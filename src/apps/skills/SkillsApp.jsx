import { useState, useMemo } from 'react'
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Sparkles,
  Search,
  LayoutGrid,
  List,
  CheckCircle2,
} from 'lucide-react'
import skillsData from '../../data/skills.json'
import { playClickSound } from '../../utils/sound'

const CATEGORY_ICONS = {
  Languages: Code2,
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  Tools: Wrench,
  'Currently Learning': Sparkles,
}

const CATEGORY_COLORS = {
  Languages: 'text-[#4f9eff]',
  Frontend: 'text-cyan-400',
  Backend: 'text-indigo-400',
  Databases: 'text-purple-400',
  Tools: 'text-emerald-400',
  'Currently Learning': 'text-amber-400',
}

export default function SkillsApp() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'

  const categories = useMemo(() => skillsData.categories || {}, [])

  // Filter skills live based on search query
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return categories

    const result = {}
    for (const [catName, skillsList] of Object.entries(categories)) {
      const catMatches = catName.toLowerCase().includes(q)
      const matchingSkills = skillsList.filter((s) => s.toLowerCase().includes(q))

      if (catMatches || matchingSkills.length > 0) {
        result[catName] = catMatches ? skillsList : matchingSkills
      }
    }
    return result
  }, [categories, searchQuery])

  const totalSkillsCount = useMemo(() => {
    return Object.values(categories).reduce((acc, list) => acc + list.length, 0)
  }, [categories])

  const filteredEntries = Object.entries(filteredCategories)

  return (
    <div className="w-full h-full overflow-y-auto p-5 md:p-7 text-[#e8e8f0] font-sans select-none flex flex-col justify-between">
      <div className="space-y-5">
        {/* Top Control Bar: Title, Live Search & View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-mono">
                Skills.exe
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#4f9eff]/15 text-[#4f9eff] border border-[#4f9eff]/30">
                {totalSkillsCount} Capabilities
              </span>
            </div>
            <p className="text-xs text-[#6b6b80] mt-0.5 font-mono">
              Technical competencies across algorithms, neural frameworks, and production tools.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-[#6b6b80] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills..."
                className="w-full bg-[#141418] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#6b6b80] focus:outline-none focus:border-[#4f9eff] font-mono transition-colors"
              />
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center bg-[#141418] border border-white/10 rounded-xl p-0.5 shrink-0">
              <button
                onClick={() => {
                  playClickSound()
                  setViewMode('grid')
                }}
                title="Grid view"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#4f9eff] text-black shadow-md'
                    : 'text-[#8e8ea0] hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  playClickSound()
                  setViewMode('list')
                }}
                title="List view"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#4f9eff] text-black shadow-md'
                    : 'text-[#8e8ea0] hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Display: Grid View or List View */}
        {filteredEntries.length === 0 ? (
          <div className="py-20 text-center text-[#6b6b80] text-xs font-mono">
            No technical skills found matching &quot;{searchQuery}&quot;
          </div>
        ) : viewMode === 'grid' ? (
          /* 1. Two-column Grid of Skill Category Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEntries.map(([categoryName, skillsList]) => {
              const Icon = CATEGORY_ICONS[categoryName] || Code2
              const iconColor = CATEGORY_COLORS[categoryName] || 'text-[#4f9eff]'

              return (
                <div
                  key={categoryName}
                  className="bg-[#141418]/85 hover:bg-[#181820] border border-white/8 hover:border-[#4f9eff]/30 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Heading with Icon */}
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <div className="w-8 h-8 rounded-lg bg-[#1e1e24] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                      </div>
                      <h2 className="text-sm font-semibold text-white tracking-tight">
                        {categoryName}
                      </h2>
                    </div>

                    {/* Skill Pill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skillsList.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#1e1e24] text-[#d0d0e0] border border-white/5 hover:border-[#4f9eff]/30 hover:text-[#4f9eff] transition-colors"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#4f9eff] opacity-75 shrink-0" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* 2. Structured List View */
          <div className="space-y-3">
            {filteredEntries.map(([categoryName, skillsList]) => {
              const Icon = CATEGORY_ICONS[categoryName] || Code2
              const iconColor = CATEGORY_COLORS[categoryName] || 'text-[#4f9eff]'

              return (
                <div
                  key={categoryName}
                  className="bg-[#141418]/85 hover:bg-[#181820] border border-white/8 hover:border-[#4f9eff]/30 rounded-xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                >
                  <div className="flex items-center gap-2.5 shrink-0 w-44">
                    <div className="w-7 h-7 rounded-lg bg-[#1e1e24] border border-white/10 flex items-center justify-center">
                      <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
                    </div>
                    <span className="text-xs font-semibold text-white">
                      {categoryName}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 flex-1 justify-start sm:justify-end">
                    {skillsList.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#1e1e24] text-[#d0d0e0] border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer Info Callout */}
      <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#6b6b80] font-mono">
        <span>Verified technical foundations</span>
        <span>Zero simulated percentages</span>
      </div>
    </div>
  )
}
