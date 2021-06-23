import { getterTree } from "typed-vuex"
import { state } from "./"

export const getters = getterTree(state, {
  totalAssets: state => { return Object.keys(state.assets).length },
  isTilesetLoaded: (state, getters) => { return state.loadedAssets >= getters.totalAssets },
})

export default getters