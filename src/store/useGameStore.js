import { create } from 'zustand'
import homeData from '../data/home.json'
import skillsData from '../data/skills.json'
import projectsData from '../data/projects.json'
import educationData from '../data/education.json'
import achievementsData from '../data/achievements.json'
import contactData from '../data/contact.json'

// Definition of the 6 quick navigation destinations
export const PORTFOLIO_SECTIONS = [
  {
    id: 'about',
    key: '1',
    name: 'About Me',
    subtitle: 'Background & Philosophy',
    building: 'Main Home',
    badge: 'Residence',
    location: [-12, 0.8, 0],
    cameraYaw: Math.PI,
    cameraPitch: 0.2,
    getData: () => homeData.photoFrame,
  },
  {
    id: 'skills',
    key: '2',
    name: 'Technical Skills',
    subtitle: 'Languages, 3D & Backend',
    building: 'Skills House',
    badge: 'Workspace',
    location: [-15, 0.8, -32],
    cameraYaw: Math.PI / 2,
    cameraPitch: 0.2,
    getData: () => ({
      id: 'skills-overview',
      type: 'skills',
      title: 'Technical Skills & Architecture',
      subtitle: 'Languages, Frameworks, 3D Graphics & Infrastructure',
      category: 'Skills House',
      content: 'Categorized technical competencies across programming languages, modern frontend and real-time 3D web engines, backend microservices, databases, and development tooling.',
      skillCategories: skillsData.categories,
      footerNote: 'All technologies are actively utilized in modern web systems and distributed applications.',
    }),
  },
  {
    id: 'projects',
    key: '3',
    name: 'Featured Projects',
    subtitle: 'Interactive 3D & Full-Stack Apps',
    building: 'Project Studio',
    badge: 'Exhibition',
    location: [15, 0.8, 0],
    cameraYaw: -Math.PI / 2,
    cameraPitch: 0.2,
    getData: () => ({
      type: 'project',
      currentProjectIndex: 0,
      ...projectsData.featuredProjects[0],
      allProjects: projectsData.featuredProjects,
    }),
  },
  {
    id: 'education',
    key: '4',
    name: 'Education & Training',
    subtitle: 'Degrees & Certifications',
    building: 'Education House',
    badge: 'Study Lab',
    location: [-14.5, 0.8, 32],
    cameraYaw: Math.PI / 2,
    cameraPitch: 0.2,
    getData: () => ({
      id: 'education-overview',
      type: 'education',
      title: 'Education, Certifications & Learning',
      subtitle: 'Academic Foundations & Verified Credentials',
      category: 'Education House',
      content: educationData.educationHistory.overview,
      degrees: educationData.educationHistory.degrees,
      certifications: educationData.educationHistory.certifications,
      workshops: educationData.educationHistory.workshopsAndCourses,
      footerNote: 'Commitment to continuous lifelong learning, system design, and software engineering rigor.',
    }),
  },
  {
    id: 'achievements',
    key: '5',
    name: 'Honors & Achievements',
    subtitle: 'Awards, Hackathons & Milestones',
    building: 'Achievement Gallery',
    badge: 'Gallery',
    location: [14.5, 0.8, -32],
    cameraYaw: -Math.PI / 2,
    cameraPitch: 0.2,
    getData: () => ({
      id: 'achievements-overview',
      type: 'achievements',
      title: 'Honors, Competitions & Milestones',
      subtitle: 'Awards, Hackathons & Technical Leadership',
      category: 'Achievement Gallery',
      content: achievementsData.overview,
      awards: achievementsData.awardsAndHonors,
      competitions: achievementsData.competitionsAndHackathons,
      milestones: achievementsData.milestones,
      activities: achievementsData.activitiesAndLeadership,
      footerNote: 'Recognized for engineering execution, product design, and open source participation.',
    }),
  },
  {
    id: 'contact',
    key: '6',
    name: 'Contact & Connect',
    subtitle: 'Direct Channels & Resume',
    building: 'Contact House',
    badge: 'Reception',
    location: [14.5, 0.8, 32],
    cameraYaw: -Math.PI / 2,
    cameraPitch: 0.2,
    getData: () => ({
      id: 'contact-overview',
      type: 'contact',
      title: 'Get In Touch & Professional Channels',
      subtitle: 'Availability, Direct Messaging & Social Profiles',
      category: 'Contact House',
      content: `${contactData.personal.name} — ${contactData.personal.title}. ${contactData.personal.availability}. ${contactData.personal.responseTime}.`,
      links: contactData.links,
      footerNote: 'Available for full-time software engineering roles and select contract collaborations.',
    }),
  },
]

