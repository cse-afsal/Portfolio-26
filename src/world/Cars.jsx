import { RigidBody, CuboidCollider } from '@react-three/rapier'

const CAR_DATA = [
  // Curbside parked cars
  { pos: [3.0, 0, -48], rotation: 0, color: '#e8e4e0' },       // White sedan (East curb)
  { pos: [-3.0, 0, -20], rotation: Math.PI, color: '#b0b0b0' }, // Silver hatchback (West curb)
  { pos: [3.0, 0, -12], rotation: 0, color: '#33383e' },        // Dark charcoal sedan (East curb)
  { pos: [-3.0, 0, 16], rotation: Math.PI, color: '#5a7088' },  // Slate blue sedan (West curb)
  { pos: [3.0, 0, 48], rotation: 0, color: '#d8d4cb' },        // Warm cream wagon (East curb)
  { pos: [-3.0, 0, 52], rotation: Math.PI, color: '#3d4f40' },  // Forest green compact (West curb)

  // Driveway parked cars
  { pos: [-8.5, 0, -32], rotation: Math.PI / 2, color: '#44484d' }, // Skills House driveway
  { pos: [8.5, 0, 32], rotation: -Math.PI / 2, color: '#ece8e1' },   // Contact House driveway
  { pos: [8.5, 0, 0], rotation: -Math.PI / 2, color: '#2b2d30' },    // Project Studio parking bay
]

function Wheel({ position }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
      <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
    </mesh>
  )
}

function Car({ position, rotation = 0, color = '#e8e4e0' }) {
  const bodyWidth = 1.8
  const bodyHeight = 0.6
  const bodyLength = 4.0
  const cabinWidth = 1.6
  const cabinHeight = 0.55
  const cabinLength = 2.0

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <RigidBody type="fixed" name="car">
        <CuboidCollider
          args={[bodyWidth / 2, (bodyHeight + cabinHeight) / 2, bodyLength / 2]}
          position={[0, 0.3 + bodyHeight / 2, 0]}
        />

        {/* Car body */}
        <mesh
          position={[0, 0.3 + bodyHeight / 2, 0]}
          castShadow
          receiveShadow
          userData={{ cameraCollider: true }}
        >
          <boxGeometry args={[bodyWidth, bodyHeight, bodyLength]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Car cabin/roof */}
        <mesh
          position={[0, 0.3 + bodyHeight + cabinHeight / 2, -0.2]}
          castShadow
          receiveShadow
          userData={{ cameraCollider: true }}
        >
          <boxGeometry args={[cabinWidth, cabinHeight, cabinLength]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Windshield front */}
        <mesh position={[0, 0.3 + bodyHeight + cabinHeight * 0.3, cabinLength / 2 - 0.18]} castShadow>
          <boxGeometry args={[cabinWidth - 0.1, cabinHeight * 0.7, 0.05]} />
          <meshStandardMaterial color="#3a5a6a" roughness={0.1} metalness={0.3} opacity={0.7} transparent />
        </mesh>

        {/* Windshield rear */}
        <mesh position={[0, 0.3 + bodyHeight + cabinHeight * 0.3, -cabinLength / 2 - 0.22]} castShadow>
          <boxGeometry args={[cabinWidth - 0.1, cabinHeight * 0.7, 0.05]} />
          <meshStandardMaterial color="#3a5a6a" roughness={0.1} metalness={0.3} opacity={0.7} transparent />
        </mesh>

        {/* Headlights */}
        <mesh position={[0.6, 0.5, bodyLength / 2 + 0.01]}>
          <boxGeometry args={[0.3, 0.15, 0.02]} />
          <meshStandardMaterial color="#ffffcc" emissive="#ffffcc" emissiveIntensity={0.1} />
        </mesh>
        <mesh position={[-0.6, 0.5, bodyLength / 2 + 0.01]}>
          <boxGeometry args={[0.3, 0.15, 0.02]} />
          <meshStandardMaterial color="#ffffcc" emissive="#ffffcc" emissiveIntensity={0.1} />
        </mesh>

        {/* Taillights */}
        <mesh position={[0.6, 0.5, -(bodyLength / 2 + 0.01)]}>
          <boxGeometry args={[0.3, 0.15, 0.02]} />
          <meshStandardMaterial color="#cc3333" emissive="#cc3333" emissiveIntensity={0.1} />
        </mesh>
        <mesh position={[-0.6, 0.5, -(bodyLength / 2 + 0.01)]}>
          <boxGeometry args={[0.3, 0.15, 0.02]} />
          <meshStandardMaterial color="#cc3333" emissive="#cc3333" emissiveIntensity={0.1} />
        </mesh>
      </RigidBody>

      {/* Wheels */}
      <Wheel position={[bodyWidth / 2 + 0.1, 0.3, 1.2]} />
      <Wheel position={[-(bodyWidth / 2 + 0.1), 0.3, 1.2]} />
      <Wheel position={[bodyWidth / 2 + 0.1, 0.3, -1.2]} />
      <Wheel position={[-(bodyWidth / 2 + 0.1), 0.3, -1.2]} />
    </group>
  )
}

export default function Cars() {
  return (
    <group>
      {CAR_DATA.map((car, i) => (
        <Car key={i} position={car.pos} rotation={car.rotation} color={car.color} />
      ))}
    </group>
  )
}
