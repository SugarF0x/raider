<template lang="pug">
  v-group
    v-image(:config="experienceRow")
    util-text(:config="{ x: 125, y: 712, width: 200, fill: 'lightgreen', text: `${experience}/${EXPERIENCE_THRESHOLD}` }")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from "@nuxtjs/composition-api"
import { parseMarkdown } from "~/assets/utils"
import { EXPERIENCE } from "~/assets/consts/markdowns/hud"
import { EXPERIENCE_THRESHOLD } from "~/assets/consts/balance"
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const { character } = useAccessor()
    const experience = computed(() => character.experience)
    const fill = computed(() => experience.value/EXPERIENCE_THRESHOLD)
    const config = parseMarkdown(EXPERIENCE)

    const experienceRow = computed(() => {
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
      experienceRow,
      EXPERIENCE_THRESHOLD
    }
  }
})


</script>

<style lang="sass" scoped>

</style>