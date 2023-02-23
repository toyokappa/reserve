<template lang="pug">
BlockText.mb-line 変更したい項目を入力してください。
FormStaffProfileEdit(
  :name="currentStaff.display_name"
  :image="currentStaff.image.url"
  :comment="currentStaff.comment"
  @updateProfile="updateProfile"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import FormStaffProfileEdit from "~/components/presentational/organizms/FormStaffProfileEdit.vue";

definePageMeta({
  middleware: "staff-auth",
});

const { $toast } = useNuxtApp();
const currentStaff = useState("currentStaff");
const updateProfile = async (event) => {
  try {
    useLoad().start();
    const { values, imageChanged } = event;
    const formData = new FormData();
    if (imageChanged.value) formData.append("profile[image]", values.image);
    formData.append("profile[display_name]", values.name);
    formData.append("profile[comment]", values.comment);

    await $fetch(`/staff/profile`, {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "PUT",
      headers: {
        Authorization: useStaffAuth().getAuth(),
      },
      body: formData,
    });
    $toast.info("プロフィールを変更しました");
    useRouter().push("/staff");
  } catch (e) {
    $toast.error(`変更できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
</script>
