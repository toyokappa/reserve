<template lang="pug">
.input-block
  input.me-10(
    type="checkbox"
    id="agreement"
    name="agreement"
    v-model="value"
    :class="{ invalid: errorMessage }"
  )
  label(for="agreement")
    a(href="https://elvina.jp/terms" target="_blank" rel="noopener") 利用規約
    span.text に同意します。
  .invalid-feedback(v-if="errorMessage") {{ errorMessage }}
</template>

<script setup>
import { useField, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

const props = defineProps({
  validation: [String, Object],
});

const { validation } = props;

const { value, errorMessage } = useField("agreement", validation);

configure({
  generateMessage: localize({
    ja: {
      names: {
        agreement: "利用規約への同意",
      },
    },
  }),
});
</script>

<style lang="sass" scoped></style>
