import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'
import useGameStore from '../../store/useGameStore'
import educationData from '../../data/education.json'

export default function EducationHouseInterior() {
  const floorWoodColor = '#ba9872'      // scandinavian pine timber flooring
  const shelfWoodColor = '#6d4f32'      // rich walnut library shelving
  const tableWoodColor = '#8c6b48'      // solid study desk wood

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

  const openEducationOverview = () => {
    useGameStore.getState().setActiveInteraction({
      type: 'education',
      name: 'Academic Credentials & Foundations',
      title: 'Formal Academic & Research Foundations',
      subtitle: educationData.learningPhilosophy,
      category: 'Education History',
      content: 'Comprehensive overview of formal higher education, accredited degree curriculum, core coursework, and professional engineering certifications.',
      degrees: educationData.degrees,
      certifications: educationData.certifications,
      workshops: educationData.workshops,
      footerNote: '[Data Source: src/data/education.json — Update degrees and coursework directly in JSON]',
    })
  }

  const openCertifications = () => {
    useGameStore.getState().setActiveInteraction({
      type: 'education',
      name: 'Professional Certifications Board',
      title: 'Industry Certifications & Accreditations',
      subtitle: 'Verified Cloud, Web & Systems Credentials',
      category: 'Professional Credentials',
      content: 'Industry certifications validating production-ready proficiency across cloud infrastructure, modern frontend engineering, and real-time 3D web graphics.',
      certifications: educationData.certifications,
      workshops: educationData.workshops,
      footerNote: '[Data Source: src/data/education.json — Update credentials directly in JSON]',
    })
  }

  return (
    <group position={[0, 0, 0]}>
      {/* ======================================================== */}
      {/* --- FLOOR & GABLE CEILING --- */}
      {/* ======================================================== */}
      <RigidBody type="fixed" name="education-interior-floor">
        <CuboidCollider args={[4.6, 0.1, 4.0]} position={[0, 0.05, 0]} />
        <CuboidCollider args={[4.6, 0.1, 4.0]} position={[0, 4.8, 0]} />
      </RigidBody>
      {/* Pine Hardwood Floor */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9.2, 8.0]} />
        <meshStandardMaterial color={floorWoodColor} roughness={0.65} metalness={0.05} />
      </mesh>
      {/* Vaulted Ceiling */}
      <mesh position={[0, 4.75, 0]} userData={{ cameraCollider: true }}>
        <boxGeometry args={[9.2, 0.1, 8.0]} />
        <meshStandardMaterial color="#f0ece4" roughness={0.8} />
      </mesh>

      {/* Warm Ambient Library Lighting */}
      <pointLight position={[0, 3.8, 0]} intensity={0.6} distance={12} color="#fff1db" />
      <pointLight position={[-3, 2.5, 0]} intensity={0.4} distance={6} color="#ffe8cc" />
      <pointLight position={[3, 2.5, 0]} intensity={0.4} distance={6} color="#ffe8cc" />

      {/* ======================================================== */}
      {/* --- CENTRAL STUDY READING TABLE & CHAIRS --- */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        <RigidBody type="fixed" name="study-table-collider">
          <CuboidCollider args={[1.6, 0.45, 0.8]} position={[0, 0.45, 0]} />
        </RigidBody>

        {/* Oak Table Top */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[3.2, 0.06, 1.6]} />
          <meshStandardMaterial color={tableWoodColor} roughness={0.6} />
        </mesh>
        {/* Table Legs */}
        {[-1.4, 1.4].map((xL, idx) =>
          [-0.6, 0.6].map((zL, jdx) => (
            <mesh key={`tbl-${idx}-${jdx}`} position={[xL, 0.36, zL]} castShadow>
              <boxGeometry args={[0.08, 0.72, 0.08]} />
              <meshStandardMaterial color="#2d2218" roughness={0.7} />
            </mesh>
          ))
        )}

        {/* Open Study Books & Reading Lamp on Table */}
        <mesh position={[-0.6, 0.79, 0]} rotation={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.35, 0.04, 0.26]} />
          <meshStandardMaterial color="#3a4f66" roughness={0.4} />
        </mesh>
        <mesh position={[0.6, 0.79, 0]} rotation={[0, -0.15, 0]} castShadow>
          <boxGeometry args={[0.32, 0.03, 0.24]} />
          <meshStandardMaterial color="#8a5342" roughness={0.4} />
        </mesh>
        {/* Brass Reading Desk Lamp */}
        <group position={[0, 0.77, 0]}>
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.03, 0.44, 8]} />
            <meshStandardMaterial color="#b8935c" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 0.35, 12]} />
            <meshStandardMaterial color="#2c5c36" roughness={0.3} metalness={0.4} />
          </mesh>
          <pointLight position={[0, 0.38, 0]} intensity={0.5} distance={3} color="#ffe8cc" />
        </group>

        {/* Central Academic Overview Interactive Trigger */}
        <InteractiveObject
          id="education-study-table"
          name="Academic Records & Coursework Table"
          position={[0, 0.8, 0]}
          range={2.4}
          promptText="Press E to View Academic Degrees"
          showBeacon={true}
          onInteract={openEducationOverview}
        />
      </group>

      {/* ======================================================== */}
      {/* --- TALL ACADEMIC BOOKSHELVES (NORTH WALL) --- */}
      {/* ======================================================== */}
      <group position={[0, 0, -3.6]}>
        <RigidBody type="fixed" name="education-bookshelf-north">
          <CuboidCollider args={[3.8, 1.8, 0.35]} position={[0, 1.8, 0]} />
        </RigidBody>
        {/* Bookshelf Frame */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[7.6, 3.6, 0.6]} />
          <meshStandardMaterial color={shelfWoodColor} roughness={0.7} />
        </mesh>
        {/* Shelves & Book Spines */}
        {[-0.9, 0, 0.9].map((yOff, sIdx) => (
          <group key={`shelf-tier-${sIdx}`} position={[0, 1.8 + yOff, 0.15]}>
            <mesh>
              <boxGeometry args={[7.2, 0.04, 0.4]} />
              <meshStandardMaterial color="#4d3520" roughness={0.6} />
            </mesh>
            {/* Rows of Books */}
            {Array.from({ length: 14 }).map((_, bIdx) => (
              <mesh key={`b-${bIdx}`} position={[-3.0 + bIdx * 0.46, 0.22, 0]} castShadow>
                <boxGeometry args={[0.18, 0.38, 0.3]} />
                <meshStandardMaterial
                  color={['#3d5670', '#8c4e3e', '#3e6b48', '#736149', '#54466b'][bIdx % 5]}
                  roughness={0.6}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* ======================================================== */}
      {/* --- WALL-MOUNTED FRAMED DEGREES & CERTIFICATES --- */}
      {/* ======================================================== */}
      {/* Degree Diplomas on West Wall */}
      <group position={[-4.5, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        {[-1.2, 1.2].map((xFrame, fIdx) => (
          <group key={`diploma-${fIdx}`} position={[xFrame, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.5, 1.1, 0.06]} />
              <meshStandardMaterial color="#222" roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0.035]}>
              <planeGeometry args={[1.38, 0.98]} />
              <meshStandardMaterial color="#f8f4ec" roughness={0.4} />
            </mesh>
            {/* Gold Seal Accent */}
            <mesh position={[0.45, -0.28, 0.04]}>
              <circleGeometry args={[0.09, 16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}
        {/* Interactive Diploma Trigger */}
        <InteractiveObject
          id="education-diploma-wall"
          name="Degree Diploma Showcase"
          position={[0, -0.3, 0.3]}
          range={2.3}
          promptText="Press E to Inspect Degree & Honors"
          showBeacon={false}
          onInteract={openEducationOverview}
        />
      </group>

      {/* Verified Certifications Board on East Wall */}
      <group position={[4.5, 2.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 2.0, 0.08]} />
          <meshStandardMaterial color="#2d3033" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[3.2, 1.8]} />
          <meshStandardMaterial color="#1f2833" emissive="#39526b" emissiveIntensity={0.25} />
        </mesh>
        <InteractiveObject
          id="education-cert-board"
          name="Certifications & Workshops Board"
          position={[0, -0.3, 0.3]}
          range={2.3}
          promptText="Press E to Inspect Certifications"
          showBeacon={false}
          onInteract={openCertifications}
        />
      </group>

      {/* ======================================================== */}
      {/* --- INTERIOR EXIT DOOR (SMOOTH TRANSITION TO PORCH) --- */}
      {/* ======================================================== */}
      <InteractiveObject
        id="door-education-interior"
        name="Education House Exit Door"
        position={[0, 1.0, 3.8]}
        range={1.9}
        promptText="Press E to Exit to Porch"
        showBeacon={false}
        onInteract={() => triggerDoorTransition([-10.5, 0.8, 32])}
      />
    </group>
  )
}

