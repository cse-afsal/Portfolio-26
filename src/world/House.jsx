import { RigidBody, CuboidCollider } from '@react-three/rapier';

function Window({ position, size = [0.8, 1, 0.05] }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#2a3a4a" roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

function Bush({ position, scale = 1 }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.5 * scale, 8, 8]} />
      <meshStandardMaterial color="#5a7a4a" roughness={0.9} />
    </mesh>
  );
}

export default function House() {
  const houseX = -12;
  const wallWidth = 8;
  const wallHeight = 6;
  const wallDepth = 10;

  return (
    <group position={[houseX, 0, 0]}>
      <RigidBody type="fixed" name="house">
        <CuboidCollider args={[wallWidth / 2, wallHeight / 2, wallDepth / 2]} position={[0, wallHeight / 2, 0]} />

        {/* Main walls */}
        <mesh
          position={[0, wallHeight / 2, 0]}
          castShadow
          receiveShadow
          userData={{ cameraCollider: true }}
        >
          <boxGeometry args={[wallWidth, wallHeight, wallDepth]} />
          <meshStandardMaterial color="#f0ece4" roughness={0.7} metalness={0} />
        </mesh>

        {/* Roof - flat with slight overhang */}
        <mesh
          position={[0, wallHeight + 0.15, 0]}
          castShadow
          receiveShadow
          userData={{ cameraCollider: true }}
        >
          <boxGeometry args={[wallWidth + 0.6, 0.3, wallDepth + 0.6]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Front door (facing +x) */}
        <mesh position={[wallWidth / 2 + 0.02, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 2.4, 1.2]} />
          <meshStandardMaterial color="#8b6b4a" roughness={0.6} metalness={0} />
        </mesh>

        {/* Door frame */}
        <mesh position={[wallWidth / 2 + 0.03, 1.2, 0]}>
          <boxGeometry args={[0.02, 2.5, 1.4]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.5} />
        </mesh>

        {/* Front windows (facing +x) */}
        <Window position={[wallWidth / 2 + 0.03, 3.8, -2.5]} size={[0.05, 1.2, 1.4]} />
        <Window position={[wallWidth / 2 + 0.03, 3.8, 2.5]} size={[0.05, 1.2, 1.4]} />

        {/* Side windows (facing +z) */}
        <Window position={[-1.5, 3.5, wallDepth / 2 + 0.03]} size={[1.2, 1.2, 0.05]} />
        <Window position={[1.5, 3.5, wallDepth / 2 + 0.03]} size={[1.2, 1.2, 0.05]} />

        {/* Side windows (facing -z) */}
        <Window position={[-1.5, 3.5, -(wallDepth / 2 + 0.03)]} size={[1.2, 1.2, 0.05]} />
        <Window position={[1.5, 3.5, -(wallDepth / 2 + 0.03)]} size={[1.2, 1.2, 0.05]} />
      </RigidBody>

      {/* Garage extension */}
      <RigidBody type="fixed" name="garage">
        <CuboidCollider args={[3, 2, 3]} position={[0, 2, -(wallDepth / 2 + 3)]} />
        <mesh
          position={[0, 2, -(wallDepth / 2 + 3)]}
          castShadow
          receiveShadow
          userData={{ cameraCollider: true }}
        >
          <boxGeometry args={[6, 4, 6]} />
          <meshStandardMaterial color="#e8e4dc" roughness={0.7} metalness={0} />
        </mesh>

        {/* Garage roof */}
        <mesh
          position={[0, 4.15, -(wallDepth / 2 + 3)]}
          castShadow
          receiveShadow
          userData={{ cameraCollider: true }}
        >
          <boxGeometry args={[6.4, 0.3, 6.4]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Garage door (facing +x) */}
        <mesh position={[3.02, 1.5, -(wallDepth / 2 + 3)]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 3, 4]} />
          <meshStandardMaterial color="#6a6a6a" roughness={0.5} metalness={0.2} />
        </mesh>
      </RigidBody>

      {/* Entrance path from sidewalk to door */}
      <mesh receiveShadow position={[wallWidth / 2 + 3, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 1.5]} />
        <meshStandardMaterial color="#c8c0b8" roughness={0.8} />
      </mesh>

      {/* Front garden - bushes */}
      <Bush position={[wallWidth / 2 + 0.8, 0.4, 3]} scale={0.8} />
      <Bush position={[wallWidth / 2 + 0.8, 0.35, -3]} scale={0.7} />
      <Bush position={[wallWidth / 2 + 1.5, 0.3, 1.8]} scale={0.6} />
      <Bush position={[wallWidth / 2 + 1.5, 0.3, -1.8]} scale={0.6} />

      {/* Low front hedge (along the front yard) */}
      <mesh position={[wallWidth / 2 + 3, 0.3, 3.5]} castShadow>
        <boxGeometry args={[6, 0.6, 0.4]} />
        <meshStandardMaterial color="#4a6a3a" roughness={0.9} />
      </mesh>
      <mesh position={[wallWidth / 2 + 3, 0.3, -3.5]} castShadow>
        <boxGeometry args={[6, 0.6, 0.4]} />
        <meshStandardMaterial color="#4a6a3a" roughness={0.9} />
      </mesh>
    </group>
  );
}
