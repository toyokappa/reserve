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
  )
  Textarea.mb-10(
    name="comment"
    labelText="公開メッセージ"
  )
  BlockText.mb-line スタッフのログイン情報を入力してください。
  InputField.mb-line(
    name="email"
    type="email"
    labelText="メールアドレス"
    autocomplete="email"
    validation="required|email"
    required
  )
  InputField.mb-10(
    name="password"
    type="password"
    labelText="パスワード"
    validation="required|min:8"
    required
  )
  BlockText.mb-line スタッフの設定を入力してください。
  RangeField.mb-10(
    name="frequency"
    type="range"
    min="1"
    max="10"
    labelText="指名なし予約時の選出頻度"
  )
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid"
      @click.prevent="submitForm()"
    ) スタッフを追加する
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

const { meta, values } = useForm({
  initialValues: {
    comment: "",
    frequency: 5,
  },
});

const emits = defineEmits();
const submitForm = () => {
  emits("submitForm", values);
};
</script>
