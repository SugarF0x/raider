import { actionTree } from "typed-vuex"
import { getters, mutations, state, useStoreAccessor } from "./"

export const actions = actionTree({ state, getters, mutations }, {
  async initAssetsLoading({ state }): Promise<void> {
    const accessor = useStoreAccessor(this)
    state.assets.tiles.onload = () => accessor.SET_ASSET_LOADED_STATE()
    state.assets.icons.onload = () => accessor.SET_ASSET_LOADED_STATE()
    accessor.LOAD_ASSETS()
  },
  async resetStore({ commit }): Promise<void> {
    // commit('RESET_STATE')
    // await accessor.initAssetsLoading()
    const accessor = useStoreAccessor(this)
    accessor.character.RESET_STATE()
    accessor.instance.RESET_STATE()
    accessor.dungeon.RESET_STATE()
    accessor.dungeon.populate()
  },
})

export default actions