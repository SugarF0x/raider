import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { Item, Buff, TShop, TItem } from '~/assets/Tiles.ts'
import { BUFF_EQUIPMENT, TILESET_COORDS, TAttributes, TSpells, TBuffs } from '~/assets/consts'
import { shuffle } from '~/assets/utils'

type TShopBuff = { item: TItem, buff: Buff }
type TLevelupItem = { type: 'item' | 'spell', value: TAttributes | TSpells }

const defaultState = () => {
  return {
    active: 'none' as TShop, // active shop
    selected: [] as Item[] | TShopBuff[] | TLevelupItem[], // selected items/skills
    items: [] as Item[], // items one can pick from
    buffs: [] as TShopBuff[], // buffs to be applied to certain items
    levelup: [] as TLevelupItem[]
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
  }, // TODO: this needs heavy refactoring
  SELECT_ITEM(state, item: Item | TShopBuff | TLevelupItem) {
    let maxItems = state.active === 'levelup' ? 2 : 1

    if (item instanceof Item) {
      let selected = state.selected as Item[]
      if (selected.indexOf(item) !== -1) {
        selected.pop()
      } else {
        selected.push(item)
      }
    } else if (item.hasOwnProperty('buff')) { // upgrade section
      let buffItem = item as TShopBuff
      let selected = state.selected as TShopBuff[]
      if (selected.indexOf(buffItem) !== -1) {
        selected.pop()
      } else {
        selected.push(buffItem)
      }
    } else { // levelup section // TODO: jesus this is one fucking massive crutch right here fuck me
      let levelupItem = item as TLevelupItem
      let selected = state.selected as TLevelupItem[]
      if (selected.indexOf(levelupItem) !== -1) {
        if (selected.indexOf(levelupItem)) selected.pop()
        else selected.shift()
      } else {
        selected.push(levelupItem)
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
  SET_NEW_SPELLS_AND_ATTRIBUTES(state, newAttributes) {
    state.levelup = newAttributes
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
  generateSpellsAndAttributes({ commit }) {
    // TODO: add spells when ones are implemented
    let newAttributes = [] as TAttributes[]
    Object.assign(newAttributes, TILESET_COORDS.attribute.order.filter(entry => entry !== 'damage' && entry !== 'defense'))
    shuffle(newAttributes)
    commit('SET_NEW_SPELLS_AND_ATTRIBUTES', newAttributes)
  },
  applySelected({ state, commit }) {
    commit('run/APPLY_UPGRADES', { selected: state.selected, type: state.active }, { root: true })
    commit('SELECT_SHOP', 'none')
    commit('CLEAR_STORE')
  }
}
