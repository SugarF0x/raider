import { computed, Ref } from "@nuxtjs/composition-api"
import { getSkullStateConfig, isSelectableCheck } from "./utils"
import { getCanvasCoords } from "~/assets/utils"
import { Tile } from "~/assets/entities/tiles"
import { useAccessor } from "~/assets/hooks"

export function useConfig(tile: Ref<Tile>) {
  const accessor = useAccessor()
  const { dungeon } = accessor

  const tileset = computed(() => accessor.assets.tiles)
  const skullStateConfig = computed(() => getSkullStateConfig(tile.value))
  const selectedType = computed(() => dungeon.selectedType)
  const isSelectable = computed(() => isSelectableCheck(selectedType.value, tile.value.type))
  const groupConfig = computed(() => ({ opacity: isSelectable.value ? 1 : .5 }))
  const imageConfig = computed(() => {
    return {
      ...getCanvasCoords(tile.value.position),
      image: tileset.value,
      width: 62,
      height: 62,
      crop: {
        ...tile.value.getCropPosition(),
        width: 52,
        height: 52
      },
      offset: {
        x: 31,
        y: 31
      },
    }
  })

  return {
    skullStateConfig,
    groupConfig,
    imageConfig,
  }
}