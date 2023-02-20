<template lang="pug">
BlockText.mb-line 所持チケット
BlockTicket.mb-line(
  v-for="ticket in ticket_list"
  :key="ticket.id"
  :name="ticket.name"
  :expiration="ticket.expiration"
  :numberOfTicket="ticket.number_of_ticket"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockTicket from "~/components/presentational/molescules/block/Ticket.vue";

definePageMeta({
  middleware: "customer-auth",
});

const { ticket_list } = await $fetch("/customer/tickets", {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useCustomerAuth().getAuth(),
  },
});
</script>

<style lang="sass" scoped></style>
