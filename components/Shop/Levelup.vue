<template lang="pug">
  v-group(:config="groupConfig")
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

    v-image(:config="acceptButtonConfig" @mousedown="handleConfirmation" @touchstart="handleConfirmation")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import { FieldType } from "~/components/Shop/Field.vue"
import { useAcceptButton } from "~/components/Shop/useAcceptButton"
import { useTitle } from "~/components/Shop/useTitle"
import { Attribute } from "~/assets/entities/attributes/Attribute"
import { getRandomAttribute } from "~/assets/entities/attributes"
import { useAccessor } from "~/assets/hooks"
import { ShopType } from "~/store/instance"

export default defineComponent({
  emits: ['finish'],
  setup(props, { emit }) {
    const { character, instance } = useAccessor()
    const { titleConfig, descriptionConfig } = useTitle( 'Level Up!', 'Choose 2 skills to improve', '#26ff00')

    const groupConfig = { x: 450 }

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

    const handleConfirmation = () => {
      if (entries.selected.length < 2) return

      const [one, two] = entries.selected
      const selectedAttributes = [entries.attributes[one-1], entries.attributes[two-1]]
      selectedAttributes.forEach(attribute => {
        attribute.upgrade()
        if (attribute.level <= 1) character.ADD_ATTRIBUTE(attribute)
      })

      character.LEVELUP()
      character.SET_HEALTH(character.totalHealth)
      emit('finish')
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
      groupConfig,
      entries,
      FieldType,
      acceptButtonConfig,
      titleConfig,
      descriptionConfig,
      handleClick,
      handleConfirmation
    }
  },
})
</script>

<style lang="sass" scoped>

</style>