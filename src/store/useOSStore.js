import { create } from 'zustand'

export const APP_CONFIGS = {
  terminal: {
    id: 'terminal',
    title: 'Terminal — zsh',
    name: 'Terminal',
    iconName: 'Terminal',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 100, y: 70 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Terminal — Coming in Phase 2',
  },
  about: {
    id: 'about',
    title: 'About Me',
    name: 'About Me',
    iconName: 'User',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 140, y: 90 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'About Me — Coming in Phase 3',
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    name: 'Projects',
    iconName: 'Layers',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 180, y: 110 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Projects — Coming in Phase 4',
  },
  skills: {
    id: 'skills',
    title: 'Skills & Neural Stack',
    name: 'Skills',
    iconName: 'Cpu',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 220, y: 80 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Skills — Coming in Phase 4',
  },
  education: {
    id: 'education',
    title: 'Education',
    name: 'Education',
    iconName: 'GraduationCap',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 160, y: 100 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Education — Coming in Phase 5',
  },
  achievements: {
    id: 'achievements',
    title: 'Achievements',
    name: 'Achievements',
    iconName: 'Award',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 200, y: 120 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Achievements — Coming in Phase 5',
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    name: 'Contact',
    iconName: 'Mail',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 240, y: 130 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Contact — Coming in Phase 6',
  },
  finder: {
    id: 'finder',
    title: 'Finder — File Explorer',
    name: 'Finder',
    iconName: 'FolderTree',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 120, y: 90 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Finder — Coming in Phase 3',
  },
  settings: {
    id: 'settings',
    title: 'System Preferences',
    name: 'Preferences',
    iconName: 'Settings',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 150, y: 100 },
    minSize: { width: 400, height: 300 },
    phaseNote: 'Preferences — System Customization',
  },
}

const useOSStore = create((set, get) => ({
  // Boot state
  isBooted: false,
  setBooted: (val) => set({ isBooted: val }),

  // Windows state map
  windows: {
    terminal: { ...APP_CONFIGS.terminal, isOpen: true, isMinimized: false, isMaximized: false, zIndex: 12 },
    about: { ...APP_CONFIGS.about, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    projects: { ...APP_CONFIGS.projects, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    skills: { ...APP_CONFIGS.skills, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    education: { ...APP_CONFIGS.education, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    achievements: { ...APP_CONFIGS.achievements, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    contact: { ...APP_CONFIGS.contact, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    finder: { ...APP_CONFIGS.finder, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    settings: { ...APP_CONFIGS.settings, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  },
  activeAppId: 'terminal',
  highestZIndex: 12,
  bouncingAppId: null,

  // OS Global Settings
  wallpaper: 'neural_mesh',
  soundEnabled: true,
  isStartMenuOpen: false,
  isControlCenterOpen: false,
  contextMenu: { visible: false, x: 0, y: 0 },

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
      isStartMenuOpen: false,
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

    // Trigger bounce effect on the dock icon
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

    // Clear bounce trigger after 1.2s
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

  // Global Settings Actions
  setWallpaper: (id) => set({ wallpaper: id }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleStartMenu: () => set((state) => ({ isStartMenuOpen: !state.isStartMenuOpen, isControlCenterOpen: false })),
  setStartMenuOpen: (val) => set({ isStartMenuOpen: val }),
  toggleControlCenter: () => set((state) => ({ isControlCenterOpen: !state.isControlCenterOpen, isStartMenuOpen: false })),
  setControlCenterOpen: (val) => set({ isControlCenterOpen: val }),
  
  openContextMenu: (x, y) => set({ contextMenu: { visible: true, x, y } }),
  closeContextMenu: () => set({ contextMenu: { visible: false, x: 0, y: 0 } }),
}))

export default useOSStore
