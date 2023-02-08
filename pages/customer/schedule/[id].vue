<template lang="pug">
BlockText.mb-line 予約スケジュール
BlockReservation.mb-10(
  :schedule="reservation.schedule"
  :time="reservation.requireTime"
  :name="reservation.programName"
  :trainer="reservation.trainer"
)
BlockText.mb-line 利用チケット
BlockTicket.mb-line(
  v-for="ticket in reservation.ticketList"
  :key="ticket.id"
  :name="ticket.name"
  :expiration="ticket.expiration"
)
.button-area.mt-10
  DangerButton.mb-5(
    @click.prevent="router.push('/schedule')"
  ) 予約をキャンセルする
  HintText(
    text="予約日前日以降のキャンセルは直接ご連絡ください"
    centering
  )
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockReservation from '~/components/presentational/molescules/block/Reservation.vue'
import BlockTicket from '~/components/presentational/molescules/block/Ticket.vue'
import DangerButton from '~/components/presentational/atoms/button/Danger.vue'
import HintText from '~/components/presentational/atoms/HintText.vue'

import sampleData from '@/data/sample'
const { reservationList } = sampleData

const router = useRouter()
const route = useRoute()
const { id } = route.params
const reservation = reservationList.find(reserved => reserved.id === id)
</script>

<style lang="sass" scoped>
</style>