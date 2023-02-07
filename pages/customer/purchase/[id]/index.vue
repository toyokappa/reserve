<template lang="pug">
BlockText.mb-line 購入内容を確認してください。
BlockTicket.mb-10(
  :name="product.name"
  :numberOfTicket="product.numberOfTicket"
  :daysOfExpiration="product.daysOfExpiration"
)
BlockText.mb-line 購入金額を確認してください。
TotalAmount.mb-10(
  :name="product.name"
  :price="product.price"
  :options="product.defaultOptions"
)
BlockText.mb-line カード情報を入力してください。
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
    @click.prevent="router.push('/purchase/complete')"
  ) チケットを購入する
  DefaultButton.mb-10(@click.prevent="router.push('/purchase')") 戻る
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockTicket from '~/components/presentational/molescules/block/Ticket.vue'
import TotalAmount from '~~/components/presentational/organizms/TotalAmount.vue'
import InputField from '~~/components/presentational/molescules/form/InputField.vue';
import InputFieldHorizontal from '~~/components/presentational/molescules/form/InputFieldHorizontal.vue';
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';
import DefaultButton from '~~/components/presentational/atoms/button/Default.vue';

import sampleData from '@/data/sample'
import { useForm } from 'vee-validate'

const { productList } = sampleData
const router = useRouter()
const route = useRoute()
const { meta } = useForm()
const { id } = route.params
const product = productList.find(product => product.id === id )
const cardNumberFmt = /^[0-9]{13,16}$/
const cardOwnerFmt = /^[A-Z]+\s[A-Z]+$/
const cardExpFmt = /^[0-9]{2}\/[0-9]{2,4}$/
const cardCvcFmt = /^[0-9]{3,4}$/
</script>

<style lang="sass" scoped>
</style>