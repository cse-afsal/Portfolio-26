export default function Lighting() {
  return (
    <>
      {/* Ambient fill light */}
      <ambientLight intensity={0.4} color="#ffeedd" />
      
      {/* Main directional sun */}
      <directionalLight
        position={[30, 40, 20]}
        intensity={1.5}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />
      
      {/* Subtle fill from opposite side */}
      <directionalLight
        position={[-20, 15, -10]}
        intensity={0.3}
        color="#d4e6f1"
      />
      
      {/* Hemisphere light for natural sky/ground bounce */}
      <hemisphereLight
        args={['#87CEEB', '#6b8c5a', 0.3]}
      />
    </>
  )
}

