<template lang="pug">
BlockText.mb-line 利用中のカード
BlockCreditCard.mb-10(
  v-if="in_use"
  :number="in_use.number"
  :brand="in_use.brand"
  :expiration="in_use.expiration"
  :owner="in_use.owner"
)
BlockText.mb-10(v-else)
  .empty-state 利用中のカードはありません。
BlockText.mb-line 登録済みのカード
.mb-10
  BlockCreditCard.mb-line(
    v-if="registered.length > 0"
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
  BlockText(v-else)
    .empty-state 登録済みのカードはありません。
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

const { $toast } = useNuxtApp();
const addCard = async (token) => {
  try {
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
    if (new_card.in_use) {
      in_use.value = new_card;
      $toast.info("利用中のカードに追加しました");
    } else {
      registered.value.unshift(new_card);
      $toast.info("登録済みのカードに追加しました");
    }
  } catch (e) {
    $toast.error(`追加できませんでした(code: ${e.status})`);
    throw e;
  }
};

const changeMainCard = async (id) => {
  try {
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
    $toast.info("利用中のカードを変更しました");
  } catch (e) {
    $toast.error(`変更できませんでした(code: ${e.status})`);
    throw e;
  }
};

const deleteCard = async (id) => {
  const deleteCheck = await confirm("本当に削除しますか？");
  if (!deleteCheck) return;

  try {
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
    $toast.info("カードを削除しました");
  } catch (e) {
    $toast.info(`削除できませんでした(code: ${e.status})`);
    throw e;
  }
};
</script>

<style lang="sass" scoped></style>
