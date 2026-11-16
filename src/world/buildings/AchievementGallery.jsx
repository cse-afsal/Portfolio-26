import { useState } from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import BuildingSign from './BuildingSign'
import AchievementGalleryInterior from './AchievementGalleryInterior'
import useGameStore from '../../store/useGameStore'
import useBuildingInteriorActive from '../../hooks/useBuildingInteriorActive'

export default function AchievementGallery() {
  const limestoneColor = '#ded8cc'   // fine honed limestone
  const graniteColor = '#252729'     // polished dark charcoal granite
  const bronzeColor = '#a88a5d'      // brushed bronze accent trim
  const glassColor = '#a8c6db'       // tinted display glass

  const [doorOpen, setDoorOpen] = useState(false)
  const isInteriorActive = useBuildingInteriorActive([16, 0, -32])

  const triggerDoorTransition = (targetPos) => {
    useGameStore.getState().setDoorTransitioning(true)
    useGameStore.getState().setTransitionFadeOpacity(1)

    setTimeout(() => {
      useGameStore.getState().setPlayerTeleportTarget(targetPos)
      setTimeout(() => {
        useGameStore.getState().setTransitionFadeOpacity(0)
        useGameStore.getState().setDoorTransitioning(false)
      }, 350)
    }, 350)
  }

  return (
    <group position={[16, 0, -32]} rotation={[0, -Math.PI / 2, 0]}>
      {/* ======================================================== */}
      {/* --- HOLLOW ACCESSIBLE EXTERIOR SHELL COLLIDERS --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="achievement-gallery-shell">
        {/* Back Wall (local -Z) */}
        <CuboidCollider args={[6.0, 2.8, 0.15]} position={[0, 2.8, -5.0]} />
        {/* Left Wall (local -X) */}
        <CuboidCollider args={[0.15, 2.8, 5.0]} position={[-6.0, 2.8, 0]} />
        {/* Right Wall (local +X) */}
        <CuboidCollider args={[0.15, 2.8, 5.0]} position={[6.0, 2.8, 0]} />

        {/* Front Wall with doorway opening at center x = 0 */}
        <CuboidCollider args={[2.4, 2.8, 0.15]} position={[-3.6, 2.8, 5.0]} />
        <CuboidCollider args={[2.4, 2.8, 0.15]} position={[3.6, 2.8, 5.0]} />
        <CuboidCollider args={[1.4, 1.0, 0.15]} position={[0, 3.8, 5.0]} />

        {/* Portico Column Wings */}
        <CuboidCollider args={[0.8, 2.2, 0.8]} position={[-3.2, 2.2, 5.5]} />
        <CuboidCollider args={[0.8, 2.2, 0.8]} position={[3.2, 2.2, 5.5]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* --- EXTERIOR WALL MESHES --- */}
      {/* ======================================================== */}
      {/* Back Wall */}
      <mesh
        position={[0, 2.8, -5.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[12.0, 5.6, 0.3]} />
        <meshStandardMaterial color={limestoneColor} roughness={0.65} />
      </mesh>
      {/* Left Wall */}
      <mesh
        position={[-6.0, 2.8, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 5.6, 10.0]} />
        <meshStandardMaterial color={limestoneColor} roughness={0.65} />
      </mesh>
      {/* Right Wall */}
      <mesh
        position={[6.0, 2.8, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 5.6, 10.0]} />
        <meshStandardMaterial color={limestoneColor} roughness={0.65} />
      </mesh>

      {/* Front Wall Left Segment */}
      <mesh
        position={[-3.6, 2.8, 5.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[4.8, 5.6, 0.3]} />
        <meshStandardMaterial color={limestoneColor} roughness={0.65} />
      </mesh>
      {/* Front Wall Right Segment */}
      <mesh
        position={[3.6, 2.8, 5.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[4.8, 5.6, 0.3]} />
        <meshStandardMaterial color={limestoneColor} roughness={0.65} />
      </mesh>
      {/* Lintel above Doorway */}
      <mesh
        position={[0, 4.3, 5.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[2.8, 2.6, 0.3]} />
        <meshStandardMaterial color={limestoneColor} roughness={0.65} />
      </mesh>

      {/* Dark Granite Parapet Roof Trim */}
      <mesh
        position={[0, 5.75, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[12.6, 0.35, 10.6]} />
        <meshStandardMaterial color={graniteColor} roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Exterior Display Niches on Front Facade */}
      {[-3.6, 3.6].map((xNiche, idx) => (
        <group key={`niche-${idx}`} position={[xNiche, 2.6, 5.16]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 2.6, 0.08]} />
            <meshStandardMaterial color={bronzeColor} roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[1.9, 2.3]} />
            <meshStandardMaterial color="#1f1f21" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <octahedronGeometry args={[0.22]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>
      ))}

      {/* ======================================================== */}
      {/* --- POLISHED GRANITE PORTICO & DOORS --- */}
      {/* ======================================================== */}
      <mesh position={[0, 4.4, 5.8]} castShadow userData={{ cameraCollider: true }}>
        <boxGeometry args={[4.8, 0.4, 2.4]} />
        <meshStandardMaterial color={graniteColor} roughness={0.3} metalness={0.5} />
      </mesh>

      {[-2.0, 2.0].map((xCol, idx) => (
        <mesh key={`p-col-${idx}`} position={[xCol, 2.1, 6.6]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 4.2, 0.5]} />
          <meshStandardMaterial color={graniteColor} roughness={0.3} metalness={0.5} />
        </mesh>
      ))}

      {/* Granite Steps */}
      <mesh position={[0, 0.15, 6.2]} receiveShadow>
        <boxGeometry args={[5.2, 0.3, 3.2]} />
        <meshStandardMaterial color="#404347" roughness={0.6} />
      </mesh>

      <mesh position={[0, 0.02, 9.4]} receiveShadow>
        <boxGeometry args={[2.0, 0.04, 3.8]} />
        <meshStandardMaterial color="#c0bbb1" roughness={0.8} />
      </mesh>

      {/* Double Contemporary Bronze & Glass Entry Doors */}
      <group position={[0, 0, 5.0]}>
        <group position={[-1.2, 0, 0]} rotation={[0, doorOpen ? -Math.PI / 2 : 0, 0]}>
          <mesh position={[1.2, 1.8, 0.02]} castShadow>
            <boxGeometry args={[2.4, 3.2, 0.08]} />
            <meshStandardMaterial color="#1a1c1e" roughness={0.3} metalness={0.6} />
          </mesh>
          {[-0.6, 0.6].map((xP, idx) => (
            <mesh key={`gp-${idx}`} position={[1.2 + xP, 1.8, 0.07]}>
              <planeGeometry args={[0.9, 2.8]} />
              <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.35} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Interactive Exterior Door Trigger (Smooth Entry Transition) */}
      <InteractiveObject
        id="door-achievement-exterior"
        name="Achievement Gallery Entrance"
        position={[0, 1.0, 6.2]}
        range={2.2}
        promptText="Press E to Enter Achievement Gallery"
        showBeacon={false}
        onInteract={() => {
          setDoorOpen(true)
          triggerDoorTransition([14.5, 0.8, -32])
        }}
      />

      {/* Building Sign Totem */}
      <BuildingSign
        title="ACHIEVEMENT GALLERY"
        subtitle="Awards & Milestones"
        position={[3.4, 0, 8.8]}
        rotation={[0, 0, 0]}
        scale={1.05}
      />

      {/* Symmetrical Topiary Trees */}
      {[-3.6, 3.6].map((xTop, idx) => (
        <group key={`top-${idx}`} position={[xTop, 0, 8.2]}>
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.7, 0.9]} />
            <meshStandardMaterial color="#505458" roughness={0.7} />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.05, 1.0, 6]} />
            <meshStandardMaterial color="#4a3628" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.8, 0]} castShadow>
            <sphereGeometry args={[0.55, 10, 10]} />
            <meshStandardMaterial color="#3d5e35" roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* ======================================================== */}
      {/* --- ACCESSIBLE EXHIBITION GALLERY INTERIOR (LAZY-LOADED) --- */}
      {/* ======================================================== */}
      {isInteriorActive && <AchievementGalleryInterior />}
    </group>
  )
}
