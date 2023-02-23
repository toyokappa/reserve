<template lang="pug">
form
  InputField.mb-line(
    name="name"
    type="text"
    labelText="表示名"
    validation="required"
    required
  )
  InputImage.mb-line(
    name="image"
    labelText="プロフィール写真"
    :imageChanged="imageChanged"
    @onImageChange="onImageChange"
  )
  Textarea.mb-10(
    name="comment"
    labelText="公開メッセージ"
  )
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid"
      @click.prevent="updateProfile()"
    ) プロフィールを更新する
</template>

<script setup>
import InputField from "~~/components/presentational/molescules/form/InputField.vue";
import InputImage from "~~/components/presentational/molescules/form/InputImage.vue";
import Textarea from "~~/components/presentational/molescules/form/Textarea.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";

import { useForm } from "vee-validate";

const props = defineProps({
  name: String,
  image: [String, null],
  comment: String,
});

const imageChanged = ref(false);
const { meta, values } = useForm({
  initialValues: props,
});

const onImageChange = (bool) => {
  imageChanged.value = bool;
};

const emits = defineEmits();
const updateProfile = () => {
  emits("updateProfile", { values, imageChanged });
};
</script>
