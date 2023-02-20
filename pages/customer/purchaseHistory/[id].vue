<template lang="pug">
BlockText.mb-line 購入履歴
BlockPurchaseHistory.mb-10(
  :productName="purchase_history.product_set_name"
  :purchasedAt="purchase_history.purchased_at"
  :paymentMethod="purchase_history.payment_method"
  :totalAmount="purchase_history.total_amount"
)
BlockText.mb-line 購入明細
TotalAmount.mb-10(
  :productItemList="purchase_history.detail"
  :totalAmount="purchase_history.total_amount"
)
BlockText.mb-line 支払い方法
.payment-method.mb-line クレジットカード支払い
BlockCreditCard(
  :number="purchase_history.card_info.number"
  :brand="purchase_history.card_info.brand"
  :expiration="purchase_history.card_info.expiration"
  :owner="purchase_history.card_info.owner"
)
.mb-10
.button-area
  DefaultButton.mb-10(@click="useRouter().push('/purchaseHistory')") 戻る
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockPurchaseHistory from "~/components/presentational/molescules/block/PurchaseHistory.vue";
import BlockCreditCard from "~/components/presentational/molescules/block/CreditCard.vue";
import DefaultButton from "~/components/presentational/atoms/button/Default.vue";
import TotalAmount from "~~/components/presentational/organizms/TotalAmount.vue";

definePageMeta({
  middleware: "customer-auth",
});

const { id } = useRoute().params;
const { purchase_history } = await $fetch(
  `/customer/purchase_histories/${id}`,
  {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    headers: {
      Authorization: useCustomerAuth().getAuth(),
    },
  }
);
</script>

<style lang="sass" scoped>
.payment-method
  font-size: 14px
  color: $hint
  background-color: $white
  padding: 10px 20px
</style>
