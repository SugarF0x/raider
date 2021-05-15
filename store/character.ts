import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RootState } from "~/store/index"

const defaultState = () => ({
  gold: 0,
})

export const state = () => (defaultState())

export type CharacterState = ReturnType<typeof state>

export const getters: GetterTree<CharacterState, RootState> = {}

export const mutations: MutationTree<CharacterState> = {
  RESET_STATE: state => state = defaultState(),
  SET_GOLD: (state, payload: number) => state.gold = payload,
}

export const actions: ActionTree<CharacterState, RootState> = {}
