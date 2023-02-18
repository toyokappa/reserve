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
  .row.mt-10(v-if="hasController")
    .delete(
      @click="emits('deleteCard', id)"
    ) カードを削除する
    .to-main(
      @click="emits('changeMainCard', id)"
    ) 利用中のカードに指定する
</template>

<script setup>
const props = defineProps({
  id: String,
  number: String,
  brand: String,
  expiration: String,
  owner: String,
  hasController: Boolean,
});

const emits = defineEmits();
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
    .to-main
      font-size: 14px
      color: $primary
    .delete
      font-size: 14px
      color: $red
</style>
