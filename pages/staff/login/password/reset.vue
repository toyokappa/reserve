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

definePageMeta({
  middleware: "staff-auth",
});
const { query } = useRoute();
const { token } = query;
const submitForm = async (values) => {
  await $fetch(`/staff/auth/password`, {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    method: "PUT",
    headers: {
      "access-token": query["access-token"],
      client: query.client,
      uid: query.uid,
    },
    body: {
      password: values.password,
      password_confirmation: values.password_confirmation,
    },
  });
  useRouter().push("/staff/login");
};
</script>

<style lang="sass" scoped></style>
