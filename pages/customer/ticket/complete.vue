<template lang="pug">
.complete-page
  CompleteHeader(title="チケットを購入しました")
  .mb-30
    p この度はチケットを購入いただき
    p.mb-20 誠にありがとうございました！
    p 購入したチケットでトレーニングの
    p.mb-20 予約を行うことができます。
    p 下記のボタンをクリックして
    p トレーニング予約へ移動してください。
  .button-area
    PrimaryButton(
      @click="router.push('/reserve')"
    ) トレーニング予約へ移動する
</template>

<script setup>
import CompleteHeader from '~/components/presentational/atoms/CompleteHeader.vue'
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';

const router = useRouter()
</script>

<style lang="sass" scoped>
</style>