import { getterTree, mutationTree, actionTree } from 'typed-vuex'

const defaultState = () => ({
  gold: 20,
  armor: 3
})

export const state = () => (defaultState())

export const getters = getterTree(state, {
  // TODO: update these once equipment is added
  totalArmor: state => 3,
  totalAttack: state => 1
})

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  SET_GOLD: (state, value: number) => { state.gold = value },
  SET_ARMOR: (state, value: number) => { state.armor = value }
})

export const actions = actionTree({ state, getters, mutations }, {})
