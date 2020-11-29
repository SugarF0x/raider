import Vue from 'vue'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IDungeon } from '@/components/gamespace/types'
import { CombinedStates, RootState } from './index'
import { Skull, TFamily, Tile } from "~/assets/Tiles"

const defaultState = () => {
  return {
    tiles: {} as IDungeon
  }
}

export const state = () => (defaultState())

export type DungeonState = ReturnType<typeof state>

export const getters: GetterTree<DungeonState, RootState> = {

}

interface ISetTilePayload {
  tile: string,
  config: any
}

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<DungeonState> = {
  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },
  SET_TILE(state, { tile, config }: ISetTilePayload) {
    Vue.set(state.tiles, tile, config);
  },
  SET_VULNERABILITY(state, {tile, config}: ISetTilePayload) {
    let skull = state.tiles[tile] as Skull
    skull.isFatal(config)
  },
  SET_READY(state, tile) {
    let skull = state.tiles[tile] as Skull
    skull.getReady()
  },
  APPLY_DAMAGE(state, {tile, config}: ISetTilePayload) {
    let skull = state.tiles[tile] as Skull
    skull.applyDamage(config)
  }
}

export const actions: ActionTree<DungeonState, RootState> = {
  populate({ commit, rootState }) {
    let root = rootState as CombinedStates
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        let tile = `X${ x }Y${ y }`
        commit('SET_TILE', { tile, config: getRandomTile(root.run.attack) })
      }
    }
  },

  // TODO: Fix bug where skull gets removed when there is a deletable tile beneath
  repopulate({ commit, state, rootState, rootGetters }) {
    let root = rootState as CombinedStates

    // getting columns in need of population as well of number of tiles to populate
    let toPopulate = [0, 0, 0, 0, 0, 0];
    root.arrow.keys.forEach((key: string) => {
      if (state.tiles[key].family === 'skull' && state.tiles[key].effects.indexOf('vulnerable') === -1) {
        let skull = state.tiles[key] as Skull;
        commit('SET_VULNERABILITY', { tile: key, config: 0 })
        commit('APPLY_DAMAGE', { tile: key, config: rootGetters.currentDamage })
      } else {
        toPopulate[parseInt(key[1])]++
      }
    })

    // populating newTiles with old uncollected tiles leaving unchanged columns as null
    let newTiles = [null, null, null, null, null, null] as any;
    toPopulate.forEach((col, x) => {
      if (col) {
        for (let y=0; y<6; y++) {
          if (root.arrow.keys.indexOf(`X${ x }Y${ y }`) === -1) {
            if (state.tiles[`X${ x }Y${ y }`].family === 'skull' && state.tiles[`X${ x }Y${ y }`].effects.indexOf('vulnerable') !== -1) continue;
            if (newTiles[x]) {
              newTiles[x].push(state.tiles[`X${ x }Y${ y }`])
            } else {
              newTiles[x] = [state.tiles[`X${ x }Y${ y }`]]
            }
          }
        }
      }
    })

    // populating changed columns with corresponding amount of new tiles and shifting column downwards
    newTiles.forEach((entry: any, x: number) => {
      if (entry !== null) {
        let result = Object.assign([], entry);
        for (let i = 0; i < 6 - entry.length; i++) {
          result.unshift(getRandomTile(root.run.enemy));
        }
        result.forEach((entry: string, y: number) => {
          commit('SET_TILE', { tile: `X${ x }Y${ y }`, config: entry })
        })
      }
    })
  },

  calculateVulnerability({ commit, state, rootState, rootGetters }, damage: number = rootGetters.currentDamage) {
    let root = rootState as CombinedStates
    root.arrow.keys.forEach((key: string) => {
      if (state.tiles[key].family === 'skull') {
        commit('SET_VULNERABILITY', { tile: key, config: damage })
      }
    })
  }
}

// utils

const tilesetOrder  = ['potion', 'skull', 'coin', 'shield', 'sword'] as TFamily[]; // TODO: change this to spawn chance

function getRandomTile(power: number): Tile {
  let family = tilesetOrder[Math.floor(Math.random() * tilesetOrder.length)];
  if (family === 'skull') return new Skull(power);
  else return new Tile(family);
}