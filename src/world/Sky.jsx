import { Sky as DreiSky, Environment } from '@react-three/drei'

export default function Sky() {
  return (
    <>
      <DreiSky
        distance={450000}
        sunPosition={[100, 60, -50]}
        inclination={0.52}
        azimuth={0.25}
        turbidity={8}
        rayleigh={0.5}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
    </>
  )
}

