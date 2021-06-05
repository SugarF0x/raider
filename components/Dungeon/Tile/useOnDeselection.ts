import { computed, Ref } from "@nuxtjs/composition-api"
import { Skull, Tile } from "~/assets/entities/tiles"
import { useAccessor } from "~/assets/hooks"

export function useOnDeselection(tile: Ref<Tile>) {
  const accessor = useAccessor()
  const { dungeon, character } = accessor

  const totalAttack = computed(() => character.totalAttack)

  return computed(() => {
    switch (tile.value.type) {
      case "skull": return () => {
        dungeon.MUTATE_TILE(() => {
          // TODO: this most likely has to be reconsidered
          (tile.value as Skull).checkFatality(totalAttack.value)
        })
      }
      default: return () => {
        // TODO: add estimated gains calculation (e.g. transparent overlay of how much gold/exp/upgrade/health will have on collection)
      }
    }
  })
}