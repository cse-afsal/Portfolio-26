import { create } from 'zustand'

export const WALLPAPERS = [
  {
    id: 'neural_particles',
    name: 'Particle Field',
    bg: '#09090c',
    description: 'Slow-moving particle field (Default)',
    particleColor: 'rgba(79, 158, 255, 0.4)',
  },
  {
    id: 'animated_gradient',
    name: 'Cosmic Gradient',
    bg: '#070a14',
    description: 'Subtle animated gradient (Deep blue to dark purple)',
    particleColor: 'rgba(168, 85, 247, 0.35)',
  },
  {
    id: 'geometric_pattern',
    name: 'Static Geometric',
    bg: '#08080c',
    description: 'Minimalist static dark geometric pattern',
    particleColor: 'rgba(255, 255, 255, 0.1)',
  },
]

export const APP_CONFIGS = {
  terminal: {
    id: 'terminal',
    title: 'Terminal — zsh',
    name: 'Terminal',
    iconName: 'Terminal',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 100, y: 70 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Interactive Shell',
  },
  about: {
    id: 'about',
    title: 'About Me',
    name: 'About Me',
    iconName: 'User',
    defaultSize: { width: 760, height: 500 },
    defaultPosition: { x: 140, y: 75 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Profile & Background',
  },
  finder: {
    id: 'finder',
    title: 'Finder — Projects',
    name: 'Finder',
    iconName: 'FolderTree',
    defaultSize: { width: 780, height: 520 },
    defaultPosition: { x: 120, y: 70 },
    minSize: { width: 450, height: 320 },
    phaseNote: 'Project Browser',
  },
  skills: {
    id: 'skills',
    title: 'Skills.exe',
    name: 'Skills',
    iconName: 'Cpu',
    defaultSize: { width: 740, height: 500 },
    defaultPosition: { x: 200, y: 75 },
    minSize: { width: 420, height: 320 },
    phaseNote: 'Technical Stack',
  },
  education: {
    id: 'education',
    title: 'Education',
    name: 'Education',
    iconName: 'GraduationCap',
    defaultSize: { width: 740, height: 500 },
    defaultPosition: { x: 160, y: 80 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Academic Background',
  },
  achievements: {
    id: 'achievements',
    title: 'Achievements',
    name: 'Achievements',
    iconName: 'Award',
    defaultSize: { width: 760, height: 510 },
    defaultPosition: { x: 180, y: 85 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Honors & Distinctions',
  },
  contact: {
    id: 'contact',
    title: 'Mail — Contact Afsal',
    name: 'Contact',
    iconName: 'Mail',
    defaultSize: { width: 740, height: 500 },
    defaultPosition: { x: 210, y: 90 },
    minSize: { width: 400, height: 320 },
    phaseNote: 'Send a Message',
  },
  readme: {
    id: 'readme',
    title: 'README.txt',
    name: 'README.txt',
    iconName: 'FileText',
    defaultSize: { width: 560, height: 420 },
    defaultPosition: { x: 160, y: 95 },
    minSize: { width: 380, height: 280 },
    phaseNote: 'Portfolio Guide',
  },
}

// LocalStorage safe access helpers
const STORAGE_KEYS = {
  WALLPAPER: 'afsal_os_wallpaper',
  SOUND: 'afsal_os_sound',
  BOOTED: 'afsal_os_booted',
  OPEN_WINDOWS: 'afsal_os_open_windows',
}

const safeGetStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const val = localStorage.getItem(key)
    if (val === null) return fallback
    return JSON.parse(val)
  } catch {
    return fallback
  }
}

const safeSetStorage = (key, value) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage quota/permission errors
  }
}

// Initial state reading from LocalStorage
const savedWallpaperIdx = safeGetStorage(STORAGE_KEYS.WALLPAPER, 0)
const validWallpaperIdx =
  typeof savedWallpaperIdx === 'number' &&
  savedWallpaperIdx >= 0 &&
  savedWallpaperIdx < WALLPAPERS.length
    ? savedWallpaperIdx
    : 0

const savedSoundEnabled = safeGetStorage(STORAGE_KEYS.SOUND, false)
const savedBooted = safeGetStorage(STORAGE_KEYS.BOOTED, false)
const savedOpenWindows = safeGetStorage(STORAGE_KEYS.OPEN_WINDOWS, ['about'])

const buildInitialWindows = () => {
  const initial = {}
  let maxZ = 10
  const openList = Array.isArray(savedOpenWindows) ? savedOpenWindows : ['about']

  Object.keys(APP_CONFIGS).forEach((appId) => {
    const isOpen = openList.includes(appId)
    const zIndex = isOpen ? ++maxZ : 1
    initial[appId] = {
      ...APP_CONFIGS[appId],
      isOpen,
      isMinimized: false,
      isMaximized: false,
      zIndex,
    }
  })

  return { windows: initial, highestZIndex: maxZ }
}

const { windows: initialWindows, highestZIndex: initialHighestZIndex } = buildInitialWindows()

const persistOpenWindows = (windows) => {
  const openIds = Object.keys(windows).filter((id) => windows[id]?.isOpen)
  safeSetStorage(STORAGE_KEYS.OPEN_WINDOWS, openIds)
}

