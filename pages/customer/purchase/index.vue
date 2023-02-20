<template lang="pug">
BlockText.mb-line 購入するチケットを選択してください。
BlockProduct.mb-line(
  v-for="product in product_list"
  :key="product.id"
  :name="product.name"
  :description="product.description"
  :price="product.price"
  :hasPurchaseLimit="product.has_purchase_limit"
  :purchaseLimit="product.purchase_limit"
  @click="useRouter().push(`/purchase/${product.id}`)"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockProduct from "~/components/presentational/molescules/block/Product.vue";

definePageMeta({
  middleware: "customer-auth",
});

const { product_list } = await $fetch("/customer/purchases", {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useCustomerAuth().getAuth(),
  },
});
</script>

<style lang="sass" scoped></style>
