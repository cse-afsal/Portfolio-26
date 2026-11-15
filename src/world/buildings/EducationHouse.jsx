import { useState } from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import BuildingSign from './BuildingSign'
import EducationHouseInterior from './EducationHouseInterior'
import useGameStore from '../../store/useGameStore'

export default function EducationHouse() {
  const pineWoodColor = '#ba9368'    // warm scandinavian pine timber
  const wallWhiteColor = '#edeae3'   // off-white exterior render
  const roofSlateColor = '#2e3033'   // dark standing-seam gable roof
  const glassColor = '#a8c6db'       // window glass

  const [doorOpen, setDoorOpen] = useState(false)

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
    <group position={[-16, 0, 32]} rotation={[0, Math.PI / 2, 0]}>
      {/* ======================================================== */}
      {/* --- HOLLOW ACCESSIBLE EXTERIOR SHELL COLLIDERS --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="education-house-shell">
        {/* Back Wall (local -Z) */}
        <CuboidCollider args={[5.2, 2.5, 0.15]} position={[0, 2.5, -4.5]} />
        {/* Left Wall (local -X) */}
        <CuboidCollider args={[0.15, 2.5, 4.5]} position={[-5.2, 2.5, 0]} />
        {/* Right Wall (local +X) */}
        <CuboidCollider args={[0.15, 2.5, 4.5]} position={[5.2, 2.5, 0]} />

        {/* Front Wall with doorway opening at center x = 0 */}
        <CuboidCollider args={[2.2, 2.5, 0.15]} position={[-2.6, 2.5, 4.5]} />
        <CuboidCollider args={[2.2, 2.5, 0.15]} position={[2.6, 2.5, 4.5]} />
        <CuboidCollider args={[1.0, 1.25, 0.15]} position={[0, 3.75, 4.5]} />

        {/* Study Porch Platform */}
        <CuboidCollider args={[4.5, 0.2, 1.8]} position={[0, 0.2, 5.8]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* --- SCANDINAVIAN GABLE BUILDING MESHES --- */}
      {/* ======================================================== */}
      {/* Exterior Back Wall */}
      <mesh
        position={[0, 2.5, -4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[10.4, 5.0, 0.3]} />
        <meshStandardMaterial color={wallWhiteColor} roughness={0.7} />
      </mesh>
      {/* Exterior Left Wall */}
      <mesh
        position={[-5.2, 2.5, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 5.0, 9.0]} />
        <meshStandardMaterial color={wallWhiteColor} roughness={0.7} />
      </mesh>
      {/* Exterior Right Wall */}
      <mesh
        position={[5.2, 2.5, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 5.0, 9.0]} />
        <meshStandardMaterial color={wallWhiteColor} roughness={0.7} />
      </mesh>

      {/* Front Wall Left Segment */}
      <mesh
        position={[-2.6, 2.5, 4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[4.4, 5.0, 0.3]} />
        <meshStandardMaterial color={wallWhiteColor} roughness={0.7} />
      </mesh>
      {/* Front Wall Right Segment */}
      <mesh
        position={[2.6, 2.5, 4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[4.4, 5.0, 0.3]} />
        <meshStandardMaterial color={wallWhiteColor} roughness={0.7} />
      </mesh>
      {/* Lintel above Doorway */}
      <mesh
        position={[0, 3.75, 4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[2.0, 2.5, 0.3]} />
        <meshStandardMaterial color={wallWhiteColor} roughness={0.7} />
      </mesh>

      {/* Front Gable Timber Cladding Triangle Section */}
      <mesh
        position={[0, 5.8, 4.45]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[9.8, 1.8, 0.2]} />
        <meshStandardMaterial color={pineWoodColor} roughness={0.65} />
      </mesh>

      {/* Pitched Roof (Left Slope & Right Slope) */}
      <mesh
        position={[-2.7, 6.2, 0]}
        rotation={[0, 0, Math.PI / 6]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[6.2, 0.35, 10.2]} />
        <meshStandardMaterial color={roofSlateColor} roughness={0.5} />
      </mesh>
      <mesh
        position={[2.7, 6.2, 0]}
        rotation={[0, 0, -Math.PI / 6]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[6.2, 0.35, 10.2]} />
        <meshStandardMaterial color={roofSlateColor} roughness={0.5} />
      </mesh>

      {/* Tall Vertical Windows */}
      {[-3.0, 3.0].map((xWin, idx) => (
        <group key={`win-${idx}`} position={[xWin, 2.6, 4.66]}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 3.0, 0.08]} />
            <meshStandardMaterial color="#2d3033" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[1.2, 2.8]} />
            <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.45} />
          </mesh>
        </group>
      ))}

      {/* ======================================================== */}
      {/* --- TIMBER PORCH & OUTDOOR STUDY TABLE --- */}
      {/* ======================================================== */}
      <mesh position={[0, 0.15, 5.8]} receiveShadow>
        <boxGeometry args={[9.0, 0.2, 3.0]} />
        <meshStandardMaterial color={pineWoodColor} roughness={0.7} />
      </mesh>

      <mesh position={[0, 0.02, 9.2]} receiveShadow>
        <boxGeometry args={[1.8, 0.04, 4.4]} />
        <meshStandardMaterial color="#c0bbb1" roughness={0.8} />
      </mesh>

      {/* Porch Eaves Columns */}
      {[-4.2, 4.2].map((xCol, idx) => (
        <mesh key={`col-${idx}`} position={[xCol, 2.0, 7.0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 3.8, 8]} />
          <meshStandardMaterial color={pineWoodColor} roughness={0.6} />
        </mesh>
      ))}

      {/* Outdoor Study Table on Porch */}
      <group position={[-2.4, 0.25, 5.8]}>
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.05, 0.8]} />
          <meshStandardMaterial color={pineWoodColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Entrance Door (Pivots open on interaction) */}
      <group position={[0, 0, 4.5]}>
        <group position={[-0.7, 0, 0]} rotation={[0, doorOpen ? -Math.PI / 2 : 0, 0]}>
          <mesh position={[0.7, 1.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 2.5, 0.08]} />
            <meshStandardMaterial color={pineWoodColor} roughness={0.5} />
          </mesh>
          <mesh position={[1.2, 1.3, 0.06]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
            <meshStandardMaterial color="#1f1f1f" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Interactive Exterior Door Trigger (Smooth Entry Transition) */}
      <InteractiveObject
        id="door-education-exterior"
        name="Education House Entrance"
        position={[0, 1.0, 5.8]}
        range={2.2}
        promptText="Press E to Enter Education House"
        showBeacon={false}
        onInteract={() => {
          setDoorOpen(true)
          triggerDoorTransition([-14.5, 0.8, 32])
        }}
      />

      {/* Building Sign Totem */}
      <BuildingSign
        title="EDUCATION HOUSE"
        subtitle="Academics & Research"
        position={[3.0, 0, 8.5]}
        rotation={[0, 0, 0]}
        scale={1.05}
      />

      {/* ======================================================== */}
      {/* --- ACCESSIBLE STUDY INTERIOR & CREDENTIALS --- */}
      {/* ======================================================== */}
      <EducationHouseInterior />
    </group>
  )
}
