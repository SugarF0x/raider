<template lang="pug">
  v-group
    util-text(:config="titleConfig")
    util-text(:config="descriptionConfig")

    shop-field(
      v-for="n in 3"
      :type="selected.items.includes(n) ? FieldType.SELECTED : FieldType.DEFAULT"
      :position="n"
      :click="() => handleClick(n)"
    )
    shop-field(:type="FieldType.EQUIPPED" :position="4")

    v-image(:config="acceptButtonConfig")
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@nuxtjs/composition-api'
import { FieldType } from "~/components/Shop/Field.vue"
import { useAcceptButton } from "~/components/Shop/useAcceptButton"
import { useTitle } from "~/components/Shop/useTitle"

export default defineComponent({
  setup() {
    const { titleConfig, descriptionConfig } = useTitle( 'Level Up!', 'Choose 2 skills to improve', '#26ff00')

    const selected = reactive<{ items: number[] }>({ items: [] })

    const acceptButtonConfig = computed(() => ({
      ...useAcceptButton().value,
      opacity: selected.items.length === 2 ? 1 : .5
    }))

    const handleClick = (index: number) => {
      if (selected.items.includes(index)) {
        selected.items.splice(selected.items.indexOf(index), 1)
        return
      }

      selected.items.push(index)
      if (selected.items.length > 2) selected.items.shift()
    }

    return {
      selected,
      FieldType,
      acceptButtonConfig,
      titleConfig,
      descriptionConfig,
      handleClick
    }
  },
})
</script>

<style lang="sass" scoped>

</style>