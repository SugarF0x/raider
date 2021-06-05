import { TileType } from "~/assets/types"

export const UPGRADE_THRESHOLD = 100
export const EXPERIENCE_THRESHOLD = 100
export const SPAWN_WEIGHT: Record<TileType, number> = {
  default: 0,
  coin: 4,
  potion: 3,
  shield: 4,
  skull: 4,
  sword: 3
}
export const BASE_ARMOR_BREAK_CHANCE = .7