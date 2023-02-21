<template lang="pug">
form
  .input-block
    label.input-label(for="couponCode")
      span.text クーポンコード
    .holizontal-field
      input.input-field(
        type="text"
        id="couponCode"
        name="couponCode"
        v-model="couponCode"
      )
      PrimaryButton(
        :fullWidth="false"
        :disabled="!couponCode"
        @click.prevent="emits('useCoupon', couponCode)"
      ) 適用する
</template>

<script setup>
import { useField, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";

const { value: couponCode } = useField("couponCode");
configure({
  generateMessage: localize({
    ja: {
      couponCode: "クーポンコード",
    },
  }),
});

const emits = defineEmits();
</script>

<style lang="sass" scoped></style>
