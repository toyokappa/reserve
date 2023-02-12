<template lang="pug">
.calendar
  BlockSwitchWeek.mb-line(
    :start="start"
    :end="end"
    @switchWeek="switchWeek"
  )
  .calendar-header.mb-line
    .column-title.black 開始時間
    BlockCalendarDate.ms-line(v-for="column in dateColumns" :key="column.date" :date="column.date" :day="column.day")
  .calendar-body.mb-line(v-for="(_d, stateIndex) in schedule[0].state_list" :key="stateIndex")
    .column-title {{ calcHour(stateIndex) }}
    BlockCalendarState.ms-line(
      v-for="(day, dateIndex) in selectedSchedule"
      :key="day.date + dateIndex"
      :state="day.state_list[stateIndex]"
      @click="selectSchedule(day.state_list[stateIndex], day.date, stateIndex)"
    )
</template>

<script setup>
// TODO: CalendarShiftと処理がかぶるのでリファクタしたい
import { add, eachDayOfInterval, format, setHours, startOfToday } from 'date-fns'
import { ja } from 'date-fns/locale'
import BlockSwitchWeek from '~/components/presentational/molescules/block/SwitchWeek.vue'
import BlockCalendarDate from '~/components/presentational/atoms/block/CalendarDate.vue'
import BlockCalendarState from '~/components/presentational/atoms/block/CalendarState.vue'

const props = defineProps({
  programId: Number,
  staffId: Number,
})

const start = ref(startOfToday())
const end = computed(() => add(start.value, { days: 6 }))
const dayInterval = computed(() => eachDayOfInterval({ start: start.value, end: end.value }))
const dateColumns = computed(() => dayInterval.value.map(day => ({ date: format(day, 'dd'), day: format(day, 'EEEEE', { locale: ja }) })))
const currentDateRange = computed(() => dayInterval.value.map(day => format(day, 'Y-MM-dd')))
const readDateRange = computed(() => {
  const interval = eachDayOfInterval({ start: start.value, end: add(start.value, { days: 13 }) })
  return interval.map(day => format(day, 'Y-MM-dd'))
})

const getShift = async () => {
  return await $fetch('/customer/reserve_schedule', {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    headers: {
      Authorization: useStaffAuth().getAuth()
    },
    params: {
      program_id: props.programId,
      staff_id: props.staffId,
      start_date: format(start.value, 'Y-MM-dd'),
    },
  })
}

const { schedule, reserval_hours_first } = await getShift()
const reactiveSchedule = ref(schedule)
const storedDateRange = computed(() => reactiveSchedule.value.map(({ date }) => date))
const selectedSchedule = computed(() => {
  return reactiveSchedule.value.filter(({ date }) => currentDateRange.value.includes(date))
})
const hasNewSchedule = computed(() => {
  return !readDateRange.value.every(date => storedDateRange.value.includes(date))
})

const switchWeek = async (startDate) => {
  start.value = startDate
  if (hasNewSchedule.value) {
    const newShift = await getShift()
    const newSchedule = newShift.schedule.filter(({ date }) => !storedDateRange.value.includes(date))
    reactiveSchedule.value.push(...newSchedule)
  }
}

const calcHour = (hour) => {
  const time = reserval_hours_first + hour
  return ('0' + time).slice(-2) + ':00~'
}

const emits = defineEmits()
const selectSchedule = (state, date, index) => {
  if (state === 'ng') return

  const hour = reserval_hours_first + index
  const datetime = setHours(new Date(date + ' 00:00'), hour)
  emits('selectSchedule', datetime)
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