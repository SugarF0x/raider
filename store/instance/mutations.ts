import { mutationTree } from "typed-vuex"
import { state, defaultState, StageType, ShopType } from "./"

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  INC_TURN: state => { state.turn++ },
  INC_SCORE: (state, value: number) => { state.score += value },
  SET_STAGE: (state, value: StageType) => { state.stage = value; state.isStageFinished = false },
  SET_SHOP: (state, value: ShopType) => { state.shop = value },
  COMPLETE_STAGE: state => { state.isStageFinished = true }
})

export default mutations