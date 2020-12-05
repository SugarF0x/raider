import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { Item, TShop } from '~/assets/Tiles.ts'

const defaultState = () => {
  return {
    active: 'none' as TShop, // active shop
    selected: [] as Item[], // selected items/skills
    items: [] as Item[], // items one can pick from
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
  SELECT_ITEM(state, item: Item) {
    let maxItems = state.active === 'levelup' ? 2 : 1

    if (state.selected.indexOf(item) !== -1) {
      state.selected = state.selected.filter(entry => entry.id !== item.id)
    } else {
      state.selected.push(item)
      if (state.selected.length > maxItems) {
        state.selected.shift()
      }
    }
  },
  SET_NEW_ITEMS(state, newItems) {
    state.items = newItems
  },
  CLEAR_ITEMS(state) {
    state.items = []
    state.selected = []
  }
}

// noinspection JSUnusedGlobalSymbols
export const actions: ActionTree<ShopState, RootState> = {
  generateItems({ rootState, commit }) {
    let root = rootState as CombinedStates
    let oldItems = root.run.character.equipment
    let newItems = [] as Item[]

    Object.entries(oldItems).forEach(entry => {
      newItems.push(new Item(entry[1]))
    })
    shuffle(newItems)

    commit('SET_NEW_ITEMS', newItems)
  },
  applySelected({ state, commit }) {
    commit('run/APPLY_UPGRADES', state.selected, { root: true })
    commit('SELECT_SHOP', 'none')
    commit('CLEAR_ITEMS', 'none')
  }
}

// TODO: move this to util functions
function shuffle(array: any[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
