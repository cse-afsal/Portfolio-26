import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Folder,
  FolderOpen,
  ExternalLink,
  X,
  Layers,
  ChevronRight,
  Info,
  Sparkles,
} from 'lucide-react'
import { GithubIcon } from '../../components/BrandIcons'
import projectsData from '../../data/projects.json'
import useOSStore from '../../store/useOSStore'
import { playClickSound } from '../../utils/sound'

export default function FinderApp() {
  const allProjects = useMemo(() => projectsData.projects || [], [])

  // Derive unique categories from projects plus "All Projects"
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allProjects.map((p) => p.category)))
    return ['All Projects', ...cats]
  }, [allProjects])

  const [selectedCategory, setSelectedCategory] = useState('All Projects')
  const [activeProject, setActiveProject] = useState(null)
  const [tooltipInfo, setTooltipInfo] = useState(null)

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All Projects') return allProjects
    return allProjects.filter((p) => p.category === selectedCategory)
  }, [allProjects, selectedCategory])

  const handleCategoryClick = (cat) => {
    playClickSound()
    setSelectedCategory(cat)
  }

  const handleCardClick = (project) => {
    playClickSound()
    setActiveProject(project)
  }

  const handleCloseDetail = () => {
    playClickSound()
    setActiveProject(null)
  }

  const showTooltip = (msg, e) => {
    e.stopPropagation()
    setTooltipInfo(msg)
    setTimeout(() => setTooltipInfo(null), 2200)
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#0d0d10] text-[#e8e8f0] font-sans relative overflow-hidden select-none">
      {/* Floating Tooltip */}
      <AnimatePresence>
        {tooltipInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1e1e24] border border-white/20 text-[#e8e8f0] text-xs font-mono px-3 py-1.5 rounded-lg shadow-2xl flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5 text-[#4f9eff]" />
            <span>{tooltipInfo}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Finder Breadcrumbs Toolbar */}
      <div className="h-9 px-4 bg-[#141418] border-b border-white/10 flex items-center justify-between text-xs text-[#8e8ea0] shrink-0 font-mono">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="hover:text-white transition-colors">afsal</span>
          <ChevronRight className="w-3 h-3 text-[#505060]" />
          <span className="hover:text-white transition-colors">Projects</span>
          <ChevronRight className="w-3 h-3 text-[#505060]" />
          <span className="text-[#4f9eff] font-medium">{selectedCategory}</span>
        </div>
        <div className="text-[11px] text-[#6b6b80] hidden sm:block">
          {filteredProjects.length} item{filteredProjects.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Main Finder Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar (Folders) */}
        <div className="w-44 sm:w-52 bg-[#121216]/95 border-r border-white/8 p-3 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#606070] px-2 py-1">
              Categories
            </div>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              const count =
                cat === 'All Projects'
                  ? allProjects.length
                  : allProjects.filter((p) => p.category === cat).length

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#4f9eff] text-black font-semibold shadow-md shadow-blue-500/20'
                      : 'text-[#a0a0b0] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {isActive ? (
                      <FolderOpen className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Folder className="w-3.5 h-3.5 text-[#4f9eff] shrink-0" />
                    )}
                    <span className="truncate">{cat}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-black/20 text-black' : 'text-[#606070]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Sidebar Footer Hint */}
          <div className="p-2.5 rounded-xl bg-[#181820] border border-white/5 text-[10px] font-mono text-[#6b6b80] mt-4">
            <div className="text-[#8e8ea0] font-semibold mb-0.5">Finder Browser</div>
            Click any card to inspect full architecture & contribution.
          </div>
        </div>

        {/* Right Area (Project Cards Grid) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0a0a0d]">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleCardClick(project)}
                className="bg-[#141418]/90 hover:bg-[#181822] border border-white/8 hover:border-[#4f9eff]/40 rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-white tracking-tight group-hover:text-[#4f9eff] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8e8ea0] border border-white/5 shrink-0">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#8e8ea0] line-clamp-2 leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>
                </div>

                <div>
                  {/* Tech Tags (Pill Style, Blue Accent) */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#1e1e28] text-[#4f9eff] border border-[#4f9eff]/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-[#606070]">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Card Action Buttons (GitHub & Demo) */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-xs">
                    <span className="text-[11px] font-mono text-[#4f9eff] group-hover:underline flex items-center gap-1">
                      <span>View details</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* GitHub Link Button */}
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation()
                            playClickSound()
                            useOSStore.getState().notify('Opening GitHub in a new tab...')
                          }}
                          title="Open GitHub Repository"
                          className="p-1.5 rounded-lg bg-[#1e1e24] hover:bg-[#282834] text-[#8e8ea0] hover:text-white transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={(e) => showTooltip('GitHub repository not available', e)}
                          title="GitHub not available"
                          className="p-1.5 rounded-lg bg-[#1e1e24]/40 text-[#404050] hover:text-[#ff6b6b] transition-colors cursor-not-allowed"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Live Demo Link Button */}
                      {project.liveDemoUrl ? (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation()
                            playClickSound()
                          }}
                          title="Open Live Demonstration"
                          className="p-1.5 rounded-lg bg-[#1e1e24] hover:bg-[#282834] text-[#8e8ea0] hover:text-[#4f9eff] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={(e) => showTooltip('Live demo not available', e)}
                          title="Demo not available"
                          className="p-1.5 rounded-lg bg-[#1e1e24]/40 text-[#404050] hover:text-[#ff6b6b] transition-colors cursor-not-allowed"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Detail Slide-In Side Panel */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 w-full md:w-[460px] h-full bg-[#141418] border-l border-white/10 p-6 z-40 flex flex-col justify-between overflow-y-auto shadow-2xl"
            >
              <div>
                {/* Header with Title & Close button */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/8">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4f9eff]/15 text-[#4f9eff] border border-[#4f9eff]/30">
                      {activeProject.category}
                    </span>
                    <h2 className="text-lg font-bold text-white tracking-tight mt-1.5">
                      {activeProject.title}
                    </h2>
                  </div>

                  <button
                    onClick={handleCloseDetail}
                    aria-label="Close detail panel"
                    className="p-1.5 rounded-lg bg-[#1e1e24] hover:bg-[#282834] text-[#8e8ea0] hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Screenshot Placeholder (Grey rectangle with project name) */}
                <div className="my-5 w-full h-44 rounded-xl bg-[#1e1e28] border border-white/10 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group">
                  <Layers className="w-8 h-8 text-[#4f9eff]/40 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono text-[#a0a0b0] font-medium max-w-xs truncate">
                    {activeProject.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#606070] mt-1">
                    [ Screenshot Preview Placeholder ]
                  </span>
                </div>

                {/* Full Description */}
                <div className="space-y-3 mb-5">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#8e8ea0]">
                    Project Overview
                  </h3>
                  <p className="text-xs text-[#c8c8d8] leading-relaxed">
                    {activeProject.fullDescription}
                  </p>
                </div>

                {/* My Contribution */}
                <div className="space-y-3 mb-5 bg-[#181820] border border-white/5 rounded-xl p-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#4f9eff] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>My Contribution</span>
                  </h3>
                  <p className="text-xs text-[#b0b0c0] leading-relaxed">
                    {activeProject.contribution}
                  </p>
                </div>

                {/* Technologies Used */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#8e8ea0]">
                    Technologies & Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#1e1e24] text-[#4f9eff] border border-[#4f9eff]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action CTAs */}
              <div className="pt-4 border-t border-white/8 flex items-center gap-3">
                {activeProject.githubUrl ? (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      playClickSound()
                      useOSStore.getState().notify('Opening GitHub in a new tab...')
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1e1e24] hover:bg-[#282832] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4 text-[#4f9eff]" />
                    <span>GitHub Code</span>
                  </a>
                ) : (
                  <button
                    onClick={(e) => showTooltip('GitHub repository not available', e)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1e1e24]/40 border border-white/5 text-[#505060] text-xs font-medium flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>No Repo Link</span>
                  </button>
                )}

                {activeProject.liveDemoUrl ? (
                  <a
                    href={activeProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#4f9eff] hover:bg-[#3d8ef5] text-black text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                ) : (
                  <button
                    onClick={(e) => showTooltip('Live demonstration not available', e)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1e1e24]/40 border border-white/5 text-[#505060] text-xs font-medium flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>No Live Demo</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
