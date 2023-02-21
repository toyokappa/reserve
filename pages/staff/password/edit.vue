<template lang="pug">
BlockText.mb-line 新しいパスワードを入力してください。
FormPassword(
  buttonText="パスワードを変更する"
  @submitForm="updatePassword"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import FormPassword from "~~/components/presentational/organizms/FormPassword.vue";

definePageMeta({
  middleware: "staff-auth",
});

const { $toast } = useNuxtApp();
const updatePassword = async (values) => {
  try {
    await $fetch("/staff/auth/password", {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "PATCH",
      headers: {
        Authorization: useStaffAuth().getAuth(),
      },
      body: values,
    });
    $toast.info("パスワードを変更しました");
    useRouter().push("/staff");
  } catch (e) {
    $toast.error(`変更できませんでした(code: ${e.status})`);
    throw e;
  }
};
</script>

<style lang="sass" scoped></style>
