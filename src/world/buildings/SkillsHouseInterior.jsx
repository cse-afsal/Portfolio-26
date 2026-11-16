import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import useGameStore from '../../store/useGameStore'
import skillsData from '../../data/skills.json'

export default function SkillsHouseInterior() {
  const floorConcreteColor = '#7e8185'   // polished industrial grey concrete
  const deskWoodColor = '#2b2d30'        // modern charcoal workstation desk
  const screenGlowColor = '#6ea8d9'      // soft developer terminal screen glow

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

  // Open skills category in modal
  const openSkillCategory = (category) => {
    useGameStore.getState().setActiveInteraction({
      type: 'skills',
      name: `${category.name} Board`,
      title: category.name,
      subtitle: category.description,
      category: 'Technical Competency',
      content: `Interactive breakdown of core proficiencies and applied tooling in ${category.name}. All items are maintained directly in src/data/skills.json.`,
      skillCategories: [category],
      footerNote: '[Data Source: src/data/skills.json — Edit categories and items without touching code]',
    })
  }

  // Open all skills comprehensive overview
  const openAllSkills = () => {
    useGameStore.getState().setActiveInteraction({
      type: 'skills',
      name: 'Master Skills Matrix',
      title: 'Full Technical Skills & Tools Matrix',
      subtitle: 'Comprehensive Engineering Capabilities',
      category: 'Complete Overview',
      content: 'A complete inventory of programming languages, frontend/3D frameworks, backend architectures, databases, and developer tooling.',
      skillCategories: skillsData.categories,
      footerNote: '[Data Source: src/data/skills.json — Edit categories and items without touching code]',
    })
  }

  return (
    <group position={[0, 0, 0]}>
      {/* ======================================================== */}
      {/* --- INTERIOR FLOOR SLAB & CEILING --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="skills-interior-floor">
        <CuboidCollider args={[4.8, 0.1, 4.0]} position={[0, 0.05, 0]} />
        <CuboidCollider args={[4.8, 0.1, 4.0]} position={[0, 4.8, 0]} />
      </RigidBody>
      {/* Concrete Floor Mesh */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9.6, 8.0]} />
        <meshStandardMaterial color={floorConcreteColor} roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Interior Ceiling */}
      <mesh position={[0, 4.75, 0]} userData={{ cameraCollider: true }}>
        <boxGeometry args={[9.6, 0.1, 8.0]} />
        <meshStandardMaterial color="#f2eee7" roughness={0.8} />
      </mesh>

      {/* Warm Workshop Interior Ambient Lighting */}
      <pointLight position={[0, 3.8, 0]} intensity={0.65} distance={12} color="#fff2df" />
      <pointLight position={[-3, 3.5, 2]} intensity={0.4} distance={8} color="#e6f0fa" />
      <pointLight position={[3, 3.5, -2]} intensity={0.4} distance={8} color="#fff6e8" />

      {/* ======================================================== */}
      {/* --- CENTRAL DUAL WORKSTATIONS (COMPUTER LAB) --- */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        <RigidBody type="fixed" name="skills-central-island">
          <CuboidCollider args={[1.8, 0.45, 0.8]} position={[0, 0.45, 0]} />
        </RigidBody>
        {/* Main Workstation Desk Table */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[3.6, 0.06, 1.6]} />
          <meshStandardMaterial color={deskWoodColor} roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Steel Legs */}
        {[-1.6, 1.6].map((xL, idx) => (
          <mesh key={`desk-leg-${idx}`} position={[xL, 0.36, 0]} castShadow>
            <boxGeometry args={[0.08, 0.72, 1.5]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.7} />
          </mesh>
        ))}

        {/* 4 Multi-Monitor Terminal Setups on Table */}
        {[-1.0, 1.0].map((xPos, mIdx) => (
          <group key={`dual-mon-${mIdx}`} position={[xPos, 0.77, 0]}>
            {/* Monitor 1 (Facing -Z) */}
            <mesh position={[0, 0.28, -0.25]} castShadow>
              <boxGeometry args={[0.7, 0.4, 0.03]} />
              <meshStandardMaterial color="#1f1f1f" />
            </mesh>
            <mesh position={[0, 0.28, -0.23]}>
              <planeGeometry args={[0.66, 0.36]} />
              <meshStandardMaterial color="#1a2b3c" emissive={screenGlowColor} emissiveIntensity={0.4} />
            </mesh>

            {/* Monitor 2 (Facing +Z) */}
            <mesh position={[0, 0.28, 0.25]} castShadow>
              <boxGeometry args={[0.7, 0.4, 0.03]} />
              <meshStandardMaterial color="#1f1f1f" />
            </mesh>
            <mesh position={[0, 0.28, 0.23]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.66, 0.36]} />
              <meshStandardMaterial color="#1a2b3c" emissive={screenGlowColor} emissiveIntensity={0.4} />
            </mesh>
          </group>
        ))}

        {/* Master Skills Matrix Terminal (Interactive Object) */}
        <InteractiveObject
          id="skills-master-terminal"
          name="Skills Lab Master Console"
          position={[0, 0.8, 0]}
          range={2.4}
          promptText="Press E to View Full Skills Matrix"
          showBeacon={true}
          onInteract={openAllSkills}
        />
      </group>

      {/* ======================================================== */}
      {/* --- WALL-MOUNTED INTERACTIVE SKILL DISPLAY BOARDS --- */}
      {/* ======================================================== */}
      {/* North Wall: Languages & Frontend Boards */}
      <group position={[-2.2, 2.2, -3.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 1.8, 0.1]} />
          <meshStandardMaterial color="#242629" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.6, 1.6]} />
          <meshStandardMaterial color="#1a2330" emissive="#3d5a80" emissiveIntensity={0.25} />
        </mesh>
        <InteractiveObject
          id="board-languages"
          name="Programming Languages Display"
          position={[0, -0.2, 0.2]}
          range={2.2}
          promptText="Press E to Inspect Languages"
          showBeacon={false}
          onInteract={() => openSkillCategory(skillsData.categories[0])}
        />
      </group>

      <group position={[2.2, 2.2, -3.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 1.8, 0.1]} />
          <meshStandardMaterial color="#242629" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.6, 1.6]} />
          <meshStandardMaterial color="#231a30" emissive="#6b4c9a" emissiveIntensity={0.25} />
        </mesh>
        <InteractiveObject
          id="board-frontend"
          name="Frontend & 3D Web Graphics Display"
          position={[0, -0.2, 0.2]}
          range={2.2}
          promptText="Press E to Inspect Frontend & 3D"
          showBeacon={false}
          onInteract={() => openSkillCategory(skillsData.categories[1])}
        />
      </group>

      {/* West Wall: Backend & Databases Boards */}
      <group position={[-4.7, 2.2, -1.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 1.8, 0.1]} />
          <meshStandardMaterial color="#242629" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.4, 1.6]} />
          <meshStandardMaterial color="#1a2e26" emissive="#3d8062" emissiveIntensity={0.25} />
        </mesh>
        <InteractiveObject
          id="board-backend"
          name="Backend & Cloud Architecture Display"
          position={[0, -0.2, 0.2]}
          range={2.2}
          promptText="Press E to Inspect Backend & APIs"
          showBeacon={false}
          onInteract={() => openSkillCategory(skillsData.categories[2])}
        />
      </group>

      <group position={[-4.7, 2.2, 1.8]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 1.8, 0.1]} />
          <meshStandardMaterial color="#242629" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.4, 1.6]} />
          <meshStandardMaterial color="#2f2a1b" emissive="#806d3d" emissiveIntensity={0.25} />
        </mesh>
        <InteractiveObject
          id="board-databases"
          name="Databases & Storage Display"
          position={[0, -0.2, 0.2]}
          range={2.2}
          promptText="Press E to Inspect Databases"
          showBeacon={false}
          onInteract={() => openSkillCategory(skillsData.categories[3])}
        />
      </group>

      {/* East Wall: DevOps & Currently Learning Boards */}
      <group position={[4.7, 2.2, -1.5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 1.8, 0.1]} />
          <meshStandardMaterial color="#242629" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.4, 1.6]} />
          <meshStandardMaterial color="#2b231c" emissive="#915838" emissiveIntensity={0.25} />
        </mesh>
        <InteractiveObject
          id="board-tools"
          name="DevOps & Developer Tools Display"
          position={[0, -0.2, 0.2]}
          range={2.2}
          promptText="Press E to Inspect Tools & DevOps"
          showBeacon={false}
          onInteract={() => openSkillCategory(skillsData.categories[4])}
        />
      </group>

      <group position={[4.7, 2.2, 1.8]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 1.8, 0.1]} />
          <meshStandardMaterial color="#242629" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.4, 1.6]} />
          <meshStandardMaterial color="#1a2d38" emissive="#3d718a" emissiveIntensity={0.25} />
        </mesh>
        <InteractiveObject
          id="board-learning"
          name="Currently Learning & Research Display"
          position={[0, -0.2, 0.2]}
          range={2.2}
          promptText="Press E to Inspect Learning Goals"
          showBeacon={false}
          onInteract={() => openSkillCategory(skillsData.categories[5])}
        />
      </group>

      {/* ======================================================== */}
      {/* --- INTERIOR EXIT DOOR (SMOOTH TRANSITION TO STREET) --- */}
      {/* ======================================================== */}
      <InteractiveObject
        id="door-skills-interior"
        name="Skills House Exit Door"
        position={[0.5, 1.0, 3.8]}
        range={1.9}
        promptText="Press E to Exit to Street"
        showBeacon={false}
        onInteract={() => triggerDoorTransition([-10.5, 0.8, -32])}
      />
    </group>
  )
}

