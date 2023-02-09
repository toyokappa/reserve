<template lang="pug">
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
      @click.prevent="submitForm"
    ) {{ buttonText }}
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import InputField from '~~/components/presentational/molescules/form/InputField.vue';
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';

import { useForm } from 'vee-validate'

const props = defineProps({
  buttonText: String,
})

const router = useRouter()
const { meta, values } = useForm()

const emits = defineEmits()
const submitForm = () => {
  emits('submitForm', values)
}
</script>

<style lang="sass" scoped>
</style>
