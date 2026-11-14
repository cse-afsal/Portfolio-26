import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import Ground from '../world/Ground'
import Street from '../world/Street'
import House from '../world/House'
import SkillsHouse from '../world/buildings/SkillsHouse'
import ProjectStudio from '../world/buildings/ProjectStudio'
import EducationHouse from '../world/buildings/EducationHouse'
import AchievementGallery from '../world/buildings/AchievementGallery'
import ContactHouse from '../world/buildings/ContactHouse'
import StreetFurniture from '../world/StreetFurniture'
import Trees from '../world/Trees'
import StreetLamps from '../world/StreetLamps'
import Cars from '../world/Cars'
import Sky from '../world/Sky'
import Lighting from '../world/Lighting'
import Character from '../player/Character'

export default function Game() {
  return (
    <Canvas
      shadows
      camera={{ fov: 60, near: 0.1, far: 500, position: [0, 5, 15] }}
      gl={{
        antialias: true,
        toneMapping: 3, // ACESFilmicToneMapping
        toneMappingExposure: 1.0,
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Sky />
        <Lighting />
        
        <Physics gravity={[0, -15, 0]} debug={false}>
          {/* Continuous Terrain & Street Network */}
          <Ground />
          <Street />
          <StreetFurniture />

          {/* Connected Neighbourhood Buildings */}
          <House />
          <SkillsHouse />
          <ProjectStudio />
          <EducationHouse />
          <AchievementGallery />
          <ContactHouse />

          {/* Flora & Street Vehicles */}
          <Trees />
          <StreetLamps />
          <Cars />

          {/* Player Character */}
          <Character />
        </Physics>
      </Suspense>
    </Canvas>
  )
}
