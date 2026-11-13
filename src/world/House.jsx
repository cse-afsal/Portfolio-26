import { useState } from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import Interior from './interior/Interior'
import InteractiveObject from './InteractiveObject'
import useGameStore from '../store/useGameStore'

function WindowPane({ position, size = [0.1, 1.4, 2.0] }) {
  return (
    <group position={position}>
      {/* Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#2d3033" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Glass */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[size[0] * 0.5, size[1] * 0.9, size[2] * 0.9]} />
        <meshStandardMaterial
          color="#d0e5f2"
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

function GardenBush({ position, scale = 1 }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.5 * scale, 8, 8]} />
      <meshStandardMaterial color="#507242" roughness={0.85} />
    </mesh>
  )
}

export default function House() {
  const wallColor = '#f0ece4'       // warm modern off-white exterior
  const roofColor = '#36383b'       // charcoal architectural flat roof
  const doorWoodColor = '#805d3b'   // natural oak entrance door

  const [doorOpen, setDoorOpen] = useState(false)

  // Smooth door transition handler
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
    <group position={[0, 0, 0]}>
      {/* ======================================================== */}
      {/* --- EXTERIOR WALLS & ROOF WITH HOLLOW ACCESSIBLE INTERIOR --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="house-exterior-shell">
        {/* Back Wall (West, x = -17.0) */}
        <CuboidCollider args={[0.15, 3.2, 7.0]} position={[-17.0, 3.2, 0.0]} />
        {/* South Wall (z = -7.0) */}
        <CuboidCollider args={[5.0, 3.2, 0.15]} position={[-12.0, 3.2, -7.0]} />
        {/* North Wall (z = +7.0) */}
        <CuboidCollider args={[5.0, 3.2, 0.15]} position={[-12.0, 3.2, 7.0]} />

        {/* Front Wall (East, x = -7.0) - Left Segment */}
        <CuboidCollider args={[0.15, 3.2, 3.1]} position={[-7.0, 3.2, -3.9]} />
        {/* Front Wall (East, x = -7.0) - Right Segment */}
        <CuboidCollider args={[0.15, 3.2, 3.1]} position={[-7.0, 3.2, 3.9]} />
        {/* Lintel Wall above Front Door (y = 2.4 to 6.4) */}
        <CuboidCollider args={[0.15, 2.0, 0.8]} position={[-7.0, 4.4, 0.0]} />

        {/* Roof Slab */}
        <CuboidCollider args={[5.3, 0.2, 7.3]} position={[-12.0, 6.5, 0.0]} />
      </RigidBody>

      {/* Visual Meshes for Exterior Walls (all tagged with cameraCollider: true) */}
      {/* Back Wall */}
      <mesh
        position={[-17.0, 3.2, 0.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 6.4, 14.0]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* South Wall */}
      <mesh
        position={[-12.0, 3.2, -7.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[10.0, 6.4, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* North Wall */}
      <mesh
        position={[-12.0, 3.2, 7.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[10.0, 6.4, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* Front Wall - Left Section */}
      <mesh
        position={[-7.0, 3.2, -3.9]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 6.4, 6.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* Front Wall - Right Section */}
      <mesh
        position={[-7.0, 3.2, 3.9]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 6.4, 6.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* Lintel above Doorway */}
      <mesh
        position={[-7.0, 4.4, 0.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.3, 4.0, 1.6]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* Flat Modern Roof with Overhang */}
      <mesh
        position={[-12.0, 6.5, 0.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[10.8, 0.3, 14.8]} />
        <meshStandardMaterial color={roofColor} roughness={0.5} />
      </mesh>

      {/* ======================================================== */}
      {/* --- LARGE ARCHITECTURAL WINDOWS (NATURAL DAYLIGHT) --- */}
      {/* ======================================================== */}
      {/* Living Room Ground Floor Front Window */}
      <WindowPane position={[-7.0, 1.6, -3.5]} size={[0.32, 2.2, 3.2]} />
      {/* Dining Ground Floor Front Window */}
      <WindowPane position={[-7.0, 1.6, 3.5]} size={[0.32, 2.2, 3.2]} />
      {/* Upstairs Workspace Large Window */}
      <WindowPane position={[-7.0, 4.8, 3.5]} size={[0.32, 1.8, 3.2]} />
      {/* Upstairs Bedroom Window */}
      <WindowPane position={[-7.0, 4.8, -3.5]} size={[0.32, 1.8, 3.2]} />
      {/* South Wall Windows */}
      <WindowPane position={[-12.0, 1.8, -7.0]} size={[3.0, 2.0, 0.32]} />
      <WindowPane position={[-12.0, 4.8, -7.0]} size={[3.0, 1.8, 0.32]} />

      {/* ======================================================== */}
      {/* --- MAIN ENTRANCE DOORWAY & PORCH --- */}
      {/* ======================================================== */}
      {/* Modern Front Door Frame */}
      <mesh position={[-7.0, 1.2, 0.0]}>
        <boxGeometry args={[0.35, 2.45, 1.65]} />
        <meshStandardMaterial color="#222" roughness={0.4} />
      </mesh>
      {/* Inner doorway void */}
      <mesh position={[-7.0, 1.2, 0.0]}>
        <boxGeometry args={[0.36, 2.38, 1.55]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>

      {/* Pivotable / Openable Modern Oak Front Door */}
      <group position={[-7.0, 0, -0.75]}>
        <group rotation={[0, doorOpen ? -Math.PI / 2 : 0, 0]}>
          <mesh position={[0, 1.19, 0.75]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 2.36, 1.5]} />
            <meshStandardMaterial color={doorWoodColor} roughness={0.5} />
          </mesh>
          {/* Vertical modern black steel door handle */}
          <mesh position={[0.06, 1.15, 1.35]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
            <meshStandardMaterial color="#1f1f1f" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Exterior Front Doorway Interaction (Smooth Entry Transition) */}
      <InteractiveObject
        id="door-exterior"
        name="Main Entrance Door"
        position={[-6.2, 1.0, 0]}
        range={1.9}
        promptText="Press E to Enter Home"
        showBeacon={false}
        onInteract={() => {
          setDoorOpen(true)
          triggerDoorTransition([-7.8, 0.8, 0])
        }}
      />

      {/* Front Entrance Concrete Porch & Path leading to Sidewalk */}
      <mesh position={[-5.6, 0.02, 0]} receiveShadow>
        <boxGeometry args={[2.8, 0.05, 2.0]} />
        <meshStandardMaterial color="#c8c0b8" roughness={0.8} />
      </mesh>
      <mesh position={[-3.8, 0.01, 0]} receiveShadow>
        <boxGeometry args={[1.6, 0.04, 1.4]} />
        <meshStandardMaterial color="#c0b8b0" roughness={0.8} />
      </mesh>

      {/* Porch Welcome Sconce Light */}
      <mesh position={[-6.8, 2.3, 0.9]} castShadow>
        <boxGeometry args={[0.1, 0.25, 0.12]} />
        <meshStandardMaterial color="#2d3033" roughness={0.3} metalness={0.5} />
      </mesh>
      <pointLight position={[-6.6, 2.3, 0.9]} intensity={0.4} distance={5} color="#ffe2b3" />

      {/* ======================================================== */}
      {/* --- FRONT GARDEN, BUSHES & LANDSCAPING --- */}
      {/* ======================================================== */}
      <GardenBush position={[-6.0, 0.35, 1.8]} scale={0.8} />
      <GardenBush position={[-6.0, 0.3, 2.8]} scale={0.65} />
      <GardenBush position={[-6.0, 0.35, -1.8]} scale={0.8} />
      <GardenBush position={[-6.0, 0.3, -2.8]} scale={0.65} />

      {/* Low contemporary manicured boxwood hedges */}
      <mesh position={[-5.8, 0.3, 4.5]} castShadow>
        <boxGeometry args={[2.2, 0.6, 0.45]} />
        <meshStandardMaterial color="#405d35" roughness={0.9} />
      </mesh>
      <mesh position={[-5.8, 0.3, -4.5]} castShadow>
        <boxGeometry args={[2.2, 0.6, 0.45]} />
        <meshStandardMaterial color="#405d35" roughness={0.9} />
      </mesh>

      {/* ======================================================== */}
      {/* --- GARAGE EXTENSION --- */}
      {/* ======================================================== */}
      <group position={[-12.0, 0, -10.5]}>
        <RigidBody type="fixed" name="garage-ext">
          <CuboidCollider args={[4.2, 1.8, 3.2]} position={[0, 1.8, 0]} />
        </RigidBody>
        <mesh
          position={[0, 1.8, 0]}
          castShadow
          receiveShadow
          userData={{ cameraCollider: true }}
        >
          <boxGeometry args={[8.4, 3.6, 6.4]} />
          <meshStandardMaterial color="#e8e4dc" roughness={0.7} />
        </mesh>
        {/* Garage Roof */}
        <mesh
          position={[0, 3.75, 0]}
          castShadow
          receiveShadow
          userData={{ cameraCollider: true }}
        >
          <boxGeometry args={[8.8, 0.3, 6.8]} />
          <meshStandardMaterial color={roofColor} roughness={0.5} />
        </mesh>
        {/* Modern Sectional Garage Door */}
        <mesh position={[4.22, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.06, 2.8, 4.6]} />
          <meshStandardMaterial color="#505459" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* --- COMPLETE ACCESSIBLE INTERIOR --- */}
      {/* ======================================================== */}
      <Interior />
    </group>
  )
}
