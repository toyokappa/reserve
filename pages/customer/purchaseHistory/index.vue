<template lang="pug">
BlockText.mb-line 購入履歴
BlockPurchaseHistory.mb-line(
  v-for="purchaseHistory in purchaseHistoryList"
  :key="purchaseHistory.id"
  :productName="purchaseHistory.productName"
  :purchaseDate="purchaseHistory.purchaseDate"
  :paymentMethod="purchaseHistory.paymentMethod"
  :totalAmount="purchaseHistory.totalAmount"
  @click="router.push(`/purchaseHistory/${purchaseHistory.id}`)"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockPurchaseHistory from '~/components/presentational/molescules/block/PurchaseHistory.vue'

import sampleData from '@/data/sample'
const { purchaseHistoryList } = sampleData

const router = useRouter()
</script>

<style lang="sass" scoped>
</style>