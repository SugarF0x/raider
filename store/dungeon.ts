import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { Skull, TFamily, Tile } from "~/assets/Tiles"
import Konva from "konva"

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
              nextTopTile.setKey(currentKey)
              break
            }
          }
        }
      }
    }
  },
  TWEEN_TILES(state, payload: Konva.Tween[]) {
    payload.forEach(entry => {
      entry.play()
    })
  },
  UPDATE_QUEUE(state, tileID: number) {
    state.tiles.find(entry => entry.id === tileID)?.updateQueue()
  },
  UPDATE_KEY(state, tileID: number) {
    state.tiles.find(entry => entry.id === tileID)?.updateKey()
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
  SET_OPACITY(state, payload: { item: Array<Tile | Skull> | Tile | Skull, value: number }) {
    if (!Array.isArray(payload.item)) {
      payload.item.konva.opacity = payload.value
    } else {
      payload.item.forEach(entry => {
        entry.konva.opacity = payload.value
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
  populate({ commit, rootState, rootGetters }) {
    let tiles = [] as Tile[]
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        let key = `X${ x }Y${ y }`
        tiles.push(getRandomTile(rootState.tiles, 0, key, rootGetters['run/enemyPower'], spawnWeight.initial))
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
      let queue = 1
      for (let y = 5; y >= 0; y--) {
        let currentKey = `X${ x }Y${ y }`
        if (!state.tiles.find(entry => entry.key === currentKey)) {
          newTiles.push(getRandomTile(rootState.tiles, queue, currentKey, rootGetters['run/enemyPower']))
          queue++
        }
      }
    }
    commit('SET_TILES', newTiles)
  },

  tweenTiles({ commit },{ tiles, nodes }) {
    let tweens = [] as Konva.Tween[]
    tiles.forEach((tile: any) => {
      let node = nodes.find((entry: any) => entry.$attrs.id === tile.id).getNode()
      let animRows = tile.animationRows()
      commit('UPDATE_KEY', tile.id)
      node.setY((-72)*animRows)
      let tween = new Konva.Tween({
        node: node,
        duration: .5,
        easing: Konva.Easings.EaseInOut,
        onFinish() { commit('UPDATE_QUEUE', tile.id) },

        y: 0
      });
      tweens.push(tween);
    })
    commit('TWEEN_TILES', tweens)
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
  },

  runSelectedFamilyCheck({ state, commit, rootGetters }) {
    let toApplyOpacity = [] as Array<Tile | Skull>
    let value = rootGetters.selectedFamily === 'none' ? 1 : .5

    if (value === 1) {
      Object.assign(toApplyOpacity, state.tiles.filter(entry => entry.konva.opacity !== 1))
    } else {
      Object.assign(toApplyOpacity, state.tiles.filter(entry =>
        entry.family !== rootGetters.selectedFamily && !(entry.family === 'skull' && rootGetters.selectedFamily === 'sword')
      ))
    }

    commit('SET_OPACITY', { item: toApplyOpacity, value: value })
  }
}

// utils

type TWeights = {
  [K in TFamily]: number
}
type TSpawnWeights = {
  [property: string]: TWeights
}

const spawnWeight: TSpawnWeights = {
  initial: {
    potion: 1,
    skull: 0,
    coin: 2,
    shield: 2,
    sword: 1
  },
  normal: {
    potion: 4,
    skull: 3,
    coin: 4,
    shield: 4,
    sword: 3
  }
}

function getRandomTile(image: HTMLImageElement, queue: number, key: string, power: number, weights?: TWeights): Tile {
  if (!weights) weights = spawnWeight.normal

  let poll = [] as TFamily[]
  Object.entries(weights).forEach(entry => {
    let family = entry[0] as TFamily
    let weight = entry[1]
    for (let i=0; i<weight; i++) poll.push(family)
  })

  let family = poll[Math.floor(Math.random() * poll.length)];
  if (family === 'skull') return new Skull(image, queue, key, power);
  else return new Tile(image, queue, key, family);
}
