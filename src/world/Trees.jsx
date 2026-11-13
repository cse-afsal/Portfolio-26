import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

const TREE_DATA = [
  { pos: [-18, 0, 15], scale: 1.0 },
  { pos: [-20, 0, -10], scale: 1.2 },
  { pos: [-16, 0, 30], scale: 0.9 },
  { pos: [-22, 0, -25], scale: 1.1 },
  { pos: [10, 0, 20], scale: 1.0 },
  { pos: [12, 0, -15], scale: 1.15 },
  { pos: [14, 0, 35], scale: 0.85 },
  { pos: [11, 0, -30], scale: 1.05 },
  { pos: [-25, 0, 0], scale: 1.3 },
  { pos: [18, 0, 5], scale: 0.95 },
];

function Tree({ position, scale = 1 }) {
  const trunkHeight = 2.5 * scale;
  const trunkRadius = 0.15 * scale;
  const canopyRadius = 1.5 * scale;

  return (
    <group position={position}>
      <RigidBody type="fixed" name="tree-trunk">
        <CuboidCollider args={[trunkRadius, trunkHeight / 2, trunkRadius]} position={[0, trunkHeight / 2, 0]} />
      </RigidBody>

      {/* Trunk */}
      <mesh castShadow receiveShadow position={[0, trunkHeight / 2, 0]}>
        <cylinderGeometry args={[trunkRadius, trunkRadius * 1.3, trunkHeight, 6]} />
        <meshStandardMaterial color="#6b4a2a" roughness={0.9} metalness={0} />
      </mesh>

      {/* Canopy */}
      <mesh castShadow receiveShadow position={[0, trunkHeight + canopyRadius * 0.6, 0]}>
        <sphereGeometry args={[canopyRadius, 8, 8]} />
        <meshStandardMaterial color="#4a7a3a" roughness={0.85} metalness={0} />
      </mesh>

      {/* Second smaller canopy layer for fullness */}
      <mesh castShadow position={[0, trunkHeight + canopyRadius * 1.2, 0]}>
        <sphereGeometry args={[canopyRadius * 0.65, 6, 6]} />
        <meshStandardMaterial color="#5a8a4a" roughness={0.85} metalness={0} />
      </mesh>
    </group>
  );
}

export default function Trees() {
  return (
    <group>
      {TREE_DATA.map((tree, i) => (
        <Tree key={i} position={tree.pos} scale={tree.scale} />
      ))}
    </group>
  );
}
