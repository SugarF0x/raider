import { computed, Ref } from "@nuxtjs/composition-api"
import { isSkull, Skull, Tile, TileType } from "~/assets/entities/tiles"
import { useAccessor } from "~/assets/hooks"

export function useOnDeselection(tile: Ref<Tile>) {
  const accessor = useAccessor()
  const { dungeon, character } = accessor

  const totalAttack = computed(() => character.totalAttack)

  return () => {
    switch (tile.value.type) {
      case TileType.SWORD: return (() => {
        dungeon.selectedTiles.forEach(tile => { if (isSkull(tile)) dungeon.MUTATE_TILE(() => { tile.checkFatality(totalAttack.value) }) })
      })()
      case TileType.SKULL: return (() => {
        dungeon.MUTATE_TILE(() => {
          (tile.value as Skull).checkFatality(0)
        })
      })()
      default: return (() => {
        // TODO: add estimated gains calculation (e.g. transparent overlay of how much gold/exp/upgrade/health will have on collection)
      })()
    }
  }
}