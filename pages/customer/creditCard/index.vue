<template lang="pug">
BlockText.mb-line 利用中のカード
BlockCreditCard.mb-10(
  :number="in_use.number"
  :brand="in_use.brand"
  :expiration="in_use.expiration"
  :owner="in_use.owner"
)
BlockText.mb-line 登録済みのカード
.mb-10
  BlockCreditCard.mb-line(
    v-for="card in registered"
    :key="card.id"
    :number="card.number"
    :brand="card.brand"
    :expiration="card.expiration"
    :owner="card.owner"
  )
BlockText.mb-line 追加したいカード情報を入力してください。
FormCreditCard(
  buttonText="新しくカードを追加する"
  @submitForm="addCard"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import DefaultButton from "~~/components/presentational/atoms/button/Default.vue";
import BlockCreditCard from "~~/components/presentational/molescules/block/CreditCard.vue";
import FormCreditCard from "~~/components/presentational/organizms/FormCreditCard.vue";

definePageMeta({
  middleware: "customer-auth",
});

const data = reactive(
  await $fetch("/customer/cards", {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    headers: {
      Authorization: useCustomerAuth().getAuth(),
    },
  })
);
const { in_use, registered } = toRefs(data);

const addCard = async (token) => {
  const { new_card } = await $fetch(`/customer/cards`, {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    method: "POST",
    headers: {
      Authorization: useCustomerAuth().getAuth(),
    },
    body: {
      card: {
        card_token: token,
      },
    },
  });
  registered.value.unshift(new_card);
};
</script>

<style lang="sass" scoped></style>
