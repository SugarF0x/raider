import { useAccessor } from "~/assets/hooks"
import { computed, Ref } from "@nuxtjs/composition-api"
import { Skull, Tile, TileState, TileType } from "~/assets/entities/tiles"
import { EffectType } from "~/assets/entities/effects"

export function useCollectionLogic(tile: Ref<Tile>) {
  const accessor = useAccessor()
  const { dungeon, character, instance } = accessor

  const totalAttack = computed(() => character.totalAttack)

  return () => {
    switch(tile.value.type) {
      case TileType.COIN: return (() => {
        const newGoldValue = character.gold + 1

        if (newGoldValue >= 100) character.SET_GOLD(newGoldValue - 100)
        else character.SET_GOLD(newGoldValue)

        instance.INC_SCORE(1)
        dungeon.REMOVE_TILE(tile.value.id)
      })()
      case TileType.SHIELD: return (() => {
        const newArmorValue = character.armor + 1
        const excessArmorValue = newArmorValue - character.totalArmor

        if (newArmorValue <= character.totalArmor) {
          character.SET_ARMOR(newArmorValue)
        } else {
          character.SET_ARMOR(character.totalArmor)

          const newUpgradeValue = character.upgrade + excessArmorValue
          if (newUpgradeValue >= 100) character.SET_UPGRADE(newUpgradeValue - 100)
          else character.SET_UPGRADE(newUpgradeValue)
        }

        instance.INC_SCORE(1)
        dungeon.REMOVE_TILE(tile.value.id)
      })()
      case TileType.POTION: return (() => {
        const newHealthValue = character.health + 1

        if (newHealthValue >= character.totalHealth) character.SET_HEALTH(character.totalHealth)
        else character.SET_HEALTH(newHealthValue)

        instance.INC_SCORE(1)
        dungeon.REMOVE_TILE(tile.value.id)
      })()
      case TileType.SKULL: return (() => {
        const skull = tile.value as Skull
        if (skull.effects.find(effect => effect.type === EffectType.VULNERABLE)) {
          const newExperienceValue = character.experience + 1

          if (newExperienceValue >= 100) character.SET_EXPERIENCE(newExperienceValue - 100)
          else character.SET_EXPERIENCE(newExperienceValue)

          instance.INC_SCORE(1)
          dungeon.REMOVE_TILE(tile.value.id)
        } else {
          dungeon.MUTATE_TILE(() => {
            skull.applyDamage(totalAttack.value)
            skull.setState(TileState.IDLE)
          })
        }
      })()
      default: { dungeon.REMOVE_TILE(tile.value.id) }
    }
  }
}