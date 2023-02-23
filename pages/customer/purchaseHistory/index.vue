<template lang="pug">
BlockText.mb-line 購入履歴
BlockPurchaseHistory.mb-line(
  v-if="purchase_history_list.length > 0"
  v-for="history in purchase_history_list"
  :key="history.id"
  :productName="history.product_set_name"
  :purchasedAt="history.purchased_at"
  :paymentMethod="history.payment_method"
  :totalAmount="history.total_amount"
  @click="useRouter().push(`/purchaseHistory/${history.id}`)"
)
BlockText(v-else)
  .empty-state 購入履歴はありません。
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockPurchaseHistory from "~/components/presentational/molescules/block/PurchaseHistory.vue";

definePageMeta({
  middleware: "customer-auth",
});

const { purchase_history_list } = await $fetch("/customer/purchase_histories", {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useCustomerAuth().getAuth(),
  },
});
</script>

<style lang="sass" scoped></style>
