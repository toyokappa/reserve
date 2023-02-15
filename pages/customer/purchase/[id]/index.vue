<template lang="pug">
BlockText.mb-line 購入内容を確認してください。
BlockTicket.mb-10(
  :name="product.name"
  :numberOfTicket="product.number_of_item"
  :daysOfExpiration="product.days_of_expiration"
)
BlockText.mb-line 購入金額を確認してください。
TotalAmount.mb-10(
  :productItemList="product.product_item_list"
  :totalAmount="totalAmount"
)
BlockText.mb-line カード情報を入力してください。
FormCreditCard(
  buttonText="チケットを購入する"
  @purchaseTicket="purchaseTicket"
)
.button-area
  DefaultButton.mb-10(@click.prevent="router.push('/purchase')") 戻る
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockTicket from '~/components/presentational/molescules/block/Ticket.vue'
import TotalAmount from '~~/components/presentational/organizms/TotalAmount.vue'
import DefaultButton from '~~/components/presentational/atoms/button/Default.vue';
import FormCreditCard from '~~/components/presentational/organizms/FormCreditCard.vue';

definePageMeta({
  middleware: 'customer-auth'
})

const { id } = useRoute().params
const { product } = await $fetch(`/customer/purchases/${id}`, {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useCustomerAuth().getAuth()
  },
})

const totalAmount = product.product_item_list.reduce((sum, item) => sum + item.amount, 0)
const purchaseTicket = async (token) => {
  await $fetch(`/customer/purchases`, {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    method: 'POST',
    headers: {
      Authorization: useCustomerAuth().getAuth()
    },
    body: {
      purchase: {
        product_set_id: product.id,
        card_token: token,
      },
    }
  })
  router.push('/purchase/complete')
}
const router = useRouter()
</script>

<style lang="sass" scoped>
</style>