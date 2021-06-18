import { computed, Ref } from "@nuxtjs/composition-api"
import { getSkullStateConfig, isSelectableCheck } from "./utils"
import { getCanvasCoords } from "~/assets/utils"
import { Tile } from "~/assets/entities/tiles"
import { useAccessor } from "~/assets/hooks"
import { ImageConfig } from "~/assets/types"
import { EffectType } from "~/assets/entities/effects"

export function useConfig(tile: Ref<Tile>) {
  const accessor = useAccessor()
  const { dungeon } = accessor

  const selectedType = computed(() => dungeon.selectedType)
  const isSelectable = computed(() => isSelectableCheck(selectedType.value, tile.value.type))

  const skullStateConfig = computed(() => getSkullStateConfig(tile.value))
  const groupConfig = computed(() => ({ opacity: isSelectable.value ? 1 : .5 }))
  const imageConfig = computed(() => tile.value.getImageConfig())
  const effectConfigs = computed(() => {
    const effects: Array<ImageConfig & { type: EffectType }> = []
    tile.value.effects.forEach(effect => {
      effects.push({
        ...effect.getImageConfig(getCanvasCoords(tile.value.position)),
        type: effect.type
      })
    })
    return effects
  })

  return {
    effectConfigs,
    groupConfig,
    imageConfig,
    skullStateConfig,
  }
}