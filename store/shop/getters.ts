import { getterTree } from "typed-vuex"
import { state } from "./"

export const getters = getterTree(state, {})

export default getters