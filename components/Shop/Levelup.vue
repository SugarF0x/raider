<template lang="pug">
  v-group
    shop-field(:type="FieldType.DEFAULT" :position="1")
    shop-field(:type="FieldType.SELECTED" :position="2")
    shop-field(:type="FieldType.DEFAULT" :position="3")
    shop-field(:type="FieldType.EQUIPPED" :position="4")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { FieldType } from "~/components/Shop/Field.vue"

export default defineComponent({
  setup() {

    return {
      FieldType
    }
  },
})
</script>

<style lang="sass" scoped>

</style>