<template lang="pug">
  v-group
    util-text(:config="{text: `+${enemyPower}`, x: 130, y: 597, width: 50}")
    util-text(:config="{text: `${armor}/${totalArmor}`, x: 197, y: 597, width: 50, fill: 'lightblue'}")
    util-text(:config="{text: '+'+totalAttack, x: 270, y: 597, width: 50, fill: 'lightgray'}")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const { character, instance } = useAccessor()
    const armor = computed(() => character.armor)
    const totalArmor = computed(() => character.totalArmor)
    const totalAttack = computed(() => character.totalAttack)
    const enemyPower = computed(() => instance.enemyPower)

    let interval: NodeJS.Timeout
    onMounted(() => {
      interval = setInterval(() => {
        let newValue = armor.value + 1
        if (newValue > totalArmor.value) newValue = 0
        character.SET_ARMOR(newValue)
      }, 500)
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    return {
      armor,
      totalArmor,
      enemyPower,
      totalAttack,
    }
  },
})
</script>

<style lang="sass" scoped>

</style>