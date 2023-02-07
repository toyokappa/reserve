<template lang="pug">
.product-block
  .name.mb-5 {{ name }}
  .purchaseLimit.mb-5(v-if="hasPurchaseLimit") あと{{ purchaseLimit }}回購入可能
  .description.mb-5(v-if="description") {{ description }}
  .price
    span.value {{ price.toLocaleString() }}円
    span.unit (税込)
</template>

<script setup>
const props = defineProps({
  name: String,
  description: String,
  price: Number,
  hasPurchaseLimit: Boolean,
  purchaseLimit: Number,
})
</script>

<style lang="sass" scoped>
.product-block
  background-color: $white
  padding: $block-padding
  .purchaseLimit
    display: inline-block
    font-size: 12px
    color: $white
    background-color: $primary
    padding: 4px 8px
    border-radius: 5px
  .description
    font-size: 14px
    color: $hint
  .price
    text-align: right
    .value
      font-size: 20px
    .unit
      font-size: 12px
</style>