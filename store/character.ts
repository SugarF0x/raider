import { getterTree, mutationTree, actionTree } from 'typed-vuex'

const defaultState = () => ({
  gold: 0,
  armor: 3,
  health: 50,
  upgrade: 0,
  experience: 0
})

export const state = () => (defaultState())

export const getters = getterTree(state, {
  // TODO: update these once equipment is added
  totalArmor: state => 3,
  totalAttack: state => 1,
  totalHealth: state => 50
})

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  SET_GOLD: (state, value: number) => { state.gold = value },
  SET_ARMOR: (state, value: number) => { state.armor = value },
  SET_UPGRADE: (state, value: number) => { state.upgrade = value },
  SET_EXPERIENCE: (state, value: number) => { state.experience = value },
  SET_HEALTH: (state, value: number) => { state.health = value },
})

export const actions = actionTree({ state, getters, mutations }, {})
