<template lang="pug">
  v-group
    util-text(:config="titleConfig")
    util-text(:config="descriptionConfig")

    shop-field(
      v-for="n in 4"
      :key="`levelup-field-${n}`"
      :type="entries.selected.includes(n) ? FieldType.SELECTED : FieldType.DEFAULT"
      :position="n"
      :click="() => handleClick(n)"
    )

    shop-content(
      v-for="(entry, index) in entries.attributes"
      :key="`levelup-content-${index+1}`"
      :item="entry"
      :position="index+1"
    )

    v-image(:config="acceptButtonConfig")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import { FieldType } from "~/components/Shop/Field.vue"
import { useAcceptButton } from "~/components/Shop/useAcceptButton"
import { useTitle } from "~/components/Shop/useTitle"
import { Attribute } from "~/assets/entities/attributes/Attribute"
import { getRandomAttribute } from "~/assets/entities/attributes"
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const { character } = useAccessor()
    const { titleConfig, descriptionConfig } = useTitle( 'Level Up!', 'Choose 2 skills to improve', '#26ff00')

    const entries = reactive({
      selected: [] as number[],
      attributes: [] as Attribute[] 
    })

    const acceptButtonConfig = computed(() => ({
      ...useAcceptButton().value,
      opacity: entries.selected.length === 2 ? 1 : .5
    }))

    const handleClick = (index: number) => {
      if (entries.selected.includes(index)) {
        entries.selected.splice(entries.selected.indexOf(index), 1)
        return
      }

      entries.selected.push(index)
      if (entries.selected.length > 2) entries.selected.shift()
    }
    
    onMounted(() => {
      while (entries.attributes.length < 4) {
        const newAttribute = getRandomAttribute()
        if (entries.attributes.find(attribute => attribute.type === newAttribute.type)) continue
        const existingAttribute = character.attributes.find(attribute => attribute.type === newAttribute.type)
        if (existingAttribute) entries.attributes.push(existingAttribute)
        else entries.attributes.push(newAttribute)
      }
    })

    return {
      entries,
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