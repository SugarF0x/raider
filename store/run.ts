import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { CombinedStates, RootState } from './index'
import { IFill } from "~/components/types"
import { Item } from "~/assets/Tiles"
import { TShopEntry } from "~/store/shop";

const defaultState = () => {
  return {
    game: {
      score: 0,
      turn: 0
    },
    collectibles: {
      max: 100,
      current: {
        coins: 0,
        upgrade: 0,
        experience: 0
      }
    },
    character: {
      state: {
        health: 50,
        shields: 3,
        level: 1
      },
      spells: [],
      attributes: {
        strength: 0, // base damage & bonus exp chance +1 & +5% per tier respectively
        dexterity: 0, // repair per shield & bonus shield chance +1 & +5% per tier respectively
        vitality: 0, // health per potion & bonus potion chance +1 & +5% per tier respectively
        luck: 0, // bonus coin chance +5% per tier
        health: 0, // bonus health +15 per tier
        charisma: 0, // bonus every chance +5% per tier
        damage: 0, // these two are not yet implemented and will likely never be
        defense: 0
      },
      equipment: {
        helmet: new Item('helmet'),
        armor: new Item('armor'),
        shield: new Item('shield'),
        weapon: new Item('weapon'),
        accessory: new Item('accessory')
      }
    }
  }
}

export const state = () => (defaultState())

export type RunState = ReturnType<typeof state>

// noinspection JSUnusedGlobalSymbols
export const getters: GetterTree<RunState, RootState> = {
  fill(state, getters): IFill {
    return {
      coins: state.collectibles.current.coins / state.collectibles.max,
      upgrade: state.collectibles.current.upgrade / state.collectibles.max,
      experience: state.collectibles.current.experience / state.collectibles.max,
      health: state.character.state.health / getters.totalHealth
    }
  },
  totalArmor: (state, getters) => {
    return [state.character.equipment.helmet, state.character.equipment.armor, state.character.equipment.shield].reduce((a, v) => {
      return a + v.getBaseBuff().power
    }, 0)  + getters.totalAttributes.defense
  },
  totalAttack: (state, getters) => state.character.equipment.weapon.getBaseBuff().power + getters.totalAttributes.damage,
  totalHealth: (state, getters) => 35 + (getters.totalAttributes.vitality+getters.totalAttributes.health)*15,
  totalAttributes: state => ({
    strength: (state.character.equipment.weapon.buffs.find(entry => entry.type === 'strength')?.power || 0) + state.character.attributes.strength,
    dexterity: (state.character.equipment.helmet.buffs.find(entry => entry.type === 'dexterity')?.power || 0) + state.character.attributes.dexterity,
    vitality: (state.character.equipment.accessory.buffs.find(entry => entry.type === 'vitality')?.power || 0) + state.character.attributes.vitality,
    luck: (state.character.equipment.accessory.buffs.find(entry => entry.type === 'luck')?.power || 0) + state.character.attributes.luck,
    health: state.character.attributes.health,
    charisma: state.character.attributes.charisma,
    damage: state.character.attributes.damage,
    defense: state.character.attributes.defense
  }),
  enemyPower: state => Math.floor(state.game.turn/75) + 1
}

interface IModifyPayload {
  value: number
  set: boolean
}

interface IModifyStatePayload extends IModifyPayload {
  target: 'coins' | 'upgrade' | 'experience'
}

interface IModifyGamePayload extends IModifyPayload {
  target: 'turn' | 'score'
}

interface IModifyCharacterPayload extends IModifyPayload {
  target: 'health' | 'shields' | 'level'
}

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<RunState> = {
  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },
  MODIFY_COLLECTIBLES(state, { target, value, set = false }: IModifyStatePayload) {
    if (!set) {
      state.collectibles.current[target] += value
    } else {
      state.collectibles.current[target] = value
    }
  },
  MODIFY_GAME(state, { target, value, set = false }: IModifyGamePayload) {
    if (!set) {
      state.game[target] += value
    } else {
      state.game[target] = value
    }
  },
  MODIFY_CHARACTER(state, { target, value, set = false }: IModifyCharacterPayload) {
    if (!set) {
      state.character.state[target] += value
    } else {
      state.character.state[target] = value
    }
  },
  APPLY_UPGRADES(state, payload: TShopEntry[]) {
    payload.forEach(entry => {
      let item, type
      switch(entry.type) {
        case "item":
          item = entry.item
          type = entry.item.type

          // heal or repair if upgrade qualifies
          if (type === 'accessory') state.character.state.health += (item.getBaseBuff().power - state.character.equipment[type].getBaseBuff().power)*15 // heal by health increase
          else if (type !== 'weapon') state.character.state.shields += item.getBaseBuff().power - state.character.equipment[type].getBaseBuff().power // repair by armor increase

          state.character.equipment[type] = item
          break;
        case "upgrade":
          item = entry.item
          type = entry.item.target

          switch (item.type) {
            case 'defense':
              state.character.state.shields += 1; break
            case 'vitality':
              state.character.state.health += 15; break
          }

          state.character.equipment[type].applyBuff(item)
          break;
        case "attribute":
          item = entry.item

          state.character.attributes[item]++
          if (item === 'health' || item === 'vitality') state.character.state.health += 15
          break;
        case "spell":
          // TODO: cover spells slot
          break;
      }
    })
  },
  NEXT_TURN(state) {
    state.game.turn++
  }
}

