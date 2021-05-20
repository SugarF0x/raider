import { getterTree, mutationTree, actionTree } from 'typed-vuex'

const defaultState = () => ({
  turn: 0,
  score: 0,
})

export const state = () => (defaultState())

export const getters = getterTree(state, {
  enemyPower: state => Math.floor(state.turn/75) + 1
})

export const mutations = mutationTree(state, {
  INC_TURN: state => { state.turn++ },
  INC_SCORE: (state, value: number) => { state.score += value }
})

export const actions = actionTree({ state, getters, mutations }, {})
