import { useAccessor } from "~/assets/hooks"
import { Ref } from "@nuxtjs/composition-api"
import { Tile } from "~/assets/entities/tiles"

export function useCollectionLogic(tile: Ref<Tile>) {
  const accessor = useAccessor()
  const { dungeon, character, instance } = accessor

  switch(tile.value.type) {
    case "coin": return () => {
      const newGoldValue = character.gold + 1

      if (newGoldValue >= 100) character.SET_GOLD(newGoldValue - 100)
      else character.SET_GOLD(newGoldValue)

      instance.INC_SCORE(1)
      dungeon.REMOVE_TILE(tile.value.id)
    }
    case "shield": return () => {
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
    }
    case "potion": return () => {
      const newHealthValue = character.health + 1

      if (newHealthValue >= character.totalHealth) character.SET_HEALTH(character.totalHealth)
      else character.SET_HEALTH(newHealthValue)

      instance.INC_SCORE(1)
      dungeon.REMOVE_TILE(tile.value.id)
    }
    default: return () => { dungeon.REMOVE_TILE(tile.value.id) }
  }
}