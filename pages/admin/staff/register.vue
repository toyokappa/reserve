<template lang="pug">
FormStaffRegister(
  @submitForm="submitForm"
)
</template>

<script setup>
import FormStaffRegister from "~/components/presentational/organizms/FormStaffRegister.vue";

const { $toast } = useNuxtApp();
const submitForm = async (values) => {
  try {
    useLoad().start();
    const formData = new FormData();
    formData.append("sign_up[last_name]", values.lastName);
    formData.append("sign_up[first_name]", values.firstName);
    formData.append("sign_up[display_name]", values.displayName);
    formData.append("sign_up[comment]", values.comment);
    formData.append("sign_up[image]", values.image);
    formData.append("sign_up[email]", values.email);
    formData.append("sign_up[password]", values.password);
    formData.append("sign_up[frequency]", values.frequency);

    await $fetch(`/staff/auth`, {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "POST",
      headers: {
        Authorization: useAdminAuth().getAuth(),
      },
      body: formData,
    });
    $toast.info("スタッフを追加しました");
    useRouter().push("/admin/staff");
  } catch (e) {
    $toast.error(`追加できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
</script>
