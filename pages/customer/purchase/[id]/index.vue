<template lang="pug">
BlockText.mb-line 購入内容を確認してください。
BlockTicket.mb-10(
  :name="product.name"
  :numberOfTicket="product.number_of_item"
  :daysOfExpiration="product.days_of_expiration"
)
BlockText.mb-line 購入金額を確認してください。
TotalAmount.mb-10(
  :productItemList="productItemList"
  :totalAmount="totalAmount"
)
template(v-if="product.has_usable_coupons")
  BlockText.mb-line クーポンをお持ちの方は入力してください。
  FormCoupon.mb-10(@useCoupon="useCoupon")
template(v-if="card_info")
  BlockText.mb-line カード情報を確認してください。
  BlockCreditCard.mb-10(
    :number="card_info.number"
    :brand="card_info.brand"
    :expiration="card_info.expiration"
    :owner="card_info.owner"
  )
  .button-area
    PrimaryButton.mb-10(@click.prevent="purchaseTicket()") チケットを購入する
template(v-else)
  BlockText.mb-line カード情報を入力してください。
  FormCreditCard(
    buttonText="チケットを購入する"
    @submitForm="purchaseTicket"
  )
.button-area
  DefaultButton.mb-10(@click.prevent="router.push('/purchase')") 戻る
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockTicket from "~/components/presentational/molescules/block/Ticket.vue";
import TotalAmount from "~~/components/presentational/organizms/TotalAmount.vue";
import DefaultButton from "~~/components/presentational/atoms/button/Default.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";
import BlockCreditCard from "~/components/presentational/molescules/block/CreditCard.vue";
import FormCoupon from "~~/components/presentational/organizms/FormCoupon.vue";
import FormCreditCard from "~~/components/presentational/organizms/FormCreditCard.vue";

definePageMeta({
  middleware: "customer-auth",
});

const { $toast } = useNuxtApp();
const { id } = useRoute().params;
const { product, card_info } = await $fetch(`/customer/purchases/${id}`, {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useCustomerAuth().getAuth(),
  },
});

const coupon = ref(null);
const productItemList = computed(() => {
  if (!coupon.value) return product.product_item_list;
  return product.product_item_list.concat(coupon.value);
});

const totalAmount = computed(() => {
  return productItemList.value.reduce((sum, item) => sum + item.amount, 0);
});

const useCoupon = async (couponCode) => {
  try {
    useLoad().start();
    const data = await $fetch(`/customer/coupon`, {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      headers: {
        Authorization: useCustomerAuth().getAuth(),
      },
      params: {
        product_set_id: product.id,
        code: couponCode,
      },
    });
    coupon.value = data.coupon;
    $toast.info("クーポンを適用しました");
  } catch (e) {
    if (e.status === 404) {
      $toast.error("入力したクーポンコードはご利用いただけません");
      coupon.value = null;
    } else {
      $toast.error(`適用できませんでした(code: ${e.status})`);
      throw e;
    }
  } finally {
    useLoad().finish();
  }
};

const purchaseTicket = async (token = null) => {
  try {
    useLoad().start();
    const { error } = await $fetch(`/customer/purchases`, {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "POST",
      headers: {
        Authorization: useCustomerAuth().getAuth(),
      },
      body: {
        purchase: {
          product_set_id: product.id,
          coupon_id: coupon.value?.id,
          card_token: token,
        },
      },
    });
    if (error) {
      $toast.error(error.message);
      useLoad().finish();
      return console.error(error.message);
    }

    router.push("/purchase/complete");
  } catch (e) {
    $toast.error(`購入できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
const router = useRouter();
</script>

<style lang="sass" scoped></style>
