import { getterTree } from "typed-vuex"
import { state } from "./"
import { TileType } from "~/assets/entities/tiles"
import { AttributeType } from "~/assets/entities/attributes"
import { BASE_HEALTH_VALUE } from "~/assets/consts/balance"
import { getEnumKeys } from "~/assets/utils"
import { ItemType } from "~/assets/entities/items"
import { BuffType } from "~/assets/entities/buffs"

export const getters = getterTree(state, {
  totalAttributes: state => {
    const attributes: Partial<Record<AttributeType, number>> = {}
    for (const type of getEnumKeys(AttributeType)) {
      const fixedType = type.toLowerCase() as AttributeType
      switch(fixedType) {
        case AttributeType.STRENGTH: {
          let strength = 0
          strength += state.attributes.find(attr => attr.type === AttributeType.STRENGTH)?.level || 0
          strength += state.items.filter(item => item.assignableBuffs.includes(BuffType.STRENGTH)).reduce((acc, item) => acc + item.buffs[0].level, 0)
          attributes[AttributeType.STRENGTH] = strength
          break
        }
        case AttributeType.VITALITY: {
          let vitality = 0
          vitality += state.attributes.find(attr => attr.type === AttributeType.VITALITY)?.level || 0
          vitality += state.items.filter(item => item.assignableBuffs.includes(BuffType.VITALITY)).reduce((acc, item) => acc + item.buffs[0].level, 0)
          attributes[AttributeType.VITALITY] = vitality
          break
        }
        case AttributeType.DAMAGE: {
          let damage = 0
          damage += state.attributes.find(attr => attr.type === AttributeType.DAMAGE)?.level || 0
          damage += state.items.filter(item => item.assignableBuffs.includes(BuffType.DAMAGE)).reduce((acc, item) => acc + item.buffs[0].level, 0)
          attributes[AttributeType.DAMAGE] = damage
          break
        }
        case AttributeType.DEFENSE: {
          let defense = 0
          defense += state.attributes.find(attr => attr.type === AttributeType.DEFENSE)?.level || 0
          defense += state.items.filter(item => item.assignableBuffs.includes(BuffType.DEFENSE)).reduce((acc, item) => acc + item.buffs[0].level, 0)
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

    const SWORD_POWER = getters.totalAttributes.damage
    const STRENGTH = 1 + getters.totalAttributes.strength

    return STRENGTH + SWORD_POWER*swords
  },
  totalHealth: (state, getters) => BASE_HEALTH_VALUE + getters.totalAttributes.health*15 + getters.totalAttributes.vitality*5
})

export default getters