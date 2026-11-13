import { useEffect, useRef } from 'react'
import useGameStore from '../store/useGameStore'

export default function usePlayerControls() {
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
    jump: false,
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent browser default scroll on space/arrows
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault()
      }

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true
          break
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true
          break
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true
          break
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.run = true
          break
        case 'Space':
          keys.current.jump = true
          break
        case 'Escape': {
          const paused = useGameStore.getState().isPaused
          if (!paused) {
            useGameStore.getState().setIsPaused(true)
            if (document.exitPointerLock) {
              document.exitPointerLock()
            }
          } else {
            useGameStore.getState().setIsPaused(false)
            document.body.requestPointerLock()
          }
          break
        }
      }
    }

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false
          break
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false
          break
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false
          break
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.run = false
          break
        case 'Space':
          keys.current.jump = false
          break
      }
    }

    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        useGameStore.getState().zoomOut()
      } else {
        useGameStore.getState().zoomIn()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return keys
}
