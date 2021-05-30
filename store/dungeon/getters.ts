import { getterTree } from "typed-vuex"
import { TileType } from "~/assets/types"
import { state } from "./"

export const getters = getterTree(state, {
  selectedType: (state): TileType | null => state.tiles.find(tile => tile.id === state.selected[0])?.type || null,
})

export default getters