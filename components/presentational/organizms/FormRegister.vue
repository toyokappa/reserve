<template lang="pug">
form
  InputFieldHorizontal.mb-line(
    labelText="お名前"
    name1="lastName" name2="firstName"
    placeholder1="姓" placeholder2="名"
    type1="text" type2="text"
    autocomplete1="family-name" autocomplete2="given-name"
    validation1="required" validation2="required"
    required
  )
  InputFieldHorizontal.mb-line(
    labelText="お名前（かな）"
    name1="lastNameKana" name2="firstNameKana"
    placeholder1="せい" placeholder2="めい"
    type1="text" type2="text"
    validation1="required" validation2="required"
    required
  )
  InputField.mb-line(
    name="birthday"
    type="date"
    labelText="生年月日"
    validation="required"
    required
  )
  InputField.mb-line(
    name="email"
    type="email"
    labelText="メールアドレス"
    autocomplete="email"
    validation="required|email"
    required
  )
  InputField.mb-line(
    name="tel"
    type="tel"
    labelText="電話番号"
    autocomplete="tel"
    validation="required"
    required
  )
  InputField.mb-line(
    name="postcode"
    type="text"
    inputmode="numeric"
    labelText="郵便番号"
    autocomplete="postal-code"
    validation="required"
    required
    @focusout="autocompleteAdress()"
  )
  InputField.mb-line(
    name="address"
    type="text"
    labelText="住所"
    validation="required"
    required
  )
  InputImages.mb-10(
    name="idCard"
    labelText="本人確認書類"
    multiple
    required
  )
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid"
      @click.prevent="confirmRegister()"
    ) 登録内容を確認する
</template>

<script setup>
import InputField from '~~/components/presentational/molescules/form/InputField.vue';
import InputFieldHorizontal from '~~/components/presentational/molescules/form/InputFieldHorizontal.vue';
import InputImages from '~~/components/presentational/molescules/form/InputImages.vue';
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';

import { useForm } from 'vee-validate'
import { Core as YubinBangoCore } from 'yubinbango-core2'

const props = defineProps({
  lastName: String,
  firstName: String,
  lastNameKana: String,
  firstNameKana: String,
  birthday: String,
  email: String,
  tel: String,
  postcode: String,
  address: String,
  idCard: Array,
})

const { meta, values } = useForm({
  initialValues: props
})

const autocompleteAdress = () => {
  new YubinBangoCore(values.postcode, value => {
    values.address = value.region
    values.address += value.locality
    values.address += value.street
  })
}

const emits = defineEmits()
const confirmRegister = () => {
  emits('confirmRegister', values)
}
</script>