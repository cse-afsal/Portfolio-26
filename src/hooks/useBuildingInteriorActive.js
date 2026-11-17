import useGameStore from '../store/useGameStore'

/**
 * Hook to determine whether a building's interior should be mounted and rendered.
 * Culls interiors when the player is far away to save draw calls, memory, and physics overhead.
 *
 * @param {Array<number>} buildingPosition [x, y, z] center of the building
 * @param {number} baseThreshold Default distance threshold in meters (default 30m)
 * @returns {boolean} Whether the interior should be rendered
 */
export default function useBuildingInteriorActive(buildingPosition, baseThreshold = 30) {
  const playerPosition = useGameStore((s) => s.playerPosition)
  const playerTeleportTarget = useGameStore((s) => s.playerTeleportTarget)
  const doorTransitioning = useGameStore((s) => s.doorTransitioning)
  const graphicsQuality = useGameStore((s) => s.graphicsQuality)

  // Adjust threshold by quality setting:
  // Low quality culls earlier (22m), Medium (28m), High (34m)
  const qualityFactor = graphicsQuality === 'low' ? 0.75 : graphicsQuality === 'medium' ? 0.95 : 1.15
  const threshold = baseThreshold * qualityFactor
  const thresholdSq = threshold * threshold

  // If teleporting near this building, mount immediately
  if (playerTeleportTarget) {
    const tdx = playerTeleportTarget[0] - buildingPosition[0]
    const tdz = playerTeleportTarget[2] - buildingPosition[2]
    if (tdx * tdx + tdz * tdz < thresholdSq) {
      return true
    }
  }

  // If currently in a door transition, stay active
  if (doorTransitioning) {
    const pdx = playerPosition[0] - buildingPosition[0]
    const pdz = playerPosition[2] - buildingPosition[2]
    if (pdx * pdx + pdz * pdz < (threshold + 15) * (threshold + 15)) {
      return true
    }
  }

  // Calculate horizontal distance squared to player
  const dx = playerPosition[0] - buildingPosition[0]
  const dz = playerPosition[2] - buildingPosition[2]
  const distSq = dx * dx + dz * dz

  return distSq <= thresholdSq
}
