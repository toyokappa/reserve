<template lang="pug">
.confirm-block
  .label {{ label }}
  .content {{ content || '-' }}
</template>

<script setup>
const props = defineProps({
  label: String,
  content: String,
})
</script>

<style lang="sass" scoped>
.confirm-block
  background-color: $white
  padding: $block-padding
  .label
    font-size: 12px
</style>