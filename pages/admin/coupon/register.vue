<template lang="pug">
FormCouponRegister(@submitForm="submitForm")
</template>

<script setup>
import FormCouponRegister from "~~/components/presentational/organizms/FormCouponRegister.vue";
import { toSnakeKey } from "~/utils/commonLogic";

// TODO: 共通処理をどこか別のところに移す
const submitForm = async (values) => {
  const coupon = toSnakeKey(values);
  if (coupon.use_limit === 0) coupon.use_limit = null;
  try {
    useLoad().start();
    await $fetch(`/admin/coupons`, {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "POST",
      headers: {
        Authorization: useAdminAuth().getAuth(),
      },
      body: {
        coupon,
      },
    });
    useRouter().push("/admin/coupon");
  } catch (e) {
    useNuxtApp().$toast.error(`登録できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
</script>
