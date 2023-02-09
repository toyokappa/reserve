<template lang="pug">
BlockText.mb-line 利用中のカード
BlockCreditCard.mb-10(
  :number="inUse.number"
  :brand="inUse.brand"
  :expiration="inUse.expiration"
  :owner="inUse.owner"
)
BlockText.mb-line 登録済みのカード
BlockCreditCard.mb-10(
  v-for="card in registered"
  :key="card.id"
  :number="card.number"
  :brand="card.brand"
  :expiration="card.expiration"
  :owner="card.owner"
)
BlockText.mb-line カード情報を入力してください。
FormCreditCard(
  buttonText="新しくカードを追加する"
  @submitForm="router.push('/creditCard')"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import DefaultButton from '~~/components/presentational/atoms/button/Default.vue';
import BlockCreditCard from '~~/components/presentational/molescules/block/CreditCard.vue';
import FormCreditCard from '~~/components/presentational/organizms/FormCreditCard.vue';

import sampleData from '@/data/sample'
const { creditCardList } = sampleData
const { inUse, registered } = creditCardList

const router = useRouter()
</script>

<style lang="sass" scoped>
</style>
