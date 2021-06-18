import { actionTree } from "typed-vuex"
import { useStoreAccessor } from "~/store"
import { getRandomTile, TileState } from "~/assets/entities/tiles"
import { findTile, getters, mutations, state } from "./"
import { sleep } from "~/assets/utils"
import { ANIMATION } from "~/assets/consts"
import { StageType } from "~/store/instance"

export const actions = actionTree({ state, getters, mutations }, {
  populate({ state }) {
    if (state.tiles.length > 0) throw new Error('Cannot populate a non-empty dungeon')

    const accessor = useStoreAccessor(this)
    const power = accessor.instance.enemyPower
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        const tile = getRandomTile({
          weights: { skull: 0 },
          position: { x, y },
          power,
        })

        accessor.dungeon.ADD_TILE(tile)
      }
    }
  },
  async collect({ state, commit }) {
    const accessor = useStoreAccessor(this)
    const power = accessor.instance.enemyPower

    // set selected tiles for collection
    state.selected.forEach(id => { findTile(state, id).setState(TileState.COLLECTING) })

    /** this is a hacky way of solving generating happening before collection finishes */
    await sleep(0)

    // move hovering tiles down
    for (let x = 5; x >= 0; x--) {
      for (let y = 5; y >= 0; y--) {
        // if tile is empty - find next top tile and move to this position
        if (!state.tiles.find(tile => tile.isDestinationMatch({ x, y }))) {
          for (let row = y - 1; row >= 0; row--) {
            let nextTopTile = state.tiles.find(tile => tile.isDestinationMatch({ x, y: row }))
            if (nextTopTile) {
              nextTopTile?.setDestination({ x, y })
              nextTopTile?.setState(TileState.MOVING)
              break
            }
          }
        }
      }
    }

    // clear selection
    await accessor.dungeon.CLEAR_SELECTION()

    // generate new tiles
    for (let x = 0; x < 6; x++) {
      const newTilesRequired = 6 - state.tiles.filter(tile => tile.position.x === x).length
      for (let y = -1; y >= newTilesRequired * (-1); y--) {
        commit('ADD_TILE', getRandomTile({
          position: { x, y },
          destination: { x, y: newTilesRequired + y },
          state: TileState.MOVING,
          power,
        }))
      }
    }
  }
})

export default actions