import { RigidBody, CuboidCollider } from '@react-three/rapier'
import LivingRoom from './LivingRoom'
import KitchenDining from './KitchenDining'
import Stairs from './Stairs'
import UpperFloor from './UpperFloor'
import InteractiveObject from '../InteractiveObject'
import useGameStore from '../../store/useGameStore'

export default function Interior() {
  const floorWoodColor = '#a07d57'   // rich warm oak hardwood flooring
  const interiorWallColor = '#f4f1ea' // soft warm off-white interior wall

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
    <group>
      {/* ======================================================== */}
      {/* --- GROUND FLOOR HARDWOOD FLOORING & SUBFLOOR --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="ground-floor-slab">
        <CuboidCollider args={[4.9, 0.1, 6.9]} position={[-12.0, 0.0, 0.0]} />
      </RigidBody>
      <mesh position={[-12.0, 0.01, 0.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9.8, 13.8]} />
        <meshStandardMaterial color={floorWoodColor} roughness={0.65} metalness={0.05} />
      </mesh>

      {/* ======================================================== */}
      {/* --- INTERIOR PARTITION WALLS & ARCHITECTURAL ELEMENTS --- */}
      {/* ======================================================== */}
      {/* Divider wall between kitchen and living/staircore */}
      <RigidBody type="fixed" name="interior-partition">
        <CuboidCollider args={[0.1, 1.6, 2.0]} position={[-13.5, 1.6, -1.0]} />
        {/* Entrance foyer partition */}
        <CuboidCollider args={[0.8, 1.6, 0.1]} position={[-8.0, 1.6, 1.2]} />
      </RigidBody>

      {/* Visual partition meshes */}
      <mesh
        position={[-13.5, 1.6, -1.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[0.2, 3.2, 4.0]} />
        <meshStandardMaterial color={interiorWallColor} roughness={0.8} />
      </mesh>

      <mesh
        position={[-8.0, 1.6, 1.2]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[1.6, 3.2, 0.2]} />
        <meshStandardMaterial color={interiorWallColor} roughness={0.8} />
      </mesh>

      {/* ======================================================== */}
      {/* --- WARM INTERIOR AMBIENT LIGHTING --- */}
      {/* ======================================================== */}
      {/* Living room warm ceiling bounce */}
      <pointLight position={[-11.5, 2.8, -3.5]} intensity={0.4} distance={9} color="#fff1db" />
      {/* Kitchen downlights */}
      <pointLight position={[-15.0, 2.8, 4.0]} intensity={0.45} distance={8} color="#fff4e6" />
      {/* Foyer welcome light */}
      <pointLight position={[-8.0, 2.7, 0.0]} intensity={0.35} distance={6} color="#ffe8cc" />
      {/* Upper floor hallway downlight */}
      <pointLight position={[-13.0, 5.8, 1.0]} intensity={0.4} distance={10} color="#fff2df" />

      {/* ======================================================== */}
      {/* --- LIVING ROOM, KITCHEN, STAIRS, UPPER FLOOR --- */}
      {/* ======================================================== */}
      <LivingRoom />
      <KitchenDining />
      <Stairs />
      <UpperFloor />

      {/* ======================================================== */}
      {/* --- INTERIOR EXIT DOOR PROMPT (SMOOTH TRANSITION) --- */}
      {/* ======================================================== */}
      <InteractiveObject
        id="door-interior"
        name="Front Door"
        position={[-7.6, 1.0, 0]}
        range={1.8}
        promptText="Press E to Exit to Street"
        showBeacon={false}
        onInteract={() => triggerDoorTransition([-5.6, 0.8, 0])}
      />
    </group>
  )
}

