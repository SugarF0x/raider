import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { Skull, TFamily, Tile } from "~/assets/Tiles"

const defaultState = () => {
  return {
    tiles: [] as Array<Tile | Skull>
  }
}

export const state = () => (defaultState())

export type DungeonState = ReturnType<typeof state>

export const getters: GetterTree<DungeonState, RootState> = {

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
  SET_TILES(state, payload: Tile | Tile[]) {
    if (!Array.isArray(payload)) {
      state.tiles = state.tiles.filter(entry => entry.key !== payload.key);
      state.tiles.push(payload)
    } else {
      payload.forEach(eachPayload => {
        state.tiles = state.tiles.filter(entry => entry.key !== eachPayload.key);
        state.tiles.push(eachPayload)
      })
    }
  },
  REMOVE_TILES(state, key: string | string[]) {
    if (!Array.isArray(key)) {
      state.tiles = state.tiles.filter(entry => entry.key !== key);
    } else {
      key.forEach(eachKey => {
        state.tiles = state.tiles.filter(entry => entry.key !== eachKey);
      })
    }
  },
  SHIFT_TILES(state) {
    for (let x=5; x>=0; x--) {
      for (let y=5; y>=0; y--) {
        // if tile is empty - find next top tile and move to this position
        let currentKey = `X${x}Y${y}`
        if (!state.tiles.find(entry => entry.key === currentKey)) {
          for (let row=y-1; row >=0; row--) {
            let nextTopTile = state.tiles.find(entry => entry.key === `X${x}Y${row}`)
            if (nextTopTile) {
              nextTopTile.moveTile(currentKey)
              break
            }
          }
        }
      }
    }
  },
  // TODO: unite SET_VULNERABILITY and APPLY_DAMAGE code into a singe function
  SET_VULNERABILITY(state, payload: ISetVulnerabilityPayload | ISetVulnerabilityPayload[]) {
    if (!Array.isArray(payload)) {
      let skull = state.tiles.find(entry => entry.key === payload.key)
      if (skull instanceof Skull) skull.isFatal(payload.damage)
    } else {
      payload.forEach(eachPayload => {
        let skull = state.tiles.find(entry => entry.key === eachPayload.key)
        if (skull instanceof Skull) skull.isFatal(eachPayload.damage)
      })
    }
  },
  APPLY_DAMAGE(state, payload: ISetVulnerabilityPayload | ISetVulnerabilityPayload[]) {
    if (!Array.isArray(payload)) {
      let skull = state.tiles.find(entry => entry.key === payload.key)
      if (skull instanceof Skull) skull.applyDamage(payload.damage)
    } else {
      payload.forEach(eachPayload => {
        let skull = state.tiles.find(entry => entry.key === eachPayload.key)
        if (skull instanceof Skull) skull.applyDamage(eachPayload.damage)
      })
    }
  },
  SET_READY(state, skull: Skull | Skull[]) {
    if (!Array.isArray(skull)) {
      skull.getReady()
    } else {
      skull.forEach(eachSkull => {
        eachSkull.getReady()
      })
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export const actions: ActionTree<DungeonState, RootState> = {
  populate({ commit, rootState }) {
    let root = rootState as CombinedStates
    let tiles = [] as Tile[]
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        let key = `X${ x }Y${ y }`
        tiles.push(getRandomTile(key, root.run.game.enemy))
      }
    }
    commit('SET_TILES', tiles)
  },

  repopulate({ commit, state, rootState, rootGetters }) {
    let root = rootState as CombinedStates

    // sieving out skulls that will remain alive & applying damage to them
    let toRemove = root.arrow.keys
    let toCheck = [] as ISetVulnerabilityPayload[]
    let toApply = [] as ISetVulnerabilityPayload[]
    root.arrow.keys.forEach(key => {
      if (state.tiles.find(entry => entry.key === key)?.family === 'skull'
      && state.tiles.find(entry => entry.key === key)?.effects.indexOf('vulnerable') === -1) {
        toCheck.push({ key, damage: 0 })
        toApply.push({ key, damage: rootGetters.currentDamage })
        toRemove = toRemove.filter(deleteKey => deleteKey !== key)
      }
    })
    commit('SET_VULNERABILITY', toCheck)
    commit('APPLY_DAMAGE', toApply)

    commit('REMOVE_TILES', toRemove)
    commit('SHIFT_TILES')

    let newTiles = [] as Tile[]
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        let currentKey = `X${ x }Y${ y }`
        if (!state.tiles.find(entry => entry.key === currentKey)) {
          newTiles.push(getRandomTile(currentKey, root.run.game.enemy))
        }
      }
    }
    commit('SET_TILES', newTiles)
  },

  calculateVulnerability({ commit, state, rootState, rootGetters }, damage: number = rootGetters.currentDamage) {
    let root = rootState as CombinedStates
    let toCheck = [] as ISetVulnerabilityPayload[]
    root.arrow.keys.forEach(key => {
      if (state.tiles.find(entry => entry.key === key)?.family === 'skull') {
        toCheck.push({ key, damage })
      }
    })
    commit('SET_VULNERABILITY', toCheck)
  }
}

// utils

const tilesetOrder  = ['potion', 'skull', 'coin', 'shield', 'sword'] as TFamily[]; // TODO: change this to spawn chance

function getRandomTile(key: string, power: number): Tile {
  let family = tilesetOrder[Math.floor(Math.random() * tilesetOrder.length)];
  if (family === 'skull') return new Skull(key, power);
  else return new Tile(key, family);
}
