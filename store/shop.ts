import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { Item, Buff, TShop, TBuffs, TItem } from '~/assets/Tiles.ts'
import { BUFF_EQUIPMENT } from '~/assets/consts'

type TShopBuff = { item: TItem, buff: Buff }

const defaultState = () => {
  return {
    active: 'none' as TShop, // active shop
    selected: [] as Item[] | TShopBuff[], // selected items/skills
    items: [] as Item[], // items one can pick from
    buffs: [] as TShopBuff[] // buffs to be applied to certain items
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
  SELECT_ITEM(state, item: Item | TShopBuff) {
    let maxItems = state.active === 'levelup' ? 2 : 1

    if (item instanceof Item) {
      let selected = state.selected as Item[]
      if (selected.indexOf(item) !== -1) {
        selected = selected.filter((entry: Item) => entry.id !== item.id)
      } else {
        selected.push(item)
      }
    } else { // upgrade section
      let selected = state.selected as TShopBuff[]
      if (selected.indexOf(item) !== -1) {
        selected.pop()
      } else {
        selected.push(item)
      }
    }

    if (state.selected.length > maxItems) {
      state.selected.shift()
    }
  },
  SET_NEW_ITEMS(state, newItems) {
    state.items = newItems
  },
  SET_NEW_BUFFS(state, newBuffs) {
    state.buffs = newBuffs
  },
  CLEAR_STORE(state) {
    state.items = []
    state.buffs = []
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
  generateBuffs({ rootState, commit }) { // TODO: account for stat cap e.g. A.STR can go as high as 90%
    let root = rootState as CombinedStates
    let equipment = [] as Item[]

    Object.entries(root.run.character.equipment).forEach(item => {
      equipment.push(item[1])
    })
    shuffle(equipment)
    equipment.pop()

    let buffs = [] as TShopBuff[]
    equipment.forEach(entry => {
      let availableBuffs = BUFF_EQUIPMENT[entry.type]
      let type: TBuffs = availableBuffs[Math.floor(Math.random()*availableBuffs.length)]
      buffs.push({ item: entry.type, buff: new Buff(type)})
    })

    commit('SET_NEW_BUFFS', buffs)
  },
  applySelected({ state, commit }) {
    commit('run/APPLY_UPGRADES', { selected: state.selected, type: state.active }, { root: true })
    commit('SELECT_SHOP', 'none')
    commit('CLEAR_STORE')
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
