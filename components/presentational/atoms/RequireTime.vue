<template lang="pug">
.require-time
  .icon
    img(src="@/assets/images/require-time.svg")
  .text {{ time  }}分
</template>

<script setup>
const props = defineProps({
  time: Number | String
})
</script>

<style lang="sass" scoped>
.require-time
  display: flex
  align-items: center
  .icon
    margin-right: 3px
</style>