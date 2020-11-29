import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { TFamily } from "~/assets/Tiles"

import * as run from './run'
import * as dungeon from './dungeon'
import * as arrow from './arrow'

export const state = () => ({
  tiles: new Image(),
  icons: new Image(),
  loadedAssets: 0,
  isMouseDown: false,
  TEMP_GAMEOVER: false
})

export type RootState = ReturnType<typeof state>
export interface CombinedStates extends RootState {
  run: run.RunState
  dungeon: dungeon.DungeonState
  arrow: arrow.ArrowState
}

export const getters: GetterTree<RootState, RootState> = {
  isTilesetLoaded: state => {
    return state.loadedAssets === 2
  },
  selectedFamily(state, getters, root): TFamily | 'none' {
    let rootState = root as CombinedStates
    if (rootState.arrow.keys.length) {
      switch (rootState.dungeon.tiles[rootState.arrow.keys[0]].family) {
        case "coin":
        case "potion":
        case "shield":
          return rootState.dungeon.tiles[rootState.arrow.keys[0]].family
        case "skull":
        case "sword":
          return "sword"
      }
    }
    return 'none'
  },
  currentDamage(state, getters, root): number {
    let rootState = root as CombinedStates
    if (getters.selectedFamily === 'sword') {
      return rootState.arrow.keys.filter(entry => rootState.dungeon.tiles[entry].family === 'sword').length * rootState.run.attack + rootState.run.attack;
    } else return 0
  }
}

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<RootState> = {
  LOAD_ASSETS(state) {
    state.tiles.src = require('~/assets/tileset/tiles-custom.png')
    state.icons.src = require('~/assets/tileset/icons.png')
  },
  SET_ASSET_LOADED_STATE(state) {
    state.loadedAssets++
  },
  MOUSE_DOWN(state) {
    state.isMouseDown = true
  },
  MOUSE_UP(state) {
    state.isMouseDown = false
  },
  TEMP_GAMEOVER_TRIGGER(state) {
    state.TEMP_GAMEOVER = !state.TEMP_GAMEOVER
  }
}

export const actions: ActionTree<RootState, RootState> = {
  initAssetsLoading({ state, commit }) {
    state.tiles.onload = () => {
      commit('SET_ASSET_LOADED_STATE')
    }
    state.icons.onload = () => {
      commit('SET_ASSET_LOADED_STATE')
    }
    commit('LOAD_ASSETS')
  },
  resetStore({ commit }) {
    commit('run/RESET_STATE')
    commit('dungeon/RESET_STATE')
    commit('arrow/RESET_STATE')
  }
}
