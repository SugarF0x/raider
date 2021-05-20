<template lang="pug">
  v-group
    v-image(:config="healthConfig")
    util-text(:config="{ x: 330, y: 700, fill: 'yellow', fontSize: 20, text: `${health}/${totalHealth}` }")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from "@nuxtjs/composition-api"
import { parseMarkdown } from "~/assets/utils"
import { HEALTH } from "~/assets/consts/markdowns/hud"
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const { character } = useAccessor()
    const health = computed(() => character.health)
    const totalHealth = computed(() => character.totalHealth)
    const fill = computed(() => health.value/totalHealth.value)

    const healthConfig = computed(() => getConfig(fill.value))

    let interval: NodeJS.Timeout
    onMounted(() => {
      interval = setInterval(() => {
        let newValue = health.value - 1
        if (newValue <= 0) newValue = totalHealth.value
        character.SET_HEALTH(newValue)
      }, 100)
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    return {
      health,
      totalHealth,
      healthConfig
    }
  }
})

function getConfig(fill: number) {
  const health = parseMarkdown(HEALTH)
  if (!health.crop) throw new Error('Health markdown is to contain tileset option')

  health.y += health.height * (1 - fill)
  health.height *= fill
  health.crop.y += health.crop.height * (1 - fill)
  health.crop.height *= fill

  return health
}
</script>

<style lang="sass" scoped>

</style>