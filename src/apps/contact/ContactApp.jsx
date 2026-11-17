import { useState } from 'react'
import {
  Mail,
  Send,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, KaggleIcon } from '../../components/BrandIcons'
import contactData from '../../data/contact.json'
import profileData from '../../data/profile.json'
import { playClickSound } from '../../utils/sound'

const CHANNEL_ICONS = {
  email: Mail,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  kaggle: KaggleIcon,
  twitter: MessageSquare,
}

export default function ContactApp() {
  const [copiedKey, setCopiedKey] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sentStatus, setSentStatus] = useState(false)

  const handleCopy = (text, key) => {
    playClickSound()
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    playClickSound()
    const mailtoUrl = `mailto:${contactData.personal.email}?subject=${encodeURIComponent(
      formData.subject || 'Portfolio Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`
    window.location.href = mailtoUrl
    setSentStatus(true)
    setTimeout(() => setSentStatus(false), 4000)
  }

  return (
    <div className="p-6 md:p-8 space-y-6 text-[#e8e8f0] font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Connect & Inquiries</h1>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open for Internships
            </span>
          </div>
          <p className="text-xs text-[#6b6b80] mt-1 max-w-xl">
            Direct channel for AI/ML engineering roles, deep learning research collaborations, and open-source inquiries.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#8e8ea0]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#4f9eff]" />
            <span>{contactData.personal.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#4f9eff]" />
            <span>{contactData.personal.responseTime}</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Message Dispatcher (7 cols) */}
        <div className="lg:col-span-7 bg-[#141418] border border-white/8 rounded-2xl p-5 md:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#4f9eff]" />
                Dispatch Direct Transmission
              </h2>
              <span className="text-[10px] font-mono text-[#6b6b80]">Encrypted Client-Side</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#8e8ea0] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#8e8ea0] mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#8e8ea0] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="AI/ML Internship / Collaboration / Question"
                  className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#8e8ea0] mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message or project opportunity details here..."
                  className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-[#6b6b80] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Routes via native OS mail handler
                </span>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#4f9eff] hover:bg-[#3d8ef5] text-black font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </div>

              {sentStatus && (
                <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs text-center animate-fade-in font-mono">
                  Mail protocol triggered. Opening email client...
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right: Verified Communication Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-semibold text-white tracking-tight mb-2">
            Verified Profiles & Channels
          </h2>

          {contactData.links.map((ch) => {
            const Icon = CHANNEL_ICONS[ch.id] || ExternalLink
            const isCopied = copiedKey === ch.id

            return (
              <div
                key={ch.id}
                className="bg-[#141418] hover:bg-[#181822] border border-white/8 hover:border-white/15 rounded-xl p-3.5 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#1e1e24] border border-white/10 flex items-center justify-center text-[#4f9eff] group-hover:scale-105 transition-transform shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white truncate">{ch.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-[#8e8ea0]">
                        {ch.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6b6b80] font-mono truncate">{ch.handle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    onClick={() => handleCopy(ch.handle, ch.id)}
                    title="Copy to clipboard"
                    className="p-1.5 rounded-lg bg-[#1e1e24] hover:bg-[#282834] text-[#8e8ea0] hover:text-white transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    title="Open external link"
                    className="p-1.5 rounded-lg bg-[#1e1e24] hover:bg-[#282834] text-[#8e8ea0] hover:text-[#4f9eff] transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )
          })}

          {/* Direct Resume CTA */}
          <div className="pt-2">
            <a
              href={profileData.contacts.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-[#182236] to-[#121624] border border-[#4f9eff]/30 hover:border-[#4f9eff]/60 text-xs font-medium text-white flex items-center justify-between group transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4f9eff] shadow-sm shadow-[#4f9eff]" />
                <span>Full Technical Curriculum Vitae (PDF)</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#4f9eff] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
