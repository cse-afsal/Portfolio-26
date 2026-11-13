import { create } from 'zustand'

const useGameStore = create((set) => ({
  // Player state
  isMoving: false,
  isRunning: false,
  isJumping: false,
  isGrounded: true,
  playerPosition: [0, 0, 5],

  // Camera state
  cameraDistance: 5,
  cameraAngle: 0,

  // Game state
  isPaused: false,
  isPointerLocked: false,

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
  setCameraDistance: (dist) => set({ cameraDistance: dist }),
  setCameraAngle: (angle) => set({ cameraAngle: angle }),
  setIsPaused: (val) => set({ isPaused: val }),
  setIsPointerLocked: (val) => set({ isPointerLocked: val }),
  setTouchMove: (move) => set({ touchMove: move }),
  setTouchJump: (jump) => set({ touchJump: jump }),
  setTouchRun: (run) => set({ touchRun: run }),

  // Camera distance control (clamped between 2 and 12)
  zoomIn: () => set((state) => ({ cameraDistance: Math.max(2, state.cameraDistance - 0.5) })),
  zoomOut: () => set((state) => ({ cameraDistance: Math.min(12, state.cameraDistance + 0.5) })),
}))

export default useGameStore
