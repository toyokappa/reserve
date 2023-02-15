<template lang="pug">
.purchase-history-block
  .header.mb-5
    .product-name {{ productName }}
    .purchase-date {{ purchaseDate }}
  .payment-method.mb-5 {{ paymentMethod }}
  .price
    span.value {{ totalAmount.toLocaleString() }}円
    span.unit (税込)
</template>

<script setup>
import { format } from 'date-fns';

const props = defineProps({
  productName: String,
  purchasedAt: String,
  paymentMethod: String,
  totalAmount: Number,
})

const purchaseDate = computed(() => {
  return format(new Date(props.purchasedAt), 'Y/M/d')
})
</script>

<style lang="sass" scoped>
.purchase-history-block
  background-color: $white
  padding: $block-padding
  .header
    display: flex
    justify-content: space-between
  .payment-method
    font-size: 14px
    text-align: right
    color: $hint
  .price
    text-align: right
    .value
      font-size: 20px
    .unit
      font-size: 14px
</style>