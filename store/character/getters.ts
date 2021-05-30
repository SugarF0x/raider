import { getterTree } from "typed-vuex"
import { state } from "./"

export const getters = getterTree(state, {
  // TODO: update these once equipment is added
  totalArmor: state => 3,
  totalAttack: state => 1,
  totalHealth: state => 50
})

export default getters