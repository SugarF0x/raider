import { Tile } from "~/assets/entities/tiles"
import { isNear, isSelectableCheck } from "./utils"
import { useAccessor } from "~/assets/hooks"
import { computed, Ref, watch } from "@nuxtjs/composition-api"

export function useSelectionLogic(tile: Ref<Tile>) {
  const accessor = useAccessor()
  const { dungeon } = accessor

  const selected = computed(() => dungeon.selected)
  const selectedType = computed(() => dungeon.selectedType)
  const isMouseDown = computed(() => accessor.isMouseDown)
  const selectedLast = computed(() => dungeon.tiles.find(tile => tile.id === selected.value[selected.value.length-1]))
  const isSelectable = computed(() => isSelectableCheck(selectedType.value, tile.value.type))

  /** This section triggers (de)selection methods on selection change */
  const isTileSelected = computed(() => selected.value.includes(tile.value.id))
  watch(() => isTileSelected.value, () => {
    if (isTileSelected.value) tile.value.onSelection()
    else tile.value.onDeselection()
  })

  // timeout is to ensure MOUSE_DOWN event fires first
  return () => setTimeout(() => {
    // If mouse is not down then return
    if (!isMouseDown.value) return

    // If selectable tile is the first tile - just add it
    if (!selectedLast.value) {
      dungeon.SELECT_TILE(tile.value.id)
      tile.value.onSelection()
      return
    }

    // If selectable tile is also the last selected tile - return
    if (selectedLast.value.id === tile.value.id) return

    // If selectable tile is the second last added - pop the last one
    if (selected.value[selected.value.length-2] === tile.value.id) {
      dungeon.POP_SELECTION()
      tile.value.onSelection()
      return
    }

    // If selectable tile is near and passes selection check - select it
    if (isNear(tile.value.position, selectedLast.value.position) && isSelectable.value) {
      dungeon.SELECT_TILE(tile.value.id)
      tile.value.onSelection()
      return
    }
  })
}