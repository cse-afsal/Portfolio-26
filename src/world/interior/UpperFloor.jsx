import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'

export default function UpperFloor() {
  const woodFloorColor = '#9a7550'      // warm timber floor
  const deskWoodColor = '#7e5d3d'       // walnut desk top
  const deskSteelColor = '#222426'      // black steel frame
  const bedWoodColor = '#6d4f34'        // bed wood frame
  const bedLinenColor = '#e3ded8'       // warm cream linen
  const pillowColor = '#505459'         // charcoal accent pillows
  const screenGlowColor = '#9dc4ea'     // soft screen emission

  return (
    <group>
      {/* ======================================================== */}
      {/* --- UPPER FLOOR PLATFORM & COLLIDER --- */}
      {/* ======================================================== */}
      {/* Platform spans [-16.8, -7.2] in X, [0.0, 6.8] in Z (workspace) and [-16.8, -7.2] in X, [-6.8, -1.8] in Z (bedroom) */}
      <RigidBody type="fixed" name="upper-floor">
        {/* Workspace floor section */}
        <CuboidCollider args={[4.8, 0.1, 3.4]} position={[-12.0, 3.1, 3.4]} />
        {/* Bedroom floor section */}
        <CuboidCollider args={[4.8, 0.1, 2.5]} position={[-12.0, 3.1, -4.3]} />
        {/* Connecting corridor walkway between workspace and bedroom */}
        <CuboidCollider args={[1.2, 0.1, 1.2]} position={[-15.6, 3.1, -0.6]} />

        {/* Safety balustrade railing colliders around the open void */}
        <CuboidCollider args={[3.6, 0.5, 0.05]} position={[-10.8, 3.7, 0.0]} />
        <CuboidCollider args={[3.6, 0.5, 0.05]} position={[-10.8, 3.7, -1.8]} />
        <CuboidCollider args={[0.05, 0.5, 0.9]} position={[-14.4, 3.7, -0.9]} />
      </RigidBody>

      {/* Visual Upper Wood Floor Slabs */}
      <mesh
        position={[-12.0, 3.18, 3.4]}
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[9.6, 0.08, 6.8]} />
        <meshStandardMaterial color={woodFloorColor} roughness={0.6} />
      </mesh>
      <mesh
        position={[-12.0, 3.18, -4.3]}
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[9.6, 0.08, 5.0]} />
        <meshStandardMaterial color={woodFloorColor} roughness={0.6} />
      </mesh>
      <mesh
        position={[-15.6, 3.18, -0.6]}
        receiveShadow
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[2.4, 0.08, 2.4]} />
        <meshStandardMaterial color={woodFloorColor} roughness={0.6} />
      </mesh>

      {/* Ceiling underneath upper floor (visible from ground floor) */}
      <mesh
        position={[-12.0, 3.06, 3.4]}
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[9.6, 0.04, 6.8]} />
        <meshStandardMaterial color="#f0eee9" roughness={0.8} />
      </mesh>
      <mesh
        position={[-12.0, 3.06, -4.3]}
        userData={{ cameraCollider: true }}
      >
        <boxGeometry args={[9.6, 0.04, 5.0]} />
        <meshStandardMaterial color="#f0eee9" roughness={0.8} />
      </mesh>

      {/* Modern Glass & Metal Safety Balustrade around the living room open void */}
      {/* South railing */}
      <mesh position={[-10.8, 3.7, 0.0]} castShadow>
        <boxGeometry args={[7.2, 0.04, 0.04]} />
        <meshStandardMaterial color="#222" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[-10.8, 3.65, 0.0]}>
        <boxGeometry args={[7.2, 0.85, 0.015]} />
        <meshStandardMaterial color="#d4e6f1" roughness={0.1} transparent opacity={0.35} />
      </mesh>

      {/* North railing */}
      <mesh position={[-10.8, 3.7, -1.8]} castShadow>
        <boxGeometry args={[7.2, 0.04, 0.04]} />
        <meshStandardMaterial color="#222" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[-10.8, 3.65, -1.8]}>
        <boxGeometry args={[7.2, 0.85, 0.015]} />
        <meshStandardMaterial color="#d4e6f1" roughness={0.1} transparent opacity={0.35} />
      </mesh>


      {/* ======================================================== */}
      {/* --- PERSONAL WORKSPACE (UPSTAIRS MEZZANINE) --- */}
      {/* ======================================================== */}
      <group position={[-12.5, 3.22, 4.6]}>
        {/* Workspace Rug */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[3.2, 2.6]} />
          <meshStandardMaterial color="#dcd7cf" roughness={0.9} />
        </mesh>

        {/* 4. INTERACTIVE OBJECT: Creative Desk (Goals & Current Activities) */}
        <InteractiveObject
          id="desk"
          name="Creative Development Desk"
          position={[0, 0.75, 0]}
          range={2.4}
          promptText="Press E to Explore Goals & Activities"
        >
          {/* Solid Walnut Desk Top */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
            <boxGeometry args={[1.8, 0.05, 0.9]} />
            <meshStandardMaterial color={deskWoodColor} roughness={0.4} />
          </mesh>
          {/* Black steel minimalist legs */}
          {[-0.8, 0.8].map((x, i) => (
            <mesh key={`desk-leg-${i}`} position={[x, -0.36, 0]} castShadow>
              <boxGeometry args={[0.05, 0.72, 0.8]} />
              <meshStandardMaterial color={deskSteelColor} roughness={0.5} metalness={0.4} />
            </mesh>
          ))}

          {/* Large Desk Felt Mouse Mat */}
          <mesh position={[0, 0.027, 0.08]}>
            <planeGeometry args={[1.1, 0.5]} />
            <meshStandardMaterial color="#2c2f33" roughness={0.9} />
          </mesh>

          {/* Mechanical Keyboard */}
          <mesh position={[-0.05, 0.038, 0.16]} castShadow>
            <boxGeometry args={[0.34, 0.018, 0.13]} />
            <meshStandardMaterial color="#24272a" roughness={0.4} />
          </mesh>
          {/* Mouse */}
          <mesh position={[0.26, 0.035, 0.16]} castShadow>
            <boxGeometry args={[0.07, 0.02, 0.11]} />
            <meshStandardMaterial color="#1a1c1e" roughness={0.3} />
          </mesh>

          {/* Studio Monitor Speakers */}
          <mesh position={[-0.7, 0.15, -0.25]} castShadow>
            <boxGeometry args={[0.16, 0.26, 0.16]} />
            <meshStandardMaterial color="#222" roughness={0.4} />
          </mesh>
          <mesh position={[0.7, 0.15, -0.25]} castShadow>
            <boxGeometry args={[0.16, 0.26, 0.16]} />
            <meshStandardMaterial color="#222" roughness={0.4} />
          </mesh>

          {/* Architect Desk Lamp with warm glow */}
          <group position={[-0.7, 0.02, 0.25]}>
            <mesh position={[0, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.015, 0.02, 0.4, 6]} />
              <meshStandardMaterial color="#b8935c" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0.1, 0.38, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
              <cylinderGeometry args={[0.06, 0.1, 0.12, 12]} />
              <meshStandardMaterial color="#222" roughness={0.4} />
            </mesh>
            <pointLight position={[0.15, 0.35, 0]} intensity={0.4} distance={3} color="#ffe8cc" />
          </group>

          {/* Small Potted Succulent on Desk */}
          <mesh position={[0.65, 0.07, 0.2]} castShadow>
            <cylinderGeometry args={[0.05, 0.04, 0.09, 12]} />
            <meshStandardMaterial color="#e0d7c8" roughness={0.6} />
          </mesh>
          <mesh position={[0.65, 0.13, 0.2]} castShadow>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial color="#50784a" roughness={0.8} />
          </mesh>
        </InteractiveObject>

        {/* 5. INTERACTIVE OBJECT: Workstation Computer (Professional Profile) */}
        <InteractiveObject
          id="computer"
          name="Workstation Terminal"
          position={[0, 0.95, -0.2]}
          range={2.2}
          promptText="Press E to View Professional Profile"
        >
          {/* Dual Monitor Stand */}
          <mesh position={[0, 0.1, -0.05]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
            <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.02, -0.05]} castShadow>
            <boxGeometry args={[0.3, 0.02, 0.2]} />
            <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Primary Ultra-wide Curved Monitor */}
          <mesh position={[0, 0.28, -0.05]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.42, 0.03]} />
            <meshStandardMaterial color="#1a1c1e" roughness={0.3} />
          </mesh>
          {/* Glowing Display Screen */}
          <mesh position={[0, 0.28, -0.03]}>
            <planeGeometry args={[0.86, 0.38]} />
            <meshStandardMaterial
              color="#2a3d54"
              emissive={screenGlowColor}
              emissiveIntensity={0.35}
              roughness={0.2}
            />
          </mesh>

          {/* Secondary Vertical Code Monitor */}
          <mesh position={[0.55, 0.32, -0.02]} rotation={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.26, 0.48, 0.025]} />
            <meshStandardMaterial color="#1a1c1e" roughness={0.3} />
          </mesh>
          <mesh position={[0.545, 0.32, -0.005]} rotation={[0, -0.3, 0]}>
            <planeGeometry args={[0.23, 0.44]} />
            <meshStandardMaterial
              color="#1f2c3d"
              emissive="#7aa9d6"
              emissiveIntensity={0.3}
              roughness={0.2}
            />
          </mesh>
        </InteractiveObject>

        {/* Ergonomic Office Chair */}
        <group position={[0, 0, 0.65]} rotation={[0, Math.PI, 0]}>
          <RigidBody type="fixed" name="office-chair">
            <CuboidCollider args={[0.3, 0.45, 0.3]} position={[0, 0.45, 0]} />
          </RigidBody>
          {/* 5-star base & wheels */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.26, 0.04, 5]} />
            <meshStandardMaterial color="#1f1f1f" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Hydraulic cylinder */}
          <mesh position={[0, 0.28, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.32, 8]} />
            <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Mesh seat */}
          <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.07, 0.48]} />
            <meshStandardMaterial color="#2d3033" roughness={0.7} />
          </mesh>
          {/* Ergonomic backrest */}
          <mesh position={[0, 0.78, -0.22]} rotation={[-0.1, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.46, 0.58, 0.05]} />
            <meshStandardMaterial color="#25282b" roughness={0.6} />
          </mesh>
          {/* Armrests */}
          {[-0.26, 0.26].map((x, i) => (
            <mesh key={`armrest-${i}`} position={[x, 0.62, -0.05]} castShadow>
              <boxGeometry args={[0.05, 0.04, 0.26]} />
              <meshStandardMaterial color="#222" roughness={0.5} />
            </mesh>
          ))}
        </group>
      </group>


      {/* ======================================================== */}
      {/* --- UPSTAIRS BEDROOM SUITE --- */}
      {/* ======================================================== */}
      <group position={[-12.0, 3.22, -4.5]}>
        {/* Plush Bedroom Rug */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[3.6, 3.2]} />
          <meshStandardMaterial color="#dcdad4" roughness={0.9} />
        </mesh>

        {/* Modern Platform Bed */}
        <group position={[0, 0, -0.2]}>
          <RigidBody type="fixed" name="king-bed">
            <CuboidCollider args={[1.2, 0.35, 1.2]} position={[0, 0.35, 0]} />
          </RigidBody>

          {/* Wooden Platform Frame */}
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
            <boxGeometry args={[2.2, 0.25, 2.3]} />
            <meshStandardMaterial color={bedWoodColor} roughness={0.6} />
          </mesh>
          {/* Headboard */}
          <mesh position={[0, 0.75, -1.1]} castShadow receiveShadow userData={{ cameraCollider: true }}>
            <boxGeometry args={[2.3, 0.85, 0.1]} />
            <meshStandardMaterial color={bedWoodColor} roughness={0.6} />
          </mesh>

          {/* Mattress with Crisp Linen */}
          <mesh position={[0, 0.42, 0.05]} castShadow receiveShadow>
            <boxGeometry args={[1.9, 0.26, 2.05]} />
            <meshStandardMaterial color={bedLinenColor} roughness={0.8} />
          </mesh>
          {/* Folded Duvet / Blanket */}
          <mesh position={[0, 0.45, 0.3]} castShadow receiveShadow>
            <boxGeometry args={[1.92, 0.12, 1.4]} />
            <meshStandardMaterial color="#b0a89d" roughness={0.8} />
          </mesh>
          {/* Sleeping Pillows (2 pairs) */}
          {[-0.5, 0.5].map((x, pIdx) => (
            <mesh key={`pillow-${pIdx}`} position={[x, 0.58, -0.75]} rotation={[0.2, 0, 0]} castShadow>
              <boxGeometry args={[0.55, 0.12, 0.35]} />
              <meshStandardMaterial color="#f5f3ee" roughness={0.8} />
            </mesh>
          ))}
          {/* Accent throw pillows */}
          <mesh position={[0, 0.58, -0.6]} rotation={[0.3, 0.2, 0]} castShadow>
            <boxGeometry args={[0.4, 0.12, 0.25]} />
            <meshStandardMaterial color={pillowColor} roughness={0.7} />
          </mesh>
        </group>

        {/* 2 Bedside Nightstands with warm lamps */}
        {[-1.35, 1.35].map((xPos, nsIdx) => (
          <group key={`nightstand-${nsIdx}`} position={[xPos, 0, -1.2]}>
            <RigidBody type="fixed" name={`nightstand-${nsIdx}`}>
              <CuboidCollider args={[0.25, 0.25, 0.25]} position={[0, 0.25, 0]} />
            </RigidBody>
            {/* Table */}
            <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.45, 0.45]} />
              <meshStandardMaterial color={bedWoodColor} roughness={0.6} />
            </mesh>
            {/* Lamp base */}
            <mesh position={[0, 0.55, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.09, 0.12, 12]} />
              <meshStandardMaterial color="#4a4a4a" roughness={0.4} />
            </mesh>
            {/* Lampshade */}
            <mesh position={[0, 0.72, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.14, 0.2, 16]} />
              <meshStandardMaterial color="#fcf8f0" roughness={0.9} />
            </mesh>
            {/* Warm soft reading point light */}
            <pointLight position={[0, 0.72, 0]} intensity={0.35} distance={3} color="#ffe6cc" />
          </group>
        ))}
      </group>
    </group>
  )
}
