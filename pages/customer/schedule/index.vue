<template lang="pug">
BlockText.mb-line 予約スケジュール
BlockReservation.mb-line(
  v-for="reservation in reservationList"
  :key="reservation.id"
  :schedule="reservation.schedule"
  :time="reservation.requireTime"
  :name="reservation.programName"
  :trainer="reservation.trainer"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockReservation from '~/components/presentational/molescules/block/Reservation.vue'

import sampleData from '@/data/sample'
const { reservationList } = sampleData
</script>

<style lang="sass" scoped>
</style>