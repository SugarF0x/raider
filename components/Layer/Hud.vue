<template lang="pug">
  v-layer
    hud-gold
    hud-enemy-power
    hud-armor
    hud-player-power
    hud-upgrade
    hud-experience
    hud-health
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "Hud"
})
</script>