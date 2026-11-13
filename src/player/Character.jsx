import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import * as THREE from 'three'
import usePlayerControls from './usePlayerControls'
import useGameStore from '../store/useGameStore'
import CharacterModel from './CharacterModel'

const WALK_SPEED = 4.2
const RUN_SPEED = 8.0
const JUMP_FORCE = 6.0
const ROTATION_SPEED = 10
const CAMERA_HEIGHT = 1.7
const CAMERA_LERP_SPEED = 7

export default function Character() {
  const rigidBodyRef = useRef()
  const characterRef = useRef()
  const keys = usePlayerControls()
  const currentRotation = useRef(0)
  const jumpCooldown = useRef(0)
  const velocity = useRef(new THREE.Vector3())
  
  const [moving, setMoving] = useState(false)
  const [running, setRunning] = useState(false)

  const { camera, scene } = useThree()
  
  // Camera state
  const cameraYaw = useRef(0)
  const cameraPitch = useRef(0.3)
  const raycaster = useRef(new THREE.Raycaster())

  useEffect(() => {
    const onMouseMove = (e) => {
      // Rotate camera only if pointer locked and not inside an active interaction modal
      if (document.pointerLockElement && !useGameStore.getState().activeInteraction) {
        cameraYaw.current -= e.movementX * 0.003
        cameraPitch.current = Math.max(
          -0.3,
          Math.min(1.2, cameraPitch.current + e.movementY * 0.002)
        )
      }
    }
    
    const onClick = (e) => {
      if (
        e.target.tagName === 'CANVAS' &&
        !document.pointerLockElement &&
        !useGameStore.getState().isPaused &&
        !useGameStore.getState().activeInteraction
      ) {
        document.body.requestPointerLock()
      }
    }
    
    const onPointerLockChange = () => {
      useGameStore.getState().setIsPointerLocked(!!document.pointerLockElement)
    }

    // Touch support for camera rotation (swipe on screen)
    let lastTouchX = 0
    let lastTouchY = 0
    let isTouching = false

    const onTouchStart = (e) => {
      if (e.touches.length === 1 && e.target.tagName === 'CANVAS' && !useGameStore.getState().activeInteraction) {
        isTouching = true
        lastTouchX = e.touches[0].clientX
        lastTouchY = e.touches[0].clientY
      }
    }

    const onTouchMove = (e) => {
      if (isTouching && e.touches.length === 1 && !useGameStore.getState().activeInteraction) {
        const dx = e.touches[0].clientX - lastTouchX
        const dy = e.touches[0].clientY - lastTouchY
        lastTouchX = e.touches[0].clientX
        lastTouchY = e.touches[0].clientY

        cameraYaw.current -= dx * 0.005
        cameraPitch.current = Math.max(
          -0.3,
          Math.min(1.2, cameraPitch.current + dy * 0.004)
        )
      }
    }

    const onTouchEnd = () => {
      isTouching = false
    }
    
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)
    document.addEventListener('pointerlockchange', onPointerLockChange)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      document.removeEventListener('pointerlockchange', onPointerLockChange)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])
  
  useFrame((state, delta) => {
    if (!rigidBodyRef.current) return
    const dt = Math.min(delta, 0.05) // cap delta for stability
    
    const rb = rigidBodyRef.current
    
    // --- Teleport Check (e.g. Smooth Door Transition) ---
    const teleportTarget = useGameStore.getState().playerTeleportTarget
    if (teleportTarget) {
      rb.setTranslation(
        { x: teleportTarget[0], y: teleportTarget[1], z: teleportTarget[2] },
        true
      )
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true)
      velocity.current.set(0, 0, 0)
      useGameStore.getState().setPlayerTeleportTarget(null)
      return
    }

    const position = rb.translation()
    const currentVelocity = rb.linvel()
    
    // Check if controls should be suspended (modal open, paused, or door transition)
    const activeInteraction = useGameStore.getState().activeInteraction
    const isPaused = useGameStore.getState().isPaused
    const doorTransitioning = useGameStore.getState().doorTransitioning
    const controlsDisabled = !!activeInteraction || isPaused || doorTransitioning

    // Ground check: character is considered grounded if vertical velocity is low
    const isOnGround = Math.abs(currentVelocity.y) < 0.4
    
    // --- Combined keyboard + virtual touch input ---
    const { forward, backward, left, right, run: keyRun, jump: keyJump } = keys.current
    const touchMove = useGameStore.getState().touchMove
    const touchJump = useGameStore.getState().touchJump
    const touchRun = useGameStore.getState().touchRun

    const isRunning = (keyRun || touchRun) && !controlsDisabled
    const isJumping = (keyJump || touchJump) && !controlsDisabled
    
    // Direction vector relative to camera yaw
    const moveDir = new THREE.Vector3()
    if (!controlsDisabled) {
      if (forward) moveDir.z -= 1
      if (backward) moveDir.z += 1
      if (left) moveDir.x -= 1
      if (right) moveDir.x += 1

      // Add touch joystick influence
      if (touchMove.x !== 0 || touchMove.y !== 0) {
        moveDir.x += touchMove.x
        moveDir.z += touchMove.y
      }
    }
    
    const isMoving = moveDir.lengthSq() > 0.001
    const speed = isRunning ? RUN_SPEED : WALK_SPEED

    if (isMoving && !controlsDisabled) {
      moveDir.normalize()
      
      // Rotate by camera yaw
      const rot = new THREE.Matrix4().makeRotationY(cameraYaw.current)
      moveDir.applyMatrix4(rot)
      
      // Smooth acceleration
      velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, moveDir.x * speed, dt * 9)
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, moveDir.z * speed, dt * 9)
      
      // Natural character rotation toward movement direction
      const targetAngle = Math.atan2(moveDir.x, moveDir.z)
      
      let angleDiff = targetAngle - currentRotation.current
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
      currentRotation.current += angleDiff * dt * ROTATION_SPEED
    } else {
      // Smooth deceleration to dead stop
      velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, 0, dt * 12)
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, 0, dt * 12)
    }
    
    // --- Jumping ---
    if (jumpCooldown.current > 0) jumpCooldown.current -= dt
    
    let vy = currentVelocity.y
    if (isJumping && isOnGround && jumpCooldown.current <= 0) {
      vy = JUMP_FORCE
      jumpCooldown.current = 0.35
    }
    
    // Apply velocity to Rapier rigid body
    rb.setLinvel({ x: velocity.current.x, y: vy, z: velocity.current.z }, true)
    
    // --- Update character mesh rotation ---
    if (characterRef.current) {
      characterRef.current.rotation.y = currentRotation.current
    }
    
    // --- Camera ---
    const cameraDistance = useGameStore.getState().cameraDistance
    const yaw = cameraYaw.current
    const pitch = cameraPitch.current
    
    // Look target slightly above player chest/head
    const lookTarget = new THREE.Vector3(position.x, position.y + 1.25, position.z)
    const cameraTarget = new THREE.Vector3(position.x, position.y + CAMERA_HEIGHT, position.z)
    
    // Desired camera position in spherical offset
    const offsetX = Math.sin(yaw) * Math.cos(pitch) * cameraDistance
    const offsetY = Math.sin(pitch) * cameraDistance
    const offsetZ = Math.cos(yaw) * Math.cos(pitch) * cameraDistance
    
    const desiredCamPos = new THREE.Vector3(
      cameraTarget.x + offsetX,
      cameraTarget.y + offsetY,
      cameraTarget.z + offsetZ
    )
    
    // --- Camera wall collision check (anti-clipping) ---
    const camDirection = desiredCamPos.clone().sub(cameraTarget).normalize()
    const maxCamDist = desiredCamPos.distanceTo(cameraTarget)
    
    raycaster.current.set(cameraTarget, camDirection)
    raycaster.current.far = maxCamDist
    raycaster.current.near = 0.1
    
    // Collect camera colliders
    const collidables = []
    scene.traverse((child) => {
      if (child.isMesh && child.userData.cameraCollider) {
        collidables.push(child)
      }
    })
    
    let actualDist = maxCamDist
    if (collidables.length > 0) {
      const hits = raycaster.current.intersectObjects(collidables, false)
      if (hits.length > 0) {
        // Pull camera closer when blocked, never clipping through walls or ceilings
        actualDist = Math.min(maxCamDist, Math.max(0.25, hits[0].distance - 0.25))
      }
    }
    
    const finalCamPos = cameraTarget.clone().add(camDirection.multiplyScalar(actualDist))
    
    // Smooth camera interpolation
    camera.position.lerp(finalCamPos, dt * CAMERA_LERP_SPEED)
    camera.lookAt(lookTarget)
    
    // --- Sync store state ---
    useGameStore.getState().setPlayerPosition([position.x, position.y, position.z])
    useGameStore.getState().setIsRunning(isRunning && isMoving)
    useGameStore.getState().setIsMoving(isMoving)
    
    // Keep local state for model animation
    if (moving !== isMoving) setMoving(isMoving)
    if (running !== (isRunning && isMoving)) setRunning(isRunning && isMoving)

    // Reset if character accidentally falls off map
    if (position.y < -5) {
      rb.setTranslation({ x: 0, y: 3, z: 8 }, true)
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true)
    }
  })
  
  return (
    <RigidBody
      ref={rigidBodyRef}
      position={[0, 2, 8]}
      enabledRotations={[false, false, false]}
      mass={1}
      linearDamping={0.5}
      type="dynamic"
      colliders={false}
      lockRotations
    >
      <CapsuleCollider args={[0.35, 0.3]} position={[0, 0.7, 0]} />
      <group ref={characterRef}>
        <CharacterModel isMoving={moving} isRunning={running} />
      </group>
    </RigidBody>
  )
}
