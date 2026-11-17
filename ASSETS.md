# Asset Sources & Licences

All assets used in the **My World** playable 3D portfolio are original procedural geometries built from optimized Three.js primitives and custom shaders, or sourced from certified open-source / MIT-licensed software libraries. No copyrighted, commercial, or game-ripped assets (e.g. GTA) are used.

---

## Phase 1 — Foundation

| Asset | Type | Source | Licence |
|---|---|---|---|
| Character Model | Procedural 3D compound geometry | Original — constructed with Three.js boxes, cylinders, and joint spheres | MIT / Original |
| House Exterior | Procedural 3D mesh | Original — built from Three.js box, plane, and framing geometries | MIT / Original |
| Trees | Procedural foliage & colliders | Original — cylinder trunks with compound sphere/cone foliage | MIT / Original |
| Street & Sidewalks | Procedural 3D roadway mesh | Original — box/plane road surface, curbs, driveways | MIT / Original |
| Street Lamps | Procedural 3D lamp mesh | Original — cylinder poles, diagonal arms, and luminaire heads | MIT / Original |
| Cars | Procedural vehicle fleet | Original — low-poly sedans, hatchbacks, and wagons | MIT / Original |
| Ground & Turf | Procedural ground mesh | Original — warm green turf and residential topography | MIT / Original |
| Sky & Atmosphere | Drei Sky component | `@react-three/drei` (Preetham atmospheric daylight model) | MIT |

---

## Phase 2 — The Main Home & Interior

| Asset | Type | Source | Licence |
|---|---|---|---|
| Living Room Furniture (Sofa, Armchair, Coffee Table) | Procedural 3D mesh | Original work using Three.js box and cylinder primitives | MIT / Original |
| Area Rugs (Living, Dining, Workspace, Bedroom) | Procedural plane mesh | Original textured materials with warm muted palette | MIT / Original |
| Indoor Fiddle-Leaf Fig Plant & Pots | Procedural geometry | Original compound sphere/cylinder mesh | MIT / Original |
| Contemporary Kitchen & Island | Procedural 3D mesh | Original quartz/cabinetry layout | MIT / Original |
| Dining Table & Minimalist Chairs | Procedural 3D mesh | Original oak and steel geometries | MIT / Original |
| Floating Timber Stairs & Glass Balustrade | Procedural 3D mesh + Rapier ramp collider | Original architectural design | MIT / Original |
| Executive Desk & Dual Monitor Computer Workstation | Procedural 3D mesh | Original studio/workstation setup | MIT / Original |
| Modern Platform Bed & Bedside Sconces | Procedural 3D mesh | Original furniture setup | MIT / Original |
| Photo Frame (Interactive Object 1) | Procedural 3D mesh | Original easel-backed picture frame | MIT / Original |
| Workstation Terminal (Interactive Object 2) | Procedural 3D mesh | Original dual-display terminal with screen glow | MIT / Original |
| Curated Bookshelf (Interactive Object 3) | Procedural 3D mesh | Original multi-tier shelf with book spines | MIT / Original |
| Creative Desk (Interactive Object 4) | Procedural 3D mesh | Original walnut desk with accessories | MIT / Original |
| Wall Display Gallery (Interactive Object 5) | Procedural 3D mesh | Original wall-mounted art showcase | MIT / Original |

---

## Phase 3 — The Connected Neighbourhood

| Asset | Type | Source | Licence |
|---|---|---|---|
| Project Studio Architecture | Procedural 3D mesh & Rapier colliders | Original cantilevered glass pavilion design | MIT / Original |
| Skills House Architecture | Procedural 3D mesh & Rapier colliders | Original tech-craftsman villa with timber pergola | MIT / Original |
| Education House Architecture | Procedural 3D mesh & Rapier colliders | Original Scandinavian gable pavilion | MIT / Original |
| Achievement Gallery Architecture | Procedural 3D mesh & Rapier colliders | Original minimalist limestone museum pavilion | MIT / Original |
| Contact House Architecture | Procedural 3D mesh & Rapier colliders | Original mid-century terracotta residence | MIT / Original |
| Architectural Entrance Signs | Drei Text & Procedural 3D plinth | Original monolith totem sign design | MIT / Original |
| Extended Street Network & Crosswalks | Procedural 3D mesh with zebra stripes | Original asphalt, curbs, ramps, driveways | MIT / Original |
| Street Furniture (Park Benches, Hydrants, Bins) | Procedural 3D mesh & Rapier colliders | Original street elements | MIT / Original |
| Extended Vehicle Fleet | Procedural 3D vehicle geometries | Original low-poly cars & wheels | MIT / Original |
| Neighborhood Forest (Oaks & Tiered Pines) | Procedural 3D trees & trunk colliders | Original procedural foliage | MIT / Original |

