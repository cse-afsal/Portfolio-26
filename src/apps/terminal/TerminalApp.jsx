import { useState, useRef, useEffect } from 'react'
import profileData from '../../data/profile.json'
import skillsData from '../../data/skills.json'
import projectsData from '../../data/projects.json'
import systemData from '../../data/system.json'
import useOSStore from '../../store/useOSStore'
import { playKeySound } from '../../utils/sound'

const BANNER = `
   ___  _______ _____ ___    __    ____  _____
  /   |/ ____// ___//   |  / /   / __ \\/ ___/
 / /| / /_    \\__ \\/ /| | / /   / / / /\\__ \\ 
/ ___/ __/   ___/ / ___ |/ /___/ /_/ /___/ / 
/_/  |_/_/   /____/_/  |_/_____/\\____//____/  
   Afsal OS — Neural Workstation v1.0.0
   Type 'help' to inspect available system commands.
`

export default function TerminalApp() {
  const openApp = useOSStore((s) => s.openApp)

  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([
    { type: 'banner', content: BANNER },
    { type: 'info', content: 'Session initiated. Current user: afsal (AI/ML Engineering Researcher).' },
  ])
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim()
    if (!trimmed) return

    playKeySound()
    setCommandHistory((prev) => [...prev, trimmed])
    setHistoryIdx(-1)

    // Append entered command line to terminal output
    const newEntry = { type: 'cmd', command: trimmed }
    const parts = trimmed.split(' ')
    const cmd = parts[0].toLowerCase()
    const arg = parts.slice(1).join(' ').toLowerCase()

    let response = null

    switch (cmd) {
      case 'help':
        response = {
          type: 'help',
          commands: systemData.terminalCommands,
        }
        break

      case 'bio':
      case 'about':
        response = {
          type: 'text',
          lines: [
            `Name: ${profileData.name}`,
            `Role: ${profileData.role}`,
            `Specialization: ${profileData.specialization}`,
            `Location: ${profileData.location}`,
            `Status: ${profileData.status}`,
            '',
            `Summary: ${profileData.bio}`,
            '',
            `Education: ${profileData.education.degree} @ ${profileData.education.institution} (${profileData.education.timeline})`,
          ],
        }
        break

      case 'skills':
      case 'stack':
        response = {
          type: 'skills',
          domains: skillsData.domains,
        }
        break

      case 'projects':
        response = {
          type: 'projects',
          items: projectsData.projects,
        }
        break

      case 'contact':
        response = {
          type: 'text',
          lines: [
            'Direct Communication Channels:',
            `  • Email:    ${profileData.contacts.email}`,
            `  • GitHub:   ${profileData.contacts.github}`,
            `  • LinkedIn: ${profileData.contacts.linkedin}`,
            `  • Kaggle:   ${profileData.contacts.kaggle}`,
            `  • Resume:   ${profileData.contacts.resume}`,
          ],
        }
        break

      case 'neofetch':
        response = {
          type: 'neofetch',
          specs: systemData.os.specs,
          osName: systemData.os.name,
          version: systemData.os.version,
        }
        break

      case 'open':
        if (!arg) {
          response = { type: 'error', text: 'Usage: open <app> (about, projects, skills, contact, settings)' }
        } else if (['about', 'projects', 'skills', 'contact', 'settings', 'terminal'].includes(arg)) {
          openApp(arg)
          response = { type: 'success', text: `Launched window: ${arg}` }
        } else {
          response = { type: 'error', text: `App not found: '${arg}'. Available: about, projects, skills, contact, settings` }
        }
        break

      case 'clear':
        setHistory([])
        setInputVal('')
        return

      case 'whoami':
        response = { type: 'text', lines: ['afsal (AI/ML Engineer & Researcher)'] }
        break

      case 'date':
        response = { type: 'text', lines: [new Date().toString()] }
        break

      case 'history':
        response = {
          type: 'text',
          lines: commandHistory.map((c, i) => `  ${i + 1}  ${c}`),
        }
        break

      case 'sudo':
        response = {
          type: 'error',
          text: 'Permission denied: User afsal is in the neural research group, but root operations require neural-link authentication.',
        }
        break

      default:
        response = {
          type: 'error',
          text: `Command not found: '${trimmed}'. Type 'help' to see list of valid commands.`,
        }
    }

    setHistory((prev) => [...prev, newEntry, response])
    setInputVal('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1
        if (nextIdx < commandHistory.length) {
          setHistoryIdx(nextIdx)
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx])
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1
        setHistoryIdx(nextIdx)
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx])
      } else if (historyIdx === 0) {
        setHistoryIdx(-1)
        setInputVal('')
      }
    }
  }

  return (
    <div
      onClick={focusInput}
      className="p-4 w-full h-full bg-[#0d0d12]/95 font-mono text-xs text-[#e8e8f0] overflow-y-auto cursor-text select-text"
    >
      {/* Terminal History */}
      <div className="space-y-3">
        {history.map((item, idx) => {
          if (item.type === 'banner') {
            return (
              <pre key={idx} className="text-[#4f9eff] text-[11px] leading-tight font-mono select-none">
                {item.content}
              </pre>
            )
          }

          if (item.type === 'info') {
            return (
              <div key={idx} className="text-[#6b6b80] font-light">
                {item.content}
              </div>
            )
          }

          if (item.type === 'cmd') {
            return (
              <div key={idx} className="flex items-center gap-2 text-white">
                <span className="text-[#4f9eff] font-semibold">afsal@workstation:~$</span>
                <span>{item.command}</span>
              </div>
            )
          }

          if (item.type === 'text') {
            return (
              <div key={idx} className="space-y-1 text-neutral-300 font-light pl-2 border-l border-white/10">
                {item.lines.map((line, lIdx) => (
                  <div key={lIdx}>{line}</div>
                ))}
              </div>
            )
          }

          if (item.type === 'help') {
            return (
              <div key={idx} className="space-y-1.5 pl-2 border-l border-[#4f9eff]/30">
                <div className="text-[#4f9eff] font-semibold mb-2">Available System Commands:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {item.commands.map((c, cIdx) => (
                    <div key={cIdx} className="flex items-baseline gap-2">
                      <span className="text-white font-bold min-w-20">{c.cmd}</span>
                      <span className="text-[#6b6b80] text-[11px]">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          if (item.type === 'skills') {
            return (
              <div key={idx} className="space-y-3 pl-2 border-l border-indigo-500/30">
                <div className="text-indigo-400 font-semibold">Neural & AI Engineering Stack:</div>
                <div className="space-y-2">
                  {item.domains.map((dom) => (
                    <div key={dom.id} className="p-2 rounded bg-white/5 border border-white/6">
                      <div className="text-white font-medium text-xs mb-1">{dom.name}</div>
                      <div className="flex flex-wrap gap-1 text-[11px] text-[#4f9eff]">
                        {dom.skills.map((s, sIdx) => (
                          <span key={sIdx} className="bg-[#1e1e24] px-1.5 py-0.5 rounded border border-white/8">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          if (item.type === 'projects') {
            return (
              <div key={idx} className="space-y-2.5 pl-2 border-l border-cyan-500/30">
                <div className="text-cyan-400 font-semibold">Featured AI/ML Projects:</div>
                {item.items.map((proj) => (
                  <div key={proj.id} className="p-2.5 rounded bg-white/5 border border-white/6 space-y-1">
                    <div className="flex items-center justify-between text-white font-medium">
                      <span>{proj.title}</span>
                      <span className="text-[10px] text-[#4f9eff] font-mono">{proj.badge}</span>
                    </div>
                    <p className="text-[11px] text-[#6b6b80]">{proj.summary}</p>
                    <div className="text-[10px] text-neutral-400 pt-1">
                      Tech: {proj.technologies.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )
          }

          if (item.type === 'neofetch') {
            return (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 p-3 rounded-lg bg-white/4 border border-white/8 text-[11px]">
                <pre className="text-[#4f9eff] font-mono leading-none select-none hidden sm:block">
{`   /\\
  /  \\
 / /\\ \\
/ /  \\ \\
\\ \\  / /
 \\ \\/ /
  \\  /
   \\/`}
                </pre>
                <div className="space-y-1 font-mono">
                  <div className="text-white font-bold text-xs pb-1 border-b border-white/10">
                    afsal@neural-workstation
                  </div>
                  <div><span className="text-[#4f9eff]">OS:</span> {item.osName} {item.version}</div>
                  <div><span className="text-[#4f9eff]">Host:</span> {item.specs.host}</div>
                  <div><span className="text-[#4f9eff]">Kernel:</span> {item.specs.kernel}</div>
                  <div><span className="text-[#4f9eff]">CPU:</span> {item.specs.cpu}</div>
                  <div><span className="text-[#4f9eff]">GPU:</span> {item.specs.gpu}</div>
                  <div><span className="text-[#4f9eff]">Memory:</span> {item.specs.memory}</div>
                  <div><span className="text-[#4f9eff]">Shell:</span> {item.specs.shell}</div>
                </div>
              </div>
            )
          }

          if (item.type === 'error') {
            return (
              <div key={idx} className="text-rose-400 font-mono">
                {item.text}
              </div>
            )
          }

          if (item.type === 'success') {
            return (
              <div key={idx} className="text-emerald-400 font-mono">
                ✓ {item.text}
              </div>
            )
          }

          return null
        })}
      </div>

      {/* Active Command Prompt Line */}
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/5">
        <span className="text-[#4f9eff] font-semibold shrink-0">afsal@workstation:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs p-0 focus:ring-0"
        />
      </div>

      <div ref={bottomRef} />
    </div>
  )
}
