<template lang="pug">
.ticket-block
  .name.mb-5 {{ name }}
  .expiration
    span チケット有効期限: {{ expiration }}
    span(v-if="daysOfExpiration > 0") （{{ daysOfExpiration }}日間有効）
    span(v-else) （有効期限切れ）
  .number-of-ticket.mt-5(v-if="numberOfTicket")
    span.unit.me-line チケット枚数
    span.value {{ numberOfTicket }}
    span.unit 枚
</template>

<script setup>
import { add, differenceInDays, format } from 'date-fns'

const props = defineProps({
  name: String,
  expiration: String,
  numberOfTicket: Number,
  daysOfExpiration: Number,
})

const expiration = computed(() => {
  if(props.expiration) return format(new Date(props.expiration), 'Y/M/d')

  return format(add(new Date(), { days: props.daysOfExpiration }), 'Y/M/d')
})

const daysOfExpiration = computed(() => {
  if(props.daysOfExpiration) return props.daysOfExpiration

  return differenceInDays(new Date(props.expiration), new Date())
})

</script>

<style lang="sass" scoped>
.ticket-block
  background-color: $white
  padding: 17px 20px
  .expiration
    font-size: 14px
    color: $hint
  .number-of-ticket
    text-align: right
    .value
      font-size: 20px
</style>