import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import BuildingSign from './BuildingSign'
import useGameStore from '../../store/useGameStore'

export default function EducationHouse() {
  const pineWoodColor = '#ba9368'    // warm scandinavian pine timber
  const wallWhiteColor = '#edeae3'   // off-white exterior render
  const roofSlateColor = '#2e3033'   // dark standing-seam gable roof
  const glassColor = '#a8c6db'       // window glass

  const handleDoorInteract = () => {
    useGameStore.getState().setActiveInteraction({
      name: 'Education House',
      title: 'Academic & Learning Hall',
      subtitle: 'Formal Degrees, Certifications & Foundations',
      category: 'Education & Research',
      content: 'The Education House represents academic training, computer science foundations, mathematics, and certifications. Inside, visitors will be able to explore degree details, research publications, and specialized coursework.',
      highlights: [
        'Architecture: Scandinavian Modern Gable Pavilion with Study Porch',
        'Features: Computer Science fundamentals, research archives, certifications',
        'Next: Interior reading library and academic archives opening in future phase',
      ],
      footerNote: '[Notice: Education House interior will unlock in a later phase]',
    })
  }

  return (
    <group position={[-16, 0, 32]} rotation={[0, Math.PI / 2, 0]}>
      {/* ======================================================== */}
      {/* --- RAPIER PHYSICS COLLIDERS --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="education-house-structure">
        {/* Main Gable Pavilion Volume */}
        <CuboidCollider args={[5.2, 3.2, 4.5]} position={[0, 3.2, 0]} />
        {/* Study Porch Platform */}
        <CuboidCollider args={[4.5, 0.2, 1.8]} position={[0, 0.2, 5.8]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* --- SCANDINAVIAN GABLE BUILDING MESHES --- */}
      {/* ======================================================== */}
      {/* Lower Main Pavilion Walls */}
      <mesh
        position={[0, 2.5, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[10.4, 5.0, 9.0]} />
        <meshStandardMaterial color={wallWhiteColor} roughness={0.7} />
      </mesh>

      {/* Front Gable Timber Cladding Triangle Section */}
      <mesh
        position={[0, 5.8, 4.45]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[9.8, 1.8, 0.2]} />
        <meshStandardMaterial color={pineWoodColor} roughness={0.65} />
      </mesh>

      {/* Pitched Roof (Left Slope & Right Slope) */}
      <mesh
        position={[-2.7, 6.2, 0]}
        rotation={[0, 0, Math.PI / 6]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[6.2, 0.35, 10.2]} />
        <meshStandardMaterial color={roofSlateColor} roughness={0.5} />
      </mesh>
      <mesh
        position={[2.7, 6.2, 0]}
        rotation={[0, 0, -Math.PI / 6]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[6.2, 0.35, 10.2]} />
        <meshStandardMaterial color={roofSlateColor} roughness={0.5} />
      </mesh>

      {/* Tall Vertical Windows */}
      {[-3.0, 3.0].map((xWin, idx) => (
        <group key={`win-${idx}`} position={[xWin, 2.6, 4.52]}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 3.0, 0.1]} />
            <meshStandardMaterial color="#2d3033" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[1.2, 2.8]} />
            <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.45} />
          </mesh>
        </group>
      ))}

      {/* ======================================================== */}
      {/* --- TIMBER WRAP-AROUND PORCH & OUTDOOR STUDY TABLE --- */}
      {/* ======================================================== */}
      {/* Timber Deck Platform */}
      <mesh position={[0, 0.15, 5.8]} receiveShadow>
        <boxGeometry args={[9.0, 0.2, 3.0]} />
        <meshStandardMaterial color={pineWoodColor} roughness={0.7} />
      </mesh>

      {/* Paved Walkway to Sidewalk */}
      <mesh position={[0, 0.02, 9.2]} receiveShadow>
        <boxGeometry args={[1.8, 0.04, 4.4]} />
        <meshStandardMaterial color="#c0bbb1" roughness={0.8} />
      </mesh>

      {/* Porch Eaves Columns */}
      {[-4.2, 4.2].map((xCol, idx) => (
        <mesh key={`col-${idx}`} position={[xCol, 2.0, 7.0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 3.8, 8]} />
          <meshStandardMaterial color={pineWoodColor} roughness={0.6} />
        </mesh>
      ))}

      {/* Outdoor Study Table & Benches on Porch */}
      <group position={[-2.4, 0.25, 5.8]}>
        {/* Table Top */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.05, 0.8]} />
          <meshStandardMaterial color={pineWoodColor} roughness={0.6} />
        </mesh>
        {/* Table Legs */}
        {[-0.6, 0.6].map((xL, idx) => (
          <mesh key={`tbl-leg-${idx}`} position={[xL, 0.32, 0]} castShadow>
            <boxGeometry args={[0.06, 0.64, 0.7]} />
            <meshStandardMaterial color="#222" roughness={0.5} />
          </mesh>
        ))}
        {/* Benches */}
        {[-0.65, 0.65].map((zB, bIdx) => (
          <mesh key={`bench-${bIdx}`} position={[0, 0.38, zB]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.04, 0.3]} />
            <meshStandardMaterial color={pineWoodColor} roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* ======================================================== */}
      {/* --- ENTRANCE DOOR & PROXIMITY TRIGGER --- */}
      {/* ======================================================== */}
      <mesh position={[0, 1.35, 4.52]} castShadow>
        <boxGeometry args={[1.4, 2.5, 0.1]} />
        <meshStandardMaterial color={pineWoodColor} roughness={0.5} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.45, 1.3, 4.6]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
        <meshStandardMaterial color="#1f1f1f" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Interactive Door Trigger */}
      <InteractiveObject
        id="door-education-house"
        name="Education House Entrance"
        position={[0, 1.0, 5.8]}
        range={2.2}
        promptText="Press E to Explore Education House"
        showBeacon={true}
        onInteract={handleDoorInteract}
      />

      {/* ======================================================== */}
      {/* --- BUILDING SIGN & GARDEN BEDS --- */}
      {/* ======================================================== */}
      <BuildingSign
        title="EDUCATION HOUSE"
        subtitle="Academics & Research"
        position={[3.0, 0, 8.5]}
        rotation={[0, 0, 0]}
        scale={1.05}
      />

      {/* Lush Green Lawn & Flowering Garden Planter */}
      <mesh position={[2.5, 0.2, 5.8]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.35, 1.8]} />
        <meshStandardMaterial color="#7a7873" roughness={0.8} />
      </mesh>
      {/* Soil & Flowering Shrubs */}
      <mesh position={[2.5, 0.45, 5.8]} castShadow>
        <sphereGeometry args={[0.4, 7, 7]} />
        <meshStandardMaterial color="#4a7342" roughness={0.8} />
      </mesh>
      <mesh position={[2.0, 0.42, 6.2]} castShadow>
        <sphereGeometry args={[0.3, 7, 7]} />
        <meshStandardMaterial color="#d49282" roughness={0.7} />
      </mesh>
    </group>
  )
}

