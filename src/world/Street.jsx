import { RigidBody, CuboidCollider } from '@react-three/rapier'

export default function Street() {
  const streetLength = 150
  const streetWidth = 8
  const sidewalkWidth = 2.4
  const sidewalkHeight = 0.1
  const curbHeight = 0.12
  const curbWidth = 0.15

  const crosswalkPositions = [-32, 0, 32]

  return (
    <group>
      {/* ======================================================== */}
      {/* --- MAIN ASPHALT ROAD SURFACE --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="road">
        <CuboidCollider
          args={[streetWidth / 2, 0.05, streetLength / 2]}
          position={[0, -0.05, 0]}
        />
        <mesh receiveShadow position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[streetWidth, streetLength]} />
          <meshStandardMaterial color="#383838" roughness={0.85} metalness={0} />
        </mesh>
      </RigidBody>

      {/* Road Center Line (Dashed Markings along Z) */}
      {Array.from({ length: 30 }).map((_, i) => {
        const zPos = -70 + i * 5
        // Skip dash if inside a crosswalk area
        const insideCrosswalk = crosswalkPositions.some((cp) => Math.abs(zPos - cp) < 2.5)
        if (insideCrosswalk) return null

        return (
          <mesh key={`dash-${i}`} position={[0, 0.006, zPos]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.14, 2.5]} />
            <meshStandardMaterial color="#c0bba8" roughness={0.6} />
          </mesh>
        )
      })}

      {/* ======================================================== */}
      {/* --- PAINTED PEDESTRIAN CROSSWALKS (ZEBRA STRIPES) --- */}
      {/* ======================================================== */}
      {crosswalkPositions.map((cp, idx) => (
        <group key={`crosswalk-${idx}`} position={[0, 0.007, cp]}>
          {/* 8 Zebra Stripes across the street */}
          {[-3.0, -2.1, -1.2, -0.3, 0.6, 1.5, 2.4, 3.3].map((xStripe, sIdx) => (
            <mesh key={`cw-stripe-${sIdx}`} position={[xStripe, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.5, 3.2]} />
              <meshStandardMaterial color="#e8e5dc" roughness={0.5} />
            </mesh>
          ))}
          {/* Connecting pedestrian curb ramp ramps */}
          <mesh position={[-4.1, 0.06, 0]} rotation={[0, 0, -Math.PI / 12]} receiveShadow>
            <boxGeometry args={[0.3, 0.08, 3.4]} />
            <meshStandardMaterial color="#a09888" roughness={0.8} />
          </mesh>
          <mesh position={[4.1, 0.06, 0]} rotation={[0, 0, Math.PI / 12]} receiveShadow>
            <boxGeometry args={[0.3, 0.08, 3.4]} />
            <meshStandardMaterial color="#a09888" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ======================================================== */}
      {/* --- CONTINUOUS WEST SIDEWALK (LEFT, x < 0) --- */}
      {/* ======================================================== */}
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

      {/* Left Curb */}
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

      {/* ======================================================== */}
      {/* --- CONTINUOUS EAST SIDEWALK (RIGHT, x > 0) --- */}
      {/* ======================================================== */}
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

      {/* Right Curb */}
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

      {/* ======================================================== */}
      {/* --- CONNECTING DRIVEWAYS FOR BUILDINGS --- */}
      {/* ======================================================== */}
      {/* West Driveways (Main Home, Skills House, Education House) */}
      {[-32, -10.5, 32].map((zDrive, idx) => (
        <mesh key={`west-drive-${idx}`} position={[-8.5, 0.03, zDrive]} receiveShadow>
          <boxGeometry args={[4.2, 0.04, 3.8]} />
          <meshStandardMaterial color="#404040" roughness={0.8} />
        </mesh>
      ))}

      {/* East Driveways (Achievement Gallery, Project Studio, Contact House) */}
      {[-32, 0, 32].map((zDrive, idx) => (
        <mesh key={`east-drive-${idx}`} position={[8.5, 0.03, zDrive]} receiveShadow>
          <boxGeometry args={[4.2, 0.04, 3.8]} />
          <meshStandardMaterial color="#404040" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}
