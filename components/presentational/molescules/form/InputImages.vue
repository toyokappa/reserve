<template lang="pug">
.input-block
  label.input-label(:for="name")
    span.text {{ labelText }}
    RequiredBadge(v-if="required")
  .hint
    img.icon(src="@/assets/images/question-hint.svg")
    .text 本人確認書類ガイド
  input.hidden-field(
    type="file"
    :id="name"
    :name="name"
    ref="input"
    accept="image/*"
    multiple
    @change="onImageUploaded"
  )
  PreviewImages(:images="value")
  ImageUploadButton(@click.prevent="input.click()")
  .invalid-feedback(v-if="errorMessage") {{ errorMessage }}
</template>

<script setup>
import { useField, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'

import RequiredBadge from '~/components/presentational/atoms/RequiredBadge.vue'
import ImageUploadButton from '~/components/presentational/atoms/button/ImageUpload.vue'
import PreviewImages from '~/components/presentational/atoms/PreviewImages.vue'

const props = defineProps({
  name: String,
  type: String,
  labelText: String,
  required: Boolean,
})

const { name, type, labelText, required } = props

const validation = (value) => {
  if(value.length === 0) {
    return `${labelText}は必須項目です`
  }
  const regex = /\.(jpg|svg|jpeg|png|bmp|gif|webp)$/i;
  if(!value.every(file => regex.test(file.name))) {
    return `${labelText}は有効な画像形式ではありません`
  }
  if(!value.every(file => file.size < (20 * 1024 * 1024))){
    return `${labelText}の容量は20MBまでです`
  }

  return true
}

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

const input = ref()
const onImageUploaded = (e) => {
  const images = Array.from(e.target.files)
  value.value = images
}
</script>

<style lang="sass" scoped>
.hint
  display: flex
  align-items: center
  margin-bottom: 3px
  .icon
    width: 14px
    height: auto
    margin-right: 3px
  .text
    font-size: 12px
    color: $hint
</style>