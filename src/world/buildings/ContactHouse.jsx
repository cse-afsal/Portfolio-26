import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import BuildingSign from './BuildingSign'
import useGameStore from '../../store/useGameStore'

export default function ContactHouse() {
  const terracottaColor = '#aa5c44'   // warm mid-century terracotta brick
  const creamStuccoColor = '#f2ede4'  // soft cream stucco
  const walnutWoodColor = '#704f32'   // rich mid-century walnut wood
  const roofDarkColor = '#3a3c3f'     // dark flat roof with fascia
  const glassColor = '#a8c6db'        // corner window glass

  const handleDoorInteract = () => {
    useGameStore.getState().setActiveInteraction({
      name: 'Contact House',
      title: 'Contact & Collaboration Hub',
      subtitle: 'Inquiries, Availability & Social Channels',
      category: 'Get In Touch',
      content: 'The Contact House is the communication headquarters where visitors can drop messages, view availability for freelance/full-time opportunities, schedule meetings, and access social links.',
      highlights: [
        'Architecture: Mid-Century Modern Warm Residence with Terracotta Brick',
        'Direct Access: Email, LinkedIn, GitHub, Resume download, and contact form',
        'Next: Interior interactive mailbox, desk terminal & message drop opening in future phase',
      ],
      footerNote: '[Notice: Contact House interior will unlock in a later phase]',
    })
  }

  return (
    <group position={[16, 0, 32]} rotation={[0, -Math.PI / 2, 0]}>
      {/* ======================================================== */}
      {/* --- RAPIER PHYSICS COLLIDERS --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="contact-house-structure">
        {/* Main Body */}
        <CuboidCollider args={[5.5, 2.2, 4.5]} position={[0, 2.2, 0]} />
        {/* Terracotta Brick Accent Wing */}
        <CuboidCollider args={[2.5, 1.8, 2.5]} position={[-4.5, 1.8, 2.0]} />
        {/* Front Porch Deck */}
        <CuboidCollider args={[3.2, 0.15, 1.6]} position={[1.5, 0.15, 5.6]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* --- MID-CENTURY RESIDENCE MESHES --- */}
      {/* ======================================================== */}
      {/* Main Living Structure (Cream Stucco) */}
      <mesh
        position={[0, 2.2, 0]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[11.0, 4.4, 9.0]} />
        <meshStandardMaterial color={creamStuccoColor} roughness={0.7} />
      </mesh>

      {/* Terracotta Accent Feature Wall Wing */}
      <mesh
        position={[-4.5, 1.8, 2.2]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[4.8, 3.6, 5.2]} />
        <meshStandardMaterial color={terracottaColor} roughness={0.8} />
      </mesh>

      {/* Low-Slung Flat Roof with Deep Overhangs */}
      <mesh
        position={[0, 4.5, 0.5]}
        castShadow
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[12.2, 0.35, 10.8]} />
        <meshStandardMaterial color={roofDarkColor} roughness={0.5} />
      </mesh>
      {/* Walnut Wood Soffit Under Overhang */}
      <mesh position={[0, 4.3, 0.5]}>
        <boxGeometry args={[12.0, 0.05, 10.6]} />
        <meshStandardMaterial color={walnutWoodColor} roughness={0.6} />
      </mesh>

      {/* Classic Mid-Century Corner Glass Window */}
      <group position={[3.5, 2.0, 4.52]}>
        <mesh castShadow>
          <boxGeometry args={[3.6, 2.2, 0.1]} />
          <meshStandardMaterial color="#222" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[3.4, 2.0]} />
          <meshStandardMaterial color={glassColor} roughness={0.1} transparent opacity={0.45} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* --- WELCOMING PORCH, ADIRONDACK CHAIRS & DOOR --- */}
      {/* ======================================================== */}
      {/* Timber Porch Deck */}
      <mesh position={[1.5, 0.1, 5.6]} receiveShadow>
        <boxGeometry args={[6.2, 0.2, 3.0]} />
        <meshStandardMaterial color={walnutWoodColor} roughness={0.65} />
      </mesh>

      {/* Paved Walkway to Sidewalk */}
      <mesh position={[0, 0.02, 9.0]} receiveShadow>
        <boxGeometry args={[2.0, 0.04, 4.0]} />
        <meshStandardMaterial color="#c0bbb1" roughness={0.8} />
      </mesh>

      {/* Outdoor Mid-Century Lounge Chairs (2 chairs) on Porch */}
      {[2.5, 3.8].map((xCh, idx) => (
        <group key={`lounge-${idx}`} position={[xCh, 0.2, 5.6]} rotation={[0, -0.2, 0]}>
          {/* Seat & Slanted Back */}
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.08, 0.65]} />
            <meshStandardMaterial color="#c29668" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.65, -0.25]} rotation={[0.25, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.65, 0.08]} />
            <meshStandardMaterial color="#c29668" roughness={0.6} />
          </mesh>
          {/* Black Legs */}
          {[-0.28, 0.28].map((xL, lIdx) => (
            <mesh key={`leg-${lIdx}`} position={[xL, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
              <meshStandardMaterial color="#222" roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Modern Front Door with Warm Wood Inlay */}
      <mesh position={[0, 1.35, 4.52]} castShadow>
        <boxGeometry args={[1.5, 2.5, 0.1]} />
        <meshStandardMaterial color={walnutWoodColor} roughness={0.5} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.5, 1.3, 4.6]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.65, 8]} />
        <meshStandardMaterial color="#c0c4c8" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Interactive Door Trigger */}
      <InteractiveObject
        id="door-contact-house"
        name="Contact House Entrance"
        position={[0, 1.0, 5.6]}
        range={2.2}
        promptText="Press E to Explore Contact House"
        showBeacon={true}
        onInteract={handleDoorInteract}
      />

      {/* Porch Warm Sconce Light */}
      <mesh position={[1.0, 2.4, 4.56]} castShadow>
        <boxGeometry args={[0.15, 0.25, 0.1]} />
        <meshStandardMaterial color="#222" roughness={0.4} />
      </mesh>
      <pointLight position={[1.0, 2.3, 4.7]} intensity={0.4} distance={4} color="#ffe2b3" />

      {/* ======================================================== */}
      {/* --- BUILDING SIGN & ROADSIDE MAILBOX --- */}
      {/* ======================================================== */}
      <BuildingSign
        title="CONTACT HOUSE"
        subtitle="Inquiries & Collabs"
        position={[3.2, 0, 8.6]}
        rotation={[0, 0, 0]}
        scale={1.05}
      />

      {/* Modern Mid-Century Post Mailbox near roadside */}
      <group position={[-2.4, 0, 8.4]}>
        {/* Wood Post */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.1, 8]} />
          <meshStandardMaterial color={walnutWoodColor} roughness={0.7} />
        </mesh>
        {/* Charcoal Mailbox Box */}
        <mesh position={[0, 1.1, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.22, 0.5]} />
          <meshStandardMaterial color="#2d3033" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Red Flag */}
        <mesh position={[0.16, 1.15, 0.05]} castShadow>
          <boxGeometry args={[0.02, 0.12, 0.06]} />
          <meshStandardMaterial color="#c24438" roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}

