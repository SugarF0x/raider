import { getterTree } from "typed-vuex"
import { state } from "~/store/instance"

export const getters = getterTree(state, {
  enemyPower: state => Math.floor(state.turn/75) + 1
})

export default getters