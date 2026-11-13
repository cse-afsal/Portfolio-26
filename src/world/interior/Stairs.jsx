import { RigidBody, CuboidCollider } from '@react-three/rapier'

export default function Stairs() {
  const stairSteps = 16
  const totalRise = 3.2
  const totalRun = 3.6
  const stairWidth = 1.2
  const startX = -15.2
  const startY = 0.1
  const startZ = -0.6

  const stepRise = totalRise / stairSteps
  const stepRun = totalRun / stairSteps

  // Angle of the ramp
  const rampAngle = Math.atan2(totalRise, totalRun)
  const rampLength = Math.sqrt(totalRise * totalRise + totalRun * totalRun)

  return (
    <group>
      {/* --- INVISIBLE SMOOTH RAMP COLLIDER --- */}
      {/* This ensures the player smoothly walks up and down without catching step edges */}
      <RigidBody type="fixed" name="stair-ramp">
        <CuboidCollider
          args={[stairWidth / 2, 0.08, rampLength / 2]}
          position={[startX, startY + totalRise / 2 - 0.02, startZ + totalRun / 2]}
          rotation={[rampAngle, 0, 0]}
        />
        {/* Handrail barrier collider to prevent falling off the open side */}
        <CuboidCollider
          args={[0.05, 0.6, rampLength / 2]}
          position={[startX + stairWidth / 2 + 0.05, startY + totalRise / 2 + 0.5, startZ + totalRun / 2]}
          rotation={[rampAngle, 0, 0]}
        />
      </RigidBody>

      {/* --- VISUAL TIMBER STEPS --- */}
      {Array.from({ length: stairSteps }).map((_, i) => {
        const stepY = startY + i * stepRise + stepRise / 2
        const stepZ = startZ + i * stepRun + stepRun / 2

        return (
          <group key={`stair-step-${i}`}>
            {/* Step tread (warm oak timber) */}
            <mesh position={[startX, stepY, stepZ]} castShadow receiveShadow>
              <boxGeometry args={[stairWidth, 0.05, stepRun + 0.04]} />
              <meshStandardMaterial color="#8a6745" roughness={0.6} />
            </mesh>

            {/* Dark metal cantilever riser stringer */}
            <mesh position={[startX, stepY - stepRise / 2, stepZ]} castShadow>
              <boxGeometry args={[stairWidth * 0.9, stepRise, 0.02]} />
              <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.5} />
            </mesh>
          </group>
        )
      })}

      {/* --- MODERN GLASS & BLACK STEEL BALUSTRADE / HANDRAIL --- */}
      {/* Handrail rail */}
      <mesh
        position={[startX + stairWidth / 2, startY + totalRise / 2 + 0.9, startZ + totalRun / 2]}
        rotation={[rampAngle, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.04, 0.04, rampLength + 0.2]} />
        <meshStandardMaterial color="#1f1f1f" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Glass infill panel */}
      <mesh
        position={[startX + stairWidth / 2, startY + totalRise / 2 + 0.45, startZ + totalRun / 2]}
        rotation={[rampAngle, 0, 0]}
      >
        <boxGeometry args={[0.015, 0.85, rampLength]} />
        <meshStandardMaterial
          color="#d0e5f2"
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Vertical metal posts */}
      {[0, totalRun * 0.5, totalRun].map((zOffset, idx) => {
        const yOffset = (zOffset / totalRun) * totalRise
        return (
          <mesh
            key={`post-${idx}`}
            position={[startX + stairWidth / 2, startY + yOffset + 0.45, startZ + zOffset]}
            castShadow
          >
            <cylinderGeometry args={[0.02, 0.02, 0.9, 8]} />
            <meshStandardMaterial color="#1f1f1f" roughness={0.3} metalness={0.7} />
          </mesh>
        )
      })}
    </group>
  )
}

