<template lang="pug">
form
  InputFieldHorizontal.mb-line(
    labelText="お名前"
    name1="lastName" name2="firstName"
    placeholder1="姓" placeholder2="名"
    type1="text" type2="text"
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
  InputField.mb-line(
    name="postcode"
    type="tel"
    labelText="郵便番号"
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
</template>

<script setup>
import InputField from '~~/components/presentational/molescules/form/InputField.vue';
import InputFieldHorizontal from '~~/components/presentational/molescules/form/InputFieldHorizontal.vue';

import { useForm } from 'vee-validate'
import { Core as YubinBangoCore } from 'yubinbango-core2'

const { meta, values } = useForm({
  initialValues: {
    birthday: '1990-01-01'
  }
})

const autocompleteAdress = () => {
  new YubinBangoCore(values.postcode, value => {
    values.address = value.region
    values.address += value.locality
    values.address += value.street
  })
}
</script>