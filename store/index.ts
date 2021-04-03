import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { CharacterState } from "~/store/character"

export const state = () => ({
  assets: {
    tiles: new Image(),
    icons: new Image()
  },
  loadedAssets: 0
})

export type RootState = ReturnType<typeof state>

export interface CombinedStates extends RootState {
  character: CharacterState
}

export const getters: GetterTree<RootState, RootState> = {
  totalAssets: state => { return Object.keys(state.assets).length },
  isTilesetLoaded: (state, getters) => { return state.loadedAssets === getters.totalAssets }
}

export const mutations: MutationTree<RootState> = {
  LOAD_ASSETS(state) {
    state.assets.tiles.src = require('~/assets/tileset/tiles-custom.png')
    state.assets.icons.src = require('~/assets/tileset/icons.png')
  },
  SET_ASSET_LOADED_STATE(state) { state.loadedAssets++ }
}

export const actions: ActionTree<RootState, RootState> = {
  initAssetsLoading({ state, commit }) {
    state.assets.tiles.onload = () => {
      commit('SET_ASSET_LOADED_STATE')
    }
    state.assets.icons.onload = () => {
      commit('SET_ASSET_LOADED_STATE')
    }
    commit('LOAD_ASSETS')
  },
  resetStore({ commit }) {
    commit('character/RESET_STATE')
  }
}
