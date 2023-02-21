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
const updateProfile = async (values) => {
  const formData = new FormData();
  formData.append("profile[image]", values.image);
  formData.append("profile[display_name]", values.name);
  formData.append("profile[comment]", values.comment);

  try {
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
  }
};
</script>
