export default function Lighting() {
  return (
    <>
      {/* Ambient fill light */}
      <ambientLight intensity={0.42} color="#ffeedd" />
      
      {/* Main directional sun covering full neighbourhood */}
      <directionalLight
        position={[40, 50, 30]}
        intensity={1.45}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={180}
        shadow-camera-left={-55}
        shadow-camera-right={55}
        shadow-camera-top={85}
        shadow-camera-bottom={-85}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      
      {/* Subtle secondary daylight fill */}
      <directionalLight
        position={[-30, 25, -20]}
        intensity={0.35}
        color="#d4e6f1"
      />
      
      {/* Hemisphere light for natural sky/ground bounce */}
      <hemisphereLight
        args={['#87CEEB', '#6b8c5a', 0.32]}
      />
    </>
  )
}
