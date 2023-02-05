<template lang="pug">
.trainer-block
  img.arrow(src="@/assets/images/arrow-right.svg")
  .thumbnail
  .profile
    .name {{ name }}
</template>

<script setup>
const props = defineProps({
  name: String,
  comment: String,
})
</script>

<style lang="sass" scoped>
.trainer-block
  background-color: $white
  padding: $block-padding
  display: flex
  align-items: center
  .arrow
    margin-right: 10px
  .thumbnail
    width: 40px
    height: 40px
    border-radius: 50%
    background-color: $base
    margin-right: 10px
  .profile
    .name
      font-size: 14px
</style>