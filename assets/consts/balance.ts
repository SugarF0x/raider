import { TileType } from "~/assets/entities/tiles"

export const SPAWN_WEIGHT: Record<TileType, number> = {
  default: 0,
  coin: 4,
  potion: 3,
  shield: 4,
  skull: 4,
  sword: 3,
}

export const UPGRADE_THRESHOLD = 100
export const EXPERIENCE_THRESHOLD = 100
export const GOLD_THRESHOLD = 100
export const BASE_ARMOR_BREAK_CHANCE = .7
export const BASE_DOUBLE_UPGRADE_CHANCE = .15
export const BASE_HEALTH_VALUE = 50
export const BASE_ARMOR_VALUE = 3