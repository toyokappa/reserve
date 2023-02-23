<template lang="pug">
BlockText.mb-line 変更したい項目を入力してください。
FormProfileEdit(
  :lastName="currentCustomer.last_name"
  :firstName="currentCustomer.first_name"
  :lastNameKana="currentCustomer.last_name_kana"
  :firstNameKana="currentCustomer.first_name_kana"
  :tel="currentCustomer.tel"
  :postcode="currentCustomer.postcode"
  :address="currentCustomer.address"
  :image="currentCustomer.image.url"
  @updateProfile="updateProfile"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import FormProfileEdit from "~/components/presentational/organizms/FormProfileEdit.vue";

definePageMeta({
  middleware: "customer-auth",
});

const { $toast } = useNuxtApp();
const { currentCustomer } = useCustomerAuth();
const updateProfile = async (event) => {
  const { values, imageChanged } = event;
  const formData = new FormData();
  if (imageChanged.value) formData.append("profile[image]", values.image);
  formData.append("profile[first_name]", values.firstName);
  formData.append("profile[last_name]", values.lastName);
  formData.append("profile[first_name_kana]", values.firstNameKana);
  formData.append("profile[last_name_kana]", values.lastNameKana);
  formData.append("profile[tel]", values.tel);
  formData.append("profile[postcode]", values.postcode);
  formData.append("profile[address]", values.address);

  try {
    await $fetch(`/customer/profile`, {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "PUT",
      headers: {
        Authorization: useCustomerAuth().getAuth(),
      },
      body: formData,
    });
    $toast.info("プロフィールを変更しました");
    useRouter().push("/");
  } catch (e) {
    $toast.error(`変更できませんでした(code: ${e.status})`);
    throw e;
  }
};
</script>
