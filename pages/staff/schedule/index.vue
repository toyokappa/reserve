<template lang="pug">
BlockText.mb-line 次回のトレーニング
BlockReservation.mb-10(
  v-if="nextSchedule"
  :schedule="`${nextSchedule.scheduled_date} ${nextSchedule.scheduled_time}`"
  :time="nextSchedule.required_time"
  :name="nextSchedule.program_name"
  :trainee="nextSchedule.trainee"
)
BlockText.mb-10(v-else)
  .empty-state 次回のトレーニングはありません。
BlockText.mb-line 予約一覧
BlockSwitchWeek.mb-line(
  :start="start"
  :end="end"
  @switchWeek="switchWeek"
)
template(
  v-if="Object.keys(reservationGroupByDate).length > 0"
  v-for="(reservationList, key) in reservationGroupByDate" :key="key"
)
  BlockText.mb-line(dark) {{ key }}
  BlockReservation.mb-line(
    v-for="reservation in reservationList"
    :key="reservation.id"
    :schedule="reservation.scheduled_time"
    :time="reservation.required_time"
    :name="reservation.program_name"
    :trainee="reservation.trainee"
  )
BlockText.mb-10(v-else)
  .empty-state この週のトレーニングはありません。
</template>

<script setup>
import { add, startOfToday, subWeeks } from 'date-fns'
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockReservation from '~/components/presentational/molescules/block/Reservation.vue'
import BlockSwitchWeek from '~/components/presentational/molescules/block/SwitchWeek.vue'

import * as R from 'ramda'

definePageMeta({
  middleware: 'staff-auth'
})

const { reservation_list } = await $fetch('/staff/schedules', {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useStaffAuth().getAuth()
  },
})
const nextSchedule = reservation_list[0]
const reservationGroupByDate = R.groupBy(({ scheduled_date }) => scheduled_date, reservation_list)

const router = useRouter()

const start = ref(startOfToday())
const end = computed(() => add(start.value, { days: 6 }))

const switchWeek = (startDate) => {
  start.value = startDate
}
</script>

<style lang="sass" scoped>
.empty-state
  font-size: 14px
  color: $hint
</style>