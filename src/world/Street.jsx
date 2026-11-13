import { RigidBody, CuboidCollider } from '@react-three/rapier';

export default function Street() {
  const streetLength = 80;
  const streetWidth = 8;
  const sidewalkWidth = 2;
  const sidewalkHeight = 0.1;
  const curbHeight = 0.12;
  const curbWidth = 0.15;

  return (
    <group>
      {/* Main road surface */}
      <RigidBody type="fixed" name="road">
        <CuboidCollider args={[streetWidth / 2, 0.05, streetLength / 2]} position={[0, -0.05, 0]} />
        <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[streetWidth, streetLength]} />
          <meshStandardMaterial color="#404040" roughness={0.85} metalness={0} />
        </mesh>
      </RigidBody>

      {/* Center line markings */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, streetLength]} />
        <meshStandardMaterial color="#888888" roughness={0.7} />
      </mesh>

      {/* Left sidewalk */}
      <RigidBody type="fixed" name="sidewalk-left">
        <CuboidCollider
          args={[sidewalkWidth / 2, sidewalkHeight / 2, streetLength / 2]}
          position={[-(streetWidth / 2 + curbWidth + sidewalkWidth / 2), sidewalkHeight / 2, 0]}
        />
        <mesh
          receiveShadow
          castShadow
          position={[-(streetWidth / 2 + curbWidth + sidewalkWidth / 2), sidewalkHeight / 2, 0]}
        >
          <boxGeometry args={[sidewalkWidth, sidewalkHeight, streetLength]} />
          <meshStandardMaterial color="#c8c0b8" roughness={0.8} metalness={0} />
        </mesh>
      </RigidBody>

      {/* Right sidewalk */}
      <RigidBody type="fixed" name="sidewalk-right">
        <CuboidCollider
          args={[sidewalkWidth / 2, sidewalkHeight / 2, streetLength / 2]}
          position={[streetWidth / 2 + curbWidth + sidewalkWidth / 2, sidewalkHeight / 2, 0]}
        />
        <mesh
          receiveShadow
          castShadow
          position={[streetWidth / 2 + curbWidth + sidewalkWidth / 2, sidewalkHeight / 2, 0]}
        >
          <boxGeometry args={[sidewalkWidth, sidewalkHeight, streetLength]} />
          <meshStandardMaterial color="#c8c0b8" roughness={0.8} metalness={0} />
        </mesh>
      </RigidBody>

      {/* Left curb */}
      <RigidBody type="fixed" name="curb-left">
        <CuboidCollider
          args={[curbWidth / 2, curbHeight / 2, streetLength / 2]}
          position={[-(streetWidth / 2 + curbWidth / 2), curbHeight / 2, 0]}
        />
        <mesh
          receiveShadow
          castShadow
          position={[-(streetWidth / 2 + curbWidth / 2), curbHeight / 2, 0]}
        >
          <boxGeometry args={[curbWidth, curbHeight, streetLength]} />
          <meshStandardMaterial color="#a09888" roughness={0.8} metalness={0} />
        </mesh>
      </RigidBody>

      {/* Right curb */}
      <RigidBody type="fixed" name="curb-right">
        <CuboidCollider
          args={[curbWidth / 2, curbHeight / 2, streetLength / 2]}
          position={[streetWidth / 2 + curbWidth / 2, curbHeight / 2, 0]}
        />
        <mesh
          receiveShadow
          castShadow
          position={[streetWidth / 2 + curbWidth / 2, curbHeight / 2, 0]}
        >
          <boxGeometry args={[curbWidth, curbHeight, streetLength]} />
          <meshStandardMaterial color="#a09888" roughness={0.8} metalness={0} />
        </mesh>
      </RigidBody>
    </group>
  );
}
