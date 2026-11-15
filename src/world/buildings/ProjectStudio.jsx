import { useState } from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import BuildingSign from './BuildingSign'
import ProjectStudioInterior from './ProjectStudioInterior'
import useGameStore from '../../store/useGameStore'

export default function ProjectStudio() {
  const steelColor = '#242629'       // structural charcoal steel
  const stoneColor = '#ece8e1'       // smooth warm limestone panels
  const cedarColor = '#9e744e'       // architectural vertical cedar slats
  const glassColor = '#a8c8dc'       // tinted architectural structural glass
  const waterColor = '#3d6175'       // modern reflecting pool water

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
    <group position={[17, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {/* ======================================================== */}
      {/* --- HOLLOW ACCESSIBLE EXTERIOR SHELL COLLIDERS --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="project-studio-shell">
        {/* Back Wall (local -Z) */}
        <CuboidCollider args={[7.0, 3.5, 0.15]} position={[0, 3.5, -4.5]} />
        {/* Left Wall (local -X) */}
        <CuboidCollider args={[0.15, 3.5, 4.5]} position={[-6.8, 3.5, 0]} />
        {/* Right Wall (local +X) */}
        <CuboidCollider args={[0.15, 3.5, 4.5]} position={[6.8, 3.5, 0]} />

        {/* Front Structural Wall with doorway opening at center x = 0 */}
        <CuboidCollider args={[2.6, 2.0, 0.15]} position={[-4.2, 2.0, 3.4]} />
        <CuboidCollider args={[2.6, 2.0, 0.15]} position={[4.2, 2.0, 3.4]} />
        <CuboidCollider args={[1.6, 1.0, 0.15]} position={[0, 3.0, 3.4]} />

        {/* Upper Cantilever Volume (above y = 4.0) */}
        <CuboidCollider args={[5.8, 1.8, 6.2]} position={[0, 5.8, 1.0]} />

        {/* Reflecting Pool Boundary Edges */}
        <CuboidCollider args={[5.2, 0.2, 0.2]} position={[0, 0.2, 7.8]} />
        <CuboidCollider args={[0.2, 0.2, 2.0]} position={[-5.0, 0.2, 6.0]} />
        <CuboidCollider args={[0.2, 0.2, 2.0]} position={[5.0, 0.2, 6.0]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* --- LOWER LEVEL: CHARCOAL STEEL & GLASS FACADE --- */}
      {/* ======================================================== */}
      {/* Exterior Back Wall */}
      <mesh
        position={[0, 2.0, -4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[14.0, 4.0, 0.3]} />
        <meshStandardMaterial color={stoneColor} roughness={0.7} />
      </mesh>
      {/* Exterior Left Wall */}
      <mesh
        position={[-6.8, 2.0, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 4.0, 9.0]} />
        <meshStandardMaterial color={stoneColor} roughness={0.7} />
      </mesh>
      {/* Exterior Right Wall */}
      <mesh
        position={[6.8, 2.0, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 4.0, 9.0]} />
        <meshStandardMaterial color={stoneColor} roughness={0.7} />
      </mesh>

      {/* Charcoal Steel Framing Grid on Front */}
      <mesh position={[-4.2, 2.0, 3.4]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 4.0, 0.3]} />
        <meshStandardMaterial color={steelColor} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[4.2, 2.0, 3.4]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 4.0, 0.3]} />
        <meshStandardMaterial color={steelColor} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 3.0, 3.4]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 2.0, 0.3]} />
        <meshStandardMaterial color={steelColor} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Double-Height Glass Curtain Panels */}
      <mesh position={[-4.2, 2.0, 3.56]}>
        <planeGeometry args={[4.8, 3.6]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.4} />
      </mesh>
      <mesh position={[4.2, 2.0, 3.56]}>
        <planeGeometry args={[4.8, 3.6]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.4} />
      </mesh>

      {/* ======================================================== */}
      {/* --- UPPER LEVEL: DRAMATIC CANTILEVER WITH CEDAR SLATS --- */}
      {/* ======================================================== */}
      <mesh
        position={[0, 5.8, 1.2]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[11.2, 3.6, 12.0]} />
        <meshStandardMaterial color={stoneColor} roughness={0.6} />
      </mesh>

      {/* Upper Front Glass Ribbon Window */}
      <mesh position={[0, 5.8, 7.25]}>
        <boxGeometry args={[9.6, 2.0, 0.1]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.4} />
      </mesh>

      {/* Cedar Louver Side Panels */}
      {[-4.6, 4.6].map((xSide, sIdx) => (
        <group key={`cedar-side-${sIdx}`} position={[xSide, 5.8, 4.0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.6, 3.5, 6.2]} />
            <meshStandardMaterial color={cedarColor} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Roof Fascia & Overhang Cap */}
      <mesh
        position={[0, 7.7, 1.2]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[12.0, 0.35, 12.8]} />
        <meshStandardMaterial color={steelColor} roughness={0.4} metalness={0.5} />
      </mesh>

      {/* ======================================================== */}
      {/* --- REFLECTING POOL & FLOATING BRIDGE --- */}
      {/* ======================================================== */}
      {/* Reflecting Pool Basin Water Surface */}
      <mesh position={[0, 0.08, 6.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10.0, 4.0]} />
        <meshStandardMaterial
          color={waterColor}
          roughness={0.08}
          metalness={0.3}
          transparent
          opacity={0.88}
        />
      </mesh>
      {/* Concrete Coping Perimeter */}
      <mesh position={[0, 0.15, 8.05]} castShadow receiveShadow>
        <boxGeometry args={[10.6, 0.3, 0.3]} />
        <meshStandardMaterial color="#686b70" roughness={0.8} />
      </mesh>
      <mesh position={[-5.15, 0.15, 6.0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.3, 4.2]} />
        <meshStandardMaterial color="#686b70" roughness={0.8} />
      </mesh>
      <mesh position={[5.15, 0.15, 6.0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.3, 4.2]} />
        <meshStandardMaterial color="#686b70" roughness={0.8} />
      </mesh>

      {/* Floating Stone Stepping Bridge across the pool */}
      <mesh position={[0, 0.18, 6.0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.16, 4.2]} />
        <meshStandardMaterial color="#dcd7ce" roughness={0.6} />
      </mesh>
      {/* Paved path extension connecting to street sidewalk */}
      <mesh position={[0, 0.02, 10.0]} receiveShadow>
        <boxGeometry args={[2.2, 0.04, 4.0]} />
        <meshStandardMaterial color="#c4bfb6" roughness={0.8} />
      </mesh>

      {/* ======================================================== */}
      {/* --- ENTRANCE PORCH, DOORS & INTERACTIVE OBJECT --- */}
      {/* ======================================================== */}
      {/* Recessed Entryway Portal Frame */}
      <mesh position={[0, 1.4, 3.4]} castShadow>
        <boxGeometry args={[2.4, 2.7, 0.4]} />
        <meshStandardMaterial color={steelColor} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Double Contemporary Glass Doors (pivot open on interaction) */}
      <group position={[0, 0, 3.4]}>
        <group position={[-1.0, 0, 0]} rotation={[0, doorOpen ? -Math.PI / 2 : 0, 0]}>
          <mesh position={[0.5, 1.35, 0.02]} castShadow receiveShadow>
            <boxGeometry args={[1.0, 2.5, 0.06]} />
            <meshStandardMaterial color="#1a1c1e" roughness={0.2} metalness={0.4} />
          </mesh>
          <mesh position={[0.9, 1.3, 0.06]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 1.1, 8]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>
      </group>

      {/* Interactive Exterior Door Trigger (Smooth Entry Transition) */}
      <InteractiveObject
        id="door-project-studio-exterior"
        name="Project Studio Entrance"
        position={[0, 1.0, 4.6]}
        range={2.4}
        promptText="Press E to Enter Project Studio"
        showBeacon={false}
        onInteract={() => {
          setDoorOpen(true)
          triggerDoorTransition([14.5, 0.8, 0])
        }}
      />

      {/* Showpiece Entrance Sign Totem */}
      <BuildingSign
        title="PROJECT STUDIO"
        subtitle="Flagship Showcase"
        position={[3.8, 0, 8.8]}
        rotation={[0, 0, 0]}
        scale={1.15}
      />

      {/* Modern Minimalist Outdoor Lounge Bench */}
      <group position={[-3.6, 0, 8.8]}>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.1, 0.6]} />
          <meshStandardMaterial color={cedarColor} roughness={0.6} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* --- ACCESSIBLE EXHIBITION INTERIOR --- */}
      {/* ======================================================== */}
      <ProjectStudioInterior />
    </group>
  )
}
