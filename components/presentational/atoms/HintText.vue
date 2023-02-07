<template lang="pug">
.hint(:class="{ centering }")
  img.icon(src="@/assets/images/question-hint.svg")
  .text {{ text }}
</template>

<script setup>
const props = defineProps({
  text: String,
  centering: Boolean,
})
</script>

<style lang="sass" scoped>
.hint
  display: flex
  align-items: center
  margin-bottom: 3px
  &.centering
    justify-content: center
  .icon
    width: 14px
    height: auto
    margin-right: 3px
  .text
    font-size: 12px
    color: $hint
</style>