const useOSStore = create((set, get) => ({
  // Boot state (persisted: if previously completed, skips boot sequence)
  isBooted: savedBooted === true,
  setBooted: (val) => {
    safeSetStorage(STORAGE_KEYS.BOOTED, Boolean(val))
    set({ isBooted: Boolean(val) })
  },
  resetBootState: () => {
    safeSetStorage(STORAGE_KEYS.BOOTED, false)
    set({ isBooted: false })
  },

  // Windows state map
  windows: initialWindows,
  activeAppId: savedOpenWindows?.[0] || 'about',
  highestZIndex: initialHighestZIndex,
  bouncingAppId: null,

  // Wallpaper state & cycle
  wallpaperIndex: validWallpaperIdx,
  setWallpaperIndex: (idx) => {
    safeSetStorage(STORAGE_KEYS.WALLPAPER, idx)
    set({ wallpaperIndex: idx })
  },
  cycleWallpaper: () => {
    const { wallpaperIndex, notify } = get()
    const nextIdx = (wallpaperIndex + 1) % WALLPAPERS.length
    safeSetStorage(STORAGE_KEYS.WALLPAPER, nextIdx)
    set({ wallpaperIndex: nextIdx })
    notify(`Wallpaper set to: ${WALLPAPERS[nextIdx].name}`)
  },

  // Audio state (off by default per Task 3 specification)
  soundEnabled: savedSoundEnabled === true,
  toggleSound: () =>
    set((state) => {
      const next = !state.soundEnabled
      safeSetStorage(STORAGE_KEYS.SOUND, next)
      return { soundEnabled: next }
    }),

  // Menubar & Modals state
  isSpotlightOpen: false,
  setSpotlightOpen: (val) => set({ isSpotlightOpen: val }),
  toggleSpotlight: () => set((state) => ({ isSpotlightOpen: !state.isSpotlightOpen })),

  isAboutThisOSOpen: false,
  setAboutThisOSOpen: (val) => set({ isAboutThisOSOpen: val }),

  contextMenu: { visible: false, x: 0, y: 0 },
  openContextMenu: (x, y) => set({ contextMenu: { visible: true, x, y } }),
  closeContextMenu: () => set({ contextMenu: { visible: false, x: 0, y: 0 } }),

  // System Notifications
  notifications: [],
  notify: (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6)
    const newNotif = { id, message, type }
    set((state) => ({
      notifications: [...state.notifications, newNotif],
    }))

    // Auto dismiss after 3.2 seconds
    setTimeout(() => {
      get().dismissNotification(id)
    }, 3200)
  },
  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }))
  },

  // Window Actions
  openApp: (appId) => {
    const { windows, highestZIndex } = get()
    const target = windows[appId] || APP_CONFIGS[appId]
    if (!target) return

    const newZ = highestZIndex + 1
    const nextWindows = {
      ...windows,
      [appId]: {
        ...target,
        isOpen: true,
        isMinimized: false,
        zIndex: newZ,
      },
    }

    persistOpenWindows(nextWindows)

    set({
      windows: nextWindows,
      activeAppId: appId,
      highestZIndex: newZ,
      bouncingAppId: null,
      isSpotlightOpen: false,
      contextMenu: { visible: false, x: 0, y: 0 },
    })
  },

  closeApp: (appId) => {
    const { windows } = get()
    if (!windows[appId]) return

    const nextWindows = {
      ...windows,
      [appId]: {
        ...windows[appId],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }

    persistOpenWindows(nextWindows)

    set({
      windows: nextWindows,
      activeAppId: get().activeAppId === appId ? null : get().activeAppId,
    })
  },

  minimizeApp: (appId) => {
    const { windows } = get()
    if (!windows[appId]) return

    set({
      windows: {
        ...windows,
        [appId]: {
          ...windows[appId],
          isMinimized: true,
        },
      },
      activeAppId: get().activeAppId === appId ? null : get().activeAppId,
      bouncingAppId: appId,
    })

    setTimeout(() => {
      if (get().bouncingAppId === appId) {
        set({ bouncingAppId: null })
      }
    }, 1200)
  },

  toggleMaximizeApp: (appId) => {
    const { windows } = get()
    if (!windows[appId]) return

    set({
      windows: {
        ...windows,
        [appId]: {
          ...windows[appId],
          isMaximized: !windows[appId].isMaximized,
        },
      },
      activeAppId: appId,
    })
  },

  focusApp: (appId) => {
    const { windows, highestZIndex } = get()
    if (!windows[appId]) return

    const newZ = highestZIndex + 1
    set({
      windows: {
        ...windows,
        [appId]: {
          ...windows[appId],
          isMinimized: false,
          zIndex: newZ,
        },
      },
      activeAppId: appId,
      highestZIndex: newZ,
      contextMenu: { visible: false, x: 0, y: 0 },
    })
  },

  updateWindowPosition: (appId, pos) => {
    const { windows } = get()
    if (!windows[appId]) return

    set({
      windows: {
        ...windows,
        [appId]: {
          ...windows[appId],
          position: pos,
        },
      },
    })
  },
}))

export default useOSStore
