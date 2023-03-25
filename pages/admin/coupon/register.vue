<template lang="pug">
FormCouponRegister(@submitForm="submitForm")
</template>

<script setup>
import FormCouponRegister from "~~/components/presentational/organizms/FormCouponRegister.vue";

// TODO: 共通処理をどこか別のところに移す
const toSnake = (str) => {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
};

const toSnakeKey = (obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[toSnake(key)] = obj[key];
  });
  return result;
};

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
