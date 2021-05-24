import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { useStoreAccessor } from "~/store/index"
import { Tiles } from "~/assets/entities"
import { TileState, TileType, XY } from "~/assets/types"

const defaultState = () => ({
  tiles: [] as Tiles.Tile[],
  selected: [] as number[]
})

export const state = () => (defaultState())

export const getters = getterTree(state, {
  selectedType: (state): TileType | null => state.tiles.find(tile => tile.id === state.selected[0])?.type || null
})

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  ADD_TILE: (state, tile: Tiles.Tile) => { state.tiles.push(tile) },
  REMOVE_TILE: (state, id: number) => {
    const tile = state.tiles.find(tile => tile.id === id)
    if (!tile) throw new Error(
      `No tile found
      ID passed: ${id}`
    )
    const index = state.tiles.indexOf(tile)
    state.tiles.splice(index, 1)
  },
  SELECT_TILE: (state, id: number) => { if (!state.selected.includes(id)) state.selected.push(id) },
  SET_TILE_DESTINATION: (state, payload: { id: number, destination: XY }) => {
    const tile = state.tiles.find(tile => tile.id === payload.id)
    if (!tile) throw new Error(
      `No tile found
      ID passed: ${payload.id}`
    )
    tile.setDestination(payload.destination)
  },
  SET_TILE_STATE: (state, payload: { id: number, state: TileState }) => {
    const tile = state.tiles.find(tile => tile.id === payload.id)
    if (!tile) throw new Error(
      `No tile found
      ID passed: ${payload.id}`
    )
    tile.setState(payload.state)
  },
  SET_TILE_POSITION: (state, payload: { id: number, position: XY }) => {
    const tile = state.tiles.find(tile => tile.id === payload.id)
    if (!tile) throw new Error(
      `No tile found
      ID passed: ${payload.id}`
    )
    tile.setPosition(payload.position)
  },
  POP_SELECTION: state => { state.selected.pop() },
  CLEAR_SELECTION: state => { state.selected = [] }
})

export const actions = actionTree({ state, getters, mutations }, {
  populate({ state }) {
    if (state.tiles.length > 0) throw new Error('Cannot populate a non-empty dungeon')

    const accessor = useStoreAccessor(this)
    const power = accessor.instance.enemyPower
    const image = accessor.assets.tiles
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        const tile = Tiles.getRandomTile({
          weights: { skull: 0 },
          position: { x, y },
          power,
          image
        })

        accessor.dungeon.ADD_TILE(tile)
      }
    }
  },
  collect({ state, commit }) {
    const accessor = useStoreAccessor(this)
    const power = accessor.instance.enemyPower
    const image = accessor.assets.tiles

    // TODO: add collection handling of sorts

    // delete selected tiles
    state.selected.forEach(id => commit("REMOVE_TILE", id))

    // move hovering tiles down
    for (let x = 5; x >= 0; x--) {
      for (let y = 5; y >= 0; y--) {
        // if tile is empty - find next top tile and move to this position
        if (!state.tiles.find(tile => tile.destination.x === x && tile.destination.y === y)) {
          for (let row = y - 1; row >= 0; row--) {
            let nextTopTile = state.tiles.find(tile => tile.destination.x === x && tile.destination.y === row )
            if (nextTopTile) {
              commit("SET_TILE_DESTINATION", { id: nextTopTile.id, destination: { x, y } })
              commit("SET_TILE_STATE", { id: nextTopTile.id, state: "moving" })
              break
            }
          }
        }
      }
    }

    // generate new tiles
    // for (let x = 0; x < 6; x++) {
    //   const newTilesRequired = state.tiles.filter(tile => tile.position.x === x).length
    //   for (let y = -1; y >= newTilesRequired * (-1); y--) {
    //     commit('ADD_TILE', Tiles.getRandomTile({
    //       position: { x, y },
    //       destination: { x, y: newTilesRequired - y },
    //       state: "moving",
    //       power,
    //       image,
    //     }))
    //   }
    // }
  }
})
