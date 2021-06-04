import Konva from "konva"
import { getCanvasCoords } from "~/assets/utils"
import { computed, ComputedRef, onMounted, Ref, watchEffect } from "@nuxtjs/composition-api"
import { Tile } from "~/assets/entities/tiles"
import { useAccessor } from "~/assets/hooks"
import { useCollectionLogic } from "./useCollectionLogic"

export function useActions(tile: ComputedRef<Tile>, tileElement: Ref<null>) {
  const accessor = useAccessor()
  const { dungeon } = accessor

  const tileNode = computed(() => (tileElement as any).value.getNode() as Konva.Node | undefined)

  const shiftTile = () => {
    if (!tileNode.value) throw new Error(`Tile ${tile.value.id} node is not defined`)
    if (tile.value.destination.y === tile.value.position.y) throw new Error(`Tile ${tile.value.id} destination matches position`)

    let tween = new Konva.Tween({
      node: tileNode.value,
      duration: .5,
      easing: Konva.Easings.EaseInOut,
      onFinish: async () => {
        await dungeon.MUTATE_TILE(() => {
          tile.value.setPosition(tile.value.destination)
          tile.value.setState('idle')
        })
        tween.reset()
      },

      y: getCanvasCoords(tile.value.destination).y - getCanvasCoords(tile.value.position).y
    });
    tween.play()

    return true
  }

  const collectTile = useCollectionLogic(tile)

  onMounted(() => {
    const state = computed(() => tile.value.state)
    watchEffect(() => {
      switch(state.value) {
        case "collecting": {
          collectTile()
          break
        }
        case "moving": {
          shiftTile()
          break
        }
      }
    })
  })
}