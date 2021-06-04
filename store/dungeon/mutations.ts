import { mutationTree } from "typed-vuex"
import { Tiles } from "~/assets/entities"
import { state, defaultState, findTile } from "./"

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  ADD_TILE: (state, tile: Tiles.Tile) => { state.tiles.push(tile) },
  REMOVE_TILE: (state, id: number) => {
    const tile = findTile(state, id)
    const index = state.tiles.indexOf(tile)
    state.tiles.splice(index, 1)
  },
  SELECT_TILE: (state, id: number) => { if (!state.selected.includes(id)) state.selected.push(id) },
  // mutation wrapper for when tile is to be mutated from within itself
  MUTATE_TILE: (state, mutation: () => void) => {
    mutation()
  },
  POP_SELECTION: state => { state.selected.pop() },
  CLEAR_SELECTION: state => { state.selected = [] },
})

export default mutations
