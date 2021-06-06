import { getterTree } from "typed-vuex"
import { state } from "./"

export const getters = getterTree(state, {
  // TODO: update these once equipment is added
  totalArmor: state => 3,
  totalAttack: (state, getters, rootState) => {
    const swords = rootState.dungeon.tiles
      .filter((tile: any) => rootState.dungeon.selected.includes(tile.id))
      .filter((tile: any) => tile.type === "sword")
      .length

    const SWORD_POWER = 1
    const STRENGTH = 1

    return STRENGTH + SWORD_POWER*swords
  },
  totalHealth: state => 50
})

export default getters