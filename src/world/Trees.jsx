import { Instances, Instance } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'

const OAK_TREES = [
  { pos: [-9.5, 0, -65], scale: 1.1 },
  { pos: [-24, 0, -42], scale: 1.3 },
  { pos: [-24, 0, -22], scale: 1.1 },
  { pos: [-25, 0, -10], scale: 1.25 },
  { pos: [-25, 0, 10], scale: 1.2 },
  { pos: [-24, 0, 22], scale: 1.15 },
  { pos: [-24, 0, 42], scale: 1.3 },
  { pos: [-9.5, 0, 65], scale: 1.2 },
  { pos: [9.5, 0, -50], scale: 0.9 },
  { pos: [26, 0, -42], scale: 1.35 },
  { pos: [9.5, 0, -18], scale: 1.05 },
  { pos: [26, 0, -12], scale: 1.2 },
  { pos: [26, 0, 12], scale: 1.2 },
  { pos: [9.5, 0, 50], scale: 0.95 },
]

const PINE_TREES = [
  { pos: [-9.5, 0, -50], scale: 0.95 },
  { pos: [-9.5, 0, -18], scale: 1.0 },
  { pos: [-9.5, 0, 18], scale: 0.9 },
  { pos: [-9.5, 0, 50], scale: 1.05 },
  { pos: [9.5, 0, -65], scale: 1.15 },
  { pos: [26, 0, -22], scale: 1.1 },
  { pos: [9.5, 0, 18], scale: 1.0 },
  { pos: [26, 0, 22], scale: 1.1 },
  { pos: [26, 0, 42], scale: 1.25 },
  { pos: [9.5, 0, 65], scale: 1.15 },
]

export default function Trees() {
  return (
    <group>
      {/* Physical Trunk Colliders for All Trees */}
      <RigidBody type="fixed" name="tree-colliders">
        {OAK_TREES.map((t, i) => (
          <CuboidCollider
            key={`oak-col-${i}`}
            args={[0.18 * t.scale, (2.6 * t.scale) / 2, 0.18 * t.scale]}
            position={[t.pos[0], (2.6 * t.scale) / 2, t.pos[2]]}
          />
        ))}
        {PINE_TREES.map((t, i) => (
          <CuboidCollider
            key={`pine-col-${i}`}
            args={[0.18 * t.scale, (2.6 * t.scale) / 2, 0.18 * t.scale]}
            position={[t.pos[0], (2.6 * t.scale) / 2, t.pos[2]]}
          />
        ))}
      </RigidBody>

      {/* ======================================================== */}
      {/* --- OAK TREES (INSTANCED CANOPY & TRUNKS) --- */}
      {/* ======================================================== */}
      {/* 1. Oak Trunks */}
      <Instances range={OAK_TREES.length}>
        <cylinderGeometry args={[0.16, 0.22, 2.6, 6]} />
        <meshStandardMaterial color="#63472d" roughness={0.9} />
        {OAK_TREES.map((t, i) => (
          <Instance
            key={`oak-trunk-${i}`}
            position={[t.pos[0], (2.6 * t.scale) / 2, t.pos[2]]}
            scale={[t.scale, t.scale, t.scale]}
          />
        ))}
      </Instances>

      {/* 2. Oak Lower Canopies */}
      <Instances range={OAK_TREES.length}>
        <sphereGeometry args={[1.6, 8, 8]} />
        <meshStandardMaterial color="#4a7a3a" roughness={0.85} />
        {OAK_TREES.map((t, i) => (
          <Instance
            key={`oak-canopy1-${i}`}
            position={[t.pos[0], 2.6 * t.scale + 1.6 * t.scale * 0.6, t.pos[2]]}
            scale={[t.scale, t.scale * 0.9, t.scale]}
          />
        ))}
      </Instances>

      {/* 3. Oak Upper Canopies */}
      <Instances range={OAK_TREES.length}>
        <sphereGeometry args={[1.15, 6, 6]} />
        <meshStandardMaterial color="#558842" roughness={0.85} />
        {OAK_TREES.map((t, i) => (
          <Instance
            key={`oak-canopy2-${i}`}
            position={[t.pos[0], 2.6 * t.scale + 1.6 * t.scale * 1.2, t.pos[2]]}
            scale={[t.scale, t.scale * 0.85, t.scale]}
          />
        ))}
      </Instances>

      {/* ======================================================== */}
      {/* --- PINE TREES (INSTANCED TIERS & TRUNKS) --- */}
      {/* ======================================================== */}
      {/* 4. Pine Trunks */}
      <Instances range={PINE_TREES.length}>
        <cylinderGeometry args={[0.16, 0.23, 2.6, 6]} />
        <meshStandardMaterial color="#543c25" roughness={0.9} />
        {PINE_TREES.map((t, i) => (
          <Instance
            key={`pine-trunk-${i}`}
            position={[t.pos[0], (2.6 * t.scale) / 2, t.pos[2]]}
            scale={[t.scale, t.scale, t.scale]}
          />
        ))}
      </Instances>

      {/* 5. Pine Lower Cones */}
      <Instances range={PINE_TREES.length}>
        <coneGeometry args={[1.5, 1.8, 7]} />
        <meshStandardMaterial color="#3c5c36" roughness={0.8} />
        {PINE_TREES.map((t, i) => (
          <Instance
            key={`pine-c1-${i}`}
            position={[t.pos[0], 2.6 * t.scale + 0.9 * t.scale, t.pos[2]]}
            scale={[t.scale, t.scale, t.scale]}
          />
        ))}
      </Instances>

      {/* 6. Pine Middle Cones */}
      <Instances range={PINE_TREES.length}>
        <coneGeometry args={[1.15, 1.8, 7]} />
        <meshStandardMaterial color="#355230" roughness={0.8} />
        {PINE_TREES.map((t, i) => (
          <Instance
            key={`pine-c2-${i}`}
            position={[t.pos[0], 2.6 * t.scale + 1.85 * t.scale, t.pos[2]]}
            scale={[t.scale, t.scale, t.scale]}
          />
        ))}
      </Instances>

      {/* 7. Pine Top Cones */}
      <Instances range={PINE_TREES.length}>
        <coneGeometry args={[0.8, 1.8, 7]} />
        <meshStandardMaterial color="#2f492a" roughness={0.8} />
        {PINE_TREES.map((t, i) => (
          <Instance
            key={`pine-c3-${i}`}
            position={[t.pos[0], 2.6 * t.scale + 2.75 * t.scale, t.pos[2]]}
            scale={[t.scale, t.scale, t.scale]}
          />
        ))}
      </Instances>
    </group>
  )
}
