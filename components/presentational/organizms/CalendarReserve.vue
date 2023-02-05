<template lang="pug">
.calendar
  BlockSwitchWeek.mb-line
  .calendar-header.mb-line
    .column-title.black 開始時間
    BlockCalendarDate.ms-line(date="05" day="日")
    BlockCalendarDate.ms-line(date="06" day="月")
    BlockCalendarDate.ms-line(date="07" day="火")
    BlockCalendarDate.ms-line(date="08" day="水")
    BlockCalendarDate.ms-line(date="09" day="木")
    BlockCalendarDate.ms-line(date="10" day="金")
    BlockCalendarDate.ms-line(date="11" day="土")
  .calendar-body.mb-line
    .column-title 09:00~
    BlockCalendarState.ms-line(state="ok")
    BlockCalendarState.ms-line(state="ng")
    BlockCalendarState.ms-line(state="ng")
    BlockCalendarState.ms-line(state="ng")
    BlockCalendarState.ms-line(state="ng")
    BlockCalendarState.ms-line(state="ng")
    BlockCalendarState.ms-line(state="ng")
  .calendar-body.mb-line
    .column-title 10:00~
    BlockCalendarState.ms-line(state="ok")
    BlockCalendarState.ms-line(state="ng")
    BlockCalendarState.ms-line(state="ng")
    BlockCalendarState.ms-line(state="ng")
    BlockCalendarState.ms-line(state="ok")
    BlockCalendarState.ms-line(state="ok")
    BlockCalendarState.ms-line(state="ok")
  .calendar-body.mb-line
    .column-title 11:00~
    BlockCalendarState.ms-line(state="ok")
    BlockCalendarState.ms-line(state="ok")
    BlockCalendarState.ms-line(state="ok")
    BlockCalendarState.ms-line(state="ok")
    BlockCalendarState.ms-line(state="ok")
    BlockCalendarState.ms-line(state="ok")
    BlockCalendarState.ms-line(state="ok")

</template>

<script setup>
import BlockSwitchWeek from '~/components/presentational/molescules/block/SwitchWeek.vue'
import BlockCalendarDate from '~/components/presentational/atoms/block/CalendarDate.vue';
import BlockCalendarState from '~/components/presentational/atoms/block/CalendarState.vue';
</script>

<style lang="sass" scoped>
.calendar
  .calendar-header, .calendar-body
    width: 100%
    display: flex
    .column-title
      font-size: 14px
      height: 40px
      background-color: $white
      display: flex
      flex-grow: 1
      align-items: center
      justify-content: center
      &.black
        color: $white
        background-color: $dark
</style>