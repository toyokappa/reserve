<template lang="pug">
BlockText.mb-line 予約スケジュール
BlockReservation.mb-line(
  v-for="reservation in reservation_list"
  :key="reservation.id"
  :schedule="`${reservation.scheduled_date} ${reservation.scheduled_time}`"
  :time="reservation.required_time"
  :name="reservation.program_name"
  :trainer="reservation.trainer"
  @click="useRouter().push(`/schedule/${reservation.id}`)"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockReservation from '~/components/presentational/molescules/block/Reservation.vue'

definePageMeta({
  middleware: 'customer-auth'
})
const { reservation_list } = await $fetch('/customer/schedules', {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useCustomerAuth().getAuth()
  },
})
</script>

<style lang="sass" scoped>
</style>