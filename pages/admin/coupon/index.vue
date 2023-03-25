<template lang="pug">
BlockText.mb-line クーポン管理
BlockCoupon.mb-line(
  v-for="coupon in coupon_list"
  :key="coupon.id"
  :name="coupon.name"
  :code="coupon.code"
  :expiration="coupon.expiration"
  :useLimit="coupon.use_limit"
  :discountAmount="coupon.discount_amount"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockCoupon from "~/components/presentational/molescules/block/Coupon.vue";

const { coupon_list } = await $fetch("/admin/coupons", {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useAdminAuth().getAuth(),
  },
});
</script>

<style lang="sass" scoped></style>
