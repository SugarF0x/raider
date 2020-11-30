import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { IFill } from "~/components/gamespace/types"

const defaultState = () => {
  return {
    score: 0,
    turn: 0,
    coins: {
      max: 100,
      current: 0
    },
    enemy: 1,
    defense: {
      max: 4,
      current: 4
    },
    attack: 1,
    upgrade: {
      max: 100,
      current: 0
    },
    experience: {
      max: 100,
      current: 0
    },
    health: {
      max: 50,
      current: 50
    }
  }
}

export const state = () => (defaultState())

export type RunState = ReturnType<typeof state>

export const getters: GetterTree<RunState, RootState> = {
  fill(state): IFill {
    return {
      coins: state.coins.current / state.coins.max,
      upgrade: state.upgrade.current / state.upgrade.max,
      experience: state.experience.current / state.experience.max,
      health: state.health.current / state.health.max
    }
  },
}

interface IModifyStatePayload {
  target: keyof RunState
  value: number
  isMax?: boolean
}

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<RunState> = {
  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },
  MODIFY_STATE(state, { target, value, isMax }: IModifyStatePayload) {
    switch(target) {
      case 'coins':
      case 'defense':
      case 'upgrade':
      case 'experience':
      case 'health':
        if (isMax) {
          state[target].max = value
        } else {
          state[target].current = value
        }
        break;
      default:
          state[target] = value
        break;
    }
  },
  NEXT_TURN(state) {
    state.turn++
  },
  ENEMY_POWER_CHECK(state) {
    state.enemy = Math.floor(state.turn/50) + 1;
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

    // TODO: clean this up
    switch (rootGetters.selectedFamily) {
      case 'coin':
        commit('MODIFY_STATE', { target: 'score', value: state.score+count })
        if (state.coins.current+count >= state.coins.max) {
          commit('MODIFY_STATE', { target: 'coins', value: state.coins.current+count-state.coins.max })
          commit('MODIFY_STATE', { target: 'attack', value: state.attack+1 })
        } else {
          commit('MODIFY_STATE', { target: 'coins', value: state.coins.current+count })
        }
        break;
      case 'sword':
        commit('MODIFY_STATE', { target: 'score', value: state.score+count*10 })
        if (state.experience.current+count >= state.experience.max) {
          commit('MODIFY_STATE', { target: 'experience', value: state.experience.current+count-state.experience.max })
          commit('MODIFY_STATE', { target: 'health', value: state.health.max+15, isMax: true })
          commit('MODIFY_STATE', { target: 'health', value: state.health.max })
        } else {
          commit('MODIFY_STATE', { target: 'experience', value: state.experience.current+count })
        }
        break;
      case 'shield':
        commit('MODIFY_STATE', { target: 'score', value: state.score+count })
        if (state.defense.current+count > state.defense.max) {
          if (state.upgrade.current+(count-(state.defense.max-state.defense.current)) >= state.upgrade.max) {
            commit('MODIFY_STATE', { target: 'upgrade', value: state.upgrade.current+(count-(state.defense.max-state.defense.current))-state.upgrade.max })
            commit('MODIFY_STATE', { target: 'defense', value: state.defense.max+1, isMax: true })
            commit('MODIFY_STATE', { target: 'defense', value: state.defense.max })
          } else {
            commit('MODIFY_STATE', { target: 'upgrade', value: state.upgrade.current+count-(state.defense.max-state.defense.current) })
          }
          commit('MODIFY_STATE', { target: 'defense', value: state.defense.max })
        } else {
          commit('MODIFY_STATE', { target: 'defense', value: state.defense.current+count })
        }
        break;
      case 'potion':
        commit('MODIFY_STATE', { target: 'score', value: state.score+count })
        if (state.health.current+count > state.health.max) {
          commit('MODIFY_STATE', { target: 'health', value: state.health.max })
        } else {
          commit('MODIFY_STATE', { target: 'health', value: state.health.current+count })
        }
        break;
    }
  },
}
