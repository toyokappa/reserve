<template lang="pug">
.calendar
  BlockSwitchWeek.mb-line(:startDate="startDateToS" :endDate="endDateToS")
  .calendar-header.mb-line
    .column-title.black 開始時間
    BlockCalendarDate.ms-line(v-for="d in dateList" :key="d.date" :date="d.date" :day="d.day")
  .calendar-body.mb-line(v-for="time in timeList" :key="time.hour")
    .column-title {{ time.hour }}~
    BlockCalendarState.ms-line(v-for="(state, index) in time.stateList" :key="index" :state="state")

</template>

<script setup>
import { eachDayOfInterval, format } from 'date-fns'
import { ja } from 'date-fns/locale'
import BlockSwitchWeek from '~/components/presentational/molescules/block/SwitchWeek.vue'
import BlockCalendarDate from '~/components/presentational/atoms/block/CalendarDate.vue'
import BlockCalendarState from '~/components/presentational/atoms/block/CalendarState.vue'

import sampleData from '~/data/sample'
const { calendarReserve } = sampleData
const { start, end, timeList } = calendarReserve

const startDate = new Date(start)
const endDate = new Date(end)
const startDateToS = format(startDate, 'M/d')
const endDateToS = format(endDate, 'M/d')
const dateList = eachDayOfInterval({ 
  start: startDate,
  end: endDate,
}).map(day => ({
  date: format(day, 'dd'),
  day: format(day, 'EEEEE', { locale: ja }),
}))
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