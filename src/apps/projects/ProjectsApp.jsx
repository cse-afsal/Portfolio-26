import { useState } from 'react'
import {
  Layers,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react'
import { GithubIcon } from '../../components/BrandIcons'
import projectsData from '../../data/projects.json'
import { playClickSound } from '../../utils/sound'

const CATEGORIES = ['All', 'Deep Learning', 'Computer Vision', 'NLP', 'Data Science']

export default function ProjectsApp() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filtered =
    selectedCategory === 'All'
      ? projectsData.projects
      : projectsData.projects.filter(
          (p) =>
            p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            p.badge.toLowerCase().includes(selectedCategory.toLowerCase())
        )

  return (
    <div className="p-6 md:p-8 space-y-6 text-[#e8e8f0]">
      {/* App Header & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/8">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#4f9eff]" />
            <span>AI/ML Engineering Projects</span>
          </h2>
          <p className="text-xs text-[#6b6b80] mt-0.5">
            Deep neural networks, computer vision systems, and statistical data pipelines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#181820] rounded-xl border border-white/8 shrink-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { playClickSound(); setSelectedCategory(cat) }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#4f9eff] text-black font-semibold shadow-md'
                  : 'text-[#6b6b80] hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-2xl bg-[#181820]/80 border border-white/8 hover:border-[#4f9eff]/40 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#4f9eff]/15 text-[#4f9eff] border border-[#4f9eff]/30 font-medium">
                  {proj.badge}
                </span>
                <span className="text-[10px] font-mono text-[#6b6b80] bg-white/5 px-2 py-0.5 rounded border border-white/6">
                  {proj.status}
                </span>
              </div>

              {/* Title & Summary */}
              <h3 className="text-base font-semibold text-white group-hover:text-[#4f9eff] transition-colors leading-snug">
                {proj.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed font-light">
                {proj.summary}
              </p>

              {/* Technologies Badges */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {proj.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-[#141418] border border-white/8 text-[11px] font-mono text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Architecture & Metrics Box */}
              {proj.metrics && (
                <div className="mt-4 p-3 rounded-xl bg-[#121216] border border-white/6 text-xs space-y-1 font-mono">
                  {Object.entries(proj.metrics).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-[11px]">
                      <span className="text-[#6b6b80] capitalize">{key}:</span>
                      <span className="text-[#4f9eff] font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Features List */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6b6b80] block">
                  Implementation Highlights:
                </span>
                {proj.highlights.map((hl, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4f9eff] mt-0.5 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 pt-3.5 border-t border-white/8 flex items-center gap-3">
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#141418] hover:bg-[#202028] border border-white/10 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#4f9eff]" />
                <span>Source Code</span>
              </a>

              {proj.demo && (
                <a
                  href={proj.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#4f9eff]/15 hover:bg-[#4f9eff]/25 border border-[#4f9eff]/30 text-[#4f9eff] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
