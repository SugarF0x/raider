import { useAccessor } from "~/assets/hooks"
import { computed, ref, watch, watchEffect } from "@nuxtjs/composition-api"
import { StageType } from "~/store/instance"
import { sleep } from "~/assets/utils"
import { ANIMATION } from "~/assets/consts"

export function useStageMachine() {
  const { dungeon, instance } = useAccessor()
  const tilesInMovement = computed(() => dungeon.tilesInMovement)
  const isPaused = computed(() => instance.isPaused)
  const isStageFinished = computed(() => instance.isStageFinished)
  const stage = computed(() => instance.stage)

  const endTurn = () => {
    dungeon.tiles.forEach(tile => tile.executeEffects())
    instance.SET_STAGE(StageType.PLAYER_TURN)
    instance.INC_TURN()
  }

  /** Finish stage when tiles stop movement */
  watchEffect(() => {
    if (stage.value === StageType.COLLECTION && tilesInMovement.value <= 0 && !isStageFinished.value) {
      instance.COMPLETE_STAGE()
    }
  })

  // is here to prevent unwanted reruns while already being run
  const isStageChangeInProgress = ref(false)
  /** Main stage cycle machine */
  watchEffect(async () => {
    if (!isStageFinished.value || isPaused.value) return
    if (isStageChangeInProgress.value) return

    isStageChangeInProgress.value = true

    switch (stage.value) {
      case StageType.PLAYER_TURN: {
        instance.SET_STAGE(StageType.COLLECTION)
        await dungeon.collect()
        break
      }
      case StageType.COLLECTION: {
        await sleep(ANIMATION.TILE_SHIFT_TIME * 1000)
        if (dungeon.tiles.filter(tile => tile.type === 'skull').length > 0) instance.SET_STAGE(StageType.ENEMY_TURN)
        else endTurn()
        break
      }
      case StageType.ENEMY_TURN: {
        endTurn()
        break
      }
    }

    isStageChangeInProgress.value = false
  })
}