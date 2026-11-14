import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import BuildingSign from './BuildingSign'
import useGameStore from '../../store/useGameStore'

export default function AchievementGallery() {
  const limestoneColor = '#ded8cc'   // fine honed limestone
  const graniteColor = '#252729'     // polished dark charcoal granite
  const bronzeColor = '#a88a5d'      // brushed bronze accent trim
  const glassColor = '#a8c6db'       // tinted display glass

  const handleDoorInteract = () => {
    useGameStore.getState().setActiveInteraction({
      name: 'Achievement Gallery',
      title: 'Achievement & Awards Gallery',
      subtitle: 'Recognitions, Hackathons & Key Milestones',
      category: 'Exhibition Pavilion',
      content: 'The Achievement Gallery showcases career milestones, hackathon awards, open-source contributions, featured publications, and notable achievements in engineering and design.',
      highlights: [
        'Architecture: Minimalist Modern Museum Pavilion with Travertine Facade',
        'Displays: Key awards, hackathon victories, open-source milestones',
        'Next: Interior interactive trophy showcase and medal exhibits opening in future phase',
      ],
      footerNote: '[Notice: Achievement Gallery interior will unlock in a later phase]',
    })
  }

  return (
    <group position={[16, 0, -32]} rotation={[0, -Math.PI / 2, 0]}>
      {/* ======================================================== */}
      {/* --- RAPIER PHYSICS COLLIDERS --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="achievement-gallery-structure">
        {/* Main Exhibition Cube */}
        <CuboidCollider args={[6.0, 2.8, 5.0]} position={[0, 2.8, 0]} />
        {/* Portico Column Wings */}
        <CuboidCollider args={[0.8, 2.2, 0.8]} position={[-3.2, 2.2, 5.5]} />
        <CuboidCollider args={[0.8, 2.2, 0.8]} position={[3.2, 2.2, 5.5]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* --- MINIMALIST GALLERY PAVILION MESHES --- */}
      {/* ======================================================== */}
      {/* Main Monumental Stone Cube */}
      <mesh
        position={[0, 2.8, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[12.0, 5.6, 10.0]} />
        <meshStandardMaterial color={limestoneColor} roughness={0.65} />
      </mesh>

      {/* Dark Granite Parapet Roof Trim */}
      <mesh
        position={[0, 5.75, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[12.6, 0.35, 10.6]} />
        <meshStandardMaterial color={graniteColor} roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Recessed Exterior Display Niches (2 showcase windows flanking entrance) */}
      {[-3.6, 3.6].map((xNiche, idx) => (
        <group key={`niche-${idx}`} position={[xNiche, 2.6, 5.02]}>
          {/* Bronze Frame Niche */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 2.6, 0.2]} />
            <meshStandardMaterial color={bronzeColor} roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Dark Velvet Backing */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[1.9, 2.3]} />
            <meshStandardMaterial color="#1f1f21" roughness={0.9} />
          </mesh>
          {/* Glass Cover */}
          <mesh position={[0, 0, 0.12]}>
            <planeGeometry args={[1.9, 2.3]} />
            <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.3} />
          </mesh>
          {/* Silhouette Trophy / Award Mockup on pedestal inside niche */}
          <mesh position={[0, -0.4, 0.06]} castShadow>
            <cylinderGeometry args={[0.15, 0.18, 0.4, 8]} />
            <meshStandardMaterial color="#333" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.1, 0.06]} castShadow>
            <octahedronGeometry args={[0.22]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Niche Spotlight */}
          <pointLight position={[0, 0.9, 0.25]} intensity={0.4} distance={3} color="#fff6e6" />
        </group>
      ))}

      {/* ======================================================== */}
      {/* --- POLISHED GRANITE PORTICO & ENTRANCE --- */}
      {/* ======================================================== */}
      {/* Portico Canopy */}
      <mesh position={[0, 4.4, 5.8]} castShadow userData={{ cameraCollider: true }}>
        <boxGeometry args={[4.8, 0.4, 2.4]} />
        <meshStandardMaterial color={graniteColor} roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Portico Granite Pillars */}
      {[-2.0, 2.0].map((xCol, idx) => (
        <mesh key={`p-col-${idx}`} position={[xCol, 2.1, 6.6]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 4.2, 0.5]} />
          <meshStandardMaterial color={graniteColor} roughness={0.3} metalness={0.5} />
        </mesh>
      ))}

      {/* Entrance Granite Steps & Porch Platform */}
      <mesh position={[0, 0.15, 6.2]} receiveShadow>
        <boxGeometry args={[5.2, 0.3, 3.2]} />
        <meshStandardMaterial color="#404347" roughness={0.6} />
      </mesh>

      {/* Paved Walkway to Sidewalk */}
      <mesh position={[0, 0.02, 9.4]} receiveShadow>
        <boxGeometry args={[2.0, 0.04, 3.8]} />
        <meshStandardMaterial color="#c0bbb1" roughness={0.8} />
      </mesh>

      {/* Double Contemporary Bronze & Glass Entry Doors */}
      <mesh position={[0, 1.8, 5.02]} castShadow>
        <boxGeometry args={[2.4, 3.2, 0.1]} />
        <meshStandardMaterial color="#1a1c1e" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Glass Panes */}
      {[-0.55, 0.55].map((xP, idx) => (
        <mesh key={`gp-${idx}`} position={[xP, 1.8, 5.08]}>
          <planeGeometry args={[0.9, 2.8]} />
          <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.35} />
        </mesh>
      ))}
      {/* Bronze Handles */}
      {[-0.1, 0.1].map((xH, idx) => (
        <mesh key={`h-${idx}`} position={[xH, 1.6, 5.14]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
          <meshStandardMaterial color={bronzeColor} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Interactive Door Trigger */}
      <InteractiveObject
        id="door-achievement-gallery"
        name="Achievement Gallery Entrance"
        position={[0, 1.0, 6.2]}
        range={2.2}
        promptText="Press E to Explore Achievement Gallery"
        showBeacon={true}
        onInteract={handleDoorInteract}
      />

      {/* ======================================================== */}
      {/* --- BUILDING SIGN & SYMMETRICAL TOPIARY --- */}
      {/* ======================================================== */}
      <BuildingSign
        title="ACHIEVEMENT GALLERY"
        subtitle="Awards & Milestones"
        position={[3.4, 0, 8.8]}
        rotation={[0, 0, 0]}
        scale={1.05}
      />

      {/* Symmetrical Topiary Trees in Concrete Cube Planters */}
      {[-3.6, 3.6].map((xTop, idx) => (
        <group key={`top-${idx}`} position={[xTop, 0, 8.2]}>
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.7, 0.9]} />
            <meshStandardMaterial color="#505458" roughness={0.7} />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.05, 1.0, 6]} />
            <meshStandardMaterial color="#4a3628" roughness={0.8} />
          </mesh>
          {/* Clipped Spherical Topiary */}
          <mesh position={[0, 1.8, 0]} castShadow>
            <sphereGeometry args={[0.55, 10, 10]} />
            <meshStandardMaterial color="#3d5e35" roughness={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

