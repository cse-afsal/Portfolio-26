import { RigidBody, CuboidCollider } from '@react-three/rapier'
import BuildingSign from './buildings/BuildingSign'

const BENCH_POSITIONS = [
  // West sidewalk benches
  { pos: [-5.6, 0.1, -16], rot: Math.PI / 2 },
  { pos: [-5.6, 0.1, 16], rot: Math.PI / 2 },
  { pos: [-5.6, 0.1, -48], rot: Math.PI / 2 },

  // East sidewalk benches
  { pos: [5.6, 0.1, -16], rot: -Math.PI / 2 },
  { pos: [5.6, 0.1, 16], rot: -Math.PI / 2 },
  { pos: [5.6, 0.1, 48], rot: -Math.PI / 2 },
]

const HYDRANT_POSITIONS = [
  [-4.8, 0.1, -26],
  [4.8, 0.1, 26],
]

function ParkBench({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <RigidBody type="fixed" name="bench">
        <CuboidCollider args={[0.9, 0.4, 0.35]} position={[0, 0.4, 0]} />
      </RigidBody>

      {/* Slatted Oak Seat */}
      <mesh position={[0, 0.42, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.04, 0.55]} />
        <meshStandardMaterial color="#825c38" roughness={0.6} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.72, -0.22]} rotation={[0.15, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.4, 0.04]} />
        <meshStandardMaterial color="#825c38" roughness={0.6} />
      </mesh>

      {/* Dark Cast Iron Legs */}
      {[-0.65, 0.65].map((xL, idx) => (
        <group key={`bl-${idx}`} position={[xL, 0.22, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.06, 0.44, 0.5]} />
            <meshStandardMaterial color="#26282b" roughness={0.4} metalness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function FireHydrant({ position }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" name="hydrant">
        <CuboidCollider args={[0.15, 0.35, 0.15]} position={[0, 0.35, 0]} />
      </RigidBody>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.7, 10]} />
        <meshStandardMaterial color="#b34032" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.13, 8, 8]} />
        <meshStandardMaterial color="#b34032" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  )
}

function WasteReceptacle({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.18, 0.95, 12]} />
        <meshStandardMaterial color="#3a3d42" roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Wooden Slat Wrap Accent */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.23, 0.23, 0.5, 12]} />
        <meshStandardMaterial color="#7a5836" roughness={0.7} />
      </mesh>
    </group>
  )
}

export default function StreetFurniture() {
  return (
    <group>
      {/* Benches */}
      {BENCH_POSITIONS.map((bench, idx) => (
        <ParkBench key={`bench-${idx}`} position={bench.pos} rotation={bench.rot} />
      ))}

      {/* Fire Hydrants */}
      {HYDRANT_POSITIONS.map((pos, idx) => (
        <FireHydrant key={`hydrant-${idx}`} position={pos} />
      ))}

      {/* Modern Waste Bins near crosswalks */}
      <WasteReceptacle position={[-5.8, 0.1, -1.8]} />
      <WasteReceptacle position={[5.8, 0.1, 1.8]} />

      {/* Main Home Entrance Sign */}
      <BuildingSign
        title="MAIN HOME"
        subtitle="Private Residence"
        position={[-4.5, 0, 2.2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.0}
      />
    </group>
  )
}

