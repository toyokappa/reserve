<template lang="pug">
.input-block
  label.input-label(:for="name")
    span.text {{ labelText }}
    RequiredBadge(v-if="required")
  input.hidden-field(
    type="file"
    :id="name"
    :name="name"
    ref="input"
    accept="image/*"
    @change="onImageUploaded"
  )
  PreviewImage(:image="value")
  ImageUploadButton(@click.prevent="input.click()")
  .invalid-feedback(v-if="errorMessage") {{ errorMessage }}
</template>

<script setup>
import { useField, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

import RequiredBadge from "~/components/presentational/atoms/RequiredBadge.vue";
import HintText from "~/components/presentational/atoms/HintText.vue";
import ImageUploadButton from "~/components/presentational/atoms/button/ImageUpload.vue";
import PreviewImage from "~/components/presentational/atoms/PreviewImage.vue";

const props = defineProps({
  name: String,
  type: String,
  labelText: String,
  required: Boolean,
  imageChanged: Boolean,
});

const { name, type, labelText, required } = props;

const validation = (value) => {
  if (!props.imageChanged) return true;

  if (value && required) {
    return `${labelText}は必須項目です`;
  }
  const regex = /\.(jpg|svg|jpeg|png|bmp|gif|webp)$/i;
  if (value && !regex.test(value.name)) {
    return `${labelText}は有効な画像形式ではありません`;
  }
  if (value && value.size > 20 * 1024 * 1024) {
    return `${labelText}の容量は20MBまでです`;
  }

  return true;
};

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

const input = ref();
const emits = defineEmits();
const onImageUploaded = (e) => {
  const image = e.target.files[0];
  value.value = image;
  emits("onImageChange", true);
};
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
