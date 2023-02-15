<template lang="pug">
.total-amount
  .block-amount.mb-line
    .amount-row.header
      div 項目
      div 金額(税込)
  .block-amount.mb-line(v-for="item in productItemList" :key="item.id")
    .amount-row
      div {{ item.product_name }}
      div {{ item.amount.toLocaleString() }}円
  .block-amount.mb-line
    .total-row
      .label 合計
      .value {{ totalAmount.toLocaleString() }}円
  .block-amount.mb-line
    .tax-row
      .label (10%対象)
      .value {{ totalAmount.toLocaleString() }}円
  .block-amount.mb-line
    .tax-row
      .label (10%内消費税)
      .value {{ tax.toLocaleString() }}円
</template>

<script setup>
const props = defineProps({
  productItemList: Array,
  totalAmount: Number
})

const tax = Math.floor(props.totalAmount / 1.1 * 0.1)
</script>

<style lang="sass" scoped>
.block-amount
  background-color: $white
  padding: 10px 20px
  .amount-row
    display: flex
    justify-content: space-between
    &.header
      color: $hint
  .total-row
    display: flex
    align-items: baseline
    justify-content: right
    .label
      margin-right: 10px
    .value
      font-size: 20px
      font-weight: bold
  .tax-row
    display: flex
    align-items: baseline
    justify-content: right
    .label
      margin-right: 20px
      color: $hint
</style>