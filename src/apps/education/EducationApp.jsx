import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Calendar,
  Award,
  ExternalLink,
  BookOpen,
  Info,
} from 'lucide-react'
import educationData from '../../data/education.json'
import { playClickSound } from '../../utils/sound'

export default function EducationApp() {
  const [toastMessage, setToastMessage] = useState(null)

  const timeline = educationData.timeline || educationData.education || []
  const certifications = educationData.certifications || []

  const handleCertificateClick = (certName) => {
    playClickSound()
    setToastMessage(`Certificate link for "${certName}" is a placeholder`)
    setTimeout(() => setToastMessage(null), 3000)
  }

  return (
    <div className="w-full h-full overflow-y-auto p-5 md:p-8 text-[#e8e8f0] font-sans relative select-none">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-[#1e1e24] border border-[#4f9eff]/40 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-mono text-[#e8e8f0]"
          >
            <Info className="w-4 h-4 text-[#4f9eff]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="pb-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#4f9eff]" />
            <h1 className="text-xl font-bold tracking-tight text-white font-mono">
              Academic Background
            </h1>
          </div>
          <p className="text-xs text-[#6b6b80] mt-0.5 font-mono">
            Formal engineering degree, academic coursework, and verified technical credentials.
          </p>
        </div>

        {/* Section 1: Vertical Timeline */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#8e8ea0] flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-[#4f9eff]" />
            <span>Education Timeline</span>
          </h2>

          <div className="relative pl-6 md:pl-8 space-y-8 before:absolute before:left-2.5 md:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#4f9eff] before:via-[#4f9eff]/30 before:to-transparent">
            {timeline.map((item, idx) => (
              <div key={item.id || idx} className="relative group">
                {/* Timeline Node Dot */}
                <div className="absolute -left-6 md:-left-8 top-1.5 w-5 h-5 rounded-full bg-[#141418] border-2 border-[#4f9eff] flex items-center justify-center shadow-[0_0_10px_rgba(79,158,255,0.4)] group-hover:scale-110 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4f9eff]" />
                </div>

                {/* Timeline Item Content Card */}
                <div className="bg-[#141418]/85 hover:bg-[#181820] border border-white/8 hover:border-[#4f9eff]/30 rounded-2xl p-5 md:p-6 transition-all shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                    <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                      {item.institution}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#4f9eff] bg-[#4f9eff]/10 px-2 py-0.5 rounded-md border border-[#4f9eff]/20 shrink-0">
                      <Calendar className="w-3 h-3" />
                      <span>{item.yearRange || item.period}</span>
                    </div>
                  </div>

                  <div className="text-xs md:text-sm font-semibold text-[#c8c8d8] mb-2">
                    {item.degree}
                  </div>

                  <p className="text-xs text-[#8e8ea0] leading-relaxed">
                    {item.description || item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Certifications & Workshops Grid */}
        <div className="space-y-4 pt-4 border-t border-white/8">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#4f9eff]" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#8e8ea0]">
              Certifications & Workshops
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#141418]/85 hover:bg-[#181820] border border-white/8 hover:border-white/20 rounded-xl p-4.5 transition-all flex flex-col justify-between group shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-xs font-semibold text-white tracking-tight group-hover:text-[#4f9eff] transition-colors">
                      {cert.name}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8e8ea0] shrink-0">
                      {cert.year}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6b6b80] font-mono mb-4">
                    Issuer: {cert.issuer}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-end">
                  <button
                    onClick={() => handleCertificateClick(cert.name)}
                    className="px-3 py-1.5 rounded-lg bg-[#1e1e24] hover:bg-[#282834] border border-white/10 hover:border-[#4f9eff]/30 text-[11px] font-mono text-[#8e8ea0] hover:text-[#4f9eff] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
