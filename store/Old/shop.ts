import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { Item, Buff, TShop } from '~/assets/Old/Tiles'
import { BUFF_EQUIPMENT, TILESET_COORDS, TAttributes, TSpells, TBuffs } from '~/assets/Old/consts'
import { shuffle } from '~/assets/Old/utils/shuffle'

type TShopItem = { type: 'item', item: Item }
type TShopBuff = { type: 'upgrade', item: Buff }
type TShopAttr = { type: 'attribute', item: TAttributes }
type TShopSpell = { type: 'spell', item: TSpells }
export type TShopEntry = TShopItem | TShopBuff | TShopAttr | TShopSpell

const defaultState = () => {
  return {
    active: 'none' as TShop, // active shop
    selected: [] as TShopEntry[], // selected items/skills
    entries: [] as TShopEntry[] // shop items - all of the aforementioned
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
  SELECT_ITEM(state, entry: TShopEntry) {
    if (state.selected.indexOf(entry) !== -1) { // TODO: find a better solution, this is a hacky way of handling it
      if (state.selected.indexOf(entry)) state.selected.pop() // if index is 1 (e.g. the item is last) - pop last item
      else state.selected.shift() // else (the item is first as index is 0) shift the first item
    } else {
      state.selected.push(entry)
    }

    let maxItems = state.active === 'levelup' ? 2 : 1
    if (state.selected.length > maxItems) {
      state.selected.shift()
    }
  },
  SET_NEW_ENTRIES(state, newItems) {
    state.entries = newItems
  },
  CLEAR_STORE(state) {
    state.entries = []
    state.selected = []
  }
}

// noinspection JSUnusedGlobalSymbols
export const actions: ActionTree<ShopState, RootState> = {
  generateItems({ rootState, commit }) {
    let root = rootState as CombinedStates
    let oldItems = root.run.character.equipment
    let newItems = [] as TShopEntry[]

    Object.entries(oldItems).forEach(entry => {
      newItems.push({ type: 'item', item: new Item(entry[1]) })
    })
    shuffle(newItems)

    commit('SET_NEW_ENTRIES', newItems)
  },
  generateBuffs({ rootState, commit }) { // TODO: account for stat cap e.g. A.STR can go as high as 90%
    let root = rootState as CombinedStates
    let equipment = [] as Item[]

    Object.entries(root.run.character.equipment).forEach(item => {
      equipment.push(item[1])
    })
    shuffle(equipment)
    equipment.pop()

    let buffs = [] as TShopEntry[]
    equipment.forEach(entry => {
      let availableBuffs = BUFF_EQUIPMENT[entry.type]
      let type: TBuffs = availableBuffs[Math.floor(Math.random()*availableBuffs.length)]
      buffs.push({ type: 'upgrade', item: new Buff(type, entry.type)})
    })

    commit('SET_NEW_ENTRIES', buffs)
  },
  generateAttributes({ commit }) {
    let newAttributes = [] as TShopEntry[]
    TILESET_COORDS.attribute.order.forEach(entry => {
      newAttributes.push({ type: 'attribute', item: entry })
    })
    shuffle(newAttributes)
    commit('SET_NEW_ENTRIES', newAttributes)
  },
  generateSpells() {
    // TODO: add spells when ones are implemented
  },
  applySelected({ state, commit }) {
    commit('run/APPLY_UPGRADES', state.selected, { root: true })
    commit('SELECT_SHOP', 'none')
    commit('CLEAR_STORE')
  }
}
