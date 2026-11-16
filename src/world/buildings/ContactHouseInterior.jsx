import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import useGameStore from '../../store/useGameStore'
import contactData from '../../data/contact.json'

export default function ContactHouseInterior() {
  const floorTileColor = '#b56c54'       // warm mid-century terracotta tiles
  const walnutWoodColor = '#735235'      // rich walnut timber
  const screenGlowColor = '#5e94c2'      // terminal blue glow

  const triggerDoorTransition = (targetPos) => {
    useGameStore.getState().setDoorTransitioning(true)
    useGameStore.getState().setTransitionFadeOpacity(1)

    setTimeout(() => {
      useGameStore.getState().setPlayerTeleportTarget(targetPos)
      setTimeout(() => {
        useGameStore.getState().setTransitionFadeOpacity(0)
        useGameStore.getState().setDoorTransitioning(false)
      }, 350)
    }, 350)
  }

  const openContactChannels = () => {
    useGameStore.getState().setActiveInteraction({
      type: 'contact',
      name: 'Communications & Direct Inquiries Desk',
      title: 'Get In Touch & Social Channels',
      subtitle: `${contactData.personal.availability} • ${contactData.personal.responseTime}`,
      category: 'Inquiries & Channels',
      content: `Welcome to the Contact House. All professional networks, direct email, and verified profiles are active below. Click any button to open directly in a new tab.`,
      links: contactData.links,
      footerNote: '[Data Source: src/data/contact.json — Links open in new tabs with noopener noreferrer]',
    })
  }

  return (
    <group position={[0, 0, 0]}>
      {/* ======================================================== */}
      {/* --- TERRACOTTA TILE FLOOR & TIMBER CEILING --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="contact-interior-floor">
        <CuboidCollider args={[4.8, 0.1, 4.0]} position={[0, 0.05, 0]} />
        <CuboidCollider args={[4.8, 0.1, 4.0]} position={[0, 4.2, 0]} />
      </RigidBody>
      {/* Warm Terracotta Tile Floor */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9.6, 8.0]} />
        <meshStandardMaterial color={floorTileColor} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Mid-Century Timber Ceiling */}
      <mesh position={[0, 4.15, 0]} userData={{ cameraCollider: true }}>
        <boxGeometry args={[9.6, 0.1, 8.0]} />
        <meshStandardMaterial color="#ebdcc8" roughness={0.7} />
      </mesh>

      {/* Warm Sconce & Ambient Reception Lighting */}
      <pointLight position={[0, 3.4, 0]} intensity={0.6} distance={12} color="#fff0d9" />
      <pointLight position={[-2.8, 2.8, -2.5]} intensity={0.45} distance={6} color="#ffe8cc" />
      <pointLight position={[2.8, 2.8, 2.0]} intensity={0.4} distance={6} color="#ffe8cc" />

      {/* ======================================================== */}
      {/* --- RECEPTION CONTACT DESK & WORKSTATION COMPUTER --- */}
      {/* ======================================================== */}
      <group position={[-1.8, 0, -2.2]}>
        <RigidBody type="fixed" name="contact-reception-desk">
          <CuboidCollider args={[1.6, 0.5, 0.6]} position={[0, 0.5, 0]} />
        </RigidBody>

        {/* Curved Walnut Reception Desk Body */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[3.2, 1.0, 1.2]} />
          <meshStandardMaterial color={walnutWoodColor} roughness={0.6} />
        </mesh>
        {/* Stone Countertop Top Slab */}
        <mesh position={[0, 1.03, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.3, 0.06, 1.3]} />
          <meshStandardMaterial color="#ded9ce" roughness={0.4} />
        </mesh>

        {/* Reception Desktop Computer Monitor */}
        <mesh position={[-0.4, 1.35, -0.1]} castShadow>
          <boxGeometry args={[0.7, 0.45, 0.04]} />
          <meshStandardMaterial color="#1f1f1f" />
        </mesh>
        <mesh position={[-0.4, 1.35, -0.07]}>
          <planeGeometry args={[0.66, 0.41]} />
          <meshStandardMaterial color="#1a2b3c" emissive={screenGlowColor} emissiveIntensity={0.4} />
        </mesh>
        {/* Keyboard & Mouse */}
        <mesh position={[-0.4, 1.07, 0.2]} castShadow>
          <boxGeometry args={[0.35, 0.02, 0.12]} />
          <meshStandardMaterial color="#2d2d2d" />
        </mesh>

        {/* Small Reception Desk Plant in Ceramic Pot */}
        <mesh position={[0.8, 1.15, 0.1]} castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.15, 12]} />
          <meshStandardMaterial color="#e0d6c5" roughness={0.5} />
        </mesh>
        <mesh position={[0.8, 1.3, 0.1]} castShadow>
          <sphereGeometry args={[0.12, 7, 7]} />
          <meshStandardMaterial color="#4a7342" roughness={0.8} />
        </mesh>

        {/* Contact Desk Proximity Interaction */}
        <InteractiveObject
          id="contact-desk-terminal"
          name="Reception Communications Terminal"
          position={[0, 1.1, 0.2]}
          range={2.4}
          promptText="Press E to Open Contact Directory & Links"
          showBeacon={true}
          onInteract={openContactChannels}
        />
      </group>

      {/* ======================================================== */}
      {/* --- SOCIAL MEDIA & PROFESSIONAL CHANNELS WALL DISPLAY --- */}
      {/* ======================================================== */}
      <group position={[0, 2.2, -3.9]}>
        {/* Modern Framed Media Display */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.6, 2.0, 0.08]} />
          <meshStandardMaterial color="#242629" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[4.4, 1.8]} />
          <meshStandardMaterial color="#1a2430" emissive="#3d688a" emissiveIntensity={0.25} />
        </mesh>

        {/* Interactive Social Media Trigger */}
        <InteractiveObject
          id="contact-social-wall"
          name="Social Media & Professional Links Wall"
          position={[0, -0.2, 0.3]}
          range={2.6}
          promptText="Press E to View Social Media & Links"
          showBeacon={false}
          onInteract={openContactChannels}
        />
      </group>

      {/* ======================================================== */}
      {/* --- RECEPTION LOUNGE SEATING & COFFEE TABLE --- */}
      {/* ======================================================== */}
      <group position={[2.2, 0, 1.2]}>
        <RigidBody type="fixed" name="contact-lounge-sofa">
          <CuboidCollider args={[1.2, 0.4, 0.5]} position={[0, 0.4, 0]} />
        </RigidBody>

        {/* Mid-Century Cream Fabric Sofa */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[2.4, 0.4, 0.9]} />
          <meshStandardMaterial color="#ede7db" roughness={0.85} />
        </mesh>
        {/* Sofa Backrest */}
        <mesh position={[0, 0.72, -0.32]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[2.4, 0.5, 0.2]} />
          <meshStandardMaterial color="#ede7db" roughness={0.85} />
        </mesh>

        {/* Walnut Low Coffee Table */}
        <mesh position={[0, 0.25, 1.0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.05, 0.7]} />
          <meshStandardMaterial color={walnutWoodColor} roughness={0.6} />
        </mesh>
        {/* Legs */}
        {[-0.6, 0.6].map((xL, idx) => (
          <mesh key={`ct-leg-${idx}`} position={[xL, 0.12, 1.0]} castShadow>
            <cylinderGeometry args={[0.02, 0.015, 0.24, 6]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        ))}

        {/* Large Indoor Potted Plant */}
        <group position={[-1.6, 0, -0.4]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.2, 0.6, 12]} />
            <meshStandardMaterial color="#b56c54" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.9, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.04, 0.8, 6]} />
            <meshStandardMaterial color="#4a3625" />
          </mesh>
          <mesh position={[0, 1.4, 0]} castShadow>
            <sphereGeometry args={[0.55, 8, 8]} />
            <meshStandardMaterial color="#3d5e38" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* --- INTERIOR EXIT DOOR (SMOOTH TRANSITION TO PORCH) --- */}
      {/* ======================================================== */}
      <InteractiveObject
        id="door-contact-interior"
        name="Contact House Exit Door"
        position={[0, 1.0, 3.8]}
        range={1.9}
        promptText="Press E to Exit to Porch"
        showBeacon={false}
        onInteract={() => triggerDoorTransition([10.5, 0.8, 32])}
      />
    </group>
  )
}

