<template lang="pug">
.complete-page
  CompleteHeader(title="会員登録が完了しました")
  .mb-30
    p この度は会員登録をいただき
    p.mb-20 誠にありがとうございました！
    p マイページよりチケット購入や
    p.mb-20 トレーニングの予約が可能です。
    p 下記のボタンをクリックして
    p マイページへ移動してください。
  .button-area
    PrimaryButton(
      @click="router.push('/')"
    ) マイページへ移動する
</template>

<script setup>
import CompleteHeader from "~/components/presentational/atoms/CompleteHeader.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";

const router = useRouter();
</script>

<style lang="sass" scoped></style>