---

## Phase 4 — Building Interiors & Portfolio Content

| Asset | Type | Source | Licence |
|---|---|---|---|
| Skills House Interior (Workstation & Skill Boards) | Procedural 3D mesh & Rapier colliders | Original computer lab & interactive boards | MIT / Original |
| Project Studio Interior (Exhibition Stations & Displays) | Procedural 3D mesh & Rapier colliders | Original showroom with 4 project pedestals | MIT / Original |
| Education House Interior (Study Table, Shelving & Diplomas) | Procedural 3D mesh & Rapier colliders | Original Nordic library & credentials hall | MIT / Original |
| Achievement Gallery Interior (Trophy Vitrine & Frames) | Procedural 3D mesh & Rapier colliders | Original exhibition vitrines & award frames | MIT / Original |
| Contact House Interior (Reception Desk, Terminal & Lounge) | Procedural 3D mesh & Rapier colliders | Original mid-century reception & social lounge | MIT / Original |
| Skills Data Schema (`skills.json`) | JSON Data Store | Structured categories without invented levels | MIT / Original |
| Projects Data Schema (`projects.json`) | JSON Data Store | 4 comprehensive project station entries | MIT / Original |
| Education Data Schema (`education.json`) | JSON Data Store | Degrees, verified certifications, workshops | MIT / Original |
| Achievements Data Schema (`achievements.json`) | JSON Data Store | Hackathons, awards, milestones, leadership | MIT / Original |
| Contact Data Schema (`contact.json`) | JSON Data Store | Professional links, handles, message form | MIT / Original |

---

## Phase 5 — Navigation & Interaction Systems

| Asset | Type | Source | Licence |
|---|---|---|---|
| GreenSock Animation Platform (GSAP) | Animation runtime library | `gsap` (GreenSock) | Standard "No-Charge" GreenSock License / MIT-compatible |
| Quick Portfolio System | React / Tailwind UI | Original recruiter fast-travel grid (Tab / 1-6 keys) | MIT / Original |
| Pause & Controls System | React / Tailwind UI | Original pause state manager & controls guide | MIT / Original |
| Camera Anti-Clipping Raycaster | Three.js Raycaster system | Original wall collision camera interpolation | MIT / Original |

---

## Phase 6 & 7 — Performance, Instancing & Release

| Asset | Type | Source | Licence |
|---|---|---|---|
| Instanced Street Lamp System | Drei Instances (`<Instances>`, `<Instance>`) | Optimized single draw call pole, arm, head & bulb | MIT / Drei |
| Instanced Forest Foliage System | Drei Instances (`<Instances>`, `<Instance>`) | Batched canopy spheres, cones & trunk cylinders | MIT / Drei |
| Distance-Based Interior Culling Hook | React custom hook (`useBuildingInteriorActive`) | Dynamic memory & draw-call culler (22m-34m thresholds) | MIT / Original |
| Quality Presets Engine | Multi-tier graphics scaler | Low, Medium, High DPR, shadow map & lighting scaler | MIT / Original |
| Progress & State Persistence Engine | Web Storage API (`localStorage`) | Auto-save, restore, and checkpoint system | MIT / Original |
| Rapier Physics Engine | WebAssembly Physics Engine | `@react-three/rapier` / Dimforge Rapier3D | Apache-2.0 / MIT |
| Three.js WebGL Engine | 3D Graphics Library | `three` by mrdoob & contributors | MIT |
| React Three Fiber (R3F) | React renderer for Three.js | `@react-three/fiber` by Poimandres | MIT |
| Tailwind CSS v4 | Utility CSS framework | `tailwindcss` | MIT |
| Zustand State Management | React state store | `zustand` by Poimandres | MIT |
