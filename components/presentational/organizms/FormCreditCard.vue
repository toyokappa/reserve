<template lang="pug">
form
  InputField.mb-line(
    name="cardNumber"
    type="text"
    inputmode="numeric"
    labelText="カード番号"
    autocomplete="cc-number"
    :validation="{ required: true, regex: cardNumberFmt }"
    required
  )
  InputField.mb-line(
    name="cardOwner"
    type="text"
    labelText="カード名義"
    autocomplete="cc-name"
    placeholder="TARO TANAKA"
    :validation="{ required: true, regex: cardOwnerFmt }"
    required
  )
  InputFieldHorizontal.mb-10(
    labelText="有効期限/CVC"
    name1="expiration" name2="cvc"
    placeholder1="月/年" placeholder2="CVC"
    type1="text" type2="text"
    inputmode1="decimal" inputmode2="numeric"
    autocomplete1="cc-exp" autocomplete2="cc-csc"
    :validation1="{ required: true, regex: cardExpFmt }"
    :validation2="{ required: true, regex: cardCvcFmt }"
    required
  )
.button-area
  PrimaryButton.mb-10(
    :disabled="!meta.valid"
    @click.prevent="submitForm"
  ) {{ buttonText }}
</template>

<script setup>
import InputField from '~~/components/presentational/molescules/form/InputField.vue';
import InputFieldHorizontal from '~~/components/presentational/molescules/form/InputFieldHorizontal.vue';
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';

import { useForm } from 'vee-validate'

const prosp = defineProps({
  buttonText: String
})

const { meta, values } = useForm()

const cardNumberFmt = /^[0-9]{13,16}$/
const cardOwnerFmt = /^[A-Z]+\s[A-Z]+$/
const cardExpFmt = /^[0-9]{2}\/[0-9]{2,4}$/
const cardCvcFmt = /^[0-9]{3,4}$/

const emits = defineEmits()
const submitForm = () => {
  emits('submitForm', values)
}
</script>

<style lang="sass" scoped>
</style>