<template lang="pug">
.program-block
  img.arrow(src="@/assets/images/arrow-right.svg")
  .thumbnail
  .menu
    RequireTime(:time="time" size="14")
    .menu-name {{ name }}
</template>

<script setup>
import RequireTime from '~/components/presentational/atoms/RequireTime.vue'

const props = defineProps({
  time: Number | String,
  name: String,
  hint: String,
})
</script>

<style lang="sass" scoped>
.program-block
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
  .menu
    display: flex
    align-items: center
    .menu-name
      font-size: 14px
      margin-left: 10px
</style>