<template lang="pug">
BlockText.mb-line 次回のトレーニング
BlockReservation.mb-10(
  :schedule="`${nextSchedule.scheduleDate} ${nextSchedule.scheduleTime}`"
  :time="nextSchedule.requireTime"
  :name="nextSchedule.programName"
  :trainee="nextSchedule.trainee"
)
BlockText.mb-line 予約一覧
BlockSwitchWeek.mb-line(
  :start="start"
  :end="end"
  @switchWeek="switchWeek"
)
template(v-for="(reservationList, key) in reservationGroupByDate" :key="key")
  BlockText.mb-line(dark) {{ key }}
  BlockReservation.mb-line(
    v-for="reservation in reservationList"
    :key="reservation.id"
    :schedule="reservation.scheduleTime"
    :time="reservation.requireTime"
    :name="reservation.programName"
    :trainee="reservation.trainee"
  )
</template>

<script setup>
import { add, startOfToday, subWeeks } from 'date-fns'
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockReservation from '~/components/presentational/molescules/block/Reservation.vue'
import BlockSwitchWeek from '~/components/presentational/molescules/block/SwitchWeek.vue'

import * as R from 'ramda'

import sampleData from '@/data/sample'
const { reservationListForTrainer } = sampleData
const nextSchedule = reservationListForTrainer[0]
const reservationGroupByDate = R.groupBy(({ scheduleDate }) => scheduleDate, reservationListForTrainer)

definePageMeta({
  middleware: 'staff-auth'
})
const router = useRouter()

const start = ref(startOfToday())
const end = computed(() => add(start.value, { days: 6 }))

const switchWeek = (startDate) => {
  start.value = startDate
}
</script>

<style lang="sass" scoped>
</style>