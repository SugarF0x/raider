import { getterTree } from "typed-vuex"
import { state } from "./"
import { TileType } from "~/assets/entities/tiles"
import { AttributeType } from "~/assets/entities/attributes"
import { BASE_HEALTH_VALUE } from "~/assets/consts/balance"
import { getEnumKeys } from "~/assets/utils"

export const getters = getterTree(state, {
  totalAttributes: state => {
    const attributes: Partial<Record<AttributeType, number>> = {}
    for (const type of getEnumKeys(AttributeType)) {
      const fixedType = type.toLowerCase() as AttributeType
      switch(fixedType) {
        // TODO: add special filters for strength, dexterity, vitality & luck since they can be also present on equipment
        case AttributeType.DEFENSE: {
          let defense = 0
          defense += (state.attributes.find(attr => attr.type === AttributeType.DEFENSE)?.level || 0)
          defense += state.items.filter(item => item.stat.type === AttributeType.DEFENSE).reduce((acc, item) => acc + item.stat.level, 0)
          attributes[AttributeType.DEFENSE] = defense
          break
        }
        default: attributes[fixedType] = state.attributes.find(attr => attr.type === fixedType)?.level || 0
      }
    }
    return attributes as Record<AttributeType, number>
  },

  totalArmor: (state, getters) => getters.totalAttributes.defense,
  totalAttack: (state, getters, rootState) => {
    const swords = rootState.dungeon.tiles
      .filter((tile: any) => rootState.dungeon.selected.includes(tile.id))
      .filter((tile: any) => tile.type === TileType.SWORD)
      .length

    const SWORD_POWER = getters.swordPower
    const STRENGTH = 1 + getters.totalAttributes.strength

    return STRENGTH + SWORD_POWER*swords
  },
  totalHealth: (state, getters) => BASE_HEALTH_VALUE + getters.totalAttributes.health*15 + getters.totalAttributes.vitality*5,
  swordPower: (state, getters) => 1 + getters.totalAttributes.damage
})

export default getters