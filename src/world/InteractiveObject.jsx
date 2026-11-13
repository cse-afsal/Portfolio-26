import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useGameStore from '../store/useGameStore'
import homeData from '../data/home.json'

export default function InteractiveObject({
  id,
  name,
  position = [0, 0, 0],
  range = 2.5,
  promptText = 'Press E to Explore',
  onInteract,
  showBeacon = true,
  children,
}) {
  const groupRef = useRef()
  const worldPos = useRef(new THREE.Vector3())
  const indicatorRef = useRef()
  const wasInRange = useRef(false)

  // Floating hover animation for beacon
  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.getWorldPosition(worldPos.current)

    const playerPos = useGameStore.getState().playerPosition
    if (!playerPos) return

    const dx = playerPos[0] - worldPos.current.x
    const dy = playerPos[1] - worldPos.current.y
    const dz = playerPos[2] - worldPos.current.z
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

    const inRange = dist <= range

    if (inRange) {
      wasInRange.current = true
      const currentNearby = useGameStore.getState().nearbyInteractable
      // Only set if none or if this is closer
      if (!currentNearby || currentNearby.id === id || dist < (currentNearby.distance || 999)) {
        useGameStore.getState().setNearbyInteractable({
          id,
          name,
          prompt: promptText,
          distance: dist,
          onInteract: onInteract || (() => {
            if (id && homeData[id]) {
              useGameStore.getState().setActiveInteraction(homeData[id])
            }
          }),
        })
      }
    } else if (wasInRange.current) {
      wasInRange.current = false
      const currentNearby = useGameStore.getState().nearbyInteractable
      if (currentNearby && currentNearby.id === id) {
        useGameStore.getState().setNearbyInteractable(null)
      }
    }

    // Animate glowing ring/beacon
    if (indicatorRef.current) {
      const t = state.clock.getElapsedTime()
      indicatorRef.current.rotation.y = t * 1.5
      indicatorRef.current.position.y = (position[1] || 0) + Math.sin(t * 3) * 0.05 + 0.1
      indicatorRef.current.scale.setScalar(inRange ? 1.2 : 1.0)
    }
  })

  useEffect(() => {
    return () => {
      const currentNearby = useGameStore.getState().nearbyInteractable
      if (currentNearby && currentNearby.id === id) {
        useGameStore.getState().setNearbyInteractable(null)
      }
    }
  }, [id])

  return (
    <group ref={groupRef} position={position}>
      {children}

      {/* Subtle warm indicator ring above object */}
      {showBeacon && (
        <group ref={indicatorRef} position={[0, 0.4, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.22, 0.28, 24]} />
            <meshBasicMaterial
              color="#d4af37"
              transparent
              opacity={0.65}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <octahedronGeometry args={[0.07]} />
            <meshStandardMaterial
              color="#f3e5ab"
              emissive="#d4af37"
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}

