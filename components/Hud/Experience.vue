<template lang="pug">
  v-group
    v-image(:config="experienceConfig")
    util-text(:config="{ x: 125, y: 712, width: 200, fill: 'lightgreen', text: `${experience}/${EXPERIENCE_THRESHOLD}` }")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from "@nuxtjs/composition-api"
import { parseMarkdown } from "~/assets/utils"
import { EXPERIENCE, HEALTH } from "~/assets/consts/markdowns/hud"
import { EXPERIENCE_THRESHOLD } from "~/assets/consts/balance"
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const { character } = useAccessor()
    const experience = computed(() => character.experience)
    const fill = computed(() => experience.value/EXPERIENCE_THRESHOLD)

    const experienceConfig = computed(() => getConfig(fill.value))

    let interval: NodeJS.Timeout
    onMounted(() => {
      interval = setInterval(() => {
        let newValue = experience.value + 1
        if (newValue >= EXPERIENCE_THRESHOLD) newValue = 0
        character.SET_EXPERIENCE(newValue)
      }, 100)
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    return {
      experience,
      experienceConfig,
      EXPERIENCE_THRESHOLD
    }
  }
})

function getConfig(fill: number) {
  const experience = parseMarkdown(EXPERIENCE)
  if (!experience.crop) throw new Error('Experience markdown is to contain tileset option')

  experience.width -= experience.width * (1 - fill)
  experience.crop.width -= experience.crop.width * (1 - fill)

  return experience
}
</script>

<style lang="sass" scoped>

</style>