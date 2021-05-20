<template lang="pug">
  v-group
    v-image(:config="upgradeRow")
    util-text(:config="{ x: 125, y: 677.5, width: 200, fill: 'cyan', text: `${upgrade}/${UPGRADE_THRESHOLD}` }")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from "@nuxtjs/composition-api"
import { parseMarkdown } from "~/assets/utils"
import { UPGRADE } from "~/assets/consts/markdowns/hud"
import { UPGRADE_THRESHOLD } from "~/assets/consts/balance"
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const { character } = useAccessor()
    const upgrade = computed(() => character.upgrade)
    const fill = computed(() => upgrade.value/UPGRADE_THRESHOLD)
    const config = parseMarkdown(UPGRADE)

    const upgradeRow = computed(() => {
      if (!config.crop) throw new Error('Gold column markdown is to contain tileset option')

      return {
        ...config,
        width: config.width - config.width * (1 - fill.value),
        crop: {
          ...config.crop,
          width: config.crop.width - config.crop.width * (1 - fill.value)
        }
      }
    })

    let interval: NodeJS.Timeout
    onMounted(() => {
      interval = setInterval(() => {
        let newValue = upgrade.value + 1
        if (newValue >= 100) newValue = 0
        character.SET_UPGRADE(newValue)
      }, 100)
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    return {
      upgrade,
      upgradeRow,
      UPGRADE_THRESHOLD
    }
  }
})


</script>

<style lang="sass" scoped>

</style>