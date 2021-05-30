import { mutationTree } from "typed-vuex"
import { state, defaultState } from "./"

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  SET_GOLD: (state, value: number) => { state.gold = value },
  SET_ARMOR: (state, value: number) => { state.armor = value },
  SET_UPGRADE: (state, value: number) => { state.upgrade = value },
  SET_EXPERIENCE: (state, value: number) => { state.experience = value },
  SET_HEALTH: (state, value: number) => { state.health = value },
})

export default mutations