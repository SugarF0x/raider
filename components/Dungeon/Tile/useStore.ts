import { useAccessor } from "~/assets/hooks"
import { computed, Ref } from "@nuxtjs/composition-api"
import { isSelectableCheck } from "./utils"
import { Tile } from "~/assets/entities/tiles"

export function useStore(tile: Ref<Tile>) {
  const accessor = useAccessor()
  const { dungeon } = accessor

  const tileset = computed(() => accessor.assets.tiles)
  const isMouseDown = computed(() => accessor.isMouseDown)
  const selected = computed(() => dungeon.selected)
  const selectedType = computed(() => dungeon.selectedType)
  const selectedLast = computed(() => dungeon.tiles.find(tile => tile.id === selected.value[selected.value.length-1]))
  const isSelectable = computed(() => isSelectableCheck(selectedType.value, tile.value.type))

  return {
    dungeon,
    isMouseDown,
    isSelectable,
    selected,
    selectedLast,
    selectedType,
    tileset,
  }
}