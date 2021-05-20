<template lang="pug">
  v-group
    v-image(:config="upgradeConfig")
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

    const upgradeConfig = computed(() => getConfig(fill.value))

    return {
      upgrade,
      upgradeConfig,
      UPGRADE_THRESHOLD
    }
  }
})

function getConfig(fill: number) {
  const upgrade = parseMarkdown(UPGRADE)
  if (!upgrade.crop) throw new Error('Upgrade markdown is to contain tileset option')

  upgrade.width -= upgrade.width * (1 - fill)
  upgrade.crop.width -= upgrade.crop.width * (1 - fill)

  return upgrade
}
</script>

<style lang="sass" scoped>

</style>