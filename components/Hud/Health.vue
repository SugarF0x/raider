<template lang="pug">
  v-group
    v-image(:config="healthConfig")
    util-text(:config="{ x: 330, y: 700, fill: 'yellow', fontSize: 20, text: `${health}/${totalHealth}` }")
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api"
import { HEALTH } from "~/assets/consts/markdowns/hud"
import { useAccessor } from "~/assets/hooks"
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"

export default defineComponent({
  setup() {
    const { character } = useAccessor()
    const health = computed(() => character.health)
    const totalHealth = computed(() => character.totalHealth)
    const fill = computed(() => health.value/totalHealth.value)

    const healthConfig = computed(() => getConfig(fill.value))

    return {
      health,
      totalHealth,
      healthConfig
    }
  }
})

function getConfig(fill: number) {
  const health = useMarkdownEnhancer(HEALTH)
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