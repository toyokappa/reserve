<template lang="pug">
form
  InputField.mb-line(
    name="name"
    type="text"
    labelText="お名前"
    validation="required"
    required
  )
  InputField.mb-line(
    name="email"
    type="email"
    labelText="メールアドレス"
    validation="required|email"
    required
  )
  InputField.mb-line(
    name="tel"
    type="tel"
    labelText="電話番号"
    validation="required"
    required
  )
  Textarea.mb-10(
    name="message"
    labelText="ご質問など"
  )
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid"
      @click="confirmReserve()"
    ) 予約内容を確認する
</template>

<script setup>
import InputField from '~~/components/presentational/molescules/form/InputField.vue';
import Textarea from '~~/components/presentational/molescules/form/Textarea.vue';
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';

import { useForm } from 'vee-validate'

const props = defineProps({
  name: String,
  email: String,
  tel: String,
  message: String,
})

const { meta, values } = useForm({
  initialValues: props
})

const emits = defineEmits()
const confirmReserve = () => {
  emits('confirmReserve', values)
}
</script>

<style lang="sass" scoped>
</style>