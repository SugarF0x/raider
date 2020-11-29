import Vue from 'vue'
import { GetterTree, MutationTree } from 'vuex'
import { RootState } from './index'

const defaultState = () => {
  return {
    points: [] as number[],
    keys: [] as string[],
  }
}

export const state = () => (defaultState())

export type ArrowState = ReturnType<typeof state>

export const getters: GetterTree<ArrowState, RootState> = {
  lastKey: state => state.keys[state.keys.length-1]
}

interface IAddKeyPayload {
  x: number,
  y: number,
  key: string
}

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<ArrowState> = {
  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },
  ADD_KEY(state, payload: IAddKeyPayload) {
    state.points.push(payload.x, payload.y)
    state.keys.push(payload.key)
  },
  REMOVE_KEY(state) {
    state.points.pop()
    state.points.pop()
    state.keys.pop()
  },
  CLEAR_KEYS(state) {
    state.points = []
    state.keys = []
  }
}
