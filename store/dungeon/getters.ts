import { getterTree } from "typed-vuex"
import { state } from "./"
import { isSkull, Tile, TileType } from "~/assets/entities/tiles"
import { EffectType } from "~/assets/entities/effects"

export const getters = getterTree(state, {
  selectedType: (state): TileType | null => state.tiles.find(tile => tile.id === state.selected[0])?.type || null,
  selectedTiles: (state): Tile[] => state.tiles.filter(tile => state.selected.includes(tile.id)),
  pendingEnemyDamage: (state): number => state.tiles.reduce((total, tile) => {
    if (isSkull(tile) && !tile.effects.find(effect => effect.type === EffectType.FRESH)) return total + tile.currentState.attack
    else return total
  }, 0)
})

export default getters