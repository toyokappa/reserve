<template lang="pug">
.complete-page
  CompleteHeader(title="メールを送信しました")
  .mb-30
    p ご登録頂いたメールアドレス宛に
    P パスワード再設定メールを送信しましたので
    p.mb-20 ご確認をお願いいたします。
    p メール内のURLをクリックいただき
    p.mb-20 パスワードを再設定してください。
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