// Safe local storage helpers
const getSavedQuality = () => {
  try {
    const q = localStorage.getItem('myworld_quality')
    if (q === 'low' || q === 'medium' || q === 'high') return q
    // Default medium on lower-end/mobile devices, high on desktop
    const isMobile = typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768)
    return isMobile ? 'medium' : 'high'
  } catch {
    return 'high'
  }
}

const getSavedReducedMotion = () => {
  try {
    const rm = localStorage.getItem('myworld_reduced_motion')
    if (rm !== null) return rm === 'true'
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  } catch {
    return false
  }
}

const getSavedVisited = () => {
  try {
    const v = localStorage.getItem('myworld_visited')
    return v ? JSON.parse(v) : []
  } catch {
    return []
  }
}

const getHasSavedSession = () => {
  try {
    return !!localStorage.getItem('myworld_saved_pos')
  } catch {
    return false
  }
}

const useGameStore = create((set, get) => ({
  // Player state
  isMoving: false,
  isRunning: false,
  isJumping: false,
  isGrounded: true,
  playerPosition: [0, 0, 5],
  playerTeleportTarget: null, // target position when transitioning [x, y, z]
  
  // Camera state & Transitions
  cameraDistance: 5,
  cameraAngle: 0,
  cameraYawTarget: null,
  cameraPitchTarget: null,
  
  // Quality & Accessibility Settings
  graphicsQuality: getSavedQuality(), // 'low' | 'medium' | 'high'
  reducedMotion: getSavedReducedMotion(),
  visitedSections: getSavedVisited(),
  hasSavedSession: getHasSavedSession(),
  
  // Game & Navigation Menu States
  isTitleScreen: true,         // Title screen shown initially
  isPaused: false,            // Pause menu (Esc)
  quickMenuOpen: false,       // Quick Portfolio navigation menu (Tab)
  showControlsGuide: false,   // Controls guide dialog
  isPointerLocked: false,
  
  // Interaction system
  activeInteraction: null, // Open modal info { id, name, title, subtitle, content, ... }
  nearbyInteractable: null, // Currently in range { id, name, prompt }
  
  // Door & Transition state
  doorOpen: false,
  doorTransitioning: false,
  transitionFadeOpacity: 0, // 0 to 1 for smooth screen fade
  
  // Mobile virtual controls
  touchMove: { x: 0, y: 0 },
  touchJump: false,
  touchRun: false,
  
  // Actions
  setIsMoving: (val) => set({ isMoving: val }),
  setIsRunning: (val) => set({ isRunning: val }),
  setIsJumping: (val) => set({ isJumping: val }),
  setIsGrounded: (val) => set({ isGrounded: val }),
  setPlayerPosition: (pos) => {
    set({ playerPosition: pos })
    // Periodically save progress to localStorage
    if (Math.random() < 0.05) {
      try {
        localStorage.setItem('myworld_saved_pos', JSON.stringify([
          Math.round(pos[0] * 10) / 10,
          Math.round(pos[1] * 10) / 10,
          Math.round(pos[2] * 10) / 10
        ]))
        set({ hasSavedSession: true })
      } catch {
        // ignore
      }
    }
  },
  setPlayerTeleportTarget: (pos) => set({ playerTeleportTarget: pos }),
  setCameraDistance: (dist) => set({ cameraDistance: dist }),
  setCameraAngle: (angle) => set({ cameraAngle: angle }),
  setCameraOrientation: (yaw, pitch) => set({ cameraYawTarget: yaw, cameraPitchTarget: pitch }),
  
  setIsTitleScreen: (val) => set({ isTitleScreen: val }),
  setIsPaused: (val) => set({ isPaused: val }),
  setQuickMenuOpen: (val) => {
    if (val && document.pointerLockElement) {
      document.exitPointerLock?.()
    }
    set({ quickMenuOpen: val })
  },
  setShowControlsGuide: (val) => set({ showControlsGuide: val }),
  setIsPointerLocked: (val) => set({ isPointerLocked: val }),

  // Quality & Accessibility Setters
  setGraphicsQuality: (quality) => {
    try {
      localStorage.setItem('myworld_quality', quality)
    } catch {
      // ignore
    }
    set({ graphicsQuality: quality })
  },
  setReducedMotion: (val) => {
    try {
      localStorage.setItem('myworld_reduced_motion', String(val))
    } catch {
      // ignore
    }
    set({ reducedMotion: val })
  },
  markSectionVisited: (sectionId) => {
    const visited = get().visitedSections
    if (!visited.includes(sectionId)) {
      const updated = [...visited, sectionId]
      try {
        localStorage.setItem('myworld_visited', JSON.stringify(updated))
      } catch {
        // ignore
      }
      set({ visitedSections: updated })
    }
  },

  // Save / Restore Progress
  saveProgress: () => {
    try {
      const pos = get().playerPosition
      localStorage.setItem('myworld_saved_pos', JSON.stringify([
        Math.round(pos[0] * 10) / 10,
        Math.round(pos[1] * 10) / 10,
        Math.round(pos[2] * 10) / 10
      ]))
      set({ hasSavedSession: true })
    } catch {
      // ignore
    }
  },
  resumeSavedSession: () => {
    try {
      const raw = localStorage.getItem('myworld_saved_pos')
      if (raw) {
        const pos = JSON.parse(raw)
        set({
          playerTeleportTarget: pos,
          isTitleScreen: false,
          isPaused: false,
          quickMenuOpen: false
        })
        return true
      }
    } catch {
      // ignore
    }
    set({ isTitleScreen: false })
    return false
  },
  resetProgress: () => {
    try {
      localStorage.removeItem('myworld_saved_pos')
      localStorage.removeItem('myworld_visited')
    } catch {
      // ignore
    }
    set({
      hasSavedSession: false,
      visitedSections: [],
      playerTeleportTarget: [0, 2, 8],
      cameraYawTarget: 0,
      cameraPitchTarget: 0.25
    })
  },
  
  // Interaction actions
  setActiveInteraction: (interaction) => {
    // When opening interaction modal, exit pointer lock so user can click
    if (interaction && document.pointerLockElement) {
      document.exitPointerLock?.()
    }
    if (interaction?.id) {
      get().markSectionVisited(interaction.id)
    }
    set({ activeInteraction: interaction })
  },
  closeInteraction: () => {
    set({ activeInteraction: null })
  },
  setNearbyInteractable: (interactable) => set({ nearbyInteractable: interactable }),
  
  // Door actions
  setDoorOpen: (val) => set({ doorOpen: val }),
  toggleDoor: () => set((state) => ({ doorOpen: !state.doorOpen })),
  setDoorTransitioning: (val) => set({ doorTransitioning: val }),
  setTransitionFadeOpacity: (val) => set({ transitionFadeOpacity: val }),
  
  // Quick Portfolio Teleportation with Camera & Screen Transition
  teleportToSection: (sectionId) => {
    const section = PORTFOLIO_SECTIONS.find((s) => s.id === sectionId)
    if (!section) return

    get().markSectionVisited(sectionId)

    // Exit pointer lock if active
    if (document.pointerLockElement) {
      document.exitPointerLock?.()
    }

    const isReduced = get().reducedMotion

    // Step 1: Smooth fade out & close open menus
    set({
      transitionFadeOpacity: 1,
      doorTransitioning: true,
      quickMenuOpen: false,
      isPaused: false,
      isTitleScreen: false,
      showControlsGuide: false,
    })

    const fadePeakTime = isReduced ? 50 : 260
    const fadeInTime = isReduced ? 50 : 300

    // Step 2: At peak of fade, reposition character, align camera, and load modal data
    setTimeout(() => {
      set({
        playerTeleportTarget: section.location,
        cameraYawTarget: section.cameraYaw,
        cameraPitchTarget: section.cameraPitch,
      })
      get().setActiveInteraction(section.getData())

      // Step 3: Fade back in smoothly to reveal the new location and active panel
      setTimeout(() => {
        set({
          transitionFadeOpacity: 0,
          doorTransitioning: false,
        })
      }, fadeInTime)
    }, fadePeakTime)
  },

  // Touch controls
  setTouchMove: (move) => set({ touchMove: move }),
  setTouchJump: (jump) => set({ touchJump: jump }),
  setTouchRun: (run) => set({ touchRun: run }),
  
  // Camera distance control
  zoomIn: () => set((state) => ({ cameraDistance: Math.max(2, state.cameraDistance - 0.5) })),
  zoomOut: () => set((state) => ({ cameraDistance: Math.min(12, state.cameraDistance + 0.5) })),
}))

export default useGameStore
