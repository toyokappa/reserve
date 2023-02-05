<template lang="pug">
.calendar
  BlockSwitchWeek.mb-line
  .calendar-header
    .header-title 開始時間
    CalendarDate.ms-line(date="05" day="日")
    CalendarDate.ms-line(date="06" day="月")
    CalendarDate.ms-line(date="07" day="火")
    CalendarDate.ms-line(date="08" day="水")
    CalendarDate.ms-line(date="09" day="木")
    CalendarDate.ms-line(date="10" day="金")
    CalendarDate.ms-line(date="11" day="土")
</template>

<script setup>
import BlockSwitchWeek from '~/components/presentational/molescules/block/SwitchWeek.vue'
import CalendarDate from '~/components/presentational/atoms/block/CalendarDate.vue';
</script>

<style lang="sass" scoped>
.calendar
  .calendar-header
    width: 100%
    display: flex
    .header-title
      font-size: 14px
      color: $white
      background-color: $dark
      height: 40px
      display: flex
      flex-grow: 1
      align-items: center
      justify-content: center
</style>