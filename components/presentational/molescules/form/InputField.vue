<template lang="pug">
.input-block
  label.input-label(:for="name")
    span.text {{ labelText }}
    RequiredBadge(v-if="required")
  input.input-field(
    :type="type"
    :id="name"
    :name="name"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :inputmode="inputmode"
    v-model="value"
    :class="{ invalid: errorMessage }"
  )
  .invalid-feedback(v-if="errorMessage") {{ errorMessage }}
</template>

<script setup>
import { useField, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'

import RequiredBadge from '~/components/presentational/atoms/RequiredBadge.vue'

const props = defineProps({
  name: String,
  type: String,
  labelText: String,
  placeholder: String,
  autocomplete: String,
  inputmode: String,
  validation: [String, Object],
  required: Boolean,
})

const { name, type, labelText, validation, required } = props

const { value, errorMessage } = useField(
  name,
  validation,
)

const names = {}
names[name] = labelText
configure({
  generateMessage: localize({
    ja: {
      names
    }
  })
})
</script>

<style lang="sass" scoped>
</style>