<template lang="pug">
.confirm-block
  .label {{ label }}
  PreviewImages(:images="props.images")
</template>

<script setup>
import PreviewImages from '~/components/presentational/atoms/PreviewImages.vue'

const props = defineProps({
  label: String,
  images: Array,
})
</script>

<style lang="sass" scoped>
.confirm-block
  background-color: $white
  padding: $block-padding
  .label
    font-size: 12px
</style>