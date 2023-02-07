<template lang="pug">
.switch-week
  .week-switcher.me-line
    .arrow-left(@click="emits('movePrevWeek')" v-if="!isThisWeek")
      img(src="@/assets/images/arrow-left.svg")
    .arrow-left-blank(v-else)
    .display-week {{ startDate }} - {{ endDate }}
    .arrow-right(@click="emits('moveNextWeek')")
      img(src="@/assets/images/arrow-right.svg")
  BlockText.today-switcher(@click="emits('moveToday')")
    img.icon(src="@/assets/images/return-today.svg")
    .text 今日に戻る
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'

const props = defineProps({
  isThisWeek: Boolean,
  startDate: String,
  endDate: String,
})

const emits = defineEmits()
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
    .arrow-left-blank
      width: 8px
      height: 13px
  .today-switcher
    display: flex
    align-items: center
    .icon
      margin-right: 3px
      width: 16px
      height: auto
    .text
      white-space: nowrap
</style>