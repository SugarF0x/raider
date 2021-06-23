<template lang="pug">
  v-group(:config="groupConfig")
    util-text(:config="titleConfig")
    util-text(:config="descriptionConfig")

    shop-field(
      v-for="n in 4"
      :key="`item-field-${n}`"
      :type="entries.selected === n ? FieldType.SELECTED : FieldType.DEFAULT"
      :position="n"
      @click="handleClick(n)"
      upgrade
    )

    shop-content(
      v-for="(entry, index) in entries.buffs"
      :key="`levelup-content-${index+1}`"
      :item="entry.buff"
      :position="index+1"
      :upgradeTarget="entry.target"
    )

    v-image(:config="acceptButtonConfig" @mousedown="handleConfirmation" @touchstart="handleConfirmation")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import { FieldType } from "~/components/Shop/Field.vue"
import { useAcceptButton } from "~/components/Shop/useAcceptButton"
import { useTitle } from "~/components/Shop/useTitle"
import { useAccessor } from "~/assets/hooks"
import { Buff, getNewBuff, getRandomBuffType } from "~/assets/entities/buffs"
import { getRandomItemType, ItemType } from "~/assets/entities/items"

export default defineComponent({
  emits: ['finish'],
  setup(props, { emit }) {
    const { character } = useAccessor()
    const { titleConfig, descriptionConfig } = useTitle( 'Upgrade!', 'Choose 1 upgrade to apply', '#0054ff')

    const groupConfig = { x: 450 }

    const entries = reactive({
      selected: 0,
      buffs: [] as BuffWithTarget[]
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

      const buffEntry = entries.buffs[entries.selected-1]
      const targetItem = character.items.find(item => item.type === buffEntry.target)
      if (!targetItem) throw new Error(`No item of type ${buffEntry.target} found on character`)

      if (buffEntry.buff.level === 0) character.MUTATE_ITEM(() => { targetItem.addBuff(buffEntry.buff) })
      buffEntry.buff.upgrade()

      entries.selected = 0

      emit('finish')
    }

    onMounted(() => {
      while (entries.buffs.length < 4) {
        const target = getRandomItemType()
        if (entries.buffs.find(buff => buff.target === target)) continue

        const buffType = getRandomBuffType(target)
        const currentItem = character.items.find(item => item.type === target)
        if (!currentItem) throw new Error(`No item of type ${currentItem} found equipped on character`)

        const currentBuff = currentItem.buffs.find(buff => buff.type === buffType)
        if (currentBuff) entries.buffs.push({ target, buff: currentBuff })
        else entries.buffs.push({ target, buff: getNewBuff(buffType, { level: 0 }) })
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

interface BuffWithTarget {
  buff: Buff
  target: ItemType
}
</script>

<style lang="sass" scoped>

</style>