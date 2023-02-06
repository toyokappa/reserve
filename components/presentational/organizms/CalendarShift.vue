<template lang="pug">
.calendar
  BlockSwitchWeek.mb-line(
    :isThisWeek="isThisWeek"
    :startDate="startDate"
    :endDate="endDate"
    @movePrevWeek="movePrevWeek"
    @moveNextWeek="moveNextWeek"
    @moveToday="moveToday"
  )
  .calendar-header.mb-line
    .column-title.black 開始時間
    BlockCalendarDate.ms-line(v-for="d in dateList" :key="d.date" :date="d.date" :day="d.day")
  .calendar-body.mb-line(v-for="time in reactiveShiftTimeList" :key="time.hour")
    .column-title {{ time.hour }}~
    BlockCalendarState.ms-line(
      v-for="(state, index) in time.stateList"
      :key="index"
      :state="state"
      :index="index"
      :hour="time.hour"
      @click="toggleShift"
      @touchstart.prevent="toggleShift"
      @touchmove="toggleShift"
      @touchend="touchDocument = null"
      @touchcancel="touchDocument = null"
    )
</template>

<script setup>
import { add, eachDayOfInterval, format, isToday, setHours, startOfToday, subWeeks } from 'date-fns'
import { ja } from 'date-fns/locale'
import BlockSwitchWeek from '~/components/presentational/molescules/block/SwitchWeek.vue'
import BlockCalendarDate from '~/components/presentational/atoms/block/CalendarDate.vue'
import BlockCalendarState from '~/components/presentational/atoms/block/CalendarState.vue'

import sampleData from '~/data/sample'
const { shiftTimeList } = sampleData
const reactiveShiftTimeList = ref(shiftTimeList)

const start = ref(startOfToday())
const end = computed(() => add(start.value, { days: 6 }))
const startDate = computed(() => format(start.value, 'M/d'))
const endDate = computed(() => format(end.value, 'M/d'))
const dateList = computed(() => eachDayOfInterval({ 
  start: start.value,
  end: end.value
}).map(day => ({
  date: format(day, 'dd'),
  day: format(day, 'EEEEE', { locale: ja }),
})))
const isThisWeek = computed(() => isToday(start.value))

const movePrevWeek = () => {
  start.value = subWeeks(start.value, 1)
}
const moveNextWeek = () => {
  start.value = add(start.value, { days: 7 })
}
const moveToday = () => {
  start.value = new Date()
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
  const { state, hour, index } = touchDocument.dataset

  const toggledState = state === 'work' ? 'rest' : 'work'
  const time = reactiveShiftTimeList.value.find(time => time.hour === hour)
  time.stateList[index] = toggledState
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