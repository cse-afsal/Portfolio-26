import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Mail, Sparkles, FolderGit2, AlertCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../../components/BrandIcons'
import aboutData from '../../data/about.json'
import { playClickSound } from '../../utils/sound'

export default function AboutApp() {
  const [toastMessage, setToastMessage] = useState(null)

  const handleResumeClick = () => {
    playClickSound()
    setToastMessage('Resume coming soon')
    setTimeout(() => setToastMessage(null), 3000)
  }

  return (
    <div className="w-full h-full overflow-y-auto p-6 md:p-8 text-[#e8e8f0] font-sans relative">
      {/* Toast Notification for Fake Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-[#1e1e24] border border-[#4f9eff]/40 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-mono text-[#e8e8f0]"
          >
            <AlertCircle className="w-4 h-4 text-[#4f9eff]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column (30% on md: 4 cols) */}
        <div className="md:col-span-4 bg-[#141418]/80 border border-white/8 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 shadow-xl">
          {/* Circular Avatar Placeholder */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1e2840] to-[#121624] border-2 border-[#4f9eff]/40 flex items-center justify-center text-2xl font-bold font-mono text-[#4f9eff] shadow-2xl glow-accent-subtle group-hover:scale-105 transition-transform">
              {aboutData.initials || 'AM'}
            </div>
            <div className="absolute inset-0 rounded-full bg-[#4f9eff]/10 blur-xl pointer-events-none" />
          </div>

          {/* Name & Title */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
              {aboutData.name}
            </h1>
            <p className="text-xs text-[#4f9eff] font-medium mt-1 leading-relaxed">
              {aboutData.title}
            </p>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181822] border border-emerald-500/30 text-[11px] font-medium text-emerald-400">
            <span>{aboutData.status || '🟢 Open to Opportunities'}</span>
          </div>

          {/* Quick-Link Icon Buttons */}
          <div className="flex items-center justify-center gap-2.5 pt-2">
            {aboutData.socialLinks?.github && (
              <a
                href={aboutData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                title="GitHub Profile"
                className="w-9 h-9 rounded-xl bg-[#1e1e24] hover:bg-[#282834] border border-white/10 hover:border-[#4f9eff]/40 text-[#8e8ea0] hover:text-[#4f9eff] flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}

            {aboutData.socialLinks?.linkedin && (
              <a
                href={aboutData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                title="LinkedIn Profile"
                className="w-9 h-9 rounded-xl bg-[#1e1e24] hover:bg-[#282834] border border-white/10 hover:border-[#4f9eff]/40 text-[#8e8ea0] hover:text-[#4f9eff] flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}

            {aboutData.socialLinks?.email && (
              <a
                href={aboutData.socialLinks.email}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                title="Send Email"
                className="w-9 h-9 rounded-xl bg-[#1e1e24] hover:bg-[#282834] border border-white/10 hover:border-[#4f9eff]/40 text-[#8e8ea0] hover:text-[#4f9eff] flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Download Resume Button */}
          <button
            onClick={handleResumeClick}
            className="w-full py-2.5 px-4 rounded-xl bg-[#4f9eff] hover:bg-[#3d8ef5] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Right Column (70% on md: 8 cols) */}
        <div className="md:col-span-8 space-y-6">
          {/* Bio Paragraph */}
          <div className="bg-[#141418]/80 border border-white/8 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#6b6b80] mb-2">
              Biography
            </h2>
            <p className="text-sm text-[#c8c8d8] leading-relaxed">
              {aboutData.bio}
            </p>
          </div>

          {/* Three Stat Cards in a Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#141418]/80 border border-white/8 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
              <span className="text-[11px] font-mono text-[#6b6b80] uppercase tracking-wider">
                Projects Completed
              </span>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                {aboutData.stats?.projectsCompleted || '12+'}
              </div>
            </div>

            <div className="bg-[#141418]/80 border border-white/8 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
              <span className="text-[11px] font-mono text-[#6b6b80] uppercase tracking-wider">
                Technologies
              </span>
              <div className="text-2xl font-bold font-mono text-[#4f9eff] mt-1">
                {aboutData.stats?.technologies || '18+'}
              </div>
            </div>

            <div className="bg-[#141418]/80 border border-white/8 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
              <span className="text-[11px] font-mono text-[#6b6b80] uppercase tracking-wider">
                Currently Learning
              </span>
              <div className="text-sm font-semibold text-emerald-400 mt-2 truncate">
                {aboutData.stats?.currentlyLearning || 'Diffusion Models'}
              </div>
            </div>
          </div>

          {/* Currently Working On Section */}
          <div className="bg-[#141418]/80 border border-white/8 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#4f9eff]" />
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#8e8ea0]">
                Currently Working On
              </h2>
            </div>

            <div className="space-y-2.5">
              {(aboutData.currentlyWorkingOn || []).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#1e1e24]/70 border border-white/5 rounded-xl p-3.5 hover:border-[#4f9eff]/30 transition-colors"
                >
                  <div className="text-xs font-semibold text-white tracking-tight">
                    {item.name}
                  </div>
                  <p className="text-[11px] text-[#8e8ea0] mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interests Section */}
          <div className="bg-[#141418]/80 border border-white/8 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4f9eff]" />
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#8e8ea0]">
                Areas of Interest
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {(aboutData.interests || []).map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-[#1e1e24] text-[#d0d0e0] border border-white/10 hover:border-[#4f9eff]/40 hover:text-[#4f9eff] transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
