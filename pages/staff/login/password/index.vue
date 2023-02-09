<template lang="pug">
BlockText.mb-line ご登録のメールアドレスを入力してくだい。
form
  InputField.mb-10(
    name="email"
    type="email"
    labelText="メールアドレス"
    validation="required|email"
  )
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid"
      @click.prevent="router.push('/staff/login/password/sendMail')"
    ) パスワード再設定メールを送信する
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import InputField from '~~/components/presentational/molescules/form/InputField.vue';
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';

import { useForm } from 'vee-validate'

const router = useRouter()
const { meta } = useForm()
</script>

<style lang="sass" scoped>
</style>