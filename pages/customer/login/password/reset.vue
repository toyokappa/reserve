<template lang="pug">
BlockText.mb-line 新しいパスワードを入力してください。
form
  InputField.mb-line(
    name="password"
    type="password"
    labelText="パスワード"
    validation="required|min:8"
    required
  )
  InputField.mb-10(
    name="password_confirmed"
    type="password"
    labelText="パスワード（確認用）"
    validation="required|confirmed:@password"
    required
  )
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid"
      @click.prevent="router.push('/')"
    ) パスワードを再設定する
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