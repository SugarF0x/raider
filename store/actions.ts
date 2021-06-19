import { actionTree } from "typed-vuex"
import { getters, mutations, state, useStoreAccessor } from "./"
import { Accessory, Helmet, Item, Shield, Torso, Weapon } from "~/assets/entities/items"

export const actions = actionTree({ state, getters, mutations }, {
  async initAssetsLoading({ state }): Promise<void> {
    const accessor = useStoreAccessor(this)
    state.assets.tiles.onload = () => accessor.SET_ASSET_LOADED_STATE()
    state.assets.icons.onload = () => accessor.SET_ASSET_LOADED_STATE()
    accessor.LOAD_ASSETS()
  },
  async resetStore(): Promise<void> {
    // accessor.RESET_STATE()
    // await accessor.initAssetsLoading()
    const accessor = useStoreAccessor(this)
    accessor.character.RESET_STATE()
    accessor.instance.RESET_STATE()
    accessor.dungeon.RESET_STATE()

    getNewItemSet().forEach(item => accessor.character.ADD_ITEM(item))

    accessor.dungeon.populate()
  },
})

export default actions

function getNewItemSet(): Item[] {
  return [
    new Helmet(),
    new Torso(),
    new Shield(),
    new Weapon(),
    new Accessory()
  ]
}