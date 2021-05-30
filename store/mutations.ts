import { mutationTree } from "typed-vuex"
import { state, defaultState } from "./"

export const mutations = mutationTree(state, {
  // RESET_STATE: state => { Object.assign(state, defaultState()) },
  LOAD_ASSETS: state => {
    state.assets.tiles.src = require('~/assets/tileset/tiles-custom.png')
    state.assets.icons.src = require('~/assets/tileset/icons.png')
  },
  SET_ASSET_LOADED_STATE: state => { state.loadedAssets++ },
  SET_MOUSE_DOWN: state => { state.isMouseDown = true },
  SET_MOUSE_UP: state => { state.isMouseDown = false },
})

export default mutations