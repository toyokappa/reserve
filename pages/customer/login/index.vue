<template lang="pug">
BlockText.mb-line ログイン情報を入力してください。
FormLogin(
  resetLink="/login/password"
  @submitForm="useCustomerAuth().login"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import FormLogin from "~~/components/presentational/organizms/FormLogin.vue";

definePageMeta({
  middleware: "customer-auth",
});
</script>

<style lang="sass" scoped></style>
