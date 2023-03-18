<template lang="pug">
BlockText.mb-line 情報を確認したい顧客を選択してください。
BlockCustomer.mb-line(
  v-for="customer in customer_list"
  :key="customer.id"
  :id="customer.id"
  :image="customer.image.url"
  :name="customer.full_name"
  @click="useRouter().push(`/staff/customer/${customer.id}`)"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockCustomer from "~/components/presentational/molescules/block/Person.vue";

definePageMeta({
  middleware: "staff-auth",
});

const { customer_list } = await $fetch("/staff/customers", {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useStaffAuth().getAuth(),
  },
});
</script>
