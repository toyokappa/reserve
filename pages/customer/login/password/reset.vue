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
  middleware: "customer-auth",
});

const { $toast } = useNuxtApp();
const { query } = useRoute();
const { token } = query;
const submitForm = async (values) => {
  try {
    useLoad().start();
    await $fetch(`/customer/auth/password`, {
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
    $toast.info("パスワードを再設定しました");
    useRouter().push("/login");
  } catch (e) {
    $toast.error(`再設定できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
</script>

<style lang="sass" scoped></style>
