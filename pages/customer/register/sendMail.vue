<template lang="pug">
.complete-page
  CompleteHeader(title="確認メールを送信しました")
  .mb-30
    p.emphasis-red.mb-20 会員登録はまだ完了しておりません。
    p ご登録頂いたメールアドレス宛に
    P 会員登録の確認メールを送信しましたので
    p.mb-20 ご確認をお願いいたします。
    p メール内のURLをクリックいただき
    p.mb-20 会員登録は完了となります。
    p こちらのページは閉じていただいて
    p 問題ございません。
</template>

<script setup>
import CompleteHeader from "~/components/presentational/atoms/CompleteHeader.vue";

definePageMeta({
  middleware: "customer-auth",
});
</script>

<style lang="sass" scoped></style>
