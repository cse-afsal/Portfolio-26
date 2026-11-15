import { useState } from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import BuildingSign from './BuildingSign'
import ContactHouseInterior from './ContactHouseInterior'
import useGameStore from '../../store/useGameStore'

export default function ContactHouse() {
  const terracottaColor = '#aa5c44'   // warm mid-century terracotta brick
  const creamStuccoColor = '#f2ede4'  // soft cream stucco
  const walnutWoodColor = '#704f32'   // rich mid-century walnut wood
  const roofDarkColor = '#3a3c3f'     // dark flat roof with fascia
  const glassColor = '#a8c6db'        // corner window glass

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
    <group position={[16, 0, 32]} rotation={[0, -Math.PI / 2, 0]}>
      {/* ======================================================== */}
      {/* --- HOLLOW ACCESSIBLE EXTERIOR SHELL COLLIDERS --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="contact-house-shell">
        {/* Back Wall (local -Z) */}
        <CuboidCollider args={[5.5, 2.2, 0.15]} position={[0, 2.2, -4.5]} />
        {/* Left Wall (local -X) */}
        <CuboidCollider args={[0.15, 2.2, 4.5]} position={[-5.5, 2.2, 0]} />
        {/* Right Wall (local +X) */}
        <CuboidCollider args={[0.15, 2.2, 4.5]} position={[5.5, 2.2, 0]} />

        {/* Front Wall with doorway opening at center x = 0 */}
        <CuboidCollider args={[2.2, 2.2, 0.15]} position={[-2.8, 2.2, 4.5]} />
        <CuboidCollider args={[2.2, 2.2, 0.15]} position={[2.8, 2.2, 4.5]} />
        <CuboidCollider args={[1.0, 0.95, 0.15]} position={[0, 3.45, 4.5]} />

        {/* Terracotta Brick Accent Wing */}
        <CuboidCollider args={[2.5, 1.8, 2.5]} position={[-4.5, 1.8, 2.0]} />
        {/* Front Porch Deck */}
        <CuboidCollider args={[3.2, 0.15, 1.6]} position={[1.5, 0.15, 5.6]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* --- EXTERIOR WALL MESHES --- */}
      {/* ======================================================== */}
      {/* Back Wall */}
      <mesh
        position={[0, 2.2, -4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[11.0, 4.4, 0.3]} />
        <meshStandardMaterial color={creamStuccoColor} roughness={0.7} />
      </mesh>
      {/* Left Wall */}
      <mesh
        position={[-5.5, 2.2, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 4.4, 9.0]} />
        <meshStandardMaterial color={creamStuccoColor} roughness={0.7} />
      </mesh>
      {/* Right Wall */}
      <mesh
        position={[5.5, 2.2, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 4.4, 9.0]} />
        <meshStandardMaterial color={creamStuccoColor} roughness={0.7} />
      </mesh>

      {/* Front Wall Left Segment */}
      <mesh
        position={[-2.8, 2.2, 4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[4.4, 4.4, 0.3]} />
        <meshStandardMaterial color={creamStuccoColor} roughness={0.7} />
      </mesh>
      {/* Front Wall Right Segment */}
      <mesh
        position={[2.8, 2.2, 4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[4.4, 4.4, 0.3]} />
        <meshStandardMaterial color={creamStuccoColor} roughness={0.7} />
      </mesh>
      {/* Lintel above Doorway */}
      <mesh
        position={[0, 3.45, 4.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[2.0, 1.9, 0.3]} />
        <meshStandardMaterial color={creamStuccoColor} roughness={0.7} />
      </mesh>

      {/* Terracotta Feature Wing */}
      <mesh
        position={[-4.5, 1.8, 2.2]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[4.8, 3.6, 5.2]} />
        <meshStandardMaterial color={terracottaColor} roughness={0.8} />
      </mesh>

      {/* Low-Slung Flat Roof with Deep Overhangs */}
      <mesh
        position={[0, 4.5, 0.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[12.2, 0.35, 10.8]} />
        <meshStandardMaterial color={roofDarkColor} roughness={0.5} />
      </mesh>

      {/* Corner Glass Window */}
      <group position={[3.5, 2.0, 4.66]}>
        <mesh castShadow>
          <boxGeometry args={[3.6, 2.2, 0.08]} />
          <meshStandardMaterial color="#222" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[3.4, 2.0]} />
          <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.45} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* --- WELCOMING PORCH, ADIRONDACK CHAIRS & DOOR --- */}
      {/* ======================================================== */}
      <mesh position={[1.5, 0.1, 5.6]} receiveShadow>
        <boxGeometry args={[6.2, 0.2, 3.0]} />
        <meshStandardMaterial color={walnutWoodColor} roughness={0.65} />
      </mesh>

      <mesh position={[0, 0.02, 9.0]} receiveShadow>
        <boxGeometry args={[2.0, 0.04, 4.0]} />
        <meshStandardMaterial color="#c0bbb1" roughness={0.8} />
      </mesh>

      {/* Outdoor Lounge Chairs on Porch */}
      {[2.5, 3.8].map((xCh, idx) => (
        <group key={`lounge-${idx}`} position={[xCh, 0.2, 5.6]} rotation={[0, -0.2, 0]}>
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.08, 0.65]} />
            <meshStandardMaterial color="#c29668" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.65, -0.25]} rotation={[0.25, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.65, 0.08]} />
            <meshStandardMaterial color="#c29668" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Modern Front Door (Pivots open on interaction) */}
      <group position={[0, 0, 4.5]}>
        <group position={[-0.75, 0, 0]} rotation={[0, doorOpen ? -Math.PI / 2 : 0, 0]}>
          <mesh position={[0.75, 1.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 2.5, 0.08]} />
            <meshStandardMaterial color={walnutWoodColor} roughness={0.5} />
          </mesh>
          <mesh position={[1.3, 1.3, 0.06]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.65, 8]} />
            <meshStandardMaterial color="#c0c4c8" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Interactive Exterior Door Trigger (Smooth Entry Transition) */}
      <InteractiveObject
        id="door-contact-exterior"
        name="Contact House Entrance"
        position={[0, 1.0, 5.6]}
        range={2.2}
        promptText="Press E to Enter Contact House"
        showBeacon={false}
        onInteract={() => {
          setDoorOpen(true)
          triggerDoorTransition([14.5, 0.8, 32])
        }}
      />

      {/* Building Sign Totem */}
      <BuildingSign
        title="CONTACT HOUSE"
        subtitle="Inquiries & Collabs"
        position={[3.2, 0, 8.6]}
        rotation={[0, 0, 0]}
        scale={1.05}
      />

      {/* Modern Post Mailbox near roadside */}
      <group position={[-2.4, 0, 8.4]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.1, 8]} />
          <meshStandardMaterial color={walnutWoodColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.1, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.22, 0.5]} />
          <meshStandardMaterial color="#2d3033" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0.16, 1.15, 0.05]} castShadow>
          <boxGeometry args={[0.02, 0.12, 0.06]} />
          <meshStandardMaterial color="#c24438" roughness={0.5} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* --- ACCESSIBLE RECEPTION INTERIOR & CHANNELS --- */}
      {/* ======================================================== */}
      <ContactHouseInterior />
    </group>
  )
}
