<template lang="pug">
BlockText.mb-line クーポン管理
BlockCoupon.mb-10(
  :key="coupon.id"
  :name="coupon.name"
  :code="coupon.code"
  :expiration="coupon.expiration"
  :useLimit="coupon.use_limit"
  :discountAmount="coupon.discount_amount"
)
BlockText.mb-line 設定中の商品
BlockAssign.mb-line(
  v-for="product in assignedProductList"
  :key="product.id"
  :name="product.name"
  unassignText="クーポンの設定を解除"
  assigned
)
.mb-10
BlockText.mb-line 未設定の商品
BlockAssign.mb-line(
  v-for="product in unassignedProductList"
  :key="product.id"
  :name="product.name"
  assignText="クーポンを設定"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockCoupon from "~/components/presentational/molescules/block/Coupon.vue";
import BlockAssign from "~/components/presentational/molescules/block/Assign.vue";

const { id } = useRoute().params;
const { coupon, assigned_product_list, unassigned_product_list } = await $fetch(
  `/admin/coupons/${id}`,
  {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    headers: {
      Authorization: useAdminAuth().getAuth(),
    },
  }
);

const assignedProductList = ref(assigned_product_list);
const unassignedProductList = ref(unassigned_product_list);

// TODO: とりあえずクーポンの解除等の設定は必要になったタイミングで実装する
</script>

<style lang="sass" scoped></style>
