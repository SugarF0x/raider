import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { IFill } from "~/components/gamespace/types"
import { Item } from "~/assets/Tiles"

const defaultState = () => {
  return {
    game: {
      score: 0,
      turn: 0,
      enemy: 1,
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
    return [state.character.equipment.helmet, state.character.equipment.armor, state.character.equipment.armor].reduce((a, v) => {
      return a + v.stat
    }, 0)
  },
  totalAttack: state => state.character.equipment.weapon.stat,
  totalHealth: state => 35 + state.character.equipment.accessory.stat*15
}

interface IModifyPayload {
  value: number | string
}

interface IModifyStatePayload extends IModifyPayload {
  target: 'coins' | 'upgrade' | 'experience'
}

interface IModifyGamePayload extends IModifyPayload {
  target: 'turn' | 'score' | 'enemy'
}

interface IModifyCharacterPayload extends IModifyPayload {
  target: 'health' | 'shields' | 'level'
}

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<RunState> = {
  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },
  // TODO: unify function used in these two
  // TODO: rethink functionality? question mark? perhaps add by default and use another payload key like {set: true}
  MODIFY_COLLECTIBLES(state, { target, value }: IModifyStatePayload) {
    if (typeof value === 'string') {
      let parsedValue = parseInt(value.slice(1))
      switch(value[0]) {
        case '-':
          state.collectibles.current[target] -= parsedValue
          break
        case '+':
          state.collectibles.current[target] += parsedValue
          break
        default:
          state.collectibles.current[target] = parseInt(value)
          break
      }
    } else {
      state.collectibles.current[target] = value
    }
  },
  MODIFY_GAME(state, { target, value }: IModifyGamePayload) {
    if (typeof value === 'string') {
      let parsedValue = parseInt(value.slice(1))
      switch(value[0]) {
        case '-':
          state.game[target] -= parsedValue
          break
        case '+':
          state.game[target] += parsedValue
          break
        default:
          state.game[target] = parseInt(value)
          break
      }
    } else {
      state.game[target] = value
    }
  },
  MODIFY_CHARACTER(state, { target, value }: IModifyCharacterPayload) {
    if (typeof value === 'string') {
      let parsedValue = parseInt(value.slice(1))
      switch(value[0]) {
        case '-':
          state.character.state[target] -= parsedValue
          break
        case '+':
          state.character.state[target] += parsedValue
          break
        default:
          state.character.state[target] = parseInt(value)
          break
      }
    } else {
      state.character.state[target] = value
    }
  },
  NEXT_TURN(state) {
    state.game.turn++
  },
  ENEMY_POWER_CHECK(state) {
    state.game.enemy = Math.floor(state.game.turn/50) + 1;
  }
}

export const actions: ActionTree<RunState, RootState> = {
  handleCollection({ commit, state, rootState, rootGetters }) {
    let root = rootState as CombinedStates
    let count = 0
    if (rootGetters.selectedFamily === 'sword') {
      root.arrow.keys.forEach(key => {
        if (root.dungeon.tiles[key].family === 'skull' && root.dungeon.tiles[key].effects.indexOf('vulnerable') !== -1) {
          count++
        }
      })
    } else {
      count = root.arrow.keys.length
    }

    // update score
    switch(rootGetters.selectedFamily) {
      case 'sword':
        commit('MODIFY_GAME', { target: 'score', value: `+${count*10}` })
        break;
      default:
        commit('MODIFY_GAME', { target: 'score', value: `+${count}` })
    }

    // handle collection
    switch (rootGetters.selectedFamily) {
      case 'coin':
        if (state.collectibles.current.coins+count >= state.collectibles.max) {
          commit('MODIFY_COLLECTIBLES', { target: 'coins', value: state.collectibles.current.coins+count-state.collectibles.max })
          commit('shop/SELECT_SHOP', 'item', { root: true })
        } else {
          commit('MODIFY_COLLECTIBLES', { target: 'coins', value: state.collectibles.current.coins+count })
        }
        break;
      case 'sword':
        if (state.collectibles.current.experience+count >= state.collectibles.max) {
          commit('MODIFY_COLLECTIBLES', { target: 'experience', value: state.collectibles.current.experience+count-state.collectibles.max })
          commit('shop/SELECT_SHOP', 'levelup', { root: true })
        } else {
          commit('MODIFY_COLLECTIBLES', { target: 'experience', value: state.collectibles.current.experience+count })
        }
        break;
      case 'shield':
        if (state.character.state.shields+count > rootGetters['run/totalArmor']) {
          if (state.collectibles.current.upgrade+(count-(rootGetters['run/totalArmor']-state.character.state.shields)) >= state.collectibles.max) {
            commit('MODIFY_COLLECTIBLES', { target: 'upgrade', value: state.collectibles.current.upgrade+(count-(rootGetters['run/totalArmor']-state.character.state.shields))-state.collectibles.max })
            commit('shop/SELECT_SHOP', 'upgrade', { root: true })
          } else {
            commit('MODIFY_COLLECTIBLES', { target: 'upgrade', value: state.collectibles.current.upgrade+count-(rootGetters['run/totalArmor']-state.character.state.shields) })
          }
          commit('MODIFY_CHARACTER', { target: 'shields', value: rootGetters['run/totalArmor'] })
        } else {
          commit('MODIFY_CHARACTER', { target: 'shields', value: state.character.state.shields+count })
        }
        break;
      case 'potion':
        if (state.character.state.health+count > rootGetters['run/totalHealth']) {
          commit('MODIFY_CHARACTER', { target: 'health', value: rootGetters['run/totalHealth'] })
        } else {
          commit('MODIFY_CHARACTER', { target: 'health', value: state.character.state.health+count })
        }
        break;
    }
  },
}
