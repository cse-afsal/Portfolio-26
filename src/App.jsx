import {
  User,
  Terminal,
  Layers,
  Cpu,
  Mail,
  Settings,
} from 'lucide-react'
import Desktop from './components/Desktop'
import TopBar from './components/TopBar'
import Dock from './components/Dock'
import ContextMenu from './components/ContextMenu'
import StartMenu from './components/StartMenu'
import ControlCenter from './components/ControlCenter'
import Window from './components/Window'

// Apps
import AboutApp from './apps/about/AboutApp'
import TerminalApp from './apps/terminal/TerminalApp'
import ProjectsApp from './apps/projects/ProjectsApp'
import SkillsApp from './apps/skills/SkillsApp'
import ContactApp from './apps/contact/ContactApp'
import SettingsApp from './apps/settings/SettingsApp'

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0d0d0f] text-[#e8e8f0] font-sans select-none flex flex-col relative">
      {/* OS Top Menu Bar (32px) */}
      <TopBar />

      {/* Interactive Desktop Canvas with Wallpaper, Grid & App Shortcuts */}
      <div className="flex-1 w-full relative overflow-hidden">
        <Desktop>
          {/* Windows Layer */}
          <Window id="about" title="About Afsal — Bio & Background" icon={User}>
            <AboutApp />
          </Window>

          <Window id="terminal" title="afsal@neural-workstation:~ (zsh)" icon={Terminal}>
            <TerminalApp />
          </Window>

          <Window id="projects" title="Deep Learning & AI Projects" icon={Layers}>
            <ProjectsApp />
          </Window>

          <Window id="skills" title="AI/ML & Deep Learning Stack" icon={Cpu}>
            <SkillsApp />
          </Window>

          <Window id="contact" title="Connect & Inquiries" icon={Mail}>
            <ContactApp />
          </Window>

          <Window id="settings" title="System Preferences" icon={Settings}>
            <SettingsApp />
          </Window>
        </Desktop>
      </div>

      {/* macOS-style Bottom Floating Frosted Glass Dock */}
      <Dock />

      {/* Floating System Modals & Overlays */}
      <ContextMenu />
      <StartMenu />
      <ControlCenter />
    </div>
  )
}
