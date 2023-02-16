<template lang="pug">
.credit-card-block
  .row.mb-5
    .number ****-****-****-{{ number }}
    img.brand(:src="`/images/card-${brand}.svg`")
  .row.mb-5
    .label 有効期限
    .value {{ expiration }}
  .row
    .label カード名義
    .value {{ owner }}
</template>

<script setup>
const props = defineProps({
  number: String,
  brand: String,
  expiration: String,
  owner: String,
});
</script>

<style lang="sass" scoped>
.credit-card-block
  background-color: $white
  padding: $block-padding
  .row
    display: flex
    align-items: center
    justify-content: space-between
    .number
      font-size: 20px
    .brand
      height: 20px
    .label
      color: $hint
</style>
