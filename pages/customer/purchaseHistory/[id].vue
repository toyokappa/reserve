<template lang="pug">
BlockText.mb-line 購入履歴
BlockPurchaseHistory.mb-10(
  :productName="purchaseHistory.productName"
  :purchaseDate="purchaseHistory.purchaseDate"
  :paymentMethod="purchaseHistory.paymentMethod"
  :totalAmount="purchaseHistory.totalAmount"
)
BlockText.mb-line 購入明細
TotalAmount.mb-10(
  :name="purchaseHistory.detail.productName"
  :price="purchaseHistory.detail.price"
  :options="purchaseHistory.detail.options"
)
BlockText.mb-line 支払い方法
.payment-method.mb-line クレジットカード支払い
BlockCreditCard(
  :number="purchaseHistory.detail.cardInfo.number"
  :brand="purchaseHistory.detail.cardInfo.brand"
  :expiration="purchaseHistory.detail.cardInfo.expiration"
  :owner="purchaseHistory.detail.cardInfo.owner"
)
.mb-10
.button-area
  DefaultButton.mb-10(@click="router.push('/purchaseHistory')") 戻る
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockPurchaseHistory from '~/components/presentational/molescules/block/PurchaseHistory.vue'
import BlockCreditCard from '~/components/presentational/molescules/block/CreditCard.vue'
import DefaultButton from '~/components/presentational/atoms/button/Default.vue'
import TotalAmount from '~~/components/presentational/organizms/TotalAmount.vue';

import sampleData from '@/data/sample'
const { purchaseHistoryList } = sampleData

const router = useRouter()
const route = useRoute()
const { id } = route.params
const purchaseHistory = purchaseHistoryList.find(history => history.id === id)
</script>

<style lang="sass" scoped>
.payment-method
  font-size: 14px
  color: $hint
  background-color: $white
  padding: 10px 20px
</style>
