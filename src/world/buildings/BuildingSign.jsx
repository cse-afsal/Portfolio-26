import { Text } from '@react-three/drei'

export default function BuildingSign({
  title = 'BUILDING',
  subtitle = 'District',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Stone / Concrete Base Plinth */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#8a8780" roughness={0.9} />
      </mesh>

      {/* Modern Charcoal Steel Signboard Face */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.0, 0.12]} />
        <meshStandardMaterial color="#26282b" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Subtle Bronze / Gold Inset Border Accent */}
      <mesh position={[0, 0.8, 0.065]}>
        <boxGeometry args={[1.3, 0.9, 0.01]} />
        <meshStandardMaterial color="#3a3d42" roughness={0.5} />
      </mesh>

      {/* Architectural Primary Title Text */}
      <Text
        position={[0, 0.92, 0.075]}
        fontSize={0.12}
        color="#f5f2eb"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        fontWeight="bold"
      >
        {title.toUpperCase()}
      </Text>

      {/* Subtitle / Department Text */}
      <Text
        position={[0, 0.74, 0.075]}
        fontSize={0.065}
        color="#d4af37"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {subtitle.toUpperCase()}
      </Text>

      {/* Small Decorative Status Indicator Dot */}
      <mesh position={[0, 0.58, 0.075]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#88c070" emissive="#88c070" emissiveIntensity={0.6} />
      </mesh>

      {/* Upward Architectural Accent Light */}
      <pointLight position={[0, 0.35, 0.25]} intensity={0.4} distance={2} color="#fff6e8" />
    </group>
  )
}
