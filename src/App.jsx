import { motion } from 'framer-motion'
import {
  Terminal,
  User,
  Layers,
  Cpu,
  GraduationCap,
  Award,
  Mail,
  FolderTree,
} from 'lucide-react'
import useOSStore from './store/useOSStore'
import BootScreen from './components/BootScreen'
import TopBar from './components/TopBar'
import Desktop from './components/Desktop'
import Dock from './components/Dock'
import Window from './components/Window'
import ContextMenu from './components/ContextMenu'
import PlaceholderApp from './components/PlaceholderApp'

export default function App() {
  const isBooted = useOSStore((s) => s.isBooted)
  const setBooted = useOSStore((s) => s.setBooted)

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#09090c] text-[#e8e8f0] font-sans select-none flex flex-col relative">
      {/* 1. Animated Boot Sequence */}
      {!isBooted && (
        <BootScreen onBootComplete={() => setBooted(true)} />
      )}

      {/* 2. Desktop Environment (fades in smoothly after boot) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isBooted ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full h-full flex flex-col relative overflow-hidden"
      >
        {/* Top Slim Menubar (20px) */}
        <TopBar />

        {/* Center Desktop Canvas with Animated Wallpaper & Desktop Shortcuts */}
        <div className="flex-1 w-full relative overflow-hidden pt-[20px]">
          <Desktop>
            {/* Windows Layer */}
            <Window id="terminal" title="Terminal — zsh" icon={Terminal}>
              <PlaceholderApp
                title="Terminal"
                phaseNote="Terminal — Coming in Phase 2"
                icon={Terminal}
              />
            </Window>

            <Window id="about" title="About Me" icon={User}>
              <PlaceholderApp
                title="About Me"
                phaseNote="About Me — Coming in Phase 3"
                icon={User}
              />
            </Window>

            <Window id="finder" title="Finder — File Explorer" icon={FolderTree}>
              <PlaceholderApp
                title="Finder"
                phaseNote="Finder — Coming in Phase 3"
                icon={FolderTree}
              />
            </Window>

            <Window id="projects" title="Projects" icon={Layers}>
              <PlaceholderApp
                title="Projects"
                phaseNote="Projects — Coming in Phase 4"
                icon={Layers}
              />
            </Window>

            <Window id="skills" title="Skills & Neural Stack" icon={Cpu}>
              <PlaceholderApp
                title="Skills"
                phaseNote="Skills — Coming in Phase 4"
                icon={Cpu}
              />
            </Window>

            <Window id="education" title="Education" icon={GraduationCap}>
              <PlaceholderApp
                title="Education"
                phaseNote="Education — Coming in Phase 5"
                icon={GraduationCap}
              />
            </Window>

            <Window id="achievements" title="Achievements" icon={Award}>
              <PlaceholderApp
                title="Achievements"
                phaseNote="Achievements — Coming in Phase 5"
                icon={Award}
              />
            </Window>

            <Window id="contact" title="Contact" icon={Mail}>
              <PlaceholderApp
                title="Contact"
                phaseNote="Contact — Coming in Phase 6"
                icon={Mail}
              />
            </Window>
          </Desktop>
        </div>

        {/* Bottom macOS Dock */}
        <Dock />

        {/* Desktop Context Menu */}
        <ContextMenu />
      </motion.div>
    </div>
  )
}
