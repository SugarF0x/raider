import { mutationTree } from "typed-vuex"
import { state, defaultState, StageType, ShopType } from "./"

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  INC_TURN: state => { state.turn++ },
  INC_SCORE: (state, value: number) => { state.score += value },
  SET_STAGE: (state, value: StageType) => { state.stage = value },
  SET_SHOP: (state, value: ShopType) => { state.shop = value }
})

export default mutations