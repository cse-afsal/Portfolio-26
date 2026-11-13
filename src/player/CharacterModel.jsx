import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Procedural realistic human character with natural walking/running limb animation
// Casual button shirt (light cream) and jeans (dark blue-grey)
export default function CharacterModel({ isMoving = false, isRunning = false }) {
  const shirtColor = '#e8dcc8'    // warm cream for button shirt
  const jeansColor = '#3d4f6a'    // dark blue-grey for jeans
  const skinColor = '#d4a574'     // natural skin tone
  const hairColor = '#3a2a1a'     // dark brown hair
  const shoeColor = '#4a3728'     // brown shoes

  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const bodyGroupRef = useRef()
  const animTime = useRef(0)

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    
    if (isMoving) {
      // Faster cycle when running
      const speed = isRunning ? 12 : 7
      animTime.current += dt * speed
      
      const swingAngle = isRunning ? 0.65 : 0.4
      const legSwing = Math.sin(animTime.current) * swingAngle
      const armSwing = Math.sin(animTime.current) * (swingAngle * 0.9)
      
      // Opposite limb swinging
      if (leftLegRef.current) leftLegRef.current.rotation.x = legSwing
      if (rightLegRef.current) rightLegRef.current.rotation.x = -legSwing
      if (leftArmRef.current) leftArmRef.current.rotation.x = -armSwing
      if (rightArmRef.current) rightArmRef.current.rotation.x = armSwing
      
      // Subtle vertical bobbing
      if (bodyGroupRef.current) {
        bodyGroupRef.current.position.y = Math.abs(Math.sin(animTime.current)) * (isRunning ? 0.06 : 0.03)
      }
    } else {
      // Return smoothly to idle
      if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, dt * 8)
      if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, dt * 8)
      if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, dt * 8)
      if (rightArmRef.current) rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, dt * 8)
      
      // Idle breathing
      animTime.current += dt * 1.5
      if (bodyGroupRef.current) {
        bodyGroupRef.current.position.y = Math.sin(animTime.current) * 0.008
      }
    }
  })

  return (
    <group ref={bodyGroupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 1.63, -0.02]} castShadow>
        <sphereGeometry args={[0.13, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color={hairColor} roughness={0.9} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.1, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      {/* Torso - Button shirt */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[0.35, 0.45, 0.2]} />
        <meshStandardMaterial color={shirtColor} roughness={0.6} />
      </mesh>
      
      {/* Shirt collar - subtle detail */}
      <mesh position={[0, 1.36, 0.05]} castShadow>
        <boxGeometry args={[0.15, 0.04, 0.12]} />
        <meshStandardMaterial color={shirtColor} roughness={0.6} />
      </mesh>
      
      {/* Belt area */}
      <mesh position={[0, 0.91, 0]} castShadow>
        <boxGeometry args={[0.34, 0.04, 0.2]} />
        <meshStandardMaterial color="#3a3530" roughness={0.5} />
      </mesh>

      {/* Left arm group (pivots at shoulder y=1.32) */}
      <group ref={leftArmRef} position={[-0.23, 1.32, 0]}>
        {/* Upper arm (shirt sleeve) */}
        <mesh position={[0, -0.16, 0]} castShadow>
          <boxGeometry args={[0.1, 0.32, 0.12]} />
          <meshStandardMaterial color={shirtColor} roughness={0.6} />
        </mesh>
        {/* Forearm (skin) */}
        <mesh position={[0, -0.36, 0]} castShadow>
          <boxGeometry args={[0.08, 0.14, 0.1]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
      </group>

      {/* Right arm group (pivots at shoulder y=1.32) */}
      <group ref={rightArmRef} position={[0.23, 1.32, 0]}>
        {/* Upper arm (shirt sleeve) */}
        <mesh position={[0, -0.16, 0]} castShadow>
          <boxGeometry args={[0.1, 0.32, 0.12]} />
          <meshStandardMaterial color={shirtColor} roughness={0.6} />
        </mesh>
        {/* Forearm (skin) */}
        <mesh position={[0, -0.36, 0]} castShadow>
          <boxGeometry args={[0.08, 0.14, 0.1]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
      </group>
      
      {/* Left leg group (pivots at hip y=0.89) */}
      <group ref={leftLegRef} position={[-0.09, 0.89, 0]}>
        {/* Jeans */}
        <mesh position={[0, -0.29, 0]} castShadow>
          <boxGeometry args={[0.13, 0.58, 0.15]} />
          <meshStandardMaterial color={jeansColor} roughness={0.8} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.61, 0.03]} castShadow>
          <boxGeometry args={[0.12, 0.06, 0.2]} />
          <meshStandardMaterial color={shoeColor} roughness={0.6} />
        </mesh>
      </group>
      
      {/* Right leg group (pivots at hip y=0.89) */}
      <group ref={rightLegRef} position={[0.09, 0.89, 0]}>
        {/* Jeans */}
        <mesh position={[0, -0.29, 0]} castShadow>
          <boxGeometry args={[0.13, 0.58, 0.15]} />
          <meshStandardMaterial color={jeansColor} roughness={0.8} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.61, 0.03]} castShadow>
          <boxGeometry args={[0.12, 0.06, 0.2]} />
          <meshStandardMaterial color={shoeColor} roughness={0.6} />
        </mesh>
      </group>
    </group>
  )
}
