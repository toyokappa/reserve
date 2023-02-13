<template lang="pug">
form
  .input-block.mb-line
    .input-label
      span カード番号
      RequiredBadge
    .input-card-field#numberField
  InputField.mb-line(
    name="cardOwner"
    type="text"
    labelText="カード名義"
    autocomplete="cc-name"
    placeholder="TARO TANAKA"
    :validation="{ required: true, regex: cardOwnerFmt }"
    required
  )
  .input-block.mb-10
    .input-label
      span 有効期限/CVC
      RequiredBadge
    .holizontal-field
      .input-card-field#expiryField
      .input-card-field#cvcField
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid || !cardValid"
      @click.prevent="createToken()"
    ) {{ buttonText }}
</template>

<script setup>
import RequiredBadge from '~/components/presentational/atoms/RequiredBadge.vue'
import InputField from '~~/components/presentational/molescules/form/InputField.vue';
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';

import { useForm } from 'vee-validate'

const prosp = defineProps({
  buttonText: String
})

const { $payjp } = useNuxtApp()
const numberField = ref(null)
const expiryField = ref(null)
const cvcField = ref(null)
const numberValid = ref(false)
const expiryValid = ref(false)
const cvcValid = ref(false)

onMounted(() => {
  const payjpForm = $payjp.elements()
  numberField.value = payjpForm.create('cardNumber')
  expiryField.value = payjpForm.create('cardExpiry')
  cvcField.value = payjpForm.create('cardCvc')
  numberField.value.mount('#numberField')
  expiryField.value.mount('#expiryField')
  cvcField.value.mount('#cvcField')
  numberField.value.on('change', (listener) => {
    numberValid.value = listener.complete
  })
  expiryField.value.on('change', (listener) => {
    expiryValid.value = listener.complete
  })
  cvcField.value.on('change', (listener) => {
    cvcValid.value = listener.complete
  })
})

const cardValid = computed(() => {
  return numberValid.value && expiryValid.value && cvcValid.value
})

const { meta, values } = useForm()

const emits = defineEmits()
const createToken = async () => {
  const options = { card: { name: values.cardOwner } }
  const res = await $payjp.createToken(numberField.value, options)
  if(res.error) return console.error(res.error.message)

  emits('purchaseTicket', res.id)
}

const cardNumberFmt = /^[0-9]{13,16}$/
const cardOwnerFmt = /^[A-Z]+\s[A-Z]+$/
const cardExpFmt = /^[0-9]{2}\/[0-9]{2,4}$/
const cardCvcFmt = /^[0-9]{3,4}$/
</script>

<style lang="sass" scoped>
</style>