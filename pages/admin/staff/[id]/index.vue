<template lang="pug">
FormStaffEdit(
  :firstName="trainer.first_name"
  :lastName="trainer.last_name"
  :displayName="trainer.display_name"
  :image="trainer.image.thumb.url"
  :comment="trainer.comment"
  :email="trainer.email"
  :frequency="trainer.frequency"
  @submitForm="submitForm"
)
</template>

<script setup>
import FormStaffEdit from "~/components/presentational/organizms/FormStaffEdit.vue";

const { id } = useRoute().params;
const { trainer } = await $fetch(`/admin/staffs/${id}`, {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useAdminAuth().getAuth(),
  },
});

const { $toast } = useNuxtApp();
const submitForm = async (event) => {
  try {
    useLoad().start();
    const { values, imageChanged } = event;
    const formData = new FormData();
    formData.append("trainer[last_name]", values.lastName);
    formData.append("trainer[first_name]", values.firstName);
    formData.append("trainer[display_name]", values.displayName);
    if (imageChanged.value) formData.append("trainer[image]", values.image);
    formData.append("trainer[comment]", values.comment);
    formData.append("trainer[email]", values.email);
    formData.append("trainer[frequency]", values.frequency);

    await $fetch(`/admin/staffs/${id}`, {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "PUT",
      headers: {
        Authorization: useAdminAuth().getAuth(),
      },
      body: formData,
    });
    $toast.info("スタッフの情報を変更しました");
    useRouter().push("/admin/staff");
  } catch (e) {
    $toast.error(`変更できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
</script>
