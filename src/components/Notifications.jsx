import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Sparkles, CheckCircle2, X } from 'lucide-react'
import useOSStore from '../store/useOSStore'

export default function Notifications() {
  const notifications = useOSStore((s) => s.notifications)
  const dismissNotification = useOSStore((s) => s.dismissNotification)
  const notify = useOSStore((s) => s.notify)
  const isBooted = useOSStore((s) => s.isBooted)

  // Trigger: 10 seconds after desktop loads: "👋 Try typing 'sudo hire afsal' in the Terminal"
  useEffect(() => {
    if (!isBooted) return

    const timer = setTimeout(() => {
      notify("👋 Try typing 'sudo hire afsal' in the Terminal", 'easter_egg')
    }, 10000)

    return () => clearTimeout(timer)
  }, [isBooted, notify])

  return (
    <div className="fixed top-8 right-4 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notif) => {
          const isEasterEgg = notif.type === 'easter_egg'
          const isSuccess = notif.type === 'success'

          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`p-3.5 rounded-2xl border shadow-2xl backdrop-blur-2xl pointer-events-auto flex items-start gap-3 select-none ${
                isEasterEgg
                  ? 'bg-[#181824]/95 border-[#4f9eff]/50 shadow-[0_0_20px_rgba(79,158,255,0.25)]'
                  : isSuccess
                  ? 'bg-[#141814]/95 border-emerald-500/40'
                  : 'bg-[#141418]/95 border-white/10'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isEasterEgg
                    ? 'bg-[#4f9eff]/20 text-[#4f9eff]'
                    : isSuccess
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-white/10 text-[#4f9eff]'
                }`}
              >
                {isEasterEgg ? (
                  <Sparkles className="w-3.5 h-3.5" />
                ) : isSuccess ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Bell className="w-3.5 h-3.5" />
                )}
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <div className="text-[10px] font-mono text-[#8e8ea0] uppercase tracking-wider mb-0.5">
                  {isEasterEgg ? 'Terminal Tip' : 'System Notification'}
                </div>
                <div className="text-xs text-white leading-relaxed font-sans font-medium">
                  {notif.message}
                </div>
              </div>

              <button
                onClick={() => dismissNotification(notif.id)}
                className="text-[#6b6b80] hover:text-white transition-colors cursor-pointer p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
