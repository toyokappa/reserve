<template lang="pug">
.switch-week
  .week-switcher.me-line
    .arrow-left
      img(src="@/assets/images/arrow-left.svg")
    .display-week {{ startDate }} - {{ endDate }}
    .arrow-right
      img(src="@/assets/images/arrow-right.svg")
  BlockText.today-switcher
    .icon
      img(src="@/assets/images/return-today.svg")
    .text 今日に戻る
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'

const props = defineProps({
  startDate: String,
  endDate: String,
})
</script>

<style lang="sass" scoped>
.switch-week
  display: flex
  .week-switcher
    width: 100%
    background-color: $white
    padding: $block-padding
    display: flex
    align-items: center
    justify-content: space-between
  .today-switcher
    display: flex
    align-items: center
    .icon
      margin-right: 3px
      width: 16px
    .text
      white-space: nowrap
</style>