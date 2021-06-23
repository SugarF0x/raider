import { getterTree } from "typed-vuex"
import { state } from "./"
import { TileType } from "~/assets/entities/tiles"
import { AttributeType } from "~/assets/entities/attributes"
import { BASE_HEALTH_VALUE } from "~/assets/consts/balance"
import { getEnumKeys } from "~/assets/utils"
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
          strength += state.items
            .filter(item => !!item.buffs.find(buff => buff.type === BuffType.STRENGTH))
            .map(item => item.buffs.find(buff => buff.type === BuffType.STRENGTH))
            .reduce((acc, buff) => acc + (buff?.level || 0), 0)
          attributes[AttributeType.STRENGTH] = strength
          break
        }
        case AttributeType.VITALITY: {
          let vitality = 0
          vitality += state.attributes.find(attr => attr.type === AttributeType.VITALITY)?.level || 0
          vitality += state.items
            .filter(item => !!item.buffs.find(buff => buff.type === BuffType.VITALITY))
            .map(item => item.buffs.find(buff => buff.type === BuffType.VITALITY))
            .reduce((acc, buff) => acc + (buff?.level || 0), 0)
          attributes[AttributeType.VITALITY] = vitality
          break
        }
        case AttributeType.DAMAGE: {
          let damage = 0
          damage += state.attributes.find(attr => attr.type === AttributeType.DAMAGE)?.level || 0
          damage += state.items
            .filter(item => !!item.buffs.find(buff => buff.type === BuffType.DAMAGE))
            .map(item => item.buffs.find(buff => buff.type === BuffType.DAMAGE))
            .reduce((acc, buff) => acc + (buff?.level || 0), 0)
          attributes[AttributeType.DAMAGE] = damage
          break
        }
        case AttributeType.DEFENSE: {
          let defense = 0
          defense += state.attributes.find(attr => attr.type === AttributeType.DEFENSE)?.level || 0
          defense += state.items
            .filter(item => !!item.buffs.find(buff => buff.type === BuffType.DEFENSE))
            .map(item => item.buffs.find(buff => buff.type === BuffType.DEFENSE))
            .reduce((acc, buff) => acc + (buff?.level || 0), 0)
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