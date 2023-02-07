<template lang="pug">
.ticket-block
  .name.mb-5 {{ name }}
  .expiration チケット有効期限: {{ expiration  }} （{{ daysOfExpiration }}日間有効）
  .number-of-ticket
    span.unit.me-line チケット枚数
    span.value {{ numberOfTicket }}
    span.unit 枚
</template>

<script setup>
import { add, format } from 'date-fns'

const props = defineProps({
  name: String,
  numberOfTicket: Number,
  daysOfExpiration: Number,
})

const expiration = computed(() => {
  return format(add(new Date(), { days: props.daysOfExpiration }), 'Y/M/d')
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