<template lang="pug">
.preview
  img(v-for="(preview, index) in previews" :src="preview" :key="index")
</template>

<script setup>
const props = defineProps({
  images: Array,
})

const previews = computed(() => props.images.map(image => URL.createObjectURL(image)))
</script>

<style lang="sass" scoped>
.preview
  display: flex
  flex-wrap: wrap
  img
    width: calc(50% - 2px)
    height: auto
    margin-bottom: 5px
    &:nth-child(odd)
      margin-right: 4px
</style>