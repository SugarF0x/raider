<template lang="pug">
  v-group(:config="groupConfig")
    util-text(:config="titleConfig")
    util-text(:config="descriptionConfig")

    shop-field(
      v-for="n in 3"
      :key="`item-field-${n}`"
      :type="entries.selected === n ? FieldType.SELECTED : FieldType.DEFAULT"
      :position="n"
      @click="handleClick(n)"
    )

    shop-content(
      v-for="(entry, index) in entries.items"
      :key="`levelup-content-${index+1}`"
      :item="entry"
      :position="index+1"
    )

    shop-field(
      :position="4"
      :type="FieldType.EQUIPPED"
    )

    shop-content(
      v-if="currentItem"
      :position="4"
      :item="currentItem"
    )

    v-image(:config="acceptButtonConfig" @mousedown="handleConfirmation" @touchstart="handleConfirmation")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import { FieldType } from "~/components/Shop/Field.vue"
import { useAcceptButton } from "~/components/Shop/useAcceptButton"
import { useTitle } from "~/components/Shop/useTitle"
import { getNewItem, Item, ItemType } from "~/assets/entities/items"
import { useAccessor } from "~/assets/hooks"
import { getRandomEnum } from "~/assets/utils"

export default defineComponent({
  emits: ['finish'],
  setup(props, { emit }) {
    const { character } = useAccessor()
    const { titleConfig, descriptionConfig } = useTitle( 'Item Shop!', 'Choose 1 item to buy', '#f3ff00')

    const groupConfig = { x: 450 }

    const entries = reactive({
      selected: 0,
      items: [] as Item[]
    })

    const currentItem = computed(() => {
      const selectedItem = entries.items[entries.selected-1]
      if (!selectedItem) return undefined
      else return character.items.find(item => item.type === selectedItem.type)
    })

    const acceptButtonConfig = computed(() => ({
      ...useAcceptButton().value,
      opacity: entries.selected > 0 ? 1 : .5
    }))

    const handleClick = (index: number) => {
      if (entries.selected === index) entries.selected = 0
      else entries.selected = index
    }

    const handleConfirmation = () => {
      if (entries.selected === 0) return

      character.ADD_ITEM(entries.items[entries.selected-1])
      entries.selected = 0

      emit('finish')
    }

    onMounted(() => {
      while (entries.items.length < 3) {
        const newItemType = getRandomEnum(ItemType)
        if (newItemType === ItemType.DEFAULT) continue
        if (!entries.items.filter(item => item.type === newItemType).length) {
          const currentItem = character.items.find(item => item.type === newItemType)
          if (!currentItem) throw new Error(`No item ${newItemType} found`)
          const newItem = getNewItem(newItemType, { sourceItem: currentItem })
          entries.items.push(newItem)
        }
      }
    })

    return {
      currentItem,
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