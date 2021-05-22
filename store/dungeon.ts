import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { useStoreAccessor } from "~/store/index"
import { Tiles } from "~/assets/entities"

const defaultState = () => ({
  tiles: [] as Tiles.Tile[]
})

export const state = () => (defaultState())

export const getters = getterTree(state, {})

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
  }
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
  }
})
