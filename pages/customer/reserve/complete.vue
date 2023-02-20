<template lang="pug">
.complete-page
  CompleteHeader(title="予約が完了しました")
  .mb-30
    p この度は無料体験へお申し込みいただき
    p.mb-20 誠にありがとうございました。
    p このままページを閉じていただいて
    p.mb-20 問題ございません。
    p トップページへ戻られる方は
    p 下記のリンクをクリックしてください。
  nuxt-link(to="/") トップページへ戻る
</template>

<script setup>
import CompleteHeader from "~/components/presentational/atoms/CompleteHeader.vue";

definePageMeta({
  middleware: "customer-auth",
});
</script>

<style lang="sass" scoped></style>
