<template lang="pug">
  v-group
    util-text(:config="titleConfig")
    util-text(:config="descriptionConfig")

    shop-field(:type="FieldType.DEFAULT" :position="1")
    shop-field(:type="FieldType.SELECTED" :position="2")
    shop-field(:type="FieldType.DEFAULT" :position="3")
    shop-field(:type="FieldType.EQUIPPED" :position="4")

    v-image(:config="acceptButtonConfig")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { FieldType } from "~/components/Shop/Field.vue"
import { useAcceptButton } from "~/components/Shop/useAcceptButton"
import { useTitle } from "~/components/Shop/useTitle"

export default defineComponent({
  setup() {
    const acceptButtonConfig = useAcceptButton()
    const { titleConfig, descriptionConfig } = useTitle( 'Level Up!', 'Choose 2 skills to improve', '#26ff00')

    return {
      FieldType,
      acceptButtonConfig,
      titleConfig,
      descriptionConfig
    }
  },
})
</script>

<style lang="sass" scoped>

</style>