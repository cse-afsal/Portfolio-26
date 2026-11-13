import { RigidBody, CuboidCollider } from '@react-three/rapier'
import InteractiveObject from '../InteractiveObject'

export default function LivingRoom() {
  const sofaColor = '#606468'       // modern charcoal-grey sofa
  const cushionColor = '#9fa4a8'    // light grey accent cushions
  const woodColor = '#8c6b48'       // warm natural oak
  const rugColor = '#dfdcd6'        // warm cream woven rug
  const ceramicColor = '#d9cebd'    // ceramic pottery
  const leafColor = '#4a6b3e'       // lush muted green

  return (
    <group>
      {/* --- Living Room Rug --- */}
      <mesh position={[-11.5, 0.02, -3.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.2, 3.4]} />
        <meshStandardMaterial color={rugColor} roughness={0.9} />
      </mesh>

      {/* --- Modern Grey 3-Seater Sofa --- */}
      <group position={[-11.5, 0, -4.8]}>
        <RigidBody type="fixed" name="sofa">
          <CuboidCollider args={[1.6, 0.45, 0.5]} position={[0, 0.45, 0]} />
        </RigidBody>
        
        {/* Sofa base & cushions */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[3.0, 0.35, 0.9]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>
        {/* Sofa seat cushions */}
        <mesh position={[-0.95, 0.48, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.15, 0.75]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.48, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.15, 0.75]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>
        <mesh position={[0.95, 0.48, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.15, 0.75]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>
        {/* Sofa backrest */}
        <mesh position={[0, 0.75, -0.35]} castShadow receiveShadow userData={{ cameraCollider: true }}>
          <boxGeometry args={[3.0, 0.55, 0.22]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>
        {/* Left armrest */}
        <mesh position={[-1.5, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.45, 0.92]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>
        {/* Right armrest */}
        <mesh position={[1.5, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.45, 0.92]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>
        {/* Decorative throw pillows */}
        <mesh position={[-1.2, 0.62, -0.15]} rotation={[0.2, 0.3, -0.1]} castShadow>
          <boxGeometry args={[0.35, 0.35, 0.12]} />
          <meshStandardMaterial color={cushionColor} roughness={0.7} />
        </mesh>
        <mesh position={[1.2, 0.62, -0.15]} rotation={[0.2, -0.3, 0.1]} castShadow>
          <boxGeometry args={[0.35, 0.35, 0.12]} />
          <meshStandardMaterial color="#c4a47c" roughness={0.7} />
        </mesh>
      </group>

      {/* --- Modern Accent Armchair --- */}
      <group position={[-13.8, 0, -3.2]} rotation={[0, Math.PI / 4, 0]}>
        <RigidBody type="fixed" name="armchair">
          <CuboidCollider args={[0.5, 0.4, 0.5]} position={[0, 0.4, 0]} />
        </RigidBody>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.3, 0.85]} />
          <meshStandardMaterial color="#505459" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.68, -0.32]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.5, 0.2]} />
          <meshStandardMaterial color="#505459" roughness={0.8} />
        </mesh>
        {/* Wood legs */}
        {[-0.38, 0.38].map((x, i) =>
          [-0.35, 0.35].map((z, j) => (
            <mesh key={`leg-${i}-${j}`} position={[x, 0.1, z]} castShadow>
              <cylinderGeometry args={[0.025, 0.02, 0.2, 6]} />
              <meshStandardMaterial color={woodColor} roughness={0.6} />
            </mesh>
          ))
        )}
      </group>

      {/* --- Low Oak Coffee Table --- */}
      <group position={[-11.5, 0, -3.3]}>
        <RigidBody type="fixed" name="coffee-table">
          <CuboidCollider args={[0.7, 0.25, 0.45]} position={[0, 0.25, 0]} />
        </RigidBody>
        {/* Table top */}
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.05, 0.8]} />
          <meshStandardMaterial color={woodColor} roughness={0.5} />
        </mesh>
        {/* 4 table legs */}
        {[-0.55, 0.55].map((x, i) =>
          [-0.3, 0.3].map((z, j) => (
            <mesh key={`ct-leg-${i}-${j}`} position={[x, 0.18, z]} castShadow>
              <cylinderGeometry args={[0.025, 0.02, 0.36, 6]} />
              <meshStandardMaterial color="#2d2d2d" roughness={0.4} />
            </mesh>
          ))
        )}
        {/* Art book on table */}
        <mesh position={[-0.2, 0.42, 0.05]} rotation={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.28, 0.03, 0.22]} />
          <meshStandardMaterial color="#303844" roughness={0.4} />
        </mesh>
        {/* Small ceramic vase with twig */}
        <mesh position={[0.3, 0.46, -0.05]} castShadow>
          <cylinderGeometry args={[0.05, 0.08, 0.14, 12]} />
          <meshStandardMaterial color={ceramicColor} roughness={0.6} />
        </mesh>
      </group>

      {/* --- Fiddle Leaf Fig Plant in Terracotta Pot --- */}
      <group position={[-9.2, 0, -5.2]}>
        {/* Terracotta Pot */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.2, 0.55, 16]} />
          <meshStandardMaterial color="#b36d4f" roughness={0.8} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.06, 12]} />
          <meshStandardMaterial color="#2c221e" roughness={0.9} />
        </mesh>
        {/* Plant Stems and Leaves */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.04, 0.8, 6]} />
          <meshStandardMaterial color="#3d4f2e" roughness={0.8} />
        </mesh>
        {/* Lush green leaf clusters */}
        {[
          { pos: [0.12, 1.2, 0.08], rot: [0.3, 0.5, 0.2], s: 0.22 },
          { pos: [-0.14, 1.35, -0.05], rot: [-0.2, -0.7, -0.3], s: 0.24 },
          { pos: [0.05, 1.5, -0.1], rot: [-0.4, 0.2, -0.1], s: 0.25 },
          { pos: [-0.08, 1.62, 0.12], rot: [0.3, -0.4, 0.3], s: 0.23 },
          { pos: [0, 1.78, 0], rot: [0, 0, 0], s: 0.26 },
        ].map((leaf, idx) => (
          <mesh key={`leaf-${idx}`} position={leaf.pos} rotation={leaf.rot} castShadow>
            <sphereGeometry args={[leaf.s, 7, 7]} />
            <meshStandardMaterial color={leafColor} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* --- Console Table near Foyer --- */}
      <group position={[-8.5, 0, 1.8]}>
        <RigidBody type="fixed" name="foyer-console">
          <CuboidCollider args={[0.25, 0.45, 0.65]} position={[0, 0.45, 0]} />
        </RigidBody>
        <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.45, 0.04, 1.2]} />
          <meshStandardMaterial color={woodColor} roughness={0.6} />
        </mesh>
        {/* Legs */}
        {[-0.16, 0.16].map((x, i) =>
          [-0.5, 0.5].map((z, j) => (
            <mesh key={`cons-leg-${i}-${j}`} position={[x, 0.4, z]} castShadow>
              <boxGeometry args={[0.03, 0.8, 0.03]} />
              <meshStandardMaterial color="#222" roughness={0.5} />
            </mesh>
          ))
        )}

        {/* 1. INTERACTIVE OBJECT: Photo Frame (Introduction) */}
        <InteractiveObject
          id="photoFrame"
          name="Family & Memories Photo Frame"
          position={[0, 0.85, 0]}
          range={2.3}
          promptText="Press E to Explore Introduction"
        >
          {/* Standing Photo Frame */}
          <group rotation={[0, -Math.PI / 2 + 0.2, 0.15]}>
            <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.22, 0.02]} />
              <meshStandardMaterial color="#44392f" roughness={0.5} />
            </mesh>
            {/* Photo picture canvas */}
            <mesh position={[0, 0.18, 0.012]}>
              <planeGeometry args={[0.26, 0.18]} />
              <meshStandardMaterial color="#e8d8c3" roughness={0.3} />
            </mesh>
            {/* Rear support kickstand */}
            <mesh position={[0, 0.12, -0.06]} rotation={[-0.3, 0, 0]}>
              <boxGeometry args={[0.04, 0.16, 0.01]} />
              <meshStandardMaterial color="#44392f" roughness={0.5} />
            </mesh>
          </group>
        </InteractiveObject>
      </group>

      {/* --- Curated Bookshelf in living alcove --- */}
      <group position={[-16.3, 0, -3.5]}>
        <RigidBody type="fixed" name="bookshelf-collider">
          <CuboidCollider args={[0.3, 1.1, 0.8]} position={[0, 1.1, 0]} />
        </RigidBody>

        {/* 2. INTERACTIVE OBJECT: Bookshelf (Interests and Learning) */}
        <InteractiveObject
          id="bookshelf"
          name="Curated Bookshelf"
          position={[0, 1.0, 0]}
          range={2.5}
          promptText="Press E to Explore Interests & Books"
        >
          {/* Bookshelf frame */}
          <mesh position={[0, 1.1, 0]} castShadow receiveShadow userData={{ cameraCollider: true }}>
            <boxGeometry args={[0.5, 2.2, 1.5]} />
            <meshStandardMaterial color="#3a2f26" roughness={0.7} />
          </mesh>
          {/* Inner recessed hollow */}
          <mesh position={[0.06, 1.1, 0]}>
            <boxGeometry args={[0.4, 2.1, 1.4]} />
            <meshStandardMaterial color="#281f18" roughness={0.8} />
          </mesh>
          {/* Bookshelf Shelves */}
          {[-0.5, 0, 0.5].map((yOffset, idx) => (
            <mesh key={`shelf-${idx}`} position={[0.08, 1.1 + yOffset, 0]}>
              <boxGeometry args={[0.36, 0.03, 1.38]} />
              <meshStandardMaterial color="#4d3e31" roughness={0.6} />
            </mesh>
          ))}
          {/* Colorful Book Spines */}
          {[-0.45, -0.2, 0.1, 0.35].map((zPos, bIdx) => (
            <group key={`book-group-${bIdx}`} position={[0.1, 1.25, zPos]}>
              <mesh castShadow>
                <boxGeometry args={[0.22, 0.28, 0.12]} />
                <meshStandardMaterial
                  color={['#a85842', '#3b5a7a', '#446e50', '#8c734b'][bIdx % 4]}
                  roughness={0.5}
                />
              </mesh>
            </group>
          ))}
          {[-0.35, 0.05, 0.4].map((zPos, bIdx) => (
            <group key={`book-group-upper-${bIdx}`} position={[0.1, 1.75, zPos]}>
              <mesh castShadow>
                <boxGeometry args={[0.2, 0.24, 0.14]} />
                <meshStandardMaterial
                  color={['#584b6b', '#96784a', '#3f5765'][bIdx % 3]}
                  roughness={0.5}
                />
              </mesh>
            </group>
          ))}
        </InteractiveObject>
      </group>

      {/* --- Feature Wall Display (Personal Information & Values) --- */}
      <group position={[-12.0, 1.7, -0.1]}>
        {/* 3. INTERACTIVE OBJECT: Wall Display (Personal Information) */}
        <InteractiveObject
          id="wallDisplay"
          name="Feature Wall Gallery"
          position={[0, 0, 0]}
          range={2.4}
          promptText="Press E to View Personal Information"
        >
          {/* Central framed artwork canvas */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.8, 1.1, 0.04]} />
            <meshStandardMaterial color="#1f1f1f" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[1.68, 0.98]} />
            <meshStandardMaterial color="#f0ede6" roughness={0.4} />
          </mesh>
          {/* Architectural abstract geometric poster lines */}
          <mesh position={[0, 0, 0.028]}>
            <planeGeometry args={[1.2, 0.6]} />
            <meshStandardMaterial color="#68737c" roughness={0.6} />
          </mesh>
          {/* Picture Accent Light */}
          <pointLight position={[0, 0.8, 0.3]} intensity={0.4} distance={3} color="#fff6e8" />
        </InteractiveObject>
      </group>
    </group>
  )
}

