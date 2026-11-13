import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import BuildingSign from './BuildingSign'
import useGameStore from '../../store/useGameStore'

export default function ProjectStudio() {
  const steelColor = '#242629'       // structural charcoal steel
  const stoneColor = '#ece8e1'       // smooth warm limestone panels
  const cedarColor = '#9e744e'       // architectural vertical cedar slats
  const glassColor = '#a8c8dc'       // tinted architectural structural glass
  const waterColor = '#3d6175'       // modern reflecting pool water

  const handleDoorInteract = () => {
    useGameStore.getState().setActiveInteraction({
      name: 'Project Studio',
      title: 'Flagship Project Studio',
      subtitle: 'Featured Works & Interactive Demonstrations',
      category: 'Flagship Building',
      content: 'Welcome to the Project Studio — the central exhibition space designed to showcase comprehensive case studies, interactive 3D web apps, client productions, and technical architecture breakdowns.',
      highlights: [
        'Architecture: 2-Level Cantilevered Modernist Pavilion with Reflecting Pool',
        'Status: Exterior fully constructed & integrated into continuous street path',
        'Next: Full interactive project gallery interior coming in Phase 5',
      ],
      footerNote: '[Notice: Project Studio interior and project stations will unlock in Phase 5]',
    })
  }

  return (
    <group position={[17, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {/* ======================================================== */}
      {/* --- RAPIER PHYSICS COLLIDERS --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="project-studio-structure">
        {/* Main Lower Building Volume */}
        <CuboidCollider args={[7.0, 2.2, 5.0]} position={[0, 2.2, 0]} />
        {/* Upper Cantilever Volume (thrusts forward in +Z towards street) */}
        <CuboidCollider args={[5.5, 1.8, 6.2]} position={[0, 5.8, 1.0]} />
        {/* Reflecting Pool Boundary Edges */}
        <CuboidCollider args={[5.2, 0.2, 0.2]} position={[0, 0.2, 7.8]} />
        <CuboidCollider args={[0.2, 0.2, 2.0]} position={[-5.0, 0.2, 6.0]} />
        <CuboidCollider args={[0.2, 0.2, 2.0]} position={[5.0, 0.2, 6.0]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* --- LOWER LEVEL: CHARCOAL STEEL & DOUBLE-HEIGHT GLASS --- */}
      {/* ======================================================== */}
      {/* Main Base Body */}
      <mesh
        position={[0, 2.0, -1.0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[14.0, 4.0, 8.0]} />
        <meshStandardMaterial color={stoneColor} roughness={0.7} />
      </mesh>

      {/* Charcoal Steel Framing Grid */}
      <mesh position={[0, 2.0, 3.1]} castShadow receiveShadow>
        <boxGeometry args={[13.6, 4.0, 0.4]} />
        <meshStandardMaterial color={steelColor} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Expansive Double-Height Front Glass Curtain Wall */}
      <mesh position={[0, 2.0, 3.25]}>
        <planeGeometry args={[12.8, 3.6]} />
        <meshStandardMaterial
          color={glassColor}
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0.45}
        />
      </mesh>
      {/* Warm Ambient Interior Studio Glow visible through glass */}
      <pointLight position={[0, 2.2, 1.5]} intensity={0.9} distance={12} color="#fff1db" />
      <pointLight position={[-4, 2.2, 1.5]} intensity={0.6} distance={8} color="#ffe8cc" />
      <pointLight position={[4, 2.2, 1.5]} intensity={0.6} distance={8} color="#ffe8cc" />

      {/* ======================================================== */}
      {/* --- UPPER LEVEL: DRAMATIC CANTILEVER WITH CEDAR SLATS --- */}
      {/* ======================================================== */}
      {/* Floating Cantilever Box */}
      <mesh
        position={[0, 5.8, 1.2]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[11.2, 3.6, 12.0]} />
        <meshStandardMaterial color={stoneColor} roughness={0.6} />
      </mesh>

      {/* Upper Front Glass Ribbon Window */}
      <mesh position={[0, 5.8, 7.25]}>
        <boxGeometry args={[9.6, 2.0, 0.1]} />
        <meshStandardMaterial
          color={glassColor}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Warm Vertical Cedar Louvers / Slats Accent Panels */}
      {[-4.6, 4.6].map((xSide, sIdx) => (
        <group key={`cedar-side-${sIdx}`} position={[xSide, 5.8, 4.0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.6, 3.5, 6.2]} />
            <meshStandardMaterial color={cedarColor} roughness={0.7} />
          </mesh>
          {/* Slat Lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh key={`slat-${i}`} position={[0, 0, -2.6 + i * 0.45]} castShadow>
              <boxGeometry args={[1.65, 3.5, 0.08]} />
              <meshStandardMaterial color="#6a4c2f" roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Roof Fascia & Overhang Cap */}
      <mesh
        position={[0, 7.7, 1.2]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[12.0, 0.35, 12.8]} />
        <meshStandardMaterial color={steelColor} roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Cantilever Underside Downlights */}
      {[-3, 0, 3].map((xLight, lIdx) => (
        <group key={`downlight-${lIdx}`} position={[xLight, 3.95, 5.0]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 12]} />
            <meshStandardMaterial color="#ffe8cc" emissive="#ffe8cc" emissiveIntensity={0.8} />
          </mesh>
          <pointLight position={[0, -0.2, 0]} intensity={0.5} distance={5} color="#fff1db" />
        </group>
      ))}

      {/* ======================================================== */}
      {/* --- ARCHITECTURAL REFLECTING POOL & FLOATING BRIDGE --- */}
      {/* ======================================================== */}
      {/* Reflecting Pool Basin Water Surface */}
      <mesh position={[0, 0.08, 6.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10.0, 4.0]} />
        <meshStandardMaterial
          color={waterColor}
          roughness={0.08}
          metalness={0.3}
          transparent
          opacity={0.88}
        />
      </mesh>
      {/* Concrete Coping Perimeter around Pool */}
      <mesh position={[0, 0.15, 8.05]} castShadow receiveShadow>
        <boxGeometry args={[10.6, 0.3, 0.3]} />
        <meshStandardMaterial color="#686b70" roughness={0.8} />
      </mesh>
      <mesh position={[-5.15, 0.15, 6.0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.3, 4.2]} />
        <meshStandardMaterial color="#686b70" roughness={0.8} />
      </mesh>
      <mesh position={[5.15, 0.15, 6.0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.3, 4.2]} />
        <meshStandardMaterial color="#686b70" roughness={0.8} />
      </mesh>

      {/* Floating Stone Stepping Bridge across the pool to the entrance */}
      <mesh position={[0, 0.18, 6.0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.16, 4.2]} />
        <meshStandardMaterial color="#dcd7ce" roughness={0.6} />
      </mesh>
      {/* Paved path extension connecting to street sidewalk */}
      <mesh position={[0, 0.02, 10.0]} receiveShadow>
        <boxGeometry args={[2.2, 0.04, 4.0]} />
        <meshStandardMaterial color="#c4bfb6" roughness={0.8} />
      </mesh>

      {/* ======================================================== */}
      {/* --- ENTRANCE PORCH, DOORS & INTERACTIVE OBJECT --- */}
      {/* ======================================================== */}
      {/* Recessed Entryway Portal Frame */}
      <mesh position={[0, 1.4, 3.4]} castShadow>
        <boxGeometry args={[2.4, 2.7, 0.4]} />
        <meshStandardMaterial color={steelColor} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Double Contemporary Glass Doors */}
      <mesh position={[-0.55, 1.35, 3.42]}>
        <boxGeometry args={[1.0, 2.5, 0.06]} />
        <meshStandardMaterial color="#1a1c1e" roughness={0.2} metalness={0.4} />
      </mesh>
      <mesh position={[0.55, 1.35, 3.42]}>
        <boxGeometry args={[1.0, 2.5, 0.06]} />
        <meshStandardMaterial color="#1a1c1e" roughness={0.2} metalness={0.4} />
      </mesh>
      {/* Modern Long Vertical Door Handles */}
      {[-0.15, 0.15].map((xH, hIdx) => (
        <mesh key={`handle-${hIdx}`} position={[xH, 1.3, 3.48]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 1.1, 8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
        </mesh>
      ))}

      {/* Door Proximity Trigger */}
      <InteractiveObject
        id="door-project-studio"
        name="Project Studio Entrance"
        position={[0, 1.0, 4.0]}
        range={2.4}
        promptText="Press E to View Project Studio"
        showBeacon={true}
        onInteract={handleDoorInteract}
      />

      {/* ======================================================== */}
      {/* --- ARCHITECTURAL SIGN & LANDSCAPING --- */}
      {/* ======================================================== */}
      {/* Large Showpiece Entrance Sign Totem */}
      <BuildingSign
        title="PROJECT STUDIO"
        subtitle="Flagship Showcase"
        position={[3.8, 0, 8.8]}
        rotation={[0, 0, 0]}
        scale={1.15}
      />

      {/* Modern Minimalist Outdoor Lounge Bench */}
      <group position={[-3.6, 0, 8.8]}>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.1, 0.6]} />
          <meshStandardMaterial color={cedarColor} roughness={0.6} />
        </mesh>
        {[-0.8, 0.8].map((xB, bIdx) => (
          <mesh key={`bench-leg-${bIdx}`} position={[xB, 0.12, 0]} castShadow>
            <boxGeometry args={[0.15, 0.24, 0.55]} />
            <meshStandardMaterial color={steelColor} roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Architectural Planter Box with Specimen Tree */}
      <group position={[-4.5, 0, 4.0]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.8, 1.4]} />
          <meshStandardMaterial color="#505458" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 1.8, 6]} />
          <meshStandardMaterial color="#4a3628" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.7, 0]} castShadow>
          <sphereGeometry args={[1.2, 8, 8]} />
          <meshStandardMaterial color="#8a3c30" roughness={0.8} />
        </mesh>
      </group>
    </group>
  )
}
