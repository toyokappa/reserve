<template lang="pug">
BlockText.mb-line 顧客管理
BlockCustomer.mb-line(
  v-for="customer in customer_list"
  :key="customer.id"
  :id="customer.id"
  :image="customer.image.url"
  :name="customer.full_name"
  @click="useRouter().push(`/admin/customer/${customer.id}`)"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockCustomer from "~/components/presentational/molescules/block/Person.vue";

const { customer_list } = await $fetch("/admin/customers", {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useAdminAuth().getAuth(),
  },
});
</script>
