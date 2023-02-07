<template lang="pug">
BlockText.mb-line 購入内容を確認してください。
BlockTicket.mb-10(
  :name="product.name"
  :numberOfTicket="product.numberOfTicket"
  :daysOfExpiration="product.daysOfExpiration"
)
BlockText.mb-line 購入金額を確認してください。
TotalAmount(
  :name="product.name"
  :price="product.price"
  :options="product.defaultOptions"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockTicket from '~/components/presentational/molescules/block/Ticket.vue'
import TotalAmount from '~~/components/presentational/organizms/TotalAmount.vue'

import sampleData from '@/data/sample'
const { productList } = sampleData
const route = useRoute()
const { id } = route.params
const product = productList.find(product => product.id === id )
</script>

<style lang="sass" scoped>
</style>