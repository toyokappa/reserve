<template lang="pug">
BlockText.mb-line 購入内容を確認してください。
BlockTicket(
  :name="ticket.name"
  :numberOfTicket="ticket.numberOfTicket"
  :daysOfExpiration="ticket.daysOfExpiration"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockTicket from '~/components/presentational/molescules/block/Ticket.vue'

import sampleData from '@/data/sample'
const { productList } = sampleData
const route = useRoute()
const { id } = route.params
const ticket = productList.find(product => product.id === id )
</script>

<style lang="sass" scoped>
</style>