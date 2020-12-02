import { GetterTree, MutationTree } from 'vuex'
import { RootState } from './index'
import { TShop } from '~/assets/Tiles.ts'

const defaultState = () => {
  return {
    active: 'none' as TShop, // active shop, // TODO: set default to 'none'
    selected: [], // selected items/skills
    items: [], // 3 items one can pick
  }
}

export const state = () => (defaultState())

export type ShopState = ReturnType<typeof state>

export const getters: GetterTree<ShopState, RootState> = {

}

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<ShopState> = {
  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },
  SELECT_SHOP(state, shop: TShop) {
    state.active = shop
  },
  GENERATE_ITEMS(state) {
    // generate items based on current shop selected
  },
  SELECT_ITEMS(state, item) {
    // select items from current shop item stack
  }
}
