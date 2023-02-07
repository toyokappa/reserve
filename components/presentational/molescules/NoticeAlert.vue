<template lang="pug">
.notice
  .title
    img.icon(src="@/assets/images/question-red.svg")
    .text {{ title }}
  .description(v-html="description")
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
})
</script>

<style lang="sass" scoped>
.notice
  color: $red
  background-color: $white
  padding: $block-padding
  border-color: $red
  border-top: 1px solid
  border-bottom: 1px solid
  .icon
    margin-right: 3px
  .title
    font-weight: bold
    display: flex
    align-items: center
    justify-content: center
    margin-bottom: 5px
  .description
    font-size: 12px
    text-align: center
</style>