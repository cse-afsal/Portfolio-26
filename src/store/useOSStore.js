import { create } from 'zustand'

export const APP_CONFIGS = {
  about: {
    id: 'about',
    title: 'About Afsal — Bio & Background',
    iconName: 'User',
    defaultSize: { width: 720, height: 530 },
    defaultPosition: { x: 80, y: 70 },
    minSize: { width: 400, height: 350 },
  },
  terminal: {
    id: 'terminal',
    title: 'afsal@neural-workstation:~ (zsh)',
    iconName: 'Terminal',
    defaultSize: { width: 740, height: 480 },
    defaultPosition: { x: 140, y: 110 },
    minSize: { width: 420, height: 300 },
  },
  projects: {
    id: 'projects',
    title: 'Deep Learning & AI Projects',
    iconName: 'Layers',
    defaultSize: { width: 880, height: 580 },
    defaultPosition: { x: 110, y: 80 },
    minSize: { width: 460, height: 380 },
  },
  skills: {
    id: 'skills',
    title: 'AI/ML & Deep Learning Stack',
    iconName: 'Cpu',
    defaultSize: { width: 760, height: 530 },
    defaultPosition: { x: 160, y: 100 },
    minSize: { width: 420, height: 350 },
  },
  contact: {
    id: 'contact',
    title: 'Connect & Inquiries',
    iconName: 'Mail',
    defaultSize: { width: 660, height: 500 },
    defaultPosition: { x: 180, y: 120 },
    minSize: { width: 380, height: 340 },
  },
  settings: {
    id: 'settings',
    title: 'System Preferences',
    iconName: 'Settings',
    defaultSize: { width: 620, height: 460 },
    defaultPosition: { x: 200, y: 130 },
    minSize: { width: 380, height: 320 },
  },
}

const useOSStore = create((set, get) => ({
  // Windows state map
  windows: {
    about: { ...APP_CONFIGS.about, isOpen: true, isMinimized: false, isMaximized: false, zIndex: 10 },
    terminal: { ...APP_CONFIGS.terminal, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 9 },
    projects: { ...APP_CONFIGS.projects, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 8 },
    skills: { ...APP_CONFIGS.skills, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 7 },
    contact: { ...APP_CONFIGS.contact, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 6 },
    settings: { ...APP_CONFIGS.settings, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 5 },
  },
  activeAppId: 'about',
  highestZIndex: 10,

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

    // If window exists and is minimized, restore it
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

    set({
      windows: {
        ...windows,
        [appId]: {
          ...windows[appId],
          isMinimized: true,
        },
      },
      activeAppId: get().activeAppId === appId ? null : get().activeAppId,
    })
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
