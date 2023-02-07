<template lang="pug">
.block-amount.mb-line
  .amount-row.header
    div 項目
    div 金額(税込)
.block-amount.mb-line
  .amount-row
    div {{ name }}
    div {{ price.toLocaleString() }}円
.block-amount.mb-line(v-for="option in options" :key="option.id")
  .amount-row
    div {{ option.name }}
    div {{ option.price.toLocaleString() }}円
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
  name: String,
  price: Number,
  options: Array,
})

const totalAmount = props.options.reduce((sum, option) => sum + option.price, props.price)
const tax = Math.floor(totalAmount / 1.1 * 0.1)
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