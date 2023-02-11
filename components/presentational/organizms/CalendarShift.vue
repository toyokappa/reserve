<template lang="pug">
.calendar
  BlockSwitchWeek.mb-line(
    :start="start"
    :end="end"
    @switchWeek="switchWeek"
  )
  .calendar-header.mb-line
    .column-title.black 開始時間
    BlockCalendarDate.ms-line(v-for="d in dateList" :key="d.date" :date="d.date" :day="d.day")
  .calendar-body.mb-line(v-for="(_d, stateIndex) in schedule[0].stateList" :key="stateIndex")
    .column-title {{ calcHour(stateIndex) }}
    BlockCalendarState.ms-line(
      v-for="(date, dateIndex) in reactiveSchedule"
      :key="date + dateIndex"
      :state="date.stateList[stateIndex]"
      :data-state="date.stateList[stateIndex]"
      :data-index="stateIndex"
      :data-date="date.date"
      @click="toggleShift"
      @touchstart.prevent="toggleShift"
      @touchmove="toggleShift"
      @touchend="touchDocument = null"
      @touchcancel="touchDocument = null"
    )
</template>

<script setup>
import { add, eachDayOfInterval, format, isToday, startOfToday, subWeeks } from 'date-fns'
import { ja } from 'date-fns/locale'
import BlockSwitchWeek from '~/components/presentational/molescules/block/SwitchWeek.vue'
import BlockCalendarDate from '~/components/presentational/atoms/block/CalendarDate.vue'
import BlockCalendarState from '~/components/presentational/atoms/block/CalendarState.vue'

import sampleData from '~/data/sample'
const { shift } = sampleData
const { schedule, reservalHoursFirst } = shift
const reactiveSchedule = ref(schedule)

const start = ref(startOfToday())
const end = computed(() => add(start.value, { days: 6 }))
const dateList = computed(() => eachDayOfInterval({ 
  start: start.value,
  end: end.value
}).map(day => ({
  date: format(day, 'dd'),
  day: format(day, 'EEEEE', { locale: ja }),
})))

const switchWeek = (startDate) => {
  start.value = startDate
}
const calcHour = (hour) => {
  const time = reservalHoursFirst + hour
  return ('0' + time).slice(-2) + ':00~'
}

let touchDocument
const toggleShift = (e) => {
  if (e.type.startsWith('touch')) {
    const newTouchDocument = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
    if (!newTouchDocument.classList.contains('calendar-state')) return
    if (newTouchDocument.dataset.state === 'lock') return
    if (touchDocument && touchDocument === newTouchDocument) return

    touchDocument = newTouchDocument
  } else {
    touchDocument = e.target
  }
  const { state, date, index } = touchDocument.dataset

  const toggledState = state === 'work' ? 'rest' : 'work'
  const dateSet = reactiveSchedule.value.find(d => d.date === date)
  dateSet.stateList[index] = toggledState
}
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