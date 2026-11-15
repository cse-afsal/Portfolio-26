import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import useGameStore from '../../store/useGameStore'
import achievementsData from '../../data/achievements.json'

export default function AchievementGalleryInterior() {
  const floorSlateColor = '#323438'      // honed dark museum slate flooring
  const wallGalleryColor = '#f5f2eb'     // pristine museum off-white gallery wall
  const bronzeTrimColor = '#b8935c'      // brushed bronze accent metal

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

  const openAwardsModal = () => {
    useGameStore.getState().setActiveInteraction({
      type: 'achievements',
      name: 'Honors & Major Awards Gallery',
      title: 'Honors, Hackathons & Major Awards',
      subtitle: 'Recognitions in Engineering, Creative Development & UX',
      category: 'Excellence & Awards',
      content: 'Major competitive accolades, hackathon victories, and peer-reviewed project recognitions demonstrating leadership and high-standard software craftsmanship.',
      awards: achievementsData.awards,
      competitions: achievementsData.competitions,
      footerNote: '[Data Source: src/data/achievements.json — Update honors directly in JSON]',
    })
  }

  const openMilestonesModal = () => {
    useGameStore.getState().setActiveInteraction({
      type: 'achievements',
      name: 'Career Milestones & Open-Source Impact',
      title: 'Milestones & Community Leadership',
      subtitle: 'Open Source Metrics, Public Speaking & Mentorship',
      category: 'Community & Impact',
      content: 'Tracking career milestones including developer community tooling downloads, keynote presentations on real-time web graphics, and mentorship initiatives.',
      milestones: achievementsData.milestones,
      activities: achievementsData.activities,
      footerNote: '[Data Source: src/data/achievements.json — Update milestones directly in JSON]',
    })
  }

  return (
    <group position={[0, 0, 0]}>
      {/* ======================================================== */}
      {/* --- GALLERY FLOOR & CEILING --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="gallery-interior-floor">
        <CuboidCollider args={[5.2, 0.1, 4.4]} position={[0, 0.05, 0]} />
        <CuboidCollider args={[5.2, 0.1, 4.4]} position={[0, 5.2, 0]} />
      </RigidBody>
      {/* Honed Dark Slate Floor */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10.4, 8.8]} />
        <meshStandardMaterial color={floorSlateColor} roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Gallery Ceiling */}
      <mesh position={[0, 5.15, 0]} userData={{ cameraCollider: true }}>
        <boxGeometry args={[10.4, 0.1, 8.8]} />
        <meshStandardMaterial color="#ede9e1" roughness={0.8} />
      </mesh>

      {/* Museum Exhibition Lighting */}
      <pointLight position={[0, 4.2, 0]} intensity={0.7} distance={14} color="#fff6eb" />
      <pointLight position={[-3.2, 3.2, -2.5]} intensity={0.5} distance={7} color="#ffe8cc" />
      <pointLight position={[3.2, 3.2, -2.5]} intensity={0.5} distance={7} color="#ffe8cc" />

      {/* ======================================================== */}
      {/* --- CENTRAL MONUMENTAL EXHIBITION PLINTH --- */}
      {/* ======================================================== */}
      <group position={[0, 0, -0.6]}>
        <RigidBody type="fixed" name="gallery-central-plinth">
          <CuboidCollider args={[1.2, 0.5, 0.8]} position={[0, 0.5, 0]} />
        </RigidBody>

        {/* Polished Granite Pedestal */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[2.4, 1.0, 1.6]} />
          <meshStandardMaterial color="#222426" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Bronze Plaque Band */}
        <mesh position={[0, 0.1, 0.81]}>
          <boxGeometry args={[2.2, 0.08, 0.02]} />
          <meshStandardMaterial color={bronzeTrimColor} metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Glass Vitrine Case */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[1.8, 0.8, 1.2]} />
          <meshStandardMaterial
            color="#d8ebfa"
            roughness={0.05}
            metalness={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* Golden Trophy Artifact Inside Case */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <octahedronGeometry args={[0.26]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Central Plinth Interactive Object */}
        <InteractiveObject
          id="gallery-trophy-vitrine"
          name="Grand Hackathon & Innovation Trophy"
          position={[0, 1.1, 0]}
          range={2.4}
          promptText="Press E to View Major Honors & Awards"
          showBeacon={true}
          onInteract={openAwardsModal}
        />
      </group>

      {/* ======================================================== */}
      {/* --- WALL-MOUNTED GOLD & BRONZE EXHIBITION FRAMES --- */}
      {/* ======================================================== */}
      {/* North Wall: 3 Large Architectural Award Showcases */}
      {[-2.8, 0, 2.8].map((xFrame, idx) => (
        <group key={`award-frame-${idx}`} position={[xFrame, 2.4, -4.2]}>
          {/* Outer Frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 1.6, 0.08]} />
            <meshStandardMaterial color={bronzeTrimColor} metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Inner Inset Mat */}
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[2.0, 1.4]} />
            <meshStandardMaterial color="#282a2e" roughness={0.9} />
          </mesh>
          {/* Certificate / Award Foil Canvas */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[1.8, 1.2]} />
            <meshStandardMaterial color="#faf6ee" roughness={0.4} />
          </mesh>
          {/* Spotlight above each frame */}
          <pointLight position={[0, 1.1, 0.4]} intensity={0.4} distance={3} color="#fff6e8" />
        </group>
      ))}

      {/* Interactive Trigger for Wall of Honors */}
      <InteractiveObject
        id="gallery-awards-wall"
        name="Wall of Honors & Accolades"
        position={[0, 2.0, -3.8]}
        range={2.6}
        promptText="Press E to Inspect Awards & Competitions"
        showBeacon={false}
        onInteract={openAwardsModal}
      />

      {/* ======================================================== */}
      {/* --- MILESTONES & OPEN SOURCE TIMELINE (WEST WALL) --- */}
      {/* ======================================================== */}
      <group position={[-5.0, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.2, 2.0, 0.1]} />
          <meshStandardMaterial color="#26282b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[4.0, 1.8]} />
          <meshStandardMaterial color="#1a232e" emissive="#395b7a" emissiveIntensity={0.25} />
        </mesh>
        <InteractiveObject
          id="gallery-milestones-timeline"
          name="Career Milestones & Open-Source Timeline"
          position={[0, -0.2, 0.3]}
          range={2.4}
          promptText="Press E to View Milestones & Impact"
          showBeacon={false}
          onInteract={openMilestonesModal}
        />
      </group>

      {/* ======================================================== */}
      {/* --- INTERIOR EXIT DOOR (SMOOTH TRANSITION TO PORTICO) --- */}
      {/* ======================================================== */}
      <InteractiveObject
        id="door-achievement-interior"
        name="Achievement Gallery Exit Door"
        position={[0, 1.0, 4.0]}
        range={2.0}
        promptText="Press E to Exit to Portico"
        showBeacon={false}
        onInteract={() => triggerDoorTransition([10.5, 0.8, -32])}
      />
    </group>
  )
}

