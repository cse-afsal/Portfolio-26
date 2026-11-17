import { Instances, Instance } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import useGameStore from '../store/useGameStore'

const LAMP_DATA = [
  // West Sidewalk Lamps (arm faces +X toward street)
  { pos: [-5.5, 0, -60], rot: 0 },
  { pos: [-5.5, 0, -45], rot: 0 },
  { pos: [-5.5, 0, -30], rot: 0 },
  { pos: [-5.5, 0, -15], rot: 0 },
  { pos: [-5.5, 0, 0], rot: 0 },
  { pos: [-5.5, 0, 15], rot: 0 },
  { pos: [-5.5, 0, 30], rot: 0 },
  { pos: [-5.5, 0, 45], rot: 0 },
  { pos: [-5.5, 0, 60], rot: 0 },

  // East Sidewalk Lamps (arm faces -X toward street)
  { pos: [5.5, 0, -52], rot: Math.PI },
  { pos: [5.5, 0, -37], rot: Math.PI },
  { pos: [5.5, 0, -22], rot: Math.PI },
  { pos: [5.5, 0, -8], rot: Math.PI },
  { pos: [5.5, 0, 8], rot: Math.PI },
  { pos: [5.5, 0, 22], rot: Math.PI },
  { pos: [5.5, 0, 37], rot: Math.PI },
  { pos: [5.5, 0, 52], rot: Math.PI },
]

export default function StreetLamps() {
  const graphicsQuality = useGameStore((s) => s.graphicsQuality)
  const poleHeight = 5.2
  const poleRadius = 0.06

  const enableLights = graphicsQuality === 'high'

  return (
    <group>
      {/* Physical colliders for lamp poles */}
      <RigidBody type="fixed" name="street-lamps">
        {LAMP_DATA.map((lamp, i) => (
          <CuboidCollider
            key={`col-${i}`}
            args={[0.12, poleHeight / 2, 0.12]}
            position={[lamp.pos[0], poleHeight / 2, lamp.pos[2]]}
          />
        ))}
      </RigidBody>

      {/* ======================================================== */}
      {/* --- INSTANCED MESH 1: POLES (1 DRAW CALL) --- */}
      {/* ======================================================== */}
      <Instances range={LAMP_DATA.length}>
        <cylinderGeometry args={[poleRadius, poleRadius * 1.5, poleHeight, 6]} />
        <meshStandardMaterial color="#3d4044" roughness={0.6} metalness={0.4} />
        {LAMP_DATA.map((lamp, i) => (
          <Instance
            key={`pole-${i}`}
            position={[lamp.pos[0], poleHeight / 2, lamp.pos[2]]}
          />
        ))}
      </Instances>

      {/* ======================================================== */}
      {/* --- INSTANCED MESH 2: EXTENSION ARMS (1 DRAW CALL) --- */}
      {/* ======================================================== */}
      <Instances range={LAMP_DATA.length}>
        <cylinderGeometry args={[0.03, 0.03, 1.1, 4]} />
        <meshStandardMaterial color="#3d4044" roughness={0.6} metalness={0.4} />
        {LAMP_DATA.map((lamp, i) => {
          const armOffsetX = lamp.rot === 0 ? 0.45 : -0.45
          const armRotZ = lamp.rot === 0 ? Math.PI / 6 : -Math.PI / 6
          return (
            <Instance
              key={`arm-${i}`}
              position={[lamp.pos[0] + armOffsetX, poleHeight - 0.1, lamp.pos[2]]}
              rotation={[0, 0, armRotZ]}
            />
          )
        })}
      </Instances>

      {/* ======================================================== */}
      {/* --- INSTANCED MESH 3: LAMP HEADS (1 DRAW CALL) --- */}
      {/* ======================================================== */}
      <Instances range={LAMP_DATA.length}>
        <boxGeometry args={[0.42, 0.15, 0.25]} />
        <meshStandardMaterial color="#4a4d52" roughness={0.4} metalness={0.3} />
        {LAMP_DATA.map((lamp, i) => {
          const headOffsetX = lamp.rot === 0 ? 0.78 : -0.78
          return (
            <Instance
              key={`head-${i}`}
              position={[lamp.pos[0] + headOffsetX, poleHeight + 0.12, lamp.pos[2]]}
            />
          )
        })}
      </Instances>

      {/* ======================================================== */}
      {/* --- INSTANCED MESH 4: GLOWING BULBS (1 DRAW CALL) --- */}
      {/* ======================================================== */}
      <Instances range={LAMP_DATA.length}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color="#fff5e0" emissive="#fff5e0" emissiveIntensity={0.8} />
        {LAMP_DATA.map((lamp, i) => {
          const bulbOffsetX = lamp.rot === 0 ? 0.78 : -0.78
          return (
            <Instance
              key={`bulb-${i}`}
              position={[lamp.pos[0] + bulbOffsetX, poleHeight, lamp.pos[2]]}
            />
          )
        })}
      </Instances>

      {/* Strategic Night Warm Ambient Point Lights (Only at High Quality and Crosswalks) */}
      {enableLights && (
        <group>
          {[-45, 0, 45].map((zPos, idx) => (
            <pointLight
              key={`pl-${idx}`}
              position={[0, 5.0, zPos]}
              color="#fff5e0"
              intensity={0.45}
              distance={18}
              castShadow={false}
            />
          ))}
        </group>
      )}
    </group>
  )
}
