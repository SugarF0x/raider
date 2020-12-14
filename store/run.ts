import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { IFill } from "~/components/types"
import { TItem, Item, Buff } from "~/assets/Tiles"

const defaultState = () => {
  return {
    game: {
      score: 0,
      turn: 0
    },
    collectibles: {
      max: 100,
      current: {
        coins: 0,
        upgrade: 0,
        experience: 0
      }
    },
    character: {
      state: {
        health: 50,
        shields: 3,
        level: 1
      },
      attributes: {
        strength: 0, // base damage & bonus exp chance +1 & +5% per tier respectively
        dexterity: 0, // repair per shield & bonus shield chance +1 & +5% per tier respectively
        vitality: 0, // health per potion & bonus potion chance +1 & +5% per tier respectively
        luck: 0, // bonus coin chance +5% per tier
        health: 0, // bonus health +15 per tier
        charisma: 0 // bonus every chance +5% per tier
      },
      equipment: {
        helmet: new Item('helmet'),
        armor: new Item('armor'),
        shield: new Item('shield'),
        weapon: new Item('weapon'),
        accessory: new Item('accessory')
      },
      spells: {},
    }
  }
}

export const state = () => (defaultState())

export type RunState = ReturnType<typeof state>

// noinspection JSUnusedGlobalSymbols
export const getters: GetterTree<RunState, RootState> = {
  fill(state, getters): IFill {
    return {
      coins: state.collectibles.current.coins / state.collectibles.max,
      upgrade: state.collectibles.current.upgrade / state.collectibles.max,
      experience: state.collectibles.current.experience / state.collectibles.max,
      health: state.character.state.health / getters.totalHealth
    }
  },
  totalArmor(state) {
    return [state.character.equipment.helmet, state.character.equipment.armor, state.character.equipment.shield].reduce((a, v) => {
      return a + v.getBaseBuff().power
    }, 0)
  },
  totalAttack: state => state.character.equipment.weapon.getBaseBuff().power,
  totalHealth: state => 35 + (state.character.equipment.accessory.getBaseBuff().power+state.character.attributes.health)*15,
  totalAttributes: state => ({
    strength: (state.character.equipment.weapon.buffs.find(entry => entry.type === 'strength')?.power || 0) + state.character.attributes.strength,
    dexterity: (state.character.equipment.helmet.buffs.find(entry => entry.type === 'dexterity')?.power || 0) + state.character.attributes.dexterity,
    vitality: (state.character.equipment.accessory.buffs.find(entry => entry.type === 'vitality')?.power || 0) + state.character.attributes.vitality,
    luck: (state.character.equipment.accessory.buffs.find(entry => entry.type === 'luck')?.power || 0) + state.character.attributes.luck,
    health: state.character.attributes.health,
    charisma: state.character.attributes.charisma
  }),
  enemyPower: state => Math.floor(state.game.turn/100) + 1
}

interface IModifyPayload {
  value: number
  set: boolean
}

interface IModifyStatePayload extends IModifyPayload {
  target: 'coins' | 'upgrade' | 'experience'
}

interface IModifyGamePayload extends IModifyPayload {
  target: 'turn' | 'score'
}

interface IModifyCharacterPayload extends IModifyPayload {
  target: 'health' | 'shields' | 'level'
}

type TApplyUpgradesPayload  = {
  type: 'item'
  selected: Item[]
} | {
  type: 'upgrade'
  selected: Array<{ item: TItem, buff: Buff }>
} | {
  type: 'levelup'
  selected: undefined
}

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<RunState> = {
  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },
  MODIFY_COLLECTIBLES(state, { target, value, set = false }: IModifyStatePayload) {
    if (!set) {
      state.collectibles.current[target] += value
    } else {
      state.collectibles.current[target] = value
    }
  },
  MODIFY_GAME(state, { target, value, set = false }: IModifyGamePayload) {
    if (!set) {
      state.game[target] += value
    } else {
      state.game[target] = value
    }
  },
  MODIFY_CHARACTER(state, { target, value, set = false }: IModifyCharacterPayload) {
    if (!set) {
      state.character.state[target] += value
    } else {
      state.character.state[target] = value
    }
  },
  APPLY_UPGRADES(state, payload: TApplyUpgradesPayload) {
    if (payload.type === 'item') {
      let selected = payload.selected[0]
      let itemType = selected.type

      // heal or repair if upgrade qualifies
      if (itemType === 'accessory') state.character.state.health += (selected.getBaseBuff().power - state.character.equipment[itemType].getBaseBuff().power)*15 // heal by health increase
      else if (itemType !== 'weapon') state.character.state.shields += selected.getBaseBuff().power - state.character.equipment[itemType].getBaseBuff().power // repair by armor increase

      state.character.equipment[itemType] = selected
    } else if (payload.type === 'upgrade') {
      let { item, buff } = payload.selected[0]

      switch (buff.type) {
        case 'defense':
          state.character.state.shields += 1; break
        case 'vitality':
          state.character.state.health += 15; break
      }

      state.character.equipment[item].applyBuff(buff)
    } else {
      // TODO: account for levelup
    }
  },
  NEXT_TURN(state) {
    state.game.turn++
  }
}

