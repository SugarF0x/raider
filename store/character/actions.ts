import { actionTree } from "typed-vuex"
import { getters, mutations, state } from "./"
import { useStoreAccessor } from "~/store"
import { BASE_ARMOR_BREAK_CHANCE } from "~/assets/consts/balance"
import { StageType } from "~/store/instance"

export const actions = actionTree({ state, getters, mutations }, {
  applyDamage({ state }, value: number) {
    const { character, instance } = useStoreAccessor(this)

    let overkill = value - character.armor
    if (overkill < 0) overkill = 0

    let armorToBreak = 0
    for (let i = 0; i < value - overkill; i++) {
      if (Math.random() > BASE_ARMOR_BREAK_CHANCE) armorToBreak++
    }
    character.SET_ARMOR(character.armor - armorToBreak)

    if (overkill > 0) character.SET_HEALTH(character.health - overkill)
    if (character.health <= 0) {
      character.SET_HEALTH(0)
      instance.SET_STAGE(StageType.GAME_OVER)
    }
  }
})

export default actions