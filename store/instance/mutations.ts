import { mutationTree } from "typed-vuex"
import { state, defaultState } from "./"

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  INC_TURN: state => { state.turn++ },
  INC_SCORE: (state, value: number) => { state.score += value }
})

export default mutations