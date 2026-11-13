import { RigidBody, CuboidCollider } from '@react-three/rapier'

export default function KitchenDining() {
  const whiteCabinetColor = '#f5f5f2'  // contemporary matte white cabinets
  const counterStoneColor = '#ded9d2'  // light quartz stone countertop
  const diningWoodColor = '#94724e'    // natural warm oak dining wood
  const chairColor = '#3c3f42'         // dark minimalist chair frames
  const metalColor = '#2b2b2b'         // matte black hardware

  return (
    <group>
      {/* ======================================================== */}
      {/* --- CONTEMPORARY KITCHEN --- */}
      {/* ======================================================== */}

      {/* Main Back Kitchen Counter & Lower Cabinets */}
      <group position={[-16.2, 0, 4.0]}>
        <RigidBody type="fixed" name="kitchen-counter">
          <CuboidCollider args={[0.45, 0.45, 2.2]} position={[0, 0.45, 0]} />
        </RigidBody>

        {/* Lower White Cabinets */}
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[0.85, 0.85, 4.2]} />
          <meshStandardMaterial color={whiteCabinetColor} roughness={0.4} />
        </mesh>
        {/* Quartz Countertop Slab */}
        <mesh position={[0.02, 0.87, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.06, 4.25]} />
          <meshStandardMaterial color={counterStoneColor} roughness={0.3} metalness={0.05} />
        </mesh>

        {/* Sink Basin */}
        <mesh position={[0, 0.88, -0.6]}>
          <boxGeometry args={[0.5, 0.02, 0.8]} />
          <meshStandardMaterial color="#687076" roughness={0.2} metalness={0.7} />
        </mesh>
        {/* Faucet */}
        <mesh position={[-0.2, 1.05, -0.6]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
          <meshStandardMaterial color="#c0c5c8" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Induction Cooktop Surface */}
        <mesh position={[0, 0.905, 0.8]}>
          <boxGeometry args={[0.55, 0.01, 0.75]} />
          <meshStandardMaterial color="#1a1c1e" roughness={0.1} metalness={0.3} />
        </mesh>

        {/* Upper Wall Cabinets */}
        <mesh position={[0, 2.1, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[0.6, 0.7, 4.2]} />
          <meshStandardMaterial color={whiteCabinetColor} roughness={0.4} />
        </mesh>

        {/* Range Hood above stove */}
        <mesh position={[0.05, 1.9, 0.8]} castShadow>
          <boxGeometry args={[0.65, 0.4, 0.8]} />
          <meshStandardMaterial color="#404347" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Modern Kitchen Island */}
      <group position={[-14.0, 0, 4.0]}>
        <RigidBody type="fixed" name="kitchen-island">
          <CuboidCollider args={[0.5, 0.45, 1.4]} position={[0, 0.45, 0]} />
        </RigidBody>
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[0.9, 0.85, 2.6]} />
          <meshStandardMaterial color={whiteCabinetColor} roughness={0.4} />
        </mesh>
        {/* Island Stone Waterfall Countertop */}
        <mesh position={[0, 0.87, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.06, 2.7]} />
          <meshStandardMaterial color={counterStoneColor} roughness={0.3} metalness={0.05} />
        </mesh>

        {/* 2 Modern Bar Stools */}
        {[-0.6, 0.6].map((zPos, idx) => (
          <group key={`stool-${idx}`} position={[0.65, 0, zPos]}>
            <RigidBody type="fixed" name={`stool-${idx}`}>
              <CuboidCollider args={[0.2, 0.35, 0.2]} position={[0, 0.35, 0]} />
            </RigidBody>
            {/* Stool wooden seat */}
            <mesh position={[0, 0.65, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.04, 16]} />
              <meshStandardMaterial color={diningWoodColor} roughness={0.6} />
            </mesh>
            {/* Black steel legs */}
            <mesh position={[0, 0.32, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.03, 0.64, 8]} />
              <meshStandardMaterial color={metalColor} roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Built-in Modern Refrigerator */}
      <group position={[-16.2, 0, 1.4]}>
        <RigidBody type="fixed" name="refrigerator">
          <CuboidCollider args={[0.45, 1.0, 0.45]} position={[0, 1.0, 0]} />
        </RigidBody>
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[0.85, 2.0, 0.85]} />
          <meshStandardMaterial color="#2d3033" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Handles */}
        <mesh position={[0.44, 1.1, -0.1]}>
          <cylinderGeometry args={[0.015, 0.015, 0.6, 6]} />
          <meshStandardMaterial color="#c0c5c8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>


      {/* ======================================================== */}
      {/* --- DINING AREA --- */}
      {/* ======================================================== */}

      {/* Dining Rug */}
      <mesh position={[-11.2, 0.02, 2.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 2.4]} />
        <meshStandardMaterial color="#eae6de" roughness={0.9} />
      </mesh>

      {/* Dining Table */}
      <group position={[-11.2, 0, 2.2]}>
        <RigidBody type="fixed" name="dining-table">
          <CuboidCollider args={[0.65, 0.38, 1.0]} position={[0, 0.38, 0]} />
        </RigidBody>

        {/* Oak Table Top */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.04, 1.9]} />
          <meshStandardMaterial color={diningWoodColor} roughness={0.5} />
        </mesh>
        {/* Table Legs */}
        {[-0.5, 0.5].map((x, i) =>
          [-0.8, 0.8].map((z, j) => (
            <mesh key={`dt-leg-${i}-${j}`} position={[x, 0.36, z]} castShadow>
              <boxGeometry args={[0.05, 0.72, 0.05]} />
              <meshStandardMaterial color={diningWoodColor} roughness={0.6} />
            </mesh>
          ))
        )}

        {/* Ceramic centerpiece bowl */}
        <mesh position={[0, 0.78, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#c5b8a5" roughness={0.5} />
        </mesh>

        {/* Modern Dining Chairs (4 chairs) */}
        {[
          { pos: [-0.75, 0, -0.45], rot: [0, Math.PI / 2, 0] },
          { pos: [-0.75, 0, 0.45], rot: [0, Math.PI / 2, 0] },
          { pos: [0.75, 0, -0.45], rot: [0, -Math.PI / 2, 0] },
          { pos: [0.75, 0, 0.45], rot: [0, -Math.PI / 2, 0] },
        ].map((chair, cIdx) => (
          <group key={`chair-${cIdx}`} position={chair.pos} rotation={chair.rot}>
            <RigidBody type="fixed" name={`chair-${cIdx}`}>
              <CuboidCollider args={[0.22, 0.42, 0.22]} position={[0, 0.42, 0]} />
            </RigidBody>
            {/* Seat */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.42, 0.04, 0.42]} />
              <meshStandardMaterial color={chairColor} roughness={0.7} />
            </mesh>
            {/* Backrest */}
            <mesh position={[0, 0.72, -0.18]} castShadow receiveShadow>
              <boxGeometry args={[0.42, 0.35, 0.04]} />
              <meshStandardMaterial color={chairColor} roughness={0.7} />
            </mesh>
            {/* Chair legs */}
            {[-0.17, 0.17].map((x, lx) =>
              [-0.17, 0.17].map((z, lz) => (
                <mesh key={`cl-${lx}-${lz}`} position={[x, 0.22, z]} castShadow>
                  <cylinderGeometry args={[0.015, 0.01, 0.44, 6]} />
                  <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
                </mesh>
              ))
            )}
          </group>
        ))}

        {/* Minimalist Pendant Light hanging over dining table */}
        <group position={[0, 2.7, 0]}>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.8, 6]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0, -0.6, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.22, 0.18, 16]} />
            <meshStandardMaterial color="#222" roughness={0.3} metalness={0.6} />
          </mesh>
          <pointLight position={[0, -0.7, 0]} intensity={0.5} distance={4} color="#ffe8cc" />
        </group>
      </group>
    </group>
  )
}

