import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RootState } from './index'
import { Item } from "~/assets/entities"

const defaultState = () => ({
  health: 50,
  armor: 3,
  level: 1,

  attribute: {
    strength: 0, // base damage & bonus exp chance +1 & +5% per tier respectively
    dexterity: 0, // repair per shield & bonus shield chance +1 & +5% per tier respectively
    vitality: 0, // health per potion & bonus potion chance +1 & +5% per tier respectively
    luck: 0, // bonus coin chance +5% per tier
    health: 0, // bonus health +15 per tier
    charisma: 0, // bonus every chance +5% per tier
    damage: 0, // +1 damage per sword per tier
    defense: 0 // +1 armor per tier
  },

  spells: [],
  equipment: {
    helmet: new Item('helmet'),
    armor: new Item('armor'),
    shield: new Item('shield'),
    weapon: new Item('weapon'),
    accessory: new Item('accessory')
  }
})
export const state = () => (defaultState())
export type CharacterState = ReturnType<typeof state>

export const getters: GetterTree<CharacterState, RootState> = {
  totalArmor: (state, getters) => {
    return [state.equipment.helmet, state.equipment.armor, state.equipment.shield].reduce((a, v) => {
      return a + v.getBaseBuff().power
    }, 0) + getters.totalAttributes.defense
  },
  totalAttack: (state, getters) => state.equipment.weapon.getBaseBuff().power + getters.totalAttributes.damage,
  totalHealth: (state, getters) => 35 + (getters.totalAttributes.vitality + getters.totalAttributes.health) * 15,
  totalAttributes: state => ({
    strength: (state.equipment.weapon.buffs.find(entry => entry.type === 'strength')?.power || 0) + state.attribute.strength,
    dexterity: (state.equipment.helmet.buffs.find(entry => entry.type === 'dexterity')?.power || 0) + state.attribute.dexterity,
    vitality: (state.equipment.accessory.buffs.find(entry => entry.type === 'vitality')?.power || 0) + state.attribute.vitality,
    luck: (state.equipment.accessory.buffs.find(entry => entry.type === 'luck')?.power || 0) + state.attribute.luck,
    health: state.attribute.health,
    charisma: state.attribute.charisma,
    damage: state.attribute.damage,
    defense: state.attribute.defense
  }),
}

type CharacterCondition = 'health' | 'armor' | 'level'

export const mutations: MutationTree<CharacterState> = {
  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },
  ADD_VALUE(state, payload: { target: CharacterCondition, value: number } ) {
    state[payload.target] += payload.value
  },
  SET_VALUE(state, payload: { target: CharacterCondition, value: number } ) {
    state[payload.target] = payload.value
  },
  ADD_ATTRIBUTE(state, payload: keyof CharacterState["attribute"]) {
    state.attribute[payload]++
  },

  // TODO: continue refactoring from here
  APPLY_UPGRADES(state, payload: TShopEntry[]) {
    payload.forEach(entry => {
      switch(entry.type) {
        case "item":
          // heal or repair if upgrade qualifies
          if (entry.item.type === 'accessory') state.character.state.health += (entry.item.getBaseBuff().power - state.character.equipment[entry.item.type].getBaseBuff().power)*15 // heal by health increase
          else if (entry.item.type !== 'weapon') state.character.state.shields += entry.item.getBaseBuff().power - state.character.equipment[entry.item.type].getBaseBuff().power // repair by armor increase

          state.character.equipment[entry.item.type] = entry.item
          break;
        case "upgrade":
          switch (entry.item.type) {
            case 'defense':
              state.character.state.shields += 1; break
            case 'vitality':
              state.character.state.health += 15; break
          }

          state.character.equipment[entry.item.target].applyBuff(entry.item)
          break;
        case "attribute":
          state.character.attributes[entry.item]++
          if (entry.item === 'health' || entry.item === 'vitality') state.character.state.health += 15
          break;
        case "spell":
          // TODO: cover spells slot
          break;
      }
    })
  },
}

export const actions: ActionTree<CharacterState, RootState> = {}
