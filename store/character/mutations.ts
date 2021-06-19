import { mutationTree } from "typed-vuex"
import { state, defaultState } from "./"
import { Attribute } from "~/assets/entities/attributes"
import { Item } from "~/assets/entities/items"

export const mutations = mutationTree(state, {
  RESET_STATE: state => { Object.assign(state, defaultState()) },
  SET_GOLD: (state, value: number) => { state.gold = value },
  SET_ARMOR: (state, value: number) => { state.armor = value },
  SET_UPGRADE: (state, value: number) => { state.upgrade = value },
  SET_EXPERIENCE: (state, value: number) => { state.experience = value },
  SET_HEALTH: (state, value: number) => { state.health = value },
  ADD_ATTRIBUTE: (state, attribute: Attribute) => { state.attributes.push(attribute) },
  ADD_ITEM: (state, item: Item) => {
    const currentItem = state.items.find(entry => entry.type === item.type)
    if (currentItem) {
      const index = state.items.indexOf(currentItem)
      if (index) state.items.splice(index,1)
    }
    state.items.push(item)
  },
  MUTATE_ATTRIBUTE: (state, callback: () => void) => { callback() },
  MUTATE_ITEM: (state, callback: () => void) => { callback() }
})

export default mutations