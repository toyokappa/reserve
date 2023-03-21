<template lang="pug">
form
  InputImage.mb-line(
    name="trainingLog"
    labelText="トレーニング記録"
  )
  InputImage.mb-10(
    name="bodyMetricsLog"
    labelText="体組成記録"
  )
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid"
      @click.prevent="submitForm()"
    ) カルテの入力を保存する
</template>

<script setup>
import InputImage from "~~/components/presentational/molescules/form/InputImage.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";

import { useForm } from "vee-validate";

const { meta, values } = useForm({});

const emits = defineEmits();
const submitForm = () => {
  emits("submitForm", values);
};
</script>

<style lang="sass" scoped></style>
