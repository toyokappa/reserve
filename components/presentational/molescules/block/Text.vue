<template lang="pug">
.text-block(:class="{ dark: dark }")
  slot
</template>

<script setup>
const props = defineProps({
  dark: Boolean
})
</script>

<style lang="sass" scoped>
.text-block
  background-color: $white
  padding: $block-padding
  &.dark
    color: $white
    background-color: $dark
</style>