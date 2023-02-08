<template lang="pug">
BlockText.mb-line 所持チケット
BlockTicket.mb-line(
  v-for="ticket in ticketSetList"
  :key="ticket.id"
  :name="ticket.name"
  :expiration="ticket.expiration"
  :numberOfTicket="ticket.numberOfTicket"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockTicket from '~/components/presentational/molescules/block/Ticket.vue'

import sampleData from '@/data/sample'
const { ticketSetList } = sampleData
</script>

<style lang="sass" scoped>
</style>