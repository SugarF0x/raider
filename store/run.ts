import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { IFill } from "~/components/types"
import { TItem, Item } from "~/assets/Tiles"

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
      return a + v.stat
    }, 0)
  },
  totalAttack: state => state.character.equipment.weapon.stat,
  totalHealth: state => 25 + state.character.equipment.accessory.stat*15 + state.character.state.level*10,
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
  UPGRADE_ITEM(state, item: TItem) {
    // TODO: add buffs and what not, stat increase is a placeholder
    state.character.equipment[item].upgradeItem()
  },
  APPLY_UPGRADES(state, items: Item[]) {
    // TODO: account for upgrades levelup upgrades
    let type = items[0].type

    if (type === 'accessory') state.character.state.health += (items[0].stat - state.character.equipment[type].stat)*15
    else if (type !== 'weapon') state.character.state.shields += items[0].stat - state.character.equipment[type].stat

    state.character.equipment[type] = items[0]
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
        if (state.collectibles.current.experience+count >= state.collectibles.max) {
          commit('MODIFY_COLLECTIBLES', { target: 'experience', value: state.collectibles.current.experience+count-state.collectibles.max, set: true })
          // TODO: enable levelup shop on spells completion
          // commit('shop/SELECT_SHOP', 'levelup', { root: true })
          // THIS IS A PLACEHOLDER - SEE ABOVE
          commit('MODIFY_CHARACTER', { target: 'level', value: 1 })
          commit('MODIFY_CHARACTER', { target: 'health', value: rootGetters['run/totalHealth'], set: true })
        } else {
          commit('MODIFY_COLLECTIBLES', { target: 'experience', value: count })
        }
        break;
      case 'shield':
        if (state.character.state.shields+count > rootGetters['run/totalArmor']) {
          if (state.collectibles.current.upgrade+(count-(rootGetters['run/totalArmor']-state.character.state.shields)) >= state.collectibles.max) {
            commit('MODIFY_COLLECTIBLES', { target: 'upgrade', value: state.collectibles.current.upgrade+(count-(rootGetters['run/totalArmor']-state.character.state.shields))-state.collectibles.max, set: true })

            // TODO: enable levelup shop on spells completion
            // commit('shop/SELECT_SHOP', 'upgrade', { root: true })
            // THIS IS A PLACEHOLDER - SEE ABOVE

            commit('UPGRADE_ITEM', 'armor')
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
