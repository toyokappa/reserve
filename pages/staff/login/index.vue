<template lang="pug">
BlockText.mb-line ログイン情報を入力してください。
FormLogin(
  resetLink="/staff/login/password"
  @submitForm="staffLogin"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import FormLogin from '~~/components/presentational/organizms/FormLogin.vue';

const router = useRouter()
const { staffLogin } = useStaffAuth()
</script>

<style lang="sass" scoped>
</style>