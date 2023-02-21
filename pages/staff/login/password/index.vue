<template lang="pug">
BlockText.mb-line ご登録のメールアドレスを入力してくだい。
form
  InputField.mb-10(
    name="email"
    type="email"
    labelText="メールアドレス"
    validation="required|email"
  )
  .button-area
    PrimaryButton.mb-10(
      :disabled="!meta.valid"
      @click.prevent="submitForm()"
    ) パスワード再設定メールを送信する
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import InputField from "~~/components/presentational/molescules/form/InputField.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";

import { useForm } from "vee-validate";

definePageMeta({
  middleware: "staff-auth",
});
const { meta, values } = useForm();
const submitForm = async () => {
  try {
    await $fetch(`/staff/auth/password`, {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "POST",
      headers: {
        Authorization: useStaffAuth().getAuth(),
      },
      body: {
        email: values.email,
        redirect_url: "http://localhost:3000/staff/login/password/reset", // TODO: 環境によって変える
      },
    });
    useRouter().push("/staff/login/password/sendMail");
  } catch (e) {
    if (e.status === 404) {
      // メールの存在を検知されないように正常系と同じ処理をする
      useRouter().push("/staff/login/password/sendMail");
    } else {
      useNuxtApp().$toast.error(`送信できませんでした(code: ${e.status})`);
      throw e;
    }
  }
};
</script>

<style lang="sass" scoped></style>
