import { useState } from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import BuildingSign from './BuildingSign'
import SkillsHouseInterior from './SkillsHouseInterior'
import useGameStore from '../../store/useGameStore'

export default function SkillsHouse() {
  const stuccoColor = '#ece8e1'       // light warm cream stucco
  const timberColor = '#856345'       // rich warm oak timber
  const slateColor = '#3e4247'        // slate grey roof & cladding
  const glassColor = '#a8c6db'        // window glass

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
    <group position={[-16, 0, -32]} rotation={[0, Math.PI / 2, 0]}>
      {/* ======================================================== */}
      {/* --- HOLLOW ACCESSIBLE EXTERIOR SHELL COLLIDERS --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="skills-house-shell">
        {/* Back Wall (local -Z) */}
        <CuboidCollider args={[5.5, 2.5, 0.15]} position={[0, 2.5, -4.5]} />
        {/* Left Wall (local -X) */}
        <CuboidCollider args={[0.15, 2.5, 4.5]} position={[-5.5, 2.5, 0]} />
        {/* Right Wall (local +X) */}
        <CuboidCollider args={[0.15, 2.5, 4.5]} position={[5.5, 2.5, 0]} />

        {/* Front Wall (local +Z = 4.5) with doorway opening at x = 0.5 */}
        <CuboidCollider args={[2.5, 2.5, 0.15]} position={[-2.7, 2.5, 4.5]} />
        <CuboidCollider args={[2.0, 2.5, 0.15]} position={[3.2, 2.5, 4.5]} />
        <CuboidCollider args={[0.9, 1.25, 0.15]} position={[0.5, 3.75, 4.5]} />

        {/* Roof */}
        <CuboidCollider args={[5.8, 0.2, 4.8]} position={[0, 5.2, 0]} />
        {/* Workshop Wing Outer Wall */}
        <CuboidCollider args={[3.5, 2.0, 3.5]} position={[-6.5, 2.0, -1.0]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* --- EXTERIOR WALL MESHES --- */}
      {/* ======================================================== */}
      {/* Back Wall */}
      <mesh
        position={[0, 2.5, -4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[11.0, 5.0, 0.3]} />
        <meshStandardMaterial color={stuccoColor} roughness={0.7} />
      </mesh>
      {/* Left Wall */}
      <mesh
        position={[-5.5, 2.5, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 5.0, 9.0]} />
        <meshStandardMaterial color={stuccoColor} roughness={0.7} />
      </mesh>
      {/* Right Wall */}
      <mesh
        position={[5.5, 2.5, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 5.0, 9.0]} />
        <meshStandardMaterial color={stuccoColor} roughness={0.7} />
      </mesh>

      {/* Front Wall Left Segment */}
      <mesh
        position={[-2.7, 2.5, 4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[5.0, 5.0, 0.3]} />
        <meshStandardMaterial color={stuccoColor} roughness={0.7} />
      </mesh>
      {/* Front Wall Right Segment */}
      <mesh
        position={[3.2, 2.5, 4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[4.0, 5.0, 0.3]} />
        <meshStandardMaterial color={stuccoColor} roughness={0.7} />
      </mesh>
      {/* Lintel above Doorway */}
      <mesh
        position={[0.5, 3.75, 4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[1.8, 2.5, 0.3]} />
        <meshStandardMaterial color={stuccoColor} roughness={0.7} />
      </mesh>

      {/* Split Roof - Angled Modern Pitch */}
      <mesh
        position={[0, 5.3, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[11.8, 0.4, 9.8]} />
        <meshStandardMaterial color={slateColor} roughness={0.5} />
      </mesh>

      {/* Workshop Wing Block (left) */}
      <mesh
        position={[-6.5, 2.0, -1.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[7.0, 4.0, 7.0]} />
        <meshStandardMaterial color="#ded9ce" roughness={0.75} />
      </mesh>
      <mesh
        position={[-6.5, 4.2, -1.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[7.6, 0.35, 7.6]} />
        <meshStandardMaterial color={slateColor} roughness={0.5} />
      </mesh>

      {/* Modern Ribbon Windows */}
      <mesh position={[3.2, 3.5, 4.66]}>
        <boxGeometry args={[3.4, 1.4, 0.08]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.4} />
      </mesh>

      {/* ======================================================== */}
      {/* --- ENTRANCE PORCH WITH TIMBER PERGOLA --- */}
      {/* ======================================================== */}
      {/* Concrete Porch Slab */}
      <mesh position={[0.5, 0.08, 5.5]} receiveShadow>
        <boxGeometry args={[3.8, 0.16, 2.6]} />
        <meshStandardMaterial color="#c5c0b6" roughness={0.8} />
      </mesh>

      {/* Connecting Walkway to Street Sidewalk */}
      <mesh position={[0.5, 0.02, 8.5]} receiveShadow>
        <boxGeometry args={[1.8, 0.04, 4.0]} />
        <meshStandardMaterial color="#c0bbb1" roughness={0.8} />
      </mesh>

      {/* Pergola Columns */}
      {[-1.2, 2.2].map((xCol, idx) => (
        <mesh key={`perg-col-${idx}`} position={[xCol, 1.5, 6.6]} castShadow>
          <boxGeometry args={[0.15, 3.0, 0.15]} />
          <meshStandardMaterial color={timberColor} roughness={0.6} />
        </mesh>
      ))}

      {/* Pergola Rafters */}
      <mesh position={[0.5, 3.0, 5.6]} castShadow>
        <boxGeometry args={[3.8, 0.12, 0.18]} />
        <meshStandardMaterial color={timberColor} roughness={0.6} />
      </mesh>
      <mesh position={[0.5, 3.0, 6.6]} castShadow>
        <boxGeometry args={[3.8, 0.12, 0.18]} />
        <meshStandardMaterial color={timberColor} roughness={0.6} />
      </mesh>

      {/* Warm Porch Hanging Pendant Lantern */}
      <group position={[0.5, 2.5, 5.8]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 6]} />
          <meshBasicMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.3, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
        </mesh>
        <pointLight position={[0, -0.1, 0]} intensity={0.5} distance={5} color="#ffe8cc" />
      </group>

      {/* Modern Front Door (Pivots open on interaction) */}
      <group position={[0.5, 0, 4.5]}>
        <group position={[-0.7, 0, 0]} rotation={[0, doorOpen ? -Math.PI / 2 : 0, 0]}>
          <mesh position={[0.7, 1.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 2.5, 0.08]} />
            <meshStandardMaterial color={timberColor} roughness={0.5} />
          </mesh>
          <mesh position={[1.25, 1.2, 0.06]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.6, 6]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Interactive Exterior Door Trigger (Smooth Entry Transition) */}
      <InteractiveObject
        id="door-skills-exterior"
        name="Skills House Entrance"
        position={[0.5, 1.0, 5.4]}
        range={2.2}
        promptText="Press E to Enter Skills House"
        showBeacon={false}
        onInteract={() => {
          setDoorOpen(true)
          triggerDoorTransition([-15.0, 0.8, -32])
        }}
      />

      {/* Building Sign Totem */}
      <BuildingSign
        title="SKILLS HOUSE"
        subtitle="Workshop & Lab"
        position={[3.2, 0, 8.0]}
        rotation={[0, 0, 0]}
        scale={1.05}
      />

      {/* Zen Gravel Garden */}
      <mesh position={[-2.8, 0.02, 5.5]} receiveShadow>
        <planeGeometry args={[3.2, 2.4]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#d4cebe" roughness={0.9} />
      </mesh>
      <mesh position={[-2.5, 0.25, 5.8]} rotation={[0.2, 0.4, 0.1]} castShadow>
        <dodecahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial color="#73767a" roughness={0.9} />
      </mesh>
      <mesh position={[-3.0, 0.45, 6.2]} castShadow>
        <sphereGeometry args={[0.45, 7, 7]} />
        <meshStandardMaterial color="#4d6b42" roughness={0.85} />
      </mesh>

      {/* ======================================================== */}
      {/* --- ACCESSIBLE INTERIOR WORKSPACE & DISPLAY BOARDS --- */}
      {/* ======================================================== */}
      <SkillsHouseInterior />
    </group>
  )
}
