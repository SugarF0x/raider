import { getterTree } from "typed-vuex"
import { TileType } from "~/assets/types"
import { state } from "./"
import { Tile } from "~/assets/entities/tiles"

export const getters = getterTree(state, {
  selectedType: (state): TileType | null => state.tiles.find(tile => tile.id === state.selected[0])?.type || null,
  selectedTiles: (state): Tile[] => state.tiles.filter(tile => state.selected.includes(tile.id))
})

export default getters