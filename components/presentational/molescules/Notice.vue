<template lang="pug">
.notice(:class="type")
  .title
    img.icon(v-if="type === 'alert'" src="@/assets/images/question-red.svg")
    img.icon(v-if="type === 'info'"  src="@/assets/images/question-primary.svg")
    .text {{ title }}
  .description(v-html="description")
</template>

<script setup>
const props = defineProps({
  type: String,
  title: String,
  description: String,
})
</script>

<style lang="sass" scoped>
.notice
  background-color: $white
  padding: $block-padding
  border-top: 1px solid
  border-bottom: 1px solid
  &.alert
    color: $red
    border-color: $red
  &.info
    color: $primary
    border-color: $primary
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