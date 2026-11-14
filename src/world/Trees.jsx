import { RigidBody, CuboidCollider } from '@react-three/rapier'

const TREE_DATA = [
  // West side trees (along sidewalks and properties)
  { pos: [-9.5, 0, -65], scale: 1.1, type: 'oak' },
  { pos: [-9.5, 0, -50], scale: 0.95, type: 'pine' },
  { pos: [-24, 0, -42], scale: 1.3, type: 'oak' },
  { pos: [-24, 0, -22], scale: 1.1, type: 'oak' },
  { pos: [-9.5, 0, -18], scale: 1.0, type: 'pine' },
  { pos: [-25, 0, -10], scale: 1.25, type: 'oak' },
  { pos: [-25, 0, 10], scale: 1.2, type: 'oak' },
  { pos: [-9.5, 0, 18], scale: 0.9, type: 'pine' },
  { pos: [-24, 0, 22], scale: 1.15, type: 'oak' },
  { pos: [-24, 0, 42], scale: 1.3, type: 'oak' },
  { pos: [-9.5, 0, 50], scale: 1.05, type: 'pine' },
  { pos: [-9.5, 0, 65], scale: 1.2, type: 'oak' },

  // East side trees (along sidewalks and properties)
  { pos: [9.5, 0, -65], scale: 1.15, type: 'pine' },
  { pos: [9.5, 0, -50], scale: 0.9, type: 'oak' },
  { pos: [26, 0, -42], scale: 1.35, type: 'oak' },
  { pos: [26, 0, -22], scale: 1.1, type: 'pine' },
  { pos: [9.5, 0, -18], scale: 1.05, type: 'oak' },
  { pos: [26, 0, -12], scale: 1.2, type: 'oak' },
  { pos: [26, 0, 12], scale: 1.2, type: 'oak' },
  { pos: [9.5, 0, 18], scale: 1.0, type: 'pine' },
  { pos: [26, 0, 22], scale: 1.1, type: 'pine' },
  { pos: [26, 0, 42], scale: 1.25, type: 'oak' },
  { pos: [9.5, 0, 50], scale: 0.95, type: 'oak' },
  { pos: [9.5, 0, 65], scale: 1.15, type: 'pine' },
]

function Tree({ position, scale = 1, type = 'oak' }) {
  const trunkHeight = 2.6 * scale
  const trunkRadius = 0.16 * scale
  const canopyRadius = 1.6 * scale

  if (type === 'pine') {
    return (
      <group position={position}>
        <RigidBody type="fixed" name="tree-trunk">
          <CuboidCollider
            args={[trunkRadius, trunkHeight / 2, trunkRadius]}
            position={[0, trunkHeight / 2, 0]}
          />
        </RigidBody>
        {/* Trunk */}
        <mesh castShadow receiveShadow position={[0, trunkHeight / 2, 0]}>
          <cylinderGeometry args={[trunkRadius, trunkRadius * 1.4, trunkHeight, 6]} />
          <meshStandardMaterial color="#543c25" roughness={0.9} />
        </mesh>
        {/* Tiered Pine Cones */}
        {[0, 1.2, 2.2].map((yOff, idx) => (
          <mesh
            key={`cone-${idx}`}
            castShadow
            position={[0, trunkHeight + yOff * 0.8 * scale, 0]}
          >
            <coneGeometry
              args={[(1.5 - idx * 0.35) * scale, 1.8 * scale, 7]}
            />
            <meshStandardMaterial color="#3c5c36" roughness={0.8} />
          </mesh>
        ))}
      </group>
    )
  }

  // Standard Deciduous Oak
  return (
    <group position={position}>
      <RigidBody type="fixed" name="tree-trunk">
        <CuboidCollider
          args={[trunkRadius, trunkHeight / 2, trunkRadius]}
          position={[0, trunkHeight / 2, 0]}
        />
      </RigidBody>

      {/* Trunk */}
      <mesh castShadow receiveShadow position={[0, trunkHeight / 2, 0]}>
        <cylinderGeometry args={[trunkRadius, trunkRadius * 1.3, trunkHeight, 6]} />
        <meshStandardMaterial color="#63472d" roughness={0.9} />
      </mesh>

      {/* Lower Canopy */}
      <mesh
        castShadow
        receiveShadow
        position={[0, trunkHeight + canopyRadius * 0.6, 0]}
      >
        <sphereGeometry args={[canopyRadius, 8, 8]} />
        <meshStandardMaterial color="#4a7a3a" roughness={0.85} />
      </mesh>

      {/* Upper Canopy Layer */}
      <mesh
        castShadow
        position={[0, trunkHeight + canopyRadius * 1.2, 0]}
      >
        <sphereGeometry args={[canopyRadius * 0.7, 6, 6]} />
        <meshStandardMaterial color="#5a8c48" roughness={0.85} />
      </mesh>
    </group>
  )
}

export default function Trees() {
  return (
    <group>
      {TREE_DATA.map((tree, i) => (
        <Tree
          key={i}
          position={tree.pos}
          scale={tree.scale}
          type={tree.type}
        />
      ))}
    </group>
  )
}
