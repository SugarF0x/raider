import { getAccessorType } from 'typed-vuex'

export * from './state'
export * from './getters'
export * from './mutations'
export * from './actions'

import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

import * as character from './character'
import * as instance from './instance'
import * as dungeon from './dungeon'
import * as shop from './shop'

export const useStoreAccessor = (thisProp: any): typeof accessorType => {
  if (!thisProp.hasOwnProperty('app')) throw new Error(`Argument is to be 'this' instance containing properties 'app.$accessor'`)

  return thisProp.app.$accessor
}

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    character,
    instance,
    dungeon,
    shop
  },
})