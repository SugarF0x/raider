<template lang="pug">
  v-layer(:config="layerConfig")
    v-rect(:config="backgroundConfig" ref="backgroundElement")

    v-group(ref="shopFrameElement")
      v-rect(
        v-for="(config, index) in frameConfigs"
        :key="`shop-frame-${index}`"
        :config="config"
      )

      shop-levelup(v-if="shop === ShopType.LEVELUP" @finish="hideShop")
      shop-item(v-else-if="shop === ShopType.ITEM" @finish="hideShop")
      shop-upgrade(v-else-if="shop === ShopType.UPGRADE" @finish="hideShop")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import { KONVA } from "~/assets/consts"
import { StageType, ShopType } from "~/store/instance"
import Konva from "konva"
import { SHOP_ANIMATION_TIME } from "~/assets/consts/animation"
import { sleep } from "~/assets/utils"

export default defineComponent({
  setup() {
    const { instance } = useAccessor()
    const stage = computed(() => instance.stage)
    const shop = computed(() => instance.shop)

    const backgroundElement = ref(null)
    const backgroundNode = computed(() => (backgroundElement as any).value?.getNode() as Konva.Node | undefined)
    const shopFrameElement = ref(null)
    const frameNode = computed(() => (shopFrameElement as any).value?.getNode() as Konva.Node | undefined)

    const backgroundConfig = {
      x: 0,
      y: 0,
      width: KONVA.WIDTH,
      height: KONVA.HEIGHT,
      fill: "black",
      opacity: 0
    }
    const frameConfigs = [
      {
        x: KONVA.WIDTH + 40,
        y: 190,
        width: 450,
        height: 350,
        stroke: KONVA.STROKE_COLOR,
        strokeWidth: 5,
        fill: KONVA.BACKGROUND_COLOR
      },
      {
        x: KONVA.WIDTH + 40,
        y: 540.5,
        width: 100,
        height: 50,
        stroke: KONVA.STROKE_COLOR,
        strokeWidth: 5,
        fill: KONVA.BACKGROUND_COLOR
      },
      {
        x: KONVA.WIDTH + 42.5,
        y: 535,
        width: 95,
        height: 10,
        fill: KONVA.BACKGROUND_COLOR
      }
    ]
    const layerConfig = reactive({ listening: false })

    const backgroundTween = computed(() => {
      if (!backgroundNode.value) return undefined
      return new Konva.Tween({
        node: backgroundNode.value,
        duration: SHOP_ANIMATION_TIME,
        easing: Konva.Easings.EaseInOut,

        opacity: .5
      })
    })
    const frameTween = computed(() => {
      if (!frameNode.value) return undefined
      return new Konva.Tween({
        node: frameNode.value,
        duration: SHOP_ANIMATION_TIME,
        easing: Konva.Easings.EaseInOut,

        offsetX: KONVA.WIDTH
      })
    })

    const hideShop = async () => {
      layerConfig.listening = false
      backgroundTween.value?.reverse()
      frameTween.value?.reverse()
      await sleep(SHOP_ANIMATION_TIME/4*3 * 1000)
      instance.SET_SHOP(ShopType.NONE)
    }

    const showShop = () => {
      layerConfig.listening = true
      backgroundTween.value?.play()
      frameTween.value?.play()
    }

    watch(shop, () => {
      if (shop.value !== ShopType.NONE) showShop()
    })

    return {
      ShopType,
      StageType,
      backgroundConfig,
      backgroundElement,
      frameConfigs,
      hideShop,
      layerConfig,
      shop,
      shopFrameElement,
      stage,
    }
  },
})
</script>

<style lang="sass" scoped>

</style>