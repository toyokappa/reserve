<template lang="pug">
.confirm-block
  .label {{ label }}
  .contents
    div(v-for="content in contents" :key="content") {{ content || '-' }}
</template>

<script setup>
const props = defineProps({
  label: String,
  contents: Array,
})
</script>

<style lang="sass" scoped>
.confirm-block
  background-color: $white
  padding: $block-padding
  .label
    font-size: 12px
</style>