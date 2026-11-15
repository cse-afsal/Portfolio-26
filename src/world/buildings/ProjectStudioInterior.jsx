import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import useGameStore from '../../store/useGameStore'
import projectsData from '../../data/projects.json'

export default function ProjectStudioInterior() {
  const floorTerrazzoColor = '#eae5dc'   // contemporary light terrazzo flooring
  const pedestalColor = '#242629'        // charcoal pedestal finish
  const accentGoldColor = '#d4af37'      // elegant gold highlight

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

  const openProjectModal = (project) => {
    useGameStore.getState().setActiveInteraction({
      type: 'project',
      id: project.id,
      stationNumber: project.stationNumber,
      title: project.title,
      subtitle: project.tagline,
      category: project.category,
      description: project.description,
      content: project.description,
      technologies: project.technologies,
      contribution: project.contribution,
      highlights: project.highlights,
      github: project.github,
      liveDemo: project.liveDemo,
      status: project.status,
      footerNote: '[Data Source: src/data/projects.json — Edit titles, tech, and URLs without touching code]',
    })
  }

  const projects = projectsData.featuredProjects

  // Coordinates for 4 individual project exhibition pedestals inside the studio
  const stationPositions = [
    { pos: [-3.8, 0, -1.8], proj: projects[0], rot: Math.PI / 4 },
    { pos: [-3.8, 0, 2.2], proj: projects[1], rot: -Math.PI / 4 },
    { pos: [3.8, 0, -1.8], proj: projects[2], rot: (3 * Math.PI) / 4 },
    { pos: [3.8, 0, 2.2], proj: projects[3], rot: -(3 * Math.PI) / 4 },
  ]

  return (
    <group position={[0, 0, 0]}>
      {/* ======================================================== */}
      {/* --- EXHIBITION ROOM FLOOR & CEILING --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="studio-interior-floor">
        <CuboidCollider args={[5.8, 0.1, 4.6]} position={[0, 0.05, 0]} />
        <CuboidCollider args={[5.8, 0.1, 4.6]} position={[0, 6.8, 0]} />
      </RigidBody>
      {/* Polished White Terrazzo Floor */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[11.6, 9.2]} />
        <meshStandardMaterial color={floorTerrazzoColor} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Studio High Ceiling */}
      <mesh position={[0, 6.75, 0]} userData={{ cameraCollider: true }}>
        <boxGeometry args={[11.6, 0.1, 9.2]} />
        <meshStandardMaterial color="#f5f2eb" roughness={0.8} />
      </mesh>

      {/* Atmospheric Gallery Spotlights */}
      <pointLight position={[0, 5.0, 0]} intensity={0.8} distance={15} color="#fff6eb" />
      <pointLight position={[-3.5, 4.2, -1.8]} intensity={0.5} distance={8} color="#ffe8cc" />
      <pointLight position={[3.5, 4.2, -1.8]} intensity={0.5} distance={8} color="#ffe8cc" />
      <pointLight position={[-3.5, 4.2, 2.2]} intensity={0.5} distance={8} color="#ffe8cc" />
      <pointLight position={[3.5, 4.2, 2.2]} intensity={0.5} distance={8} color="#ffe8cc" />

      {/* ======================================================== */}
      {/* --- CENTRAL KEYNOTE MAIN DISPLAY SCREEN --- */}
      {/* ======================================================== */}
      <group position={[0, 3.2, -4.45]}>
        {/* Massive Ultra-wide Studio Projector Display */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[6.8, 3.2, 0.15]} />
          <meshStandardMaterial color="#1a1c1e" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[6.6, 3.0]} />
          <meshStandardMaterial
            color="#202c38"
            emissive="#527899"
            emissiveIntensity={0.35}
            roughness={0.2}
          />
        </mesh>
        {/* Center Display Interactive Trigger */}
        <InteractiveObject
          id="studio-keynote-screen"
          name="Featured Projects Keynote Showcase"
          position={[0, -0.6, 0.5]}
          range={2.8}
          promptText="Press E to Explore Featured Projects"
          showBeacon={true}
          onInteract={() => openProjectModal(projects[0])}
        />
      </group>

      {/* ======================================================== */}
      {/* --- 4 DEDICATED INDIVIDUAL PROJECT STATIONS --- */}
      {/* ======================================================== */}
      {stationPositions.map((station, idx) => {
        const proj = station.proj
        if (!proj) return null

        return (
          <group key={proj.id} position={station.pos} rotation={[0, station.rot, 0]}>
            {/* Station Collider */}
            <RigidBody type="fixed" name={`station-${idx}`}>
              <CuboidCollider args={[0.9, 0.6, 0.6]} position={[0, 0.6, 0]} />
            </RigidBody>

            {/* Architectural Display Pedestal Plinth */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
              <boxGeometry args={[1.6, 1.0, 1.0]} />
              <meshStandardMaterial color={pedestalColor} roughness={0.4} metalness={0.5} />
            </mesh>

            {/* Glowing Accent Baseline Strip */}
            <mesh position={[0, 0.05, 0.51]}>
              <boxGeometry args={[1.5, 0.06, 0.02]} />
              <meshStandardMaterial color={accentGoldColor} emissive={accentGoldColor} emissiveIntensity={0.6} />
            </mesh>

            {/* Station Large Curved Screen Display */}
            <mesh position={[0, 1.35, -0.1]} castShadow receiveShadow>
              <boxGeometry args={[1.4, 0.8, 0.05]} />
              <meshStandardMaterial color="#1f1f1f" roughness={0.3} metalness={0.4} />
            </mesh>
            <mesh position={[0, 1.35, -0.07]}>
              <planeGeometry args={[1.32, 0.72]} />
              <meshStandardMaterial
                color="#253545"
                emissive="#729ec2"
                emissiveIntensity={0.3}
                roughness={0.2}
              />
            </mesh>

            {/* Keyboard & Interactive Controls on Pedestal */}
            <mesh position={[0, 1.02, 0.2]} castShadow>
              <boxGeometry args={[0.5, 0.02, 0.2]} />
              <meshStandardMaterial color="#303338" roughness={0.5} />
            </mesh>

            {/* Interactive Station Proximity Object */}
            <InteractiveObject
              id={`station-trigger-${proj.id}`}
              name={`${proj.stationNumber}: ${proj.title}`}
              position={[0, 1.2, 0.2]}
              range={2.3}
              promptText={`Press E to Inspect ${proj.title}`}
              showBeacon={true}
              onInteract={() => openProjectModal(proj)}
            />
          </group>
        )
      })}

      {/* ======================================================== */}
      {/* --- CENTRAL LOUNGE / DESIGNER BENCH --- */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        <RigidBody type="fixed" name="studio-central-bench">
          <CuboidCollider args={[1.4, 0.25, 0.6]} position={[0, 0.25, 0]} />
        </RigidBody>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.16, 1.1]} />
          <meshStandardMaterial color="#383c40" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[2.3, 0.3, 0.8]} />
          <meshStandardMaterial color="#222426" roughness={0.6} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* --- INTERIOR EXIT DOOR (SMOOTH TRANSITION TO BRIDGE) --- */}
      {/* ======================================================== */}
      <InteractiveObject
        id="door-project-studio-interior"
        name="Project Studio Exit Door"
        position={[0, 1.0, 3.8]}
        range={2.0}
        promptText="Press E to Exit to Reflecting Pool"
        showBeacon={false}
        onInteract={() => triggerDoorTransition([11.5, 0.8, 0])}
      />
    </group>
  )
}

