import { RigidBody, CuboidCollider } from '@react-three/rapier';

const LAMP_POSITIONS = [
  [5.5, 0, -30],
  [5.5, 0, -15],
  [5.5, 0, 0],
  [5.5, 0, 15],
  [5.5, 0, 30],
  [-5.5, 0, -22],
];

function StreetLamp({ position }) {
  const poleHeight = 5;
  const poleRadius = 0.06;

  return (
    <group position={position}>
      <RigidBody type="fixed" name="lamp">
        <CuboidCollider args={[0.1, poleHeight / 2, 0.1]} position={[0, poleHeight / 2, 0]} />
      </RigidBody>

      {/* Pole */}
      <mesh castShadow position={[0, poleHeight / 2, 0]}>
        <cylinderGeometry args={[poleRadius, poleRadius * 1.5, poleHeight, 6]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Arm extending outward */}
      <mesh castShadow position={[0.4, poleHeight - 0.1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.03, 0.03, 1, 4]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Lamp head */}
      <mesh castShadow position={[0.7, poleHeight + 0.1, 0]}>
        <boxGeometry args={[0.4, 0.15, 0.25]} />
        <meshStandardMaterial color="#5a5a5a" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Light bulb glow */}
      <mesh position={[0.7, poleHeight, 0]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color="#fff5e0" emissive="#fff5e0" emissiveIntensity={0.5} />
      </mesh>

      {/* Point light */}
      <pointLight
        position={[0.7, poleHeight - 0.2, 0]}
        color="#fff5e0"
        intensity={0.3}
        distance={15}
        castShadow={false}
      />
    </group>
  );
}

export default function StreetLamps() {
  return (
    <group>
      {LAMP_POSITIONS.map((pos, i) => (
        <StreetLamp key={i} position={pos} />
      ))}
    </group>
  );
}
