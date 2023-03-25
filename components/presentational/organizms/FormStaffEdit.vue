<template lang="pug">
form
  BlockText.mb-line スタッフのプロフィールを入力してください。
  InputFieldHorizontal.mb-line(
    labelText="お名前"
    name1="lastName" name2="firstName"
    placeholder1="姓" placeholder2="名"
    type1="text" type2="text"
    autocomplete1="family-name" autocomplete2="given-name"
    validation1="required" validation2="required"
    required
  )
  InputField.mb-line(
    name="displayName"
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
  BlockText.mb-line スタッフのログイン情報を入力してください。
  InputField.mb-10(
    name="email"
    type="email"
    labelText="メールアドレス"
    autocomplete="email"
    validation="required|email"
    required
  )
  BlockText.mb-line スタッフの設定を入力してください。
  RangeField.mb-10(
    name="frequency"
    type="range"
    min="1"
    max="10"
    defaultValue="5"
    labelText="指名なし予約時の選出頻度"
  )
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid"
      @click.prevent="submitForm()"
    ) スタッフの情報を変更する
    .mb-10
      .delete(@click="emits('deleteStaff')") スタッフを削除する
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import InputFieldHorizontal from "~~/components/presentational/molescules/form/InputFieldHorizontal.vue";
import InputField from "~~/components/presentational/molescules/form/InputField.vue";
import RangeField from "~~/components/presentational/molescules/form/RangeField.vue";
import InputImage from "~~/components/presentational/molescules/form/InputImage.vue";
import Textarea from "~~/components/presentational/molescules/form/Textarea.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";

import { useForm } from "vee-validate";

const props = defineProps({
  firstName: String,
  lastName: String,
  displayName: String,
  image: [String, null],
  comment: String,
  email: String,
  frequency: Number,
});

const imageChanged = ref(false);
const { meta, values } = useForm({
  initialValues: props,
});

const onImageChange = (bool) => {
  imageChanged.value = bool;
};
const emits = defineEmits();
const submitForm = () => {
  emits("submitForm", { values, imageChanged });
};
</script>

<style lang="sass" scoped>
.delete
  font-size: 12px
  text-align: center
  color: $hint
</style>
