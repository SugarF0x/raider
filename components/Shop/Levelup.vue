<template lang="pug">
  v-group
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

export default defineComponent({
  setup() {
    const acceptButtonConfig = useAcceptButton()

    return {
      FieldType,
      acceptButtonConfig
    }
  },
})
</script>

<style lang="sass" scoped>

</style>