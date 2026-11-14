import { RigidBody, CuboidCollider } from '@react-three/rapier'

export default function Ground() {
  return (
    <RigidBody type="fixed" name="ground">
      <CuboidCollider args={[100, 0.1, 100]} position={[0, -0.1, 0]} />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#7a9a6d" roughness={0.9} metalness={0} />
      </mesh>
    </RigidBody>
  )
}
