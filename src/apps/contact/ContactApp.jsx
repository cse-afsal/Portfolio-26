import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Send,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, KaggleIcon } from '../../components/BrandIcons'
import contactData from '../../data/contact.json'
import useOSStore from '../../store/useOSStore'
import { playClickSound } from '../../utils/sound'

const CHANNEL_ICONS = {
  email: Mail,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  kaggle: KaggleIcon,
  twitter: MessageSquare,
}

export default function ContactApp() {
  const notify = useOSStore((s) => s.notify)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sendingState, setSendingState] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMessage, setErrorMessage] = useState(null)

  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

  const handleLinkClick = (link) => {
    playClickSound()
    if (link.id === 'github' || link.name?.toLowerCase().includes('github')) {
      notify('Opening GitHub in a new tab...')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    playClickSound()
    setSendingState('sending')
    setErrorMessage(null)

    if (formspreeEndpoint) {
      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          setSendingState('sent')
          notify('Message transmitted to Afsal successfully!')
        } else {
          const errData = await response.json().catch(() => ({}))
          throw new Error(
            errData.error || 'Endpoint responded with an error.'
          )
        }
      } catch (err) {
        setSendingState('error')
        setErrorMessage(
          err.message ||
            'Failed to dispatch transmission. Please retry or contact directly via email.'
        )
        notify('Transmission error. Check details in Mail.', 'error')
      }
    } else {
      // Demo simulation mode when no endpoint is configured
      setTimeout(() => {
        setSendingState('sent')
        notify(
          'Demo mode: Message simulated successfully! Set VITE_FORMSPREE_ENDPOINT in .env for live messages.'
        )
      }, 1400)
    }
  }

  const handleReset = () => {
    playClickSound()
    setFormData({ name: '', email: '', subject: '', message: '' })
    setSendingState('idle')
    setErrorMessage(null)
  }

  return (
    <div className="w-full h-full overflow-y-auto p-5 md:p-8 text-[#e8e8f0] font-sans select-none flex flex-col justify-between">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: Contact Card (5 cols on lg) */}
        <div className="lg:col-span-5 bg-[#141418]/90 border border-white/8 rounded-2xl p-6 shadow-xl space-y-5">
          {/* Avatar & Info */}
          <div className="flex items-center gap-4 pb-4 border-b border-white/8">
            <div className="relative group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e2840] to-[#121624] border-2 border-[#4f9eff]/40 flex items-center justify-center text-lg font-bold font-mono text-[#4f9eff] shadow-xl glow-accent-subtle">
                {contactData.initials || 'AM'}
              </div>
              <div className="absolute inset-0 rounded-full bg-[#4f9eff]/15 blur-lg pointer-events-none" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {contactData.name || 'Afsal'}
              </h2>
              <p className="text-xs text-[#4f9eff] font-medium mt-0.5">
                {contactData.role || 'AI/ML Engineer'}
              </p>
              <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{contactData.status || 'Available for inquiries'}</span>
              </div>
            </div>
          </div>

          {/* List of Contact Methods */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#606070] mb-1 flex items-center justify-between">
              <span>Direct Channels</span>
              <span className="text-[9px] text-[#4f9eff] font-mono flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Verified
              </span>
            </div>

            {(contactData.links || []).map((link) => {
              const Icon = CHANNEL_ICONS[link.id] || ExternalLink
              return (
                <a
                  key={link.id || link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link)}
                  className="w-full p-2.5 rounded-xl bg-[#1e1e24]/70 hover:bg-[#1e1e24] border border-white/5 hover:border-[#4f9eff]/40 text-[#c8c8d8] hover:text-white flex items-center justify-between transition-all group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#141418] border border-white/10 flex items-center justify-center text-[#4f9eff] group-hover:scale-105 transition-transform shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        {link.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#6b6b80] truncate">
                        {link.handle}
                      </div>
                    </div>
                  </div>

                  <ExternalLink className="w-3.5 h-3.5 text-[#6b6b80] group-hover:text-[#4f9eff] shrink-0" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Right Panel: Send a Message Form (7 cols on lg) */}
        <div className="lg:col-span-7 bg-[#141418]/90 border border-white/8 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/8 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#4f9eff]" />
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  Send a Message
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#8e8ea0]">
                {formspreeEndpoint ? '🟢 Live API Active' : '⚪ Demo Mode (Simulated)'}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {sendingState === 'idle' && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-3.5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-[#8e8ea0] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Alex Vance"
                        className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#8e8ea0] mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="alex@domain.com"
                        className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8e8ea0] mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Opportunity / Collaboration / Inquiry"
                      className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8e8ea0] mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Write your message here..."
                      className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-[#505060] focus:outline-none focus:border-[#4f9eff] transition-colors resize-none font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#4f9eff] hover:bg-[#3d8ef5] text-black font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </motion.form>
              )}

              {sendingState === 'sending' && (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-16 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#4f9eff] border-t-transparent animate-spin" />
                  <div className="text-xs font-mono text-[#a0a0b0]">
                    Dispatching transmission via mail client...
                  </div>
                  {/* Fake sending progress bar */}
                  <div className="w-56 h-1.5 bg-[#1e1e24] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.4, ease: 'easeInOut' }}
                      className="h-full bg-[#4f9eff]"
                    />
                  </div>
                </motion.div>
              )}

              {sendingState === 'sent' && (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-xl">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-[#a0a0b0] max-w-sm">
                      Message sent! Afsal will get back to you soon.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#1e1e24] hover:bg-[#282834] border border-white/10 text-xs font-mono text-white flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#4f9eff]" />
                    <span>Send Another Message</span>
                  </button>
                </motion.div>
              )}

              {sendingState === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-400 flex items-center justify-center shadow-xl">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      Transmission Failed
                    </h4>
                    <p className="text-xs text-rose-300 max-w-sm font-mono">
                      {errorMessage ||
                        'Unable to reach service. Please verify endpoint configuration.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSendingState('idle')}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#1e1e24] hover:bg-[#282834] border border-white/10 text-xs font-mono text-white flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#4f9eff]" />
                    <span>Retry Sending</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
