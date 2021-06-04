import { computed, ComputedRef, Ref } from "@nuxtjs/composition-api"
import { getSkullStateConfig } from "./utils"
import { getCanvasCoords } from "~/assets/utils"
import { Tile } from "~/assets/entities/tiles"

export function useConfig(tile: Ref<Tile>, isSelectable: ComputedRef<boolean>, tileset: ComputedRef<HTMLImageElement>) {
  const skullStateConfig = computed(() => getSkullStateConfig(tile.value))
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