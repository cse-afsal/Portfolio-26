import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import aboutData from '../../data/about.json'
import skillsData from '../../data/skills.json'
import projectsData from '../../data/projects.json'
import educationData from '../../data/education.json'
import contactData from '../../data/contact.json'
import useOSStore from '../../store/useOSStore'
import { playKeySound } from '../../utils/sound'

const ASCII_LOGO = [
  '    /\\          ',
  '   /  \\         ',
  '  / /\\ \\        ',
  ' / /  \\ \\       ',
  '/ / /\\ \\ \\      ',
  '\\ \\ \\/ / /      ',
  ' \\ \\  / /       ',
  '  \\ \\/ /        ',
  '   \\  /         ',
  '    \\/          ',
]

const KNOWN_COMMANDS = [
  'help',
  'whoami',
  'skills',
  'projects',
  'education',
  'contact',
  'open',
  'clear',
  'neofetch',
  'sudo hire afsal',
]

const VALID_APPS = [
  'about',
  'projects',
  'skills',
  'education',
  'achievements',
  'contact',
  'finder',
]

export default function TerminalApp() {
  const openApp = useOSStore((s) => s.openApp)
  const activeAppId = useOSStore((s) => s.activeAppId)

  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([
    {
      type: 'boot',
      lines: [
        'Welcome to AFSAL OS Terminal',
        "Type 'help' to see available commands.",
        "Try 'neofetch' to get started.",
      ],
    },
  ])
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isAccessGranted, setIsAccessGranted] = useState(false)

  const terminalEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom whenever output changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, isAccessGranted])

  // Focus input on click anywhere or when terminal becomes active
  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (activeAppId === 'terminal') {
      focusInput()
    }
  }, [activeAppId, focusInput])

  const executeCommand = (cmdStr) => {
    const raw = cmdStr.trim()
    if (!raw) {
      setHistory((prev) => [...prev, { type: 'cmd', cmd: '' }])
      return
    }

    playKeySound()
    setCommandHistory((prev) => [...prev, raw])
    setHistoryIndex(-1)

    const lower = raw.toLowerCase()
    const parts = lower.split(' ').filter(Boolean)
    const baseCmd = parts[0]
    const args = parts.slice(1).join(' ')

    // Special case: sudo hire afsal
    if (lower === 'sudo hire afsal') {
      setHistory((prev) => [
        ...prev,
        { type: 'cmd', cmd: raw },
        { type: 'sudo_hire' },
      ])
      setIsAccessGranted(true)
      setTimeout(() => {
        openApp('contact')
        setIsAccessGranted(false)
      }, 1800)
      return
    }

    switch (baseCmd) {
      case 'help': {
        setHistory((prev) => [
          ...prev,
          { type: 'cmd', cmd: raw },
          {
            type: 'help',
            commands: [
              { name: 'help', desc: 'Lists all available commands with a one-line description each.' },
              { name: 'whoami', desc: 'Displays a short personal introduction.' },
              { name: 'skills', desc: "Displays Afsal's technical skills organized by category." },
              { name: 'projects', desc: 'Lists all projects with their title and a one-line description.' },
              { name: 'education', desc: 'Displays academic background and qualifications.' },
              { name: 'contact', desc: 'Displays contact and profile links.' },
              { name: 'open [appname]', desc: 'Opens the named app window (e.g., open projects).' },
              { name: 'clear', desc: 'Clears the terminal output.' },
              { name: 'neofetch', desc: 'Displays a styled system info panel like the real neofetch.' },
              { name: 'sudo hire afsal', desc: 'Direct recruiter executive authorization.' },
            ],
          },
        ])
        break
      }

      case 'whoami': {
        setHistory((prev) => [
          ...prev,
          { type: 'cmd', cmd: raw },
          {
            type: 'whoami',
            name: aboutData.name,
            role: aboutData.role,
            location: aboutData.location,
            bio: aboutData.bio,
          },
        ])
        break
      }

      case 'skills': {
        setHistory((prev) => [
          ...prev,
          { type: 'cmd', cmd: raw },
          {
            type: 'skills',
            categories: skillsData.categories,
          },
        ])
        break
      }

      case 'projects': {
        setHistory((prev) => [
          ...prev,
          { type: 'cmd', cmd: raw },
          {
            type: 'projects',
            projects: projectsData.projects || [],
          },
        ])
        break
      }

      case 'education': {
        setHistory((prev) => [
          ...prev,
          { type: 'cmd', cmd: raw },
          {
            type: 'education',
            items: educationData.education || [],
          },
        ])
        break
      }

      case 'contact': {
        setHistory((prev) => [
          ...prev,
          { type: 'cmd', cmd: raw },
          {
            type: 'contact',
            links: contactData.links || [],
          },
        ])
        break
      }

      case 'open': {
        if (!args) {
          setHistory((prev) => [
            ...prev,
            { type: 'cmd', cmd: raw },
            {
              type: 'error',
              msg: `Usage: open [appname]. Valid apps: ${VALID_APPS.join(', ')}`,
            },
          ])
          break
        }

        const appName = args.trim().toLowerCase()
        if (VALID_APPS.includes(appName)) {
          openApp(appName)
          setHistory((prev) => [
            ...prev,
            { type: 'cmd', cmd: raw },
            { type: 'success', msg: `Opening ${appName}...` },
          ])
        } else {
          setHistory((prev) => [
            ...prev,
            { type: 'cmd', cmd: raw },
            {
              type: 'error',
              msg: `App '${appName}' not found. Valid apps: ${VALID_APPS.join(', ')}`,
            },
          ])
        }
        break
      }

      case 'clear': {
        setHistory([])
        break
      }

      case 'neofetch': {
        setHistory((prev) => [
          ...prev,
          { type: 'cmd', cmd: raw },
          {
            type: 'neofetch',
            data: {
              os: 'AFSAL OS v1.0',
              role: 'AI/ML Engineer',
              stack: 'Python • React • TensorFlow • PyTorch',
              status: aboutData.status || 'Open to opportunities',
              location: aboutData.location || 'Kerala, India',
              github: contactData.github || 'github.com/YOUR_GITHUB',
              linkedin: contactData.linkedin || 'linkedin.com/in/YOUR_LINKEDIN',
            },
          },
        ])
        break
      }

      default: {
        setHistory((prev) => [
          ...prev,
          { type: 'cmd', cmd: raw },
          {
            type: 'error',
            msg: `command not found: ${raw}. Type 'help' for available commands.`,
          },
        ])
        break
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand(inputVal)
      setInputVal('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInputVal(commandHistory[nextIndex] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setInputVal('')
      } else {
        setHistoryIndex(nextIndex)
        setInputVal(commandHistory[nextIndex] || '')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const trimmed = inputVal.trimStart()
      if (!trimmed) return

      // Check if typing 'open ...'
      if (trimmed.startsWith('open ')) {
        const appPrefix = trimmed.slice(5).toLowerCase()
        const match = VALID_APPS.find((app) => app.startsWith(appPrefix))
        if (match) {
          setInputVal(`open ${match}`)
        }
        return
      }

      // Check known commands
      const lower = trimmed.toLowerCase()
      const match = KNOWN_COMMANDS.find((cmd) => cmd.startsWith(lower))
      if (match) {
        setInputVal(match)
      }
    }
  }

  const CATEGORY_COLORS = {
    Languages: 'text-[#4f9eff]',
    Frontend: 'text-[#38bdf8]',
    Backend: 'text-[#818cf8]',
    Databases: 'text-[#a78bfa]',
    Tools: 'text-[#34d399]',
    'Currently Learning': 'text-[#fbbf24]',
  }

  return (
    <div
      onClick={focusInput}
      style={{
        backgroundColor: '#0d0d0f',
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28) 1px, transparent 1px, transparent 2px)',
      }}
      className="flex-1 w-full h-full overflow-y-auto p-4 md:p-6 font-mono text-xs md:text-sm select-text flex flex-col justify-start cursor-text"
    >
      {/* History Items */}
      <div className="space-y-3.5">
        {history.map((item, idx) => {
          if (item.type === 'boot') {
            return (
              <div key={idx} className="text-[#a0a0b0] space-y-1 mb-4 leading-relaxed">
                {item.lines.map((line, lIdx) => (
                  <div key={lIdx}>{line}</div>
                ))}
              </div>
            )
          }

          if (item.type === 'cmd') {
            return (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-[#4f9eff] font-semibold shrink-0">afsal@portfolio:~$</span>
                <span className="text-[#e8e8f0]">{item.cmd}</span>
              </div>
            )
          }

          if (item.type === 'help') {
            return (
              <div key={idx} className="text-[#a0a0b0] space-y-2 pl-2">
                <div className="text-white font-semibold mb-1">Available commands:</div>
                <div className="grid grid-cols-1 gap-1">
                  {item.commands.map((c, cIdx) => (
                    <div key={cIdx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                      <span className="text-[#4f9eff] font-bold w-36 shrink-0">{c.name}</span>
                      <span className="text-[#8e8ea0]">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          if (item.type === 'whoami') {
            return (
              <div key={idx} className="text-[#a0a0b0] space-y-2 pl-2 max-w-2xl leading-relaxed">
                <div className="text-white font-semibold">
                  {item.name} — <span className="text-[#4f9eff]">{item.role}</span> ({item.location})
                </div>
                <p className="text-[#a0a0b0]">{item.bio}</p>
              </div>
            )
          }

          if (item.type === 'skills') {
            return (
              <div key={idx} className="space-y-3 pl-2 max-w-3xl">
                <div className="text-white font-semibold mb-1">Technical Skills by Category:</div>
                {Object.entries(item.categories || {}).map(([cat, list]) => {
                  const colorClass = CATEGORY_COLORS[cat] || 'text-[#4f9eff]'
                  return (
                    <div key={cat} className="space-y-1">
                      <div className={`${colorClass} font-bold text-xs uppercase tracking-wider`}>
                        {cat}
                      </div>
                      <div className="text-[#a0a0b0] flex flex-wrap gap-2 pl-2">
                        {list.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-[#14141c] border border-white/5 px-2 py-0.5 rounded text-[11px] text-[#e8e8f0]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          }

          if (item.type === 'projects') {
            return (
              <div key={idx} className="space-y-3 pl-2 max-w-3xl">
                <div className="text-white font-semibold mb-1">Featured Projects:</div>
                <div className="space-y-2.5">
                  {item.projects.map((p, pIdx) => (
                    <div key={pIdx} className="border-l-2 border-[#4f9eff]/40 pl-3 py-0.5 space-y-0.5">
                      <div className="text-white font-semibold flex items-center gap-2">
                        <span>{p.title}</span>
                        {p.badge && (
                          <span className="text-[10px] text-[#4f9eff] bg-[#4f9eff]/10 px-1.5 py-0.2 rounded border border-[#4f9eff]/20">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#8e8ea0] text-[11px]">{p.shortDescription || p.summary}</p>
                    </div>
                  ))}
                </div>
                <div className="text-[#4f9eff] text-xs pt-1">
                  💡 Hint: Type &apos;open projects&apos; or click Projects in the dock for full details, architecture diagrams, and live demos.
                </div>
              </div>
            )
          }

          if (item.type === 'education') {
            return (
              <div key={idx} className="space-y-3 pl-2 max-w-2xl">
                <div className="text-white font-semibold mb-1">Academic Background:</div>
                {item.items.map((edu, eIdx) => (
                  <div key={eIdx} className="border-l-2 border-[#818cf8]/50 pl-3 py-1 space-y-0.5">
                    <div className="text-white font-semibold">{edu.degree}</div>
                    <div className="text-[#4f9eff] text-xs">
                      {edu.institution} • {edu.period}
                    </div>
                    <p className="text-[#8e8ea0] text-[11px] mt-0.5">{edu.details}</p>
                  </div>
                ))}
              </div>
            )
          }

          if (item.type === 'contact') {
            return (
              <div key={idx} className="space-y-2 pl-2">
                <div className="text-white font-semibold mb-1">Contact & Verification Channels:</div>
                <div className="space-y-1.5">
                  {item.links.map((link, lIdx) => (
                    <div key={lIdx} className="flex items-center gap-3">
                      <span className="text-[#8e8ea0] w-24 shrink-0">{link.name}:</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4f9eff] hover:underline hover:text-[#78b7ff] transition-colors"
                      >
                        {link.handle}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          if (item.type === 'neofetch') {
            return (
              <div key={idx} className="pl-2 py-2 flex flex-col sm:flex-row items-start gap-6">
                {/* Minimal ASCII Logo */}
                <pre className="text-[#4f9eff] font-mono text-xs leading-none select-none shrink-0 font-bold">
                  {ASCII_LOGO.join('\n')}
                </pre>

                {/* Neofetch Info Rows */}
                <div className="space-y-1 text-xs">
                  <div className="text-white font-bold tracking-wide">
                    afsal<span className="text-[#4f9eff]">@</span>portfolio
                  </div>
                  <div className="text-[#404050] text-[11px]">------------------------</div>
                  <div className="flex gap-2">
                    <span className="text-[#4f9eff] font-semibold w-24">OS:</span>
                    <span className="text-[#e8e8f0]">{item.data.os}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#4f9eff] font-semibold w-24">Role:</span>
                    <span className="text-[#e8e8f0]">{item.data.role}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#4f9eff] font-semibold w-24">Stack:</span>
                    <span className="text-[#e8e8f0]">{item.data.stack}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#4f9eff] font-semibold w-24">Status:</span>
                    <span className="text-emerald-400 font-semibold">{item.data.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#4f9eff] font-semibold w-24">Location:</span>
                    <span className="text-[#e8e8f0]">{item.data.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#4f9eff] font-semibold w-24">GitHub:</span>
                    <a
                      href={item.data.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4f9eff] hover:underline"
                    >
                      {item.data.github}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#4f9eff] font-semibold w-24">LinkedIn:</span>
                    <a
                      href={item.data.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4f9eff] hover:underline"
                    >
                      {item.data.linkedin}
                    </a>
                  </div>

                  {/* Terminal Palette color test blocks */}
                  <div className="flex gap-1.5 pt-2">
                    <span className="w-4 h-3 bg-[#0d0d0f] border border-white/10" />
                    <span className="w-4 h-3 bg-[#ff6b6b]" />
                    <span className="w-4 h-3 bg-[#27c93f]" />
                    <span className="w-4 h-3 bg-[#fbbf24]" />
                    <span className="w-4 h-3 bg-[#4f9eff]" />
                    <span className="w-4 h-3 bg-[#818cf8]" />
                    <span className="w-4 h-3 bg-[#38bdf8]" />
                    <span className="w-4 h-3 bg-[#e8e8f0]" />
                  </div>
                </div>
              </div>
            )
          }

          if (item.type === 'sudo_hire') {
            return (
              <div key={idx} className="space-y-1.5 pl-2 my-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block px-3 py-1 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold tracking-wider rounded"
                >
                  [ ACCESS GRANTED ]
                </motion.div>
                <div className="text-emerald-300 font-semibold text-xs">
                  Smart choice. Opening contact...
                </div>
              </div>
            )
          }

          if (item.type === 'success') {
            return (
              <div key={idx} className="text-emerald-400 pl-2">
                {item.msg}
              </div>
            )
          }

          if (item.type === 'error') {
            return (
              <div key={idx} className="text-[#ff6b6b] pl-2">
                {item.msg}
              </div>
            )
          }

          return null
        })}
      </div>

      {/* Active Command Input Line */}
      <div className="flex items-center gap-2 mt-3.5 shrink-0">
        <span className="text-[#4f9eff] font-semibold shrink-0 select-none">
          afsal@portfolio:~$
        </span>
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-[#e8e8f0] outline-none border-none p-0 font-mono text-xs md:text-sm caret-[#4f9eff]"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
      </div>

      <div ref={terminalEndRef} className="h-4" />
    </div>
  )
}
