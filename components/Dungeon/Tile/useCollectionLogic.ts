import { useAccessor } from "~/assets/hooks"
import { computed, Ref } from "@nuxtjs/composition-api"
import { Tile } from "~/assets/entities/tiles"

export function useCollectionLogic(tile: Ref<Tile>) {
  const accessor = useAccessor()
  const { dungeon, character, instance } = accessor

  const selectedType = computed(() => dungeon.selectedType)

  // switch(selectedType.value) {
  //   case "sword": return () => {}
  //   case "skull": return () => {}
  //   case "shield": return () => {}
  //   case "potion": return () => {}
  //   case "coin": return () => {}
  //   default: return () => {}
  // }

  return () => { dungeon.REMOVE_TILE(tile.value.id) }
}