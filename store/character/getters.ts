import { getterTree } from "typed-vuex"
import { state } from "./"
import { TileType } from "~/assets/entities/tiles"
import { AttributeType } from "~/assets/entities/attributes"

export const getters = getterTree(state, {
  totalArmor: state => 3,
  totalAttack: (state, getters, rootState) => {
    const swords = rootState.dungeon.tiles
      .filter((tile: any) => rootState.dungeon.selected.includes(tile.id))
      .filter((tile: any) => tile.type === TileType.SWORD)
      .length

    const SWORD_POWER = getters.swordPower
    const STRENGTH = 1 + (state.attributes.find(attribute => attribute.type === AttributeType.STRENGTH)?.level ?? 0)

    return STRENGTH + SWORD_POWER*swords
  },
  totalHealth: state => 50,
  swordPower: state => 1 + (state.attributes.find(attribute => attribute.type === AttributeType.DAMAGE)?.level ?? 0)
})

export default getters