<template lang="pug">
form
  .input-block.mb-line
    label.input-label(for="name")
      span.text お名前
      RequiredBadge
    input.input-field(
      type="text"
      id="name"
      name="name"
      v-model="name"
      :class="{ invalid: nameError }"
    )
    .invalid-feedback(v-if="nameError") {{ nameError }}
  .input-block.mb-line
    label.input-label(for="email")
      span.text メールアドレス
      RequiredBadge
    input.input-field(
      type="email"
      id="email"
      name="email"
      v-model="email"
      :class="{ invalid: emailError }"
    )
    .invalid-feedback(v-if="emailError") {{ emailError }}
  .input-block.mb-line
    label.input-label(for="tel")
      span.text 電話番号
      RequiredBadge
    input.input-field(
      type="tel"
      id="tel"
      name="tel"
      v-model="tel"
      :class="{ invalid: telError }"
    )
    .invalid-feedback(v-if="telError") {{ telError }}
  .input-block
    label.input-label(for="message") ご質問など
    textarea.input-field(
      rows="3"
      id="message"
      name="message"
      v-model="message"
    )
</template>

<script setup>
import RequiredBadge from '~~/components/presentational/atoms/RequiredBadge.vue'

import { localize } from '@vee-validate/i18n'
import { configure, useField, useForm } from 'vee-validate'

const { meta } = useForm()
const { value: name, errorMessage: nameError } = useField(
  'name',
  'required',
)
const { value: email, errorMessage: emailError } = useField(
  'email',
  'required|email',
)
const { value: tel, errorMessage: telError } = useField(
  'tel',
  'required',
)
const { value: message } = useField(
  'message'
)

configure({
  generateMessage: localize({
    ja: {
      names: {
        name: 'お名前',
        email: 'メールアドレス',
        tel: '電話番号',
        message: 'ご質問など',
      }
    }
  })
})
</script>

<style lang="sass" scoped>
.input-block
  background-color: $white
  padding: $block-padding
  .input-label
    font-size: 12px
    .text
      margin-right: 3px
  .input-field
    font-size: 16px
    width: 100%
    padding: 5px
    border: 1px solid $hint
    border-radius: 3px
    display: block
    &.invalid
      border-color: $red
  .invalid-feedback
    font-size: 12px
    color: $red
</style>