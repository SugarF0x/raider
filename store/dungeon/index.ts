import { defaultState } from "~/store/dungeon/state"
import { Tiles } from "~/assets/entities"

export * from './state'
export * from './getters'
export * from './mutations'
export * from './actions'

export function findTile(state: ReturnType<typeof defaultState>, id: number): Tiles.Tile {
  const tile = state.tiles.find(tile => tile.id === id)
  if (!tile) throw new Error(
    `No tile found
      ID passed: ${id}`,
  )
  return tile
}