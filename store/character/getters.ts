import { getterTree } from "typed-vuex"
import { state } from "./"
import { TileType } from "~/assets/entities/tiles"

export const getters = getterTree(state, {
  totalArmor: state => 3,
  totalAttack: (state, getters, rootState) => {
    const swords = rootState.dungeon.tiles
      .filter((tile: any) => rootState.dungeon.selected.includes(tile.id))
      .filter((tile: any) => tile.type === TileType.SWORD)
      .length

    const SWORD_POWER = 1
    const STRENGTH = 1

    return STRENGTH + SWORD_POWER*swords
  },
  totalHealth: state => 50
})

export default getters