// noinspection JSUnusedGlobalSymbols
export const actions: ActionTree<RunState, RootState> = {
  handleCollection({ commit, state, rootState, rootGetters }) {
    let root = rootState as CombinedStates
    let count = 0
    if (rootGetters.selectedFamily === 'sword') {
      root.arrow.keys.forEach(key => {
        if (root.dungeon.tiles.find(entry => entry.key === key)?.family === 'skull'
        && root.dungeon.tiles.find(entry => entry.key === key)?.effects.indexOf('vulnerable') !== -1) {
          count++
        }
      })
    } else {
      count = root.arrow.keys.length
    }

    // update score
    switch(rootGetters.selectedFamily) {
      case 'sword':
        commit('MODIFY_GAME', { target: 'score', value: count*10 })
        break;
      default:
        commit('MODIFY_GAME', { target: 'score', value: count })
    }

    // handle collection
    let endCount: number // this one here is for final calculations with added bonuses
    switch (rootGetters.selectedFamily) {
      case 'coin':
        if (state.collectibles.current.coins+count >= state.collectibles.max) {
          commit('MODIFY_COLLECTIBLES', { target: 'coins', value: state.collectibles.current.coins+count-state.collectibles.max, set: true })
          commit('shop/SELECT_SHOP', 'item', { root: true })
        } else {
          commit('MODIFY_COLLECTIBLES', { target: 'coins', value: count })
        }
        break;
      case 'sword':
        endCount = 0
        for (let i = 0; i<count; i++) Math.random() < rootGetters['run/totalAttributes'].strength*0.05 ? endCount+=2 : endCount++
        if (state.collectibles.current.experience+endCount >= state.collectibles.max) {
          commit('MODIFY_COLLECTIBLES', { target: 'experience', value: state.collectibles.current.experience+endCount-state.collectibles.max, set: true })
          // TODO: enable levelup shop on spells completion
          // commit('shop/SELECT_SHOP', 'levelup', { root: true })
          // THIS IS A PLACEHOLDER - SEE ABOVE
          commit('MODIFY_CHARACTER', { target: 'level', value: 1 })
          commit('MODIFY_CHARACTER', { target: 'health', value: rootGetters['run/totalHealth'], set: true })
        } else {
          commit('MODIFY_COLLECTIBLES', { target: 'experience', value: endCount })
        }
        break;
      case 'shield':
        if (state.character.state.shields+count > rootGetters['run/totalArmor']) {
          if (state.collectibles.current.upgrade+(count-(rootGetters['run/totalArmor']-state.character.state.shields)) >= state.collectibles.max) {
            commit('MODIFY_COLLECTIBLES', { target: 'upgrade', value: state.collectibles.current.upgrade+(count-(rootGetters['run/totalArmor']-state.character.state.shields))-state.collectibles.max, set: true })

            commit('shop/SELECT_SHOP', 'upgrade', { root: true })
          } else {
            commit('MODIFY_COLLECTIBLES', { target: 'upgrade', value: count-(rootGetters['run/totalArmor']-state.character.state.shields) })
          }
          commit('MODIFY_CHARACTER', { target: 'shields', value: rootGetters['run/totalArmor'], set: true })
        } else {
          commit('MODIFY_CHARACTER', { target: 'shields', value: count })
        }
        break;
      case 'potion':
        if (state.character.state.health+count > rootGetters['run/totalHealth']) {
          commit('MODIFY_CHARACTER', { target: 'health', value: rootGetters['run/totalHealth'], set: true })
        } else {
          commit('MODIFY_CHARACTER', { target: 'health', value: count })
        }
        break;
    }
  },
}
