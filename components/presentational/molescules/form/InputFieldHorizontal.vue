<template lang="pug">
.input-block
  label.input-label(:for="name1")
    span.text {{ labelText }}
    RequiredBadge(v-if="required")
  .holizontal-field
    input.input-field(
      :type="type1"
      :id="name1"
      :name="name1"
      :placeholder="placeholder1"
      v-model="value1"
      :class="{ invalid: errorMessage1 }"
    )
    input.input-field(
      :type="type2"
      :id="name2"
      :name="name2"
      :placeholder="placeholder2"
      v-model="value2"
      :class="{ invalid: errorMessage2 }"
    )
  .invalid-feedback(v-if="errorMessage1") {{ errorMessage1 }}
  .invalid-feedback(v-if="errorMessage2") {{ errorMessage2 }}
</template>

<script setup>
import { useField, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'

import RequiredBadge from '~/components/presentational/atoms/RequiredBadge.vue'

const props = defineProps({
  labelText: String,
  name1: String,
  name2: String,
  type1: String,
  type2: String,
  placeholder1: String,
  placeholder2: String,
  validation1: String,
  validation2: String,
  required: Boolean,
})

const {
  labelText,
  name1, name2,
  type1, type2,
  placeholder1, placeholder2,
  validation1, validation2,
  required
} = props

const { value: value1, errorMessage: errorMessage1 } = useField(
  name1,
  validation1,
)

const { value: value2, errorMessage: errorMessage2 } = useField(
  name2,
  validation2,
)

const names = {}
names[name1] = placeholder1
names[name2] = placeholder2
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