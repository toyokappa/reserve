<template lang="pug">
BlockText.mb-line 顧客情報
BlockCustomer.mb-10(
  :image="customer.image.url"
  :name="customer.full_name"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockCustomer from "~/components/presentational/molescules/block/Person.vue";

definePageMeta({
  middleware: "staff-auth",
});

const { id } = useRoute().params;
const { customer } = await $fetch(`/staff/customers/${id}`, {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useStaffAuth().getAuth(),
  },
});
</script>

<style lang="sass">
.group
  display: flex
  align-items: center
  justify-content: space-between
  .assign, .unassign
    font-size: 12px
  .assign
    color: $primary
  .unassign
    color: $red
</style>
