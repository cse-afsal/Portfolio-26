import { RigidBody, CuboidCollider } from '@react-three/rapier'

const LAMP_DATA = [
  // West Sidewalk Lamps (arm faces +X toward street)
  { pos: [-5.5, 0, -60], rot: 0 },
  { pos: [-5.5, 0, -45], rot: 0 },
  { pos: [-5.5, 0, -30], rot: 0 },
  { pos: [-5.5, 0, -15], rot: 0 },
  { pos: [-5.5, 0, 0], rot: 0 },
  { pos: [-5.5, 0, 15], rot: 0 },
  { pos: [-5.5, 0, 30], rot: 0 },
  { pos: [-5.5, 0, 45], rot: 0 },
  { pos: [-5.5, 0, 60], rot: 0 },

  // East Sidewalk Lamps (arm faces -X toward street)
  { pos: [5.5, 0, -52], rot: Math.PI },
  { pos: [5.5, 0, -37], rot: Math.PI },
  { pos: [5.5, 0, -22], rot: Math.PI },
  { pos: [5.5, 0, -8], rot: Math.PI },
  { pos: [5.5, 0, 8], rot: Math.PI },
  { pos: [5.5, 0, 22], rot: Math.PI },
  { pos: [5.5, 0, 37], rot: Math.PI },
  { pos: [5.5, 0, 52], rot: Math.PI },
]

function StreetLamp({ position, rotation = 0 }) {
  const poleHeight = 5.2
  const poleRadius = 0.06

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <RigidBody type="fixed" name="lamp">
        <CuboidCollider args={[0.12, poleHeight / 2, 0.12]} position={[0, poleHeight / 2, 0]} />
      </RigidBody>

      {/* Pole */}
      <mesh castShadow position={[0, poleHeight / 2, 0]}>
        <cylinderGeometry args={[poleRadius, poleRadius * 1.5, poleHeight, 6]} />
        <meshStandardMaterial color="#3d4044" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Arm extending outward toward road */}
      <mesh castShadow position={[0.45, poleHeight - 0.1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.03, 0.03, 1.1, 4]} />
        <meshStandardMaterial color="#3d4044" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Lamp head */}
      <mesh castShadow position={[0.78, poleHeight + 0.12, 0]}>
        <boxGeometry args={[0.42, 0.15, 0.25]} />
        <meshStandardMaterial color="#4a4d52" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Light bulb glow */}
      <mesh position={[0.78, poleHeight, 0]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color="#fff5e0" emissive="#fff5e0" emissiveIntensity={0.6} />
      </mesh>

      {/* Point light */}
      <pointLight
        position={[0.78, poleHeight - 0.2, 0]}
        color="#fff5e0"
        intensity={0.35}
        distance={14}
        castShadow={false}
      />
    </group>
  )
}

export default function StreetLamps() {
  return (
    <group>
      {LAMP_DATA.map((lamp, i) => (
        <StreetLamp key={i} position={lamp.pos} rotation={lamp.rot} />
      ))}
    </group>
  )
}
