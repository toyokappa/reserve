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
    :id="card.id"
    :number="card.number"
    :brand="card.brand"
    :expiration="card.expiration"
    :owner="card.owner"
    hasController
    @changeMainCard="changeMainCard"
    @deleteCard="deleteCard"
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
  await $fetch("/customer/card", {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    headers: {
      Authorization: useCustomerAuth().getAuth(),
    },
  })
);
const { in_use, registered } = toRefs(data);

const addCard = async (token) => {
  const { new_card } = await $fetch("/customer/card", {
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

const changeMainCard = async (id) => {
  const { new_registered } = await $fetch("/customer/card", {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    method: "PUT",
    headers: {
      Authorization: useCustomerAuth().getAuth(),
    },
    body: {
      card: {
        id,
      },
    },
  });
  const mainCard = registered.value.find((card) => card.id === id);
  in_use.value = mainCard;
  registered.value = new_registered;
};

const deleteCard = async (id) => {
  const deleteCheck = await confirm("本当に削除しますか？");
  if (!deleteCheck) return;

  await $fetch("/customer/card", {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    method: "DELETE",
    headers: {
      Authorization: useCustomerAuth().getAuth(),
    },
    body: {
      card: {
        id,
      },
    },
  });
  const cardIndex = registered.value.findIndex((card) => card.id === id);
  registered.value.splice(cardIndex, 1);
};
</script>

<style lang="sass" scoped></style>
