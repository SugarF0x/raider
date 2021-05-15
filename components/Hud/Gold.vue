<template lang="pug">
  v-group
    v-image(
      v-for="(column, index) in getGoldColumns"
      :key="'gold-'+i"
    )
</template>

<script lang="ts">
import { defineComponent, computed } from "@nuxtjs/composition-api"
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const store = useAccessor()
    const gold = computed(() => store.character.gold)

    const getGoldColumns = () => {

    }

    return {
      getGoldColumns
    }
  }
})
</script>