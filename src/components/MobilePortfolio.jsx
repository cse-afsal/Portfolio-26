import { useState } from 'react'
import {
  Download,
  ExternalLink,
  Monitor,
  GraduationCap,
  Award,
  Layers,
  Cpu,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, KaggleIcon } from './BrandIcons'
import aboutData from '../data/about.json'
import projectsData from '../data/projects.json'
import skillsData from '../data/skills.json'
import educationData from '../data/education.json'
import achievementsData from '../data/achievements.json'
import contactData from '../data/contact.json'

const CHANNEL_ICONS = {
  email: Mail,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  kaggle: KaggleIcon,
}

export default function MobilePortfolio({ onSwitchToDesktop }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const [formError, setFormError] = useState(null)

  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setFormError(null)

    if (formspreeEndpoint) {
      try {
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        })
        if (res.ok) {
          setFormStatus('sent')
        } else {
          const err = await res.json().catch(() => ({}))
          throw new Error(err.error || 'Failed to deliver message.')
        }
      } catch (err) {
        setFormStatus('error')
        setFormError(err.message || 'Network transmission error.')
      }
    } else {
      setTimeout(() => {
        setFormStatus('sent')
      }, 1200)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0d0d0f] text-[#e8e8f0] font-sans overflow-x-hidden selection:bg-[#4f9eff] selection:text-black">
      {/* 1. Desktop Experience Recommendation Banner */}
      <div className="sticky top-0 z-50 bg-[#141418]/95 backdrop-blur-md border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2 text-[#a0a0b0] truncate">
          <Monitor className="w-3.5 h-3.5 text-[#4f9eff] shrink-0" />
          <span className="truncate">Full experience available on desktop</span>
        </div>
        <button
          onClick={onSwitchToDesktop}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-[#4f9eff]/15 hover:bg-[#4f9eff]/25 border border-[#4f9eff]/40 text-[#4f9eff] text-[11px] font-mono font-medium transition-colors"
        >
          Desktop OS
        </button>
      </div>

      <main className="max-w-xl mx-auto px-4 py-8 space-y-10">
        {/* 2. Hero Profile Card */}
        <section className="bg-[#141418] border border-white/8 rounded-3xl p-6 text-center space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#4f9eff]/10 blur-2xl pointer-events-none rounded-full" />

          {/* Avatar */}
          <div className="relative inline-block mx-auto">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1e2840] to-[#121624] border-2 border-[#4f9eff]/40 flex items-center justify-center text-xl font-bold font-mono text-[#4f9eff] shadow-xl">
              {aboutData.initials || 'AM'}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {aboutData.name}
            </h1>
            <p className="text-xs text-[#4f9eff] font-medium mt-1 leading-relaxed">
              {aboutData.title}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181822] border border-emerald-500/30 text-[11px] font-medium text-emerald-400">
            <span>{aboutData.status || '🟢 Open to Opportunities'}</span>
          </div>

          {/* Bio text */}
          <p className="text-xs text-[#a0a0b0] leading-relaxed pt-1">
            {aboutData.bio}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {aboutData.socialLinks?.github && (
              <a
                href={aboutData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-9 h-9 rounded-xl bg-[#1e1e24] border border-white/10 text-[#8e8ea0] hover:text-[#4f9eff] flex items-center justify-center transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {aboutData.socialLinks?.linkedin && (
              <a
                href={aboutData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-9 h-9 rounded-xl bg-[#1e1e24] border border-white/10 text-[#8e8ea0] hover:text-[#4f9eff] flex items-center justify-center transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {aboutData.socialLinks?.kaggle && (
              <a
                href={aboutData.socialLinks.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                title="Kaggle"
                className="w-9 h-9 rounded-xl bg-[#1e1e24] border border-white/10 text-[#8e8ea0] hover:text-[#4f9eff] flex items-center justify-center transition-colors"
              >
                <KaggleIcon className="w-4 h-4" />
              </a>
            )}
            {aboutData.socialLinks?.email && (
              <a
                href={aboutData.socialLinks.email}
                title="Email"
                className="w-9 h-9 rounded-xl bg-[#1e1e24] border border-white/10 text-[#8e8ea0] hover:text-[#4f9eff] flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Resume Download Button */}
          <div className="pt-2">
            <a
              href="/resume.pdf"
              download="Afsal_Resume.pdf"
              className="w-full py-2.5 px-4 rounded-xl bg-[#4f9eff] hover:bg-[#3d8ef5] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 no-underline"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </section>

        {/* 3. Stats Section */}
        <section className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#141418] border border-white/8 rounded-2xl p-3 text-center">
            <div className="text-[10px] font-mono text-[#6b6b80] uppercase">
              Projects
            </div>
            <div className="text-xl font-bold font-mono text-white mt-1">
              {aboutData.stats?.projectsCompleted || '12+'}
            </div>
          </div>
          <div className="bg-[#141418] border border-white/8 rounded-2xl p-3 text-center">
            <div className="text-[10px] font-mono text-[#6b6b80] uppercase">
              Tech Stack
            </div>
            <div className="text-xl font-bold font-mono text-[#4f9eff] mt-1">
              {aboutData.stats?.technologies || '24+'}
            </div>
          </div>
          <div className="bg-[#141418] border border-white/8 rounded-2xl p-3 text-center">
            <div className="text-[10px] font-mono text-[#6b6b80] uppercase">
              Status
            </div>
            <div className="text-xs font-semibold font-mono text-emerald-400 mt-2 truncate">
              Available
            </div>
          </div>
        </section>

        {/* 4. Projects Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/8">
            <Layers className="w-4 h-4 text-[#4f9eff]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Featured Projects
            </h2>
          </div>

          <div className="space-y-3">
            {(projectsData.projects || []).map((project) => (
              <div
                key={project.id}
                className="bg-[#141418] border border-white/8 rounded-2xl p-4 space-y-2.5 shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {project.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e1e24] text-[#4f9eff] shrink-0 border border-white/5">
                    {project.category}
                  </span>
                </div>

                <p className="text-xs text-[#a0a0b0] leading-relaxed">
                  {project.shortDescription || project.fullDescription}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(project.technologies || []).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#1e1e24] text-[10px] font-mono text-[#c8c8d8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#4f9eff] hover:underline flex items-center gap-1"
                    >
                      <GithubIcon className="w-3 h-3" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Skills Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/8">
            <Cpu className="w-4 h-4 text-[#4f9eff]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Technical Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(skillsData.categories || {}).map(
              ([categoryName, skillsList]) => (
                <div
                  key={categoryName}
                  className="bg-[#141418] border border-white/8 rounded-2xl p-4 space-y-2.5"
                >
                  <h3 className="text-xs font-mono text-[#4f9eff] uppercase tracking-wider font-semibold">
                    {categoryName}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#1e1e24] border border-white/5 text-[11px] font-mono text-[#d8d8e8]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* 6. Education Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/8">
            <GraduationCap className="w-4 h-4 text-[#4f9eff]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Education & Certifications
            </h2>
          </div>

          <div className="space-y-3">
            {(educationData.education || []).map((edu, idx) => (
              <div
                key={idx}
                className="bg-[#141418] border border-white/8 rounded-2xl p-4 space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-bold text-white">
                    {edu.institution}
                  </h3>
                  <span className="text-[10px] font-mono text-[#4f9eff] shrink-0">
                    {edu.yearRange || edu.period}
                  </span>
                </div>
                <div className="text-xs text-[#4f9eff] font-medium">
                  {edu.degree}
                </div>
                <p className="text-xs text-[#8e8ea0] leading-relaxed pt-1">
                  {edu.details || edu.description}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications preview */}
          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-mono uppercase text-[#6b6b80]">
              Certificates
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(educationData.certifications || []).slice(0, 4).map((cert) => (
                <div
                  key={cert.id}
                  className="bg-[#141418] border border-white/5 rounded-xl p-3 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white truncate">
                      {cert.name}
                    </div>
                    <div className="text-[10px] text-[#8e8ea0]">
                      {cert.issuer} • {cert.year}
                    </div>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4f9eff] hover:text-white shrink-0 p-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Achievements Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/8">
            <Award className="w-4 h-4 text-[#4f9eff]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Achievements & Honors
            </h2>
          </div>

          <div className="space-y-2.5">
            {(achievementsData.achievements || []).map((ach) => (
              <div
                key={ach.id}
                className="bg-[#141418] border border-white/8 rounded-2xl p-4 space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold text-white">
                    {ach.title}
                  </h3>
                  <span className="text-[10px] font-mono text-[#4f9eff]">
                    {ach.year}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#8e8ea0]">
                  {ach.organization}
                </div>
                <p className="text-xs text-[#a0a0b0] leading-relaxed pt-0.5">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Contact Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-white/8">
            <Mail className="w-4 h-4 text-[#4f9eff]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in Touch
            </h2>
          </div>

          {/* Direct channels */}
          <div className="space-y-2">
            {(contactData.links || []).map((link) => {
              const Icon = CHANNEL_ICONS[link.id] || ExternalLink
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#141418] border border-white/8 rounded-2xl p-3 flex items-center justify-between hover:border-[#4f9eff]/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1e1e24] flex items-center justify-center text-[#4f9eff]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {link.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#8e8ea0]">
                        {link.handle}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6b6b80]" />
                </a>
              )
            })}
          </div>

          {/* Mobile Message Form */}
          <div className="bg-[#141418] border border-white/8 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-semibold text-white">
              Send a Quick Message
            </h3>

            {formStatus === 'sent' ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-white">
                  Message Sent!
                </div>
                <p className="text-[11px] text-[#8e8ea0]">
                  Afsal will get back to you shortly.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="text-xs text-[#4f9eff] font-mono underline pt-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] font-mono"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] font-mono"
                />
                <input
                  type="text"
                  required
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] font-mono"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] resize-none font-mono"
                />

                {formStatus === 'error' && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formError || 'Failed to send message.'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full py-2.5 rounded-xl bg-[#4f9eff] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-white/5 space-y-2 text-[#6b6b80] text-[11px] font-mono">
          <div>AFSAL OS • Portfolio Edition</div>
          <div>Built with React, Vite & Tailwind CSS</div>
          <div>
            <button
              onClick={onSwitchToDesktop}
              className="text-[#4f9eff] hover:underline"
            >
              Launch Desktop OS Mode
            </button>
          </div>
        </footer>
      </main>
    </div>
  )
}
