import { getterTree, mutationTree, actionTree } from 'typed-vuex'

const defaultState = () => ({
  gold: 20,
})

export const state = () => (defaultState())

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  SET_GOLD: (state, value: number) => { state.gold = value },
})

export const actions = actionTree({ state, getters, mutations }, {})
