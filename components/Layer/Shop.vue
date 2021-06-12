<template lang="pug">
  v-layer(:config="layerConfig")
    v-rect(:config="backgroundConfig")

    v-group(ref="shopFrameElement")
      v-rect(
        v-for="(config, index) in frameConfigs"
        :key="`shop-frame-${index}`"
        :config="config"
      )

      shop-levelup(v-if="shop === ShopType.LEVELUP")
      //shop-upgrade(v-else-if="shop === ShopType.UPGRADE")
      //shop-merchant(v-else-if="shop === ShopType.MERCHANT")
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import { KONVA } from "~/assets/consts"
import { StageType, ShopType } from "~/store/instance"

export default defineComponent({
  setup() {
    const { instance } = useAccessor()
    const stage = computed(() => instance.stage)
    const shop = computed(() => instance.shop)

    const layerConfig = {
      listening: true
    }

    const backgroundConfig = {
      x: 0,
      y: 0,
      width: KONVA.WIDTH,
      height: KONVA.HEIGHT,
      fill: "black",
      opacity: .5
    }

    const frameConfigs = [
      {
        x: 0,
        y: 0,
        width: 450,
        height: 850,
        fill: 'black',
        opacity: .5
      },
      {
        x: 40,
        y: 190,
        width: 450,
        height: 350,
        stroke: KONVA.STROKE_COLOR,
        strokeWidth: 5,
        fill: KONVA.BACKGROUND_COLOR
      },
      {
        x: 40,
        y: 540.5,
        width: 100,
        height: 50,
        stroke: KONVA.STROKE_COLOR,
        strokeWidth: 5,
        fill: KONVA.BACKGROUND_COLOR
      },
      {
        x: 42.5,
        y: 535,
        width: 95,
        height: 10,
        fill: KONVA.BACKGROUND_COLOR
      }
    ]

    return {
      layerConfig,
      backgroundConfig,
      frameConfigs,
      stage,
      StageType,
      shop,
      ShopType
    }
  },
})
</script>

<style lang="sass" scoped>

</style>