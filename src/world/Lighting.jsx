import useGameStore from '../store/useGameStore'

export default function Lighting() {
  const graphicsQuality = useGameStore((s) => s.graphicsQuality)

  const isLow = graphicsQuality === 'low'
  const isMed = graphicsQuality === 'medium'

  const shadowMapSize = isLow ? 512 : isMed ? 1024 : 2048
  const shadowFar = isLow ? 100 : isMed ? 140 : 180

  return (
    <>
      {/* Ambient fill light */}
      <ambientLight intensity={isLow ? 0.6 : 0.42} color="#ffeedd" />
      
      {/* Main directional sun covering full neighbourhood */}
      <directionalLight
        position={[40, 50, 30]}
        intensity={1.45}
        color="#fff5e6"
        castShadow={!isLow}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-far={shadowFar}
        shadow-camera-left={-55}
        shadow-camera-right={55}
        shadow-camera-top={85}
        shadow-camera-bottom={-85}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      
      {/* Secondary daylight fill */}
      <directionalLight
        position={[-30, 25, -20]}
        intensity={0.35}
        color="#d4e6f1"
      />
      
      {/* Hemisphere light for natural sky/ground bounce */}
      <hemisphereLight
        args={['#87CEEB', '#6b8c5a', isLow ? 0.45 : 0.32]}
      />
    </>
  )
}
