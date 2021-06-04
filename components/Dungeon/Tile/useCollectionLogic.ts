import { useAccessor } from "~/assets/hooks"
import { Ref } from "@nuxtjs/composition-api"
import { Tile } from "~/assets/entities/tiles"

export function useCollectionLogic(tile: Ref<Tile>) {
  const accessor = useAccessor()
  const { dungeon, character, instance } = accessor

  switch(tile.value.type) {
    case "coin": return () => {
      const newGoldAmount = character.gold + 1

      if (newGoldAmount >= 100) character.SET_GOLD(newGoldAmount - 100)
      else character.SET_GOLD(newGoldAmount)

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
    default: return () => { dungeon.REMOVE_TILE(tile.value.id) }
  }
}