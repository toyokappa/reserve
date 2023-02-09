<template lang="pug">
BlockText.mb-line 新しいパスワードを入力してください。
FormPassword(
  buttonText="パスワードを再設定する"
  @submitForm="router.push('/staff/login')"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import FormPassword from '~~/components/presentational/organizms/FormPassword.vue';

const router = useRouter()
</script>

<style lang="sass" scoped>
</style>