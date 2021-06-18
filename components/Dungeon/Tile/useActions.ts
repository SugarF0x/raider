import Konva from "konva"
import { getCanvasCoords } from "~/assets/utils"
import { computed, ComputedRef, onMounted, Ref, watchEffect } from "@nuxtjs/composition-api"
import { Tile, TileState } from "~/assets/entities/tiles"
import { useAccessor } from "~/assets/hooks"
import { ANIMATION } from "~/assets/consts"

export function useActions(tile: ComputedRef<Tile>, tileElement: Ref<null>) {
  const { instance } = useAccessor()

  const tileNode = computed(() => (tileElement as any).value.getNode() as Konva.Node | undefined)
  const isPaused = computed(() => instance.isPaused)

  onMounted(() => {
    const state = computed(() => tile.value.state)

    const tween = computed(() => {
      if (!tileNode.value) return undefined

      const anim = new Konva.Tween({
        node: tileNode.value,
        duration: ANIMATION.TILE_SHIFT_TIME,
        easing: Konva.Easings.EaseInOut,
        onFinish: async () => {
          await tile.value.setPosition(tile.value.destination)
          await tile.value.setState(TileState.IDLE)
          anim.reset()
        },

        y: getCanvasCoords(tile.value.destination).y - getCanvasCoords(tile.value.position).y
      });

      return anim
    })

    /** State change watcher */
    watchEffect(() => {
      switch(state.value) {
        case TileState.COLLECTING: {
          tile.value.collect()
          break
        }
        case TileState.MOVING: {
          if (tile.value.destination.y === tile.value.position.y) throw new Error(`Tile ${tile.value.id} destination matches position`)
          if (!tween.value) throw new Error(`Tile ${tile.value.id} node is not defined`)
          tween.value.play()
          break
        }
      }
    })

    /** Pause watcher */
    watchEffect(() => {
      if (state.value === TileState.MOVING && tween.value) {
        if (isPaused.value) tween.value.pause()
        else tween.value.play()
      }
    })
  })
}