// noinspection JSUnusedGlobalSymbols
export const actions: ActionTree<RunState, RootState> = {
  handleCollection({ commit, state, getters, rootState, rootGetters }) { // TODO: this really needs yet another cleanup UUUGGHHHHHH
    let root = rootState as CombinedStates
    let count = 0
    if (rootGetters.selectedFamily === 'sword') {
      root.arrow.keys.forEach(key => {
        if (root.dungeon.tiles.find(entry => entry.key === key)?.family === 'skull'
        && root.dungeon.tiles.find(entry => entry.key === key)?.effects.indexOf('vulnerable') !== -1) {
          count++
        }
      })
    } else {
      count = root.arrow.keys.length
    }

    // update score
    switch(rootGetters.selectedFamily) {
      case 'sword':
        commit('MODIFY_GAME', { target: 'score', value: count*10 })
        break;
      default:
        commit('MODIFY_GAME', { target: 'score', value: count })
    }

    // handle collection
    let endCount = 0 // this one here is for final calculations with added bonuses
    let overkill = 0 // this one is for overflow handling
    switch (rootGetters.selectedFamily) {
      case 'coin':
        for (let i = 0; i<count; i++) Math.random() < (getters.totalAttributes.luck + getters.totalAttributes.charisma)*0.05 ? endCount+=2 : endCount++
        if (state.collectibles.current.coins+endCount >= state.collectibles.max) {
          commit('MODIFY_COLLECTIBLES', { target: 'coins', value: state.collectibles.current.coins+endCount-state.collectibles.max, set: true })
          commit('shop/SELECT_SHOP', 'item', { root: true })
        } else {
          commit('MODIFY_COLLECTIBLES', { target: 'coins', value: endCount })
        }
        break;
      case 'sword':
        for (let i = 0; i<count; i++) Math.random() < (getters.totalAttributes.strength + getters.totalAttributes.charisma)*0.05 ? endCount+=2 : endCount++
        if (state.collectibles.current.experience+endCount >= state.collectibles.max) {
          commit('MODIFY_COLLECTIBLES', { target: 'experience', value: state.collectibles.current.experience+endCount-state.collectibles.max, set: true })
          commit('shop/SELECT_SHOP', 'levelup', { root: true })
          commit('MODIFY_CHARACTER', { target: 'level', value: 1 })
          commit('MODIFY_CHARACTER', { target: 'health', value: getters.totalHealth, set: true })
        } else {
          commit('MODIFY_COLLECTIBLES', { target: 'experience', value: endCount })
        }
        break;
      case 'shield':
        let dexterity = getters.totalAttributes.dexterity
        let repair = dexterity+1

        for (let i = 0; i<count; i++) Math.random() < (dexterity + getters.totalAttributes.charisma)*0.05 ? endCount+=2 : endCount++
        overkill = state.character.state.shields+(endCount*repair) - getters.totalArmor
        overkill = overkill > 0 ? overkill : 0

        if (overkill) {
          commit('MODIFY_CHARACTER', { target: 'shields', value: getters.totalArmor, set: true })

          let leftovers = Math.floor(overkill/repair) // how many shields are left to be applied to upgrades
          if (leftovers) {
            let overUpgrade = state.collectibles.current.upgrade+leftovers - state.collectibles.max
            if (overUpgrade >= 0) {
              commit('MODIFY_COLLECTIBLES', { target: 'upgrade', value: overUpgrade, set: true })
              commit('shop/SELECT_SHOP', 'upgrade', { root: true })
            } else {
              commit('MODIFY_COLLECTIBLES', { target: 'upgrade', value: leftovers })
            }
          }
        } else {
          commit('MODIFY_CHARACTER', { target: 'shields', value: endCount*repair })
        }
        break;
      case 'potion':
        for (let i = 0; i<count; i++) Math.random() < (getters.totalAttributes.vitality + getters.totalAttributes.charisma)*0.05 ? endCount+=2 : endCount++
        if (state.character.state.health+endCount > getters.totalHealth) {
          commit('MODIFY_CHARACTER', { target: 'health', value: getters.totalHealth, set: true })
        } else {
          commit('MODIFY_CHARACTER', { target: 'health', value: endCount })
        }
        break;
    }
  },
}
