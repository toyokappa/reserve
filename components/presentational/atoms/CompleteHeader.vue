<template lang="pug">
.complete-header
  img.complete-mark(src="@/assets/images/complete.png")
  .complete-title {{ props.title }}
</template>

<script setup>
const props = defineProps({
  title: String
})
</script>

<style lang="sass" scoped>
.complete-header
  .complete-mark
    width: 300px
    height: auto
    margin: 0 auto 30px
  .complete-title
    font-size: 24px
    font-weight: bold
    margin-bottom: 30px
</style>