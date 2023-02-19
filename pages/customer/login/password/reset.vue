<template lang="pug">
BlockText.mb-line 新しいパスワードを入力してください。
FormPassword(
  buttonText="パスワードを再設定する"
  @submitForm="submitForm"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import FormPassword from "~~/components/presentational/organizms/FormPassword.vue";

const router = useRouter();
const { token } = useRoute().params;
const submitForm = async (values) => {
  await $fetch(`/customer/auth/password`, {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    method: "PUT",
    headers: {
      Authorization: useCustomerAuth().getAuth(),
    },
    body: {
      password: values.password,
      password_confirmation: values.password_confirmation,
      reset_password_token: token,
    },
  });
  useRouter().push("/login");
};
</script>

<style lang="sass" scoped></style>
