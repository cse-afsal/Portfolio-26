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
import TerminalApp from './apps/terminal/TerminalApp'
import AboutApp from './apps/about/AboutApp'
import FinderApp from './apps/finder/FinderApp'
import SkillsApp from './apps/skills/SkillsApp'
import EducationApp from './apps/education/EducationApp'
import AchievementsApp from './apps/achievements/AchievementsApp'

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
              <TerminalApp />
            </Window>

            <Window id="about" title="About Me" icon={User}>
              <AboutApp />
            </Window>

            <Window id="finder" title="Finder — Projects" icon={FolderTree}>
              <FinderApp />
            </Window>

            <Window id="projects" title="Projects" icon={Layers}>
              <PlaceholderApp
                title="Projects"
                phaseNote="Projects — Coming in Phase 4"
                icon={Layers}
              />
            </Window>

            <Window id="skills" title="Skills.exe" icon={Cpu}>
              <SkillsApp />
            </Window>

            <Window id="education" title="Education" icon={GraduationCap}>
              <EducationApp />
            </Window>

            <Window id="achievements" title="Achievements" icon={Award}>
              <AchievementsApp />
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
