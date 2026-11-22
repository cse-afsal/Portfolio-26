import { create } from 'zustand'

export const WALLPAPERS = [
  {
    id: 'neural_mesh',
    name: 'Neural Mesh',
    bg: '#09090c',
    gradient: 'radial-gradient(circle at 50% 35%, #141724 0%, #0c0d12 60%, #070709 100%)',
    particleColor: 'rgba(79, 158, 255, 0.4)',
  },
  {
    id: 'deep_midnight',
    name: 'Deep Midnight',
    bg: '#060608',
    gradient: 'linear-gradient(135deg, #0f111a 0%, #090a10 50%, #040507 100%)',
    particleColor: 'rgba(129, 140, 248, 0.35)',
  },
  {
    id: 'cyber_glow',
    name: 'Cyber Blue Glow',
    bg: '#080a10',
    gradient: 'radial-gradient(ellipse at 80% 20%, #162444 0%, #0c101c 55%, #05070c 100%)',
    particleColor: 'rgba(56, 189, 248, 0.45)',
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

const useOSStore = create((set, get) => ({
  // Boot state
  isBooted: false,
  setBooted: (val) => set({ isBooted: val }),

  // Windows state map
  windows: {
    terminal: { ...APP_CONFIGS.terminal, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    about: { ...APP_CONFIGS.about, isOpen: true, isMinimized: false, isMaximized: false, zIndex: 12 },
    finder: { ...APP_CONFIGS.finder, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    skills: { ...APP_CONFIGS.skills, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    education: { ...APP_CONFIGS.education, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    achievements: { ...APP_CONFIGS.achievements, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    contact: { ...APP_CONFIGS.contact, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    readme: { ...APP_CONFIGS.readme, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  },
  activeAppId: 'about',
  highestZIndex: 12,
  bouncingAppId: null,

  // Wallpaper cycle state
  wallpaperIndex: 0,
  cycleWallpaper: () => {
    const { wallpaperIndex, notify } = get()
    const nextIdx = (wallpaperIndex + 1) % WALLPAPERS.length
    set({ wallpaperIndex: nextIdx })
    notify(`Wallpaper set to: ${WALLPAPERS[nextIdx].name}`)
  },

  // Audio state
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

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

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      get().dismissNotification(id)
    }, 3000)
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

    set({
      windows: {
        ...windows,
        [appId]: {
          ...target,
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
        },
      },
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

    set({
      windows: {
        ...windows,
        [appId]: {
          ...windows[appId],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        },
      },
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
