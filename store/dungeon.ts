import Vue from 'vue'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IDungeon } from '@/components/gamespace/types'
import { CombinedStates, RootState } from './index'
import { Skull, TFamily, Tile } from "~/assets/Tiles"

const defaultState = () => {
  return {
    tiles: {} as IDungeon // TODO: refactor this to be an array and tiles to contain their key as property
  }
}

export const state = () => (defaultState())

export type DungeonState = ReturnType<typeof state>

export const getters: GetterTree<DungeonState, RootState> = {
  // TODO: add getter for converting new dungeon into it's old type with keys outside tiles
}

interface ISetTilePayload {
  key: string,
  tile: Tile
}

interface ISetVulnerabilityPayload {
  key: string,
  damage: number
}

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<DungeonState> = {
  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },
  SET_TILE(state, payload: ISetTilePayload | ISetTilePayload[]) {
    if (!Array.isArray(payload)) {
      Vue.set(state.tiles, payload.key, payload.tile);
    } else {
      payload.forEach(entry => {
        Vue.set(state.tiles, entry.key, entry.tile);
      })
    }
  },
  SET_VULNERABILITY(state, payload: ISetVulnerabilityPayload | ISetVulnerabilityPayload[]) {
    if (!Array.isArray(payload)) {
      let skull = state.tiles[payload.key] as Skull
      skull.isFatal(payload.damage)
    } else {
      payload.forEach(entry => {
        let skull = state.tiles[entry.key] as Skull
        skull.isFatal(entry.damage)
      })
    }
  },
  SET_READY(state, key: string | string[]) {
    if (!Array.isArray(key)) {
      let skull = state.tiles[key] as Skull
      skull.getReady()
    } else {
      key.forEach(entry => {
        let skull = state.tiles[entry] as Skull
        skull.getReady()
      })
    }
  },
  APPLY_DAMAGE(state, payload: ISetVulnerabilityPayload | ISetVulnerabilityPayload[]) {
    if (!Array.isArray(payload)) {
      let skull = state.tiles[payload.key] as Skull
      skull.applyDamage(payload.damage)
    } else {
      payload.forEach(entry => {
        let skull = state.tiles[entry.key] as Skull
        skull.applyDamage(entry.damage)
      })
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export const actions: ActionTree<DungeonState, RootState> = {
  populate({ commit, rootState }) {
    let root = rootState as CombinedStates
    let tiles = [] as ISetTilePayload[]
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        let key = `X${ x }Y${ y }`
        tiles.push({ key, tile: getRandomTile(root.run.game.enemy) })
      }
    }
    commit('SET_TILE', tiles)
  },

  // TODO: Fix bug where skull gets removed when there is a deletable tile beneath
  // TODO: Fix bug where tiles dont get removed when it's a whole column of same family collected
  repopulate({ commit, state, rootState, rootGetters }) {
    let root = rootState as CombinedStates

    // getting columns in need of population as well of number of tiles to populate
    let toPopulate = [0, 0, 0, 0, 0, 0];
    let toCheck = [] as ISetVulnerabilityPayload[]
    let toApply = [] as ISetVulnerabilityPayload[]
    root.arrow.keys.forEach((key: string) => {
      if (state.tiles[key].family === 'skull' && state.tiles[key].effects.indexOf('vulnerable') === -1) {
        toCheck.push({ key, damage: 0 })
        toApply.push({ key, damage: rootGetters.currentDamage })
      } else {
        toPopulate[parseInt(key[1])]++
      }
    })
    commit('SET_VULNERABILITY', toCheck)
    commit('APPLY_DAMAGE', toApply)

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
          result.unshift(getRandomTile(root.run.game.enemy));
        }
        let tiles = [] as ISetTilePayload[]
        result.forEach((tile: Tile, y: number) => {
          tiles.push({ key: `X${ x }Y${ y }`, tile })
        })
        commit('SET_TILE', tiles)
      }
    })
  },

  calculateVulnerability({ commit, state, rootState, rootGetters }, damage: number = rootGetters.currentDamage) {
    let root = rootState as CombinedStates
    let toCheck = [] as ISetVulnerabilityPayload[]
    root.arrow.keys.forEach((key: string) => {
      if (state.tiles[key].family === 'skull') {
        toCheck.push({ key, damage })
      }
    })
    commit('SET_VULNERABILITY', toCheck)
  }
}

// utils

const tilesetOrder  = ['potion', 'skull', 'coin', 'shield', 'sword'] as TFamily[]; // TODO: change this to spawn chance

function getRandomTile(power: number): Tile {
  let family = tilesetOrder[Math.floor(Math.random() * tilesetOrder.length)];
  if (family === 'skull') return new Skull(power);
  else return new Tile(family);
}
