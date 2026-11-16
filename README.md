# MY WORLD — Playable 3D Interactive Portfolio

> A real-time, grounded 3D residential neighbourhood portfolio built from scratch with React, Vite, Three.js, React Three Fiber, React Three Rapier, Zustand, Tailwind CSS, and GSAP.

Visitors explore an open-world residential street in third-person, walking through distinct architectural houses and studios to inspect live projects, technical skill stations, academic credentials, honors, and contact channels.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Quick Start & Setup](#quick-start--setup)
4. [Controls Guide](#controls-guide)
5. [Architecture & Project Structure](#architecture--project-structure)
6. [How to Edit Portfolio Content](#how-to-edit-portfolio-content)
7. [How to Replace 3D Assets](#how-to-replace-3d-assets)
8. [Performance & Optimization](#performance--optimization)
9. [Accessibility & Reduced Motion](#accessibility--reduced-motion)
10. [Licence & Credits](#licence--credits)

---

## Features

- **Continuous 3D World**: One contiguous 150m residential street with sidewalks, driveways, trees, cars, crosswalks, and street furniture. Zero loading screens.
- **6 Distinct Architectural Buildings with Accessible Interiors**:
  - **Main Home**: Open-plan modern residence with living room, kitchen, dining, mezzanine bedroom, and personal workstation.
  - **Skills House**: Collaborative craftsman workspace featuring categorized technical skill display boards.
  - **Project Studio**: Flagship cantilevered glass pavilion with 4 interactive project pedestals and live demo links.
  - **Education House**: Scandinavian timber study pavilion with academic history, coursework, and verified certificates.
  - **Achievement Gallery**: Minimalist limestone gallery with trophy vitrines, competition summaries, and milestones.
  - **Contact House**: Mid-century reception lounge with contact channels, social cards, and direct email triggers.
- **Third-Person Character Controller**:
  - Smooth acceleration, turning, walking, sprinting (`Shift`), and jumping (`Space`).
  - Orbit camera with intelligent raycast-based anti-clipping collision avoidance.
  - Seamless door transitions with soft screen fades.
- **Recruiter Fast-Travel Menu (`Tab`)**:
  - Instant teleportation to any building with camera auto-alignment and direct modal display.
  - Hotkeys `1` through `6` for rapid section hopping.
- **Save & Restore Progress**: Automatically persists visited sections, player position, graphics quality, and accessibility preferences in `localStorage`.
- **Quality Scaler (Low, Medium, High)**: Dynamic shadow map sizing, lighting culling, and device pixel ratio (DPR) adjustment.
- **Full Mobile Support**: Virtual analog joystick, touch action buttons, and swipe-to-rotate camera.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19 & Vite 8** | Ultra-fast build toolchain and component framework |
| **Three.js** | WebGL 3D rendering engine |
| **@react-three/fiber (R3F)** | Declarative React wrapper for Three.js |
| **@react-three/drei** | Three.js helpers (Sky, Instances, Text, Billboard) |
| **@react-three/rapier** | WebAssembly-powered 3D rigid-body physics |
| **Zustand** | Centralized reactive state store |
| **Tailwind CSS v4** | UI styling and responsive layouts |
| **GSAP** | 60fps micro-animations and panel transitions |

---

## Quick Start & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- `npm` or `pnpm`

### Installation
```bash
# Clone or navigate to the repository
cd "Portfolio 26"

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Building for Production
```bash
npm run build
```
The optimized bundle will be generated in the `dist/` folder.

To preview the production build locally:
```bash
npm run preview
```

---

## Controls Guide

### Desktop (Keyboard & Mouse Priority)
| Key / Input | Action |
|---|---|
| **W, A, S, D** or **Arrow Keys** | Walk character relative to camera orientation |
| **Shift** (Hold) | Sprint / Run |
| **Space** | Jump (works on ground, stairs, and upper mezzanine) |
| **Mouse Move** | Orbit 360° third-person camera |
| **Mouse Scroll** | Zoom camera closer / further |
| **E** | Interact with highlighted objects, pedestals, and doors |
| **Tab** | Toggle **Quick Portfolio Fast-Travel Menu** |
| **1 – 6** | When Quick Menu is open, jump directly to sections 1 to 6 |
| **Esc** | Close active dialog / Dismiss menu / Toggle Pause Menu |

### Mobile Devices
- **Virtual Joystick (Bottom Left)**: Drag to steer character in any direction.
- **Run Button (Bottom Right)**: Hold to sprint.
- **Jump Button (Bottom Right)**: Tap to jump.
- **Interact Button**: Automatically lights up when near an interactive object.
- **Swipe**: Drag single finger anywhere on screen to orbit camera.

---

## Architecture & Project Structure

```
src/
├── components/
│   └── Game.jsx                     # Canvas root, physics world, scene lighting & culling
├── data/                            # Decoupled portfolio content (JSON)
│   ├── home.json                    # Main home displays & personal background
│   ├── skills.json                  # Categorized skills (languages, frontend, backend, etc.)
│   ├── projects.json                # 4 detailed project station records
│   ├── education.json               # Degrees, coursework, verified certifications
│   ├── achievements.json            # Awards, hackathons, milestones
│   └── contact.json                 # Social profiles, handles, direct URLs
├── hooks/
│   └── useBuildingInteriorActive.js # Distance-based interior lazy-loading hook
├── player/
│   ├── Character.jsx                # Third-person controller, Rapier body, camera raycaster
│   ├── CharacterModel.jsx           # Procedural human character with walking/running animations
│   └── usePlayerControls.js         # Unified keyboard, touch, and hotkey input manager
├── store/
│   └── useGameStore.js              # Zustand store (player, camera, modal, settings, save/restore)
├── ui/
│   ├── HUD.jsx                      # Main in-game HUD overlay
│   ├── TitleScreen.jsx              # Welcome landing screen & quality selector
│   ├── PauseMenu.jsx                # Pause modal (resume, save, respawn, quit)
│   ├── QuickMenu.jsx                # Recruiter fast-travel menu (Tab / 1-6)
│   ├── InteractionModal.jsx         # GSAP-animated portfolio modal & project switcher
│   └── ControlsModal.jsx            # Detailed guidance & accessibility modal
└── world/
    ├── Ground.jsx                   # Terrain, lawns, curbs, and property lots
    ├── Street.jsx                   # Asphalt roadway, crosswalk zebra stripes, sidewalks
    ├── StreetLamps.jsx              # Instanced street lamps with luminaire heads & point lights
    ├── Trees.jsx                    # Instanced deciduous oaks & tiered pines
    ├── Cars.jsx                     # Curbside and driveway vehicle fleet
    ├── StreetFurniture.jsx          # Park benches, fire hydrants, waste bins
    ├── House.jsx                    # Main Home exterior shell & lazy-loaded interior
    ├── Lighting.jsx                 # Dynamic directional sun, ambient bounce & shadow mapper
    ├── Sky.jsx                      # Atmospheric sky dome
    ├── buildings/                   # 5 neighbourhood buildings & entrance sign totems
    │   ├── BuildingSign.jsx
    │   ├── SkillsHouse.jsx & SkillsHouseInterior.jsx
    │   ├── ProjectStudio.jsx & ProjectStudioInterior.jsx
    │   ├── EducationHouse.jsx & EducationHouseInterior.jsx
    │   ├── AchievementGallery.jsx & AchievementGalleryInterior.jsx
    │   └── ContactHouse.jsx & ContactHouseInterior.jsx
    └── interior/                    # Main Home interior layout
        ├── Interior.jsx
        ├── LivingRoom.jsx
        ├── KitchenDining.jsx
        ├── Stairs.jsx
        └── UpperFloor.jsx
```

---

## How to Edit Portfolio Content

All resume and portfolio data lives entirely within clean, structured JSON files in `src/data/`. **You do not need to edit any Three.js or React code to update your portfolio.**

1. **Personal Background & Home Displays (`src/data/home.json`)**:
   - Edit `photoFrame`, `computer`, `bookshelf`, `desk`, and `wallDisplay` objects.
2. **Technical Skills (`src/data/skills.json`)**:
   - Add, remove, or modify items under `categories` (Programming Languages, Frontend, Backend, Databases, Tools, Currently Learning).
3. **Projects Showcase (`src/data/projects.json`)**:
   - Edit `featuredProjects` array. Each entry contains `stationNumber`, `title`, `tagline`, `description`, `contribution`, `technologies`, `highlights`, `github`, and `liveDemo`.
4. **Academic Credentials (`src/data/education.json`)**:
   - Update `degrees`, `certifications`, and `workshopsAndCourses`.
5. **Honors & Competitions (`src/data/achievements.json`)**:
   - Update `awardsAndHonors`, `competitionsAndHackathons`, and `milestones`.
6. **Contact Channels (`src/data/contact.json`)**:
   - Update email, GitHub, LinkedIn, X/Twitter, and resume download URLs.

---

## How to Replace 3D Assets

All 3D objects in *My World* currently use procedural Three.js primitives for lightweight bundle size and zero external mesh download overhead.

To swap any building or prop with a custom `.glb` / `.gltf` asset:
1. Place your compressed `.glb` file inside the `public/models/` directory (e.g. `public/models/custom-house.glb`).
2. In the corresponding component (e.g. `src/world/buildings/SkillsHouse.jsx`):
   ```jsx
   import { useGLTF } from '@react-three/drei'

   function CustomModel() {
     const { scene } = useGLTF('/models/custom-house.glb')
     return <primitive object={scene} />
   }
   ```
3. Update `ASSETS.md` with the 3D model's author, source URL, and license.

---

## Performance & Optimization

- **Draw Call Reduction (Instancing)**:
  - Street lamps are rendered via `@react-three/drei`'s `<Instances>`: all 17 poles, arms, heads, and bulbs collapse into just 4 draw calls.
  - The neighbourhood forest (24 oaks and tiered pines) is instanced into 7 batched canopy and trunk draw calls.
- **Distance-Based Interior Culling**:
  - The `useBuildingInteriorActive` hook monitors character distance to each building.
  - When the player is beyond 22m–34m (scaled by quality setting), the interior meshes, point lights, and colliders are unmounted, saving thousands of vertices and dozens of material binds.
- **Graphics Quality Presets**:
  - **High**: Full shadow maps (2048×2048), high-resolution DPR (up to 2.0), extended shadow distance (180m), and point lighting enabled.
  - **Medium**: Balanced shadow maps (1024×1024), DPR (up to 1.5), shadow distance (140m).
  - **Low**: Directional shadows disabled, DPR capped at 1.0 (0.8 on mobile), interior culling threshold tightened to 22m.
- **Physics Optimization**:
  - Rapier physics runs on an optimized fixed step (`gravity={[0, -15, 0]}`).
  - Low-poly compound colliders replace arbitrary mesh colliders.

---

## Accessibility & Reduced Motion

- **Keyboard-Only Support**: Every interactive modal, menu, and dialog can be navigated and dismissed with `Tab`, `Shift+Tab`, `Space`, `Enter`, `1–6`, and `Esc`.
- **Focus Rings**: High-visibility amber focus outlines (`focus:ring-2 focus:ring-amber-400 focus:outline-none`) on all interactive buttons and cards.
- **Accessible Contrast**: Backgrounds utilize deep neutral charcoal (`#171717`) paired with high-contrast cream (`#f5f0e6`) and warm amber text exceeding WCAG AA standards.
- **Reduced Motion**:
  - Automatically respects user OS preference `prefers-reduced-motion: reduce`.
  - Can be manually toggled in the Title Screen or Pause Menu.
  - Instantly disables camera head-bobbing, beacon oscillations, and reduces GSAP animations to instant cuts.

---

## Licence & Credits

- Code Architecture & Implementation: MIT Licence.
- See [/ASSETS.md](file:///c:/Users/safsa/OneDrive/Desktop/Portfolio%2026/ASSETS.md) for full licensing details on all libraries, shaders, and procedural geometries.
