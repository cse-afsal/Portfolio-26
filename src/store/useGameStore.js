import { create } from 'zustand'

const useGameStore = create((set, get) => ({
  // Player state
  isMoving: false,
  isRunning: false,
  isJumping: false,
  isGrounded: true,
  playerPosition: [0, 0, 5],
  playerTeleportTarget: null, // target position when transitioning [x, y, z]
  
  // Camera state
  cameraDistance: 5,
  cameraAngle: 0,
  
  // Game & UI state
  isPaused: false,
  isPointerLocked: false,
  
  // Interaction system
  activeInteraction: null, // Open modal info { id, name, title, subtitle, content, ... }
  nearbyInteractable: null, // Currently in range { id, name, prompt }
  
  // Door & Transition state
  doorOpen: false,
  doorTransitioning: false,
  transitionFadeOpacity: 0, // 0 to 1 for smooth screen fade
  
  // Mobile virtual controls
  touchMove: { x: 0, y: 0 },
  touchJump: false,
  touchRun: false,
  
  // Actions
  setIsMoving: (val) => set({ isMoving: val }),
  setIsRunning: (val) => set({ isRunning: val }),
  setIsJumping: (val) => set({ isJumping: val }),
  setIsGrounded: (val) => set({ isGrounded: val }),
  setPlayerPosition: (pos) => set({ playerPosition: pos }),
  setPlayerTeleportTarget: (pos) => set({ playerTeleportTarget: pos }),
  setCameraDistance: (dist) => set({ cameraDistance: dist }),
  setCameraAngle: (angle) => set({ cameraAngle: angle }),
  setIsPaused: (val) => set({ isPaused: val }),
  setIsPointerLocked: (val) => set({ isPointerLocked: val }),
  
  // Interaction actions
  setActiveInteraction: (interaction) => {
    // When opening interaction modal, exit pointer lock so user can click
    if (interaction && document.pointerLockElement) {
      document.exitPointerLock?.()
    }
    set({ activeInteraction: interaction })
  },
  closeInteraction: () => {
    set({ activeInteraction: null })
  },
  setNearbyInteractable: (interactable) => set({ nearbyInteractable: interactable }),
  
  // Door actions
  setDoorOpen: (val) => set({ doorOpen: val }),
  toggleDoor: () => set((state) => ({ doorOpen: !state.doorOpen })),
  setDoorTransitioning: (val) => set({ doorTransitioning: val }),
  setTransitionFadeOpacity: (val) => set({ transitionFadeOpacity: val }),
  
  // Touch controls
  setTouchMove: (move) => set({ touchMove: move }),
  setTouchJump: (jump) => set({ touchJump: jump }),
  setTouchRun: (run) => set({ touchRun: run }),
  
  // Camera distance control
  zoomIn: () => set((state) => ({ cameraDistance: Math.max(2, state.cameraDistance - 0.5) })),
  zoomOut: () => set((state) => ({ cameraDistance: Math.min(12, state.cameraDistance + 0.5) })),
}))

export default useGameStore
