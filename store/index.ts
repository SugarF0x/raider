import { getAccessorType } from 'typed-vuex'

export * from './state'
export * from './getters'
export * from './mutations'
export * from './actions'

import {
  state,
  getters,
  mutations,
  actions,
} from './'

import * as character from './character'
import * as instance from './instance'
import * as dungeon from './dungeon'

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
    dungeon
  },
})