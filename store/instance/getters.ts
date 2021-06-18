import { getterTree } from "typed-vuex"
import { ShopType, state } from "~/store/instance"

export const getters = getterTree(state, {
  enemyPower: state => Math.floor(state.turn/75) + 1,
  isPaused: (state, getters, rootState) => rootState.instance.shop !== ShopType.NONE
})

export default getters