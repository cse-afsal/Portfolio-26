import { lazy, Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Terminal,
  User,
  Cpu,
  GraduationCap,
  Award,
  Mail,
  FolderTree,
  FileCode,
  Smartphone,
} from 'lucide-react'
import useOSStore from './store/useOSStore'
import BootScreen from './components/BootScreen'
import TopBar from './components/TopBar'
import Desktop from './components/Desktop'
import Dock from './components/Dock'
import Window from './components/Window'
import ContextMenu from './components/ContextMenu'
import Notifications from './components/Notifications'
import SpotlightSearch from './components/SpotlightSearch'
import AboutThisOSModal from './components/AboutThisOSModal'
import MobilePortfolio from './components/MobilePortfolio'

// Lazy-loaded App Chunks for optimum performance
const TerminalApp = lazy(() => import('./apps/terminal/TerminalApp'))
const AboutApp = lazy(() => import('./apps/about/AboutApp'))
const FinderApp = lazy(() => import('./apps/finder/FinderApp'))
const SkillsApp = lazy(() => import('./apps/skills/SkillsApp'))
const EducationApp = lazy(() => import('./apps/education/EducationApp'))
const AchievementsApp = lazy(() => import('./apps/achievements/AchievementsApp'))
const ContactApp = lazy(() => import('./apps/contact/ContactApp'))
const ReadmeViewer = lazy(() => import('./components/ReadmeViewer'))

function WindowLoader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-3 font-mono text-xs text-[#8e8ea0] select-none">
      <div className="w-6 h-6 rounded-full border-2 border-[#4f9eff] border-t-transparent animate-spin" />
      <span>Loading application...</span>
    </div>
  )
}

export default function App() {
  const isBooted = useOSStore((s) => s.isBooted)
  const setBooted = useOSStore((s) => s.setBooted)

  const [isMobileScreen, setIsMobileScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  const [forceDesktop, setForceDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // If on mobile viewport and user has not chosen desktop view, render mobile layout
  if (isMobileScreen && !forceDesktop) {
    return <MobilePortfolio onSwitchToDesktop={() => setForceDesktop(true)} />
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#09090c] text-[#e8e8f0] font-sans select-none flex flex-col relative">
      {/* 1. Animated Boot Sequence */}
      {!isBooted && (
        <BootScreen onBootComplete={() => setBooted(true)} />
      )}

      {/* Floating Toggle on Mobile if user is currently in Forced Desktop mode */}
      {isMobileScreen && forceDesktop && (
        <button
          onClick={() => setForceDesktop(false)}
          className="fixed bottom-20 left-4 z-50 px-3 py-1.5 rounded-full bg-[#1e1e24]/90 backdrop-blur-md border border-[#4f9eff]/40 text-[#4f9eff] text-xs font-mono shadow-2xl flex items-center gap-1.5 cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile View</span>
        </button>
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
            {/* Windows Layer with Lazy Loading */}
            <Window id="terminal" title="Terminal — zsh" icon={Terminal}>
              <Suspense fallback={<WindowLoader />}>
                <TerminalApp />
              </Suspense>
            </Window>

            <Window id="about" title="About Me" icon={User}>
              <Suspense fallback={<WindowLoader />}>
                <AboutApp />
              </Suspense>
            </Window>

            <Window id="finder" title="Finder — Projects" icon={FolderTree}>
              <Suspense fallback={<WindowLoader />}>
                <FinderApp />
              </Suspense>
            </Window>

            <Window id="skills" title="Skills.exe" icon={Cpu}>
              <Suspense fallback={<WindowLoader />}>
                <SkillsApp />
              </Suspense>
            </Window>

            <Window id="education" title="Education" icon={GraduationCap}>
              <Suspense fallback={<WindowLoader />}>
                <EducationApp />
              </Suspense>
            </Window>

            <Window id="achievements" title="Achievements" icon={Award}>
              <Suspense fallback={<WindowLoader />}>
                <AchievementsApp />
              </Suspense>
            </Window>

            <Window id="contact" title="Mail — Contact Afsal" icon={Mail}>
              <Suspense fallback={<WindowLoader />}>
                <ContactApp />
              </Suspense>
            </Window>

            <Window id="readme" title="README.txt" icon={FileCode}>
              <Suspense fallback={<WindowLoader />}>
                <ReadmeViewer />
              </Suspense>
            </Window>
          </Desktop>
        </div>

        {/* Bottom macOS Dock */}
        <Dock />

        {/* Desktop Context Menu */}
        <ContextMenu />

        {/* System Notifications Overlay */}
        <Notifications />

        {/* Spotlight Search Overlay */}
        <SpotlightSearch />

        {/* About This OS Mini Window */}
        <AboutThisOSModal />
      </motion.div>
    </div>
  )
}
