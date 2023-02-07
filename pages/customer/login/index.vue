<template lang="pug">
BlockText.mb-line ログイン情報を入力してください。
InputField.mb-line(
  name="email"
  type="email"
  labelText="メールアドレス"
  validation=""
)
InputField.mb-10(
  name="password"
  type="password"
  labelText="パスワード"
  validation=""
)
.button-area
  PrimaryButton.mb-10(
    @click="router.push('/')"
  ) ログインする
  HintText(
    text="パスワードを忘れた方はこちら"
    centering
    @click="router.push('/login/password')"
  )
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import InputField from '~~/components/presentational/molescules/form/InputField.vue';
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';
import HintText from '~~/components/presentational/atoms/HintText.vue';

const router = useRouter()
</script>

<style lang="sass" scoped>
</style>