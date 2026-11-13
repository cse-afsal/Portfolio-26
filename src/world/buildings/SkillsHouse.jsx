import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import BuildingSign from './BuildingSign'
import useGameStore from '../../store/useGameStore'

export default function SkillsHouse() {
  const stuccoColor = '#ece8e1'       // light warm cream stucco
  const timberColor = '#856345'       // rich warm oak timber
  const slateColor = '#3e4247'        // slate grey roof & cladding
  const glassColor = '#a8c6db'        // window glass

  const handleDoorInteract = () => {
    useGameStore.getState().setActiveInteraction({
      name: 'Skills House',
      title: 'Skills Workshop & Lab',
      subtitle: 'Technical Stack & Proficiency Matrix',
      category: 'Competencies',
      content: 'The Skills House will house interactive stations representing programming languages, frontend and 3D graphics libraries, backend architectures, DevOps workflows, and system design tools.',
      highlights: [
        'Architecture: Craftsman Contemporary Villa with Timber Pergola',
        'Specialty: Interactive skill tree & live code demo stations',
        'Next: Detailed interactive skill exhibits opening in Phase 4',
      ],
      footerNote: '[Notice: Skills House interior and interactive skill labs will unlock in Phase 4]',
    })
  }

  return (
    <group position={[-16, 0, -32]} rotation={[0, Math.PI / 2, 0]}>
      {/* ======================================================== */}
      {/* --- RAPIER PHYSICS COLLIDERS --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="skills-house-structure">
        {/* Main Living Volume */}
        <CuboidCollider args={[5.5, 2.5, 4.5]} position={[0, 2.5, 0]} />
        {/* Workshop Wing */}
        <CuboidCollider args={[3.5, 2.0, 3.5]} position={[-6.5, 2.0, -1.0]} />
        {/* Driveway Carport Wall */}
        <CuboidCollider args={[0.2, 1.5, 3.0]} position={[6.0, 1.5, -1.0]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* --- MAIN STRUCTURE VOLUMES --- */}
      {/* ======================================================== */}
      {/* Central Living / Workshop Block */}
      <mesh
        position={[0, 2.5, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[11.0, 5.0, 9.0]} />
        <meshStandardMaterial color={stuccoColor} roughness={0.7} />
      </mesh>

      {/* Split Roof - Angled Modern Pitch */}
      <mesh
        position={[0, 5.3, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[11.8, 0.4, 9.8]} />
        <meshStandardMaterial color={slateColor} roughness={0.5} />
      </mesh>

      {/* Workshop Wing Block (left) */}
      <mesh
        position={[-6.5, 2.0, -1.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[7.0, 4.0, 7.0]} />
        <meshStandardMaterial color="#ded9ce" roughness={0.75} />
      </mesh>
      <mesh
        position={[-6.5, 4.2, -1.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[7.6, 0.35, 7.6]} />
        <meshStandardMaterial color={slateColor} roughness={0.5} />
      </mesh>

      {/* Modern Horizontal Ribbon Windows */}
      <mesh position={[1.5, 3.5, 4.52]}>
        <boxGeometry args={[4.2, 1.4, 0.1]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.4} />
      </mesh>
      <mesh position={[-6.5, 2.2, 2.52]}>
        <boxGeometry args={[3.8, 1.2, 0.1]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.4} />
      </mesh>

      {/* ======================================================== */}
      {/* --- ENTRANCE PORCH WITH TIMBER PERGOLA --- */}
      {/* ======================================================== */}
      {/* Concrete Porch Slab */}
      <mesh position={[0.5, 0.08, 5.5]} receiveShadow>
        <boxGeometry args={[3.8, 0.16, 2.6]} />
        <meshStandardMaterial color="#c5c0b6" roughness={0.8} />
      </mesh>

      {/* Connecting Walkway to Street Sidewalk */}
      <mesh position={[0.5, 0.02, 8.5]} receiveShadow>
        <boxGeometry args={[1.8, 0.04, 4.0]} />
        <meshStandardMaterial color="#c0bbb1" roughness={0.8} />
      </mesh>

      {/* Pergola Columns */}
      {[-1.2, 2.2].map((xCol, idx) => (
        <mesh key={`perg-col-${idx}`} position={[xCol, 1.5, 6.6]} castShadow>
          <boxGeometry args={[0.15, 3.0, 0.15]} />
          <meshStandardMaterial color={timberColor} roughness={0.6} />
        </mesh>
      ))}

      {/* Pergola Rafters */}
      <mesh position={[0.5, 3.0, 5.6]} castShadow>
        <boxGeometry args={[3.8, 0.12, 0.18]} />
        <meshStandardMaterial color={timberColor} roughness={0.6} />
      </mesh>
      <mesh position={[0.5, 3.0, 6.6]} castShadow>
        <boxGeometry args={[3.8, 0.12, 0.18]} />
        <meshStandardMaterial color={timberColor} roughness={0.6} />
      </mesh>
      {[-1.0, -0.3, 0.4, 1.1, 1.8].map((xRaft, rIdx) => (
        <mesh key={`raft-${rIdx}`} position={[xRaft, 3.12, 6.1]} castShadow>
          <boxGeometry args={[0.08, 0.12, 1.8]} />
          <meshStandardMaterial color={timberColor} roughness={0.6} />
        </mesh>
      ))}

      {/* Warm Porch Hanging Pendant Lantern */}
      <group position={[0.5, 2.5, 5.8]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 6]} />
          <meshBasicMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.3, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
        </mesh>
        <pointLight position={[0, -0.1, 0]} intensity={0.5} distance={5} color="#ffe8cc" />
      </group>

      {/* Modern Front Door & Frame */}
      <mesh position={[0.5, 1.25, 4.52]} castShadow>
        <boxGeometry args={[1.4, 2.5, 0.1]} />
        <meshStandardMaterial color={timberColor} roughness={0.5} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.95, 1.2, 4.6]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.6, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Interactive Door Trigger */}
      <InteractiveObject
        id="door-skills-house"
        name="Skills House Entrance"
        position={[0.5, 1.0, 5.5]}
        range={2.2}
        promptText="Press E to Explore Skills House"
        showBeacon={true}
        onInteract={handleDoorInteract}
      />

      {/* ======================================================== */}
      {/* --- ENTRANCE SIGN & ZEN GARDEN --- */}
      {/* ======================================================== */}
      <BuildingSign
        title="SKILLS HOUSE"
        subtitle="Workshop & Lab"
        position={[3.2, 0, 8.0]}
        rotation={[0, 0, 0]}
        scale={1.05}
      />

      {/* Zen Gravel Garden with Boulders & Shrubs */}
      <mesh position={[-2.8, 0.02, 5.5]} receiveShadow>
        <planeGeometry args={[3.2, 2.4]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#d4cebe" roughness={0.9} />
      </mesh>
      {/* Decorative Boulders */}
      <mesh position={[-2.5, 0.25, 5.8]} rotation={[0.2, 0.4, 0.1]} castShadow>
        <dodecahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial color="#73767a" roughness={0.9} />
      </mesh>
      <mesh position={[-3.2, 0.18, 5.2]} rotation={[-0.2, 0.6, 0.3]} castShadow>
        <dodecahedronGeometry args={[0.26, 1]} />
        <meshStandardMaterial color="#5e6166" roughness={0.9} />
      </mesh>
      {/* Muted green bushes */}
      <mesh position={[-3.0, 0.45, 6.2]} castShadow>
        <sphereGeometry args={[0.45, 7, 7]} />
        <meshStandardMaterial color="#4d6b42" roughness={0.85} />
      </mesh>
    </group>
  )
}
