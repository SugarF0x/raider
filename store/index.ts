import { getAccessorType, getterTree, mutationTree, actionTree } from 'typed-vuex'

// @ts-ignore, used to highlight used functions when they are only used within same module actions
export const useStoreAccessor = (thisProp): typeof accessorType => thisProp.app.$accessor

import * as character from '~/store/character'

const defaultState = () => ({
  assets: {
    tiles: new Image(),
    icons: new Image(),
  },
  loadedAssets: 0,
})

export const state = () => (defaultState())

export const getters = getterTree(state, {
  totalAssets: state => { return Object.keys(state.assets).length },
  isTilesetLoaded: (state, getters) => { return state.loadedAssets === getters.totalAssets },
})

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  LOAD_ASSETS: state => {
    state.assets.tiles.src = require('~/assets/tileset/tiles-custom.png')
    state.assets.icons.src = require('~/assets/tileset/icons.png')
  },
  SET_ASSET_LOADED_STATE: state => { state.loadedAssets++ },
})

export const actions = actionTree({ state, getters, mutations }, {
  async initAssetsLoading({ state }): Promise<void> {
    const accessor = useStoreAccessor(this)
    state.assets.tiles.onload = () => accessor.SET_ASSET_LOADED_STATE()
    state.assets.icons.onload = () => accessor.SET_ASSET_LOADED_STATE()
    accessor.LOAD_ASSETS()
  },
  async resetStore({ commit }): Promise<void> {
    commit('RESET_STATE')
    const accessor = useStoreAccessor(this)
    accessor.character.RESET_STATE()
  },
})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    character,
  },
})