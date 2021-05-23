<template lang="pug">
  v-group
    v-image(:config="upgradeConfig")
    util-text(:config="{ x: 125, y: 677.5, width: 200, fill: 'cyan', text: `${upgrade}/${UPGRADE_THRESHOLD}` }")
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api"
import { UPGRADE_THRESHOLD } from "~/assets/consts/balance"
import { useAccessor } from "~/assets/hooks"
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"

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
  const upgrade = useMarkdownEnhancer('158-674.5/134-18.5:397-490/100-10;T')
  if (!upgrade.crop) throw new Error('Upgrade markdown is to contain tileset option')

  upgrade.width -= upgrade.width * (1 - fill)
  upgrade.crop.width -= upgrade.crop.width * (1 - fill)

  return upgrade
}
</script>

<style lang="sass" scoped>

</style>