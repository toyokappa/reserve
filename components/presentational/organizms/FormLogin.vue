<template lang="pug">
form
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
      @click.prevent="submitForm"
    ) ログインする
    HintText(
      text="パスワードを忘れた方はこちら"
      centering
      @click="router.push(resetLink)"
    )
</template>

<script setup>
import InputField from '~~/components/presentational/molescules/form/InputField.vue';
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';
import HintText from '~~/components/presentational/atoms/HintText.vue';

import { useForm } from 'vee-validate'

const props = defineProps({
  resetLink: String,
})

const router = useRouter()
const { values } = useForm()

const emits = defineEmits()
const submitForm = () => {
  emits('submitForm', values)
}
</script>

<style lang="sass" scoped>
</style>