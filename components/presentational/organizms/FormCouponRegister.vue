<template lang="pug">
BlockText.mb-line クーポン情報を入力してください。
form
  InputField.mb-line(
    name="name"
    type="text"
    labelText="クーポン名"
    validation="required"
    required
  )
  InputField.mb-line(
    name="code"
    type="text"
    labelText="クーポンコード"
    validation="required"
    required
  )
  InputField.mb-line(
    name="expiration"
    type="datetime-local"
    labelText="有効期限"
    validation="required"
    required
  )
  InputField.mb-line(
    name="useLimit"
    type="text"
    labelText="使用回数制限"
    inputmode="numeric"
    placeholder="ない場合は0を入力してください"
    validation="required"
    required
  )
  InputField.mb-10(
    name="discountAmount"
    type="text"
    labelText="割引金額"
    inputmode="numeric"
    validation="required"
    required
  )
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid"
      @click.prevent="submitForm()"
    ) クーポンを追加する
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import InputField from "~~/components/presentational/molescules/form/InputField.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";

import { useForm } from "vee-validate";

const props = defineProps({
  name: String,
  code: String,
  expiration: String,
  useLimit: Number,
  discountAmount: Number,
});

const { meta, values } = useForm({
  initialValues: props,
});

const emits = defineEmits();
const submitForm = () => {
  emits("submitForm", values);
};
</script>

<style lang="sass" scoped></style>
