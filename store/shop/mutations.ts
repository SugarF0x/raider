import { mutationTree } from "typed-vuex"
import { state, defaultState, ShopType } from "./"

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  SET_TYPE: (state, type: ShopType) => { state.type = type }
})

export default mutations