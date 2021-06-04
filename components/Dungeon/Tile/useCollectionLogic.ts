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
    default: return () => { dungeon.REMOVE_TILE(tile.value.id) }
  }
}