<template lang="pug">
.input-block
  label.input-label(:for="name")
    span.text {{ labelText }}
    RequiredBadge(v-if="required")
    .current-value {{ value }}
  input.input-field(
    type="range"
    :id="name"
    :name="name"
    :min="min"
    :max="max"
    v-model="value"
    :class="{ invalid: errorMessage }"
  )
  .invalid-feedback(v-if="errorMessage") {{ errorMessage }}
</template>

<script setup>
import { useField, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

import RequiredBadge from "~/components/presentational/atoms/RequiredBadge.vue";

const props = defineProps({
  name: String,
  type: String,
  labelText: String,
  min: [String, Number],
  max: [String, Number],
  validation: [String, Object],
  required: Boolean,
});

const { name, labelText, defaultValue, validation } = props;

const { value, errorMessage } = useField(name, validation);

const names = {};
names[name] = labelText;
configure({
  generateMessage: localize({
    ja: {
      names,
    },
  }),
});
</script>

<style lang="sass" scoped></style>
