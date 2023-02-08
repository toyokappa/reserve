<template lang="pug">
.purchase-history-block
  .header.mb-5
    .product-name {{ productName }}
    .purchase-date {{ purchaseDate }}
  .payment-method.mb-5 {{ paymentMethod }}
  .price
    span.value {{ price.toLocaleString() }}円
    span.unit (税込)
</template>

<script setup>
const props = defineProps({
  productName: String,
  purchaseDate: String,
  paymentMethod: String,
  price: Number
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