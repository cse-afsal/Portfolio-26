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
    type,
    name,
    title,
    subtitle,
    category,
    content,
    highlights,
    footerNote,
    // Project-specific fields
    stationNumber,
    technologies,
    contribution,
    github,
    liveDemo,
    status,
    // Contact-specific fields
    links,
    // Skill-specific fields
    skillCategories,
    // Education-specific fields
    degrees,
    certifications,
    workshops,
    // Achievement-specific fields
    awards,
    competitions,
    milestones,
    activities,
  } = activeInteraction

  return (
    <div
      onClick={closeInteraction}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-neutral-900/95 border border-neutral-700/80 rounded-2xl p-6 sm:p-8 text-white shadow-2xl backdrop-blur-md overflow-hidden max-h-[90vh] flex flex-col my-auto"
      >
        {/* Subtle decorative warm background glow */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 mb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {stationNumber && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {stationNumber}
                </span>
              )}
              {category && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase bg-white/10 text-neutral-300 border border-white/10">
                  {category}
                </span>
              )}
              {status && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
                  {status}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-neutral-100">
              {title || name}
            </h2>
            {subtitle && (
              <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={closeInteraction}
            aria-label="Close modal"
            className="p-2 -mr-2 -mt-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="space-y-5 text-sm sm:text-base text-neutral-300 leading-relaxed font-light overflow-y-auto pr-1">
          {content && <p>{content}</p>}

          {/* ======================================================== */}
          {/* --- PROJECT STATION SPECIFIC VIEW --- */}
          {/* ======================================================== */}
          {type === 'project' && (
            <div className="space-y-4">
              {/* Tech Stack Badges */}
              {technologies && technologies.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                    Technologies & Architecture
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-800 text-amber-200/90 border border-neutral-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Contribution */}
              {contribution && (
                <div className="p-3.5 bg-neutral-800/60 rounded-xl border border-neutral-700/50">
                  <h4 className="text-xs uppercase tracking-wider text-amber-300/80 font-medium mb-1">
                    My Engineering Contribution
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {contribution}
                  </p>
                </div>
              )}

              {/* Project Highlights */}
              {highlights && highlights.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                    Key Features & Metrics
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-300">
                    {highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons: GitHub & Live Demo */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium border border-neutral-600/80 transition-all cursor-pointer shadow-md"
                  >
                    <span>View GitHub Repo</span>
                    <span className="text-xs opacity-75">↗</span>
                  </a>
                )}
                {liveDemo && (
                  <a
                    href={liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold transition-all cursor-pointer shadow-md"
                  >
                    <span>Launch Live Demo</span>
                    <span className="text-xs opacity-75">↗</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* --- SKILLS WORKSPACE SPECIFIC VIEW --- */}
          {/* ======================================================== */}
          {type === 'skills' && skillCategories && (
            <div className="space-y-4">
              {skillCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3.5 bg-neutral-800/50 rounded-xl border border-neutral-700/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-amber-200">{cat.name}</h4>
                  </div>
                  {cat.description && (
                    <p className="text-xs text-neutral-400 mb-2.5">{cat.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded text-xs font-mono ${
                          item.startsWith('[')
                            ? 'bg-amber-500/10 text-amber-300/80 italic border border-dashed border-amber-500/30'
                            : 'bg-neutral-900 text-neutral-200 border border-neutral-700/60'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ======================================================== */}
          {/* --- CONTACT HOUSE LINKS & SOCIAL VIEW --- */}
          {/* ======================================================== */}
          {type === 'contact' && links && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-400 mb-2">
                Click any channel below to open in a new tab:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-neutral-800/70 hover:bg-neutral-800 text-left border border-neutral-700/60 hover:border-amber-400/50 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white group-hover:text-amber-200 transition-colors">
                          {link.name}
                        </span>
                        <span className="text-xs text-neutral-400 group-hover:text-amber-300">↗</span>
                      </div>
                      <span className="text-xs text-amber-300/80 font-mono block mt-0.5">
                        {link.handle}
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                        {link.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* --- EDUCATION & ACADEMICS VIEW --- */}
          {/* ======================================================== */}
          {type === 'education' && (
            <div className="space-y-4">
              {degrees && degrees.map((deg) => (
                <div key={deg.id} className="p-3.5 bg-neutral-800/60 rounded-xl border border-neutral-700/50">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <h4 className="text-sm font-medium text-neutral-100">{deg.degree}</h4>
                    <span className="text-xs font-mono text-amber-300">{deg.period}</span>
                  </div>
                  <div className="text-xs text-neutral-400 mb-2">{deg.institution} • {deg.location}</div>
                  <p className="text-xs text-neutral-300 mb-2.5">{deg.overview}</p>
                  {deg.coursework && (
                    <div className="mt-2 pt-2 border-t border-neutral-700/40">
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block mb-1">
                        Highlighted Coursework:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {deg.coursework.map((course, cIdx) => (
                          <span key={cIdx} className="px-2 py-0.5 rounded text-[11px] bg-neutral-900 text-neutral-300 border border-neutral-700/40">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {certifications && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                    Verified Certifications
                  </h4>
                  <div className="space-y-2">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="p-2.5 bg-neutral-800/40 rounded-lg border border-neutral-700/30 flex justify-between items-center text-xs">
                        <div>
                          <div className="font-medium text-neutral-200">{cert.title}</div>
                          <div className="text-neutral-400">{cert.issuer} • {cert.date}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20">
                          Verified
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* --- ACHIEVEMENTS & AWARDS VIEW --- */}
          {/* ======================================================== */}
          {type === 'achievements' && (
            <div className="space-y-4">
              {awards && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-amber-300/80 font-medium mb-2">
                    Honors & Awards
                  </h4>
                  <div className="space-y-2">
                    {awards.map((award) => (
                      <div key={award.id} className="p-3 bg-neutral-800/50 rounded-xl border border-neutral-700/40">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-medium text-neutral-100">{award.title}</span>
                          <span className="text-xs font-mono text-amber-300 shrink-0">{award.year}</span>
                        </div>
                        <div className="text-xs text-neutral-400 mb-1">{award.organization}</div>
                        <p className="text-xs text-neutral-300">{award.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {competitions && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                    Competitions & Open Source Sprints
                  </h4>
                  <div className="space-y-2">
                    {competitions.map((comp) => (
                      <div key={comp.id} className="p-2.5 bg-neutral-800/30 rounded-lg border border-neutral-700/30 text-xs">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-medium text-neutral-200">{comp.name}</span>
                          <span className="text-emerald-300 font-mono">{comp.standing}</span>
                        </div>
                        <p className="text-neutral-400">{comp.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {milestones && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                    Key Milestones
                  </h4>
                  <div className="space-y-1.5">
                    {milestones.map((ms) => (
                      <div key={ms.id} className="p-2 bg-neutral-800/20 rounded-lg border border-neutral-700/20 text-xs flex justify-between items-center">
                        <span className="text-neutral-200">{ms.title}</span>
                        <span className="text-neutral-400 font-mono text-[11px]">{ms.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Standard generic highlights list fallback */}
          {type !== 'project' && highlights && highlights.length > 0 && (
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

        {/* Footer Note */}
        {footerNote && (
          <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400 italic shrink-0">
            {footerNote}
          </div>
        )}

        {/* Action Button Footer */}
        <div className="mt-5 pt-3 border-t border-neutral-800 flex justify-end gap-3 shrink-0">
          <button
            onClick={closeInteraction}
            className="px-5 py-2.5 bg-neutral-100 hover:bg-white text-neutral-900 font-medium text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  )
}

