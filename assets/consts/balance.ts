import { TileType } from "~/assets/types"

export const UPGRADE_THRESHOLD = 100
export const EXPERIENCE_THRESHOLD = 100
export const SPAWN_WEIGHT: Record<TileType, number> = {
  coin: 4,
  potion: 3,
  shield: 4,
  skull: 4,
  sword: 3
}