import { useEffect, useRef } from 'react'
import useGameStore, { PORTFOLIO_SECTIONS } from '../store/useGameStore'
import homeData from '../data/home.json'

export default function usePlayerControls() {
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
    jump: false,
    interact: false,
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent browser default scroll and tab cycling
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.code)) {
        e.preventDefault()
      }

      const store = useGameStore.getState()

      // Tab Key: Toggle Quick Portfolio Menu
      if (e.code === 'Tab') {
        if (store.quickMenuOpen) {
          store.setQuickMenuOpen(false)
          if (!store.isTitleScreen && !store.isPaused && !store.activeInteraction) {
            document.body.requestPointerLock?.()
          }
        } else {
          if (store.activeInteraction) store.closeInteraction()
          store.setQuickMenuOpen(true)
        }
        return
      }

      // If Quick Menu is open, allow pressing 1 to 6 to jump directly
      if (store.quickMenuOpen) {
        const digitMatch = e.code.match(/^Digit([1-6])$/)
        if (digitMatch) {
          const index = parseInt(digitMatch[1], 10) - 1
          if (PORTFOLIO_SECTIONS[index]) {
            store.teleportToSection(PORTFOLIO_SECTIONS[index].id)
            return
          }
        }
      }

      // Escape key hierarchy
      if (e.code === 'Escape') {
        if (store.activeInteraction) {
          store.closeInteraction()
          return
        }
        if (store.showControlsGuide) {
          store.setShowControlsGuide(false)
          return
        }
        if (store.quickMenuOpen) {
          store.setQuickMenuOpen(false)
          if (!store.isTitleScreen && !store.isPaused) {
            document.body.requestPointerLock?.()
          }
          return
        }
        if (store.isTitleScreen) {
          // Remain on title screen
          return
        }

        // Toggle pause menu
        if (!store.isPaused) {
          store.setIsPaused(true)
          if (document.exitPointerLock) document.exitPointerLock()
        } else {
          store.setIsPaused(false)
          document.body.requestPointerLock?.()
        }
        return
      }

      // If any modal or menu is open, ignore movement keys
      if (
        store.activeInteraction ||
        store.isPaused ||
        store.quickMenuOpen ||
        store.isTitleScreen ||
        store.showControlsGuide
      ) {
        return
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
        case 'KeyE': {
          keys.current.interact = true
          const nearby = store.nearbyInteractable
          if (nearby) {
            if (nearby.onInteract) {
              nearby.onInteract()
            } else if (nearby.id && homeData[nearby.id]) {
              store.setActiveInteraction(homeData[nearby.id])
            }
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
        case 'KeyE':
          keys.current.interact = false
          break
      }
    }

    const handleWheel = (e) => {
      const store = useGameStore.getState()
      if (
        store.activeInteraction ||
        store.isPaused ||
        store.quickMenuOpen ||
        store.isTitleScreen
      ) {
        return
      }
      if (e.deltaY > 0) {
        store.zoomOut()
      } else {
        store.zoomIn()
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
