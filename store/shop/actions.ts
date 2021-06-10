import { actionTree } from "typed-vuex"
import { getters, mutations, state } from "./"

export const actions = actionTree({ state, getters, mutations }, {})

export default actions