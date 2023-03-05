<template lang="pug">
BlockText.mb-line 顧客管理
BlockCustomer.mb-10(
  :image="customer.image.url"
  :name="customer.full_name"
)
BlockText.mb-line 設定中のグループ
BlockText.mb-line.group(v-for="group in assignedGroupList" :key="group.id")
  .name {{ group.name }}
  .unassign(@click="unassign(group.id)") グループから解除
.mb-10
BlockText.mb-line 未設定のグループ
BlockText.mb-line.group(v-for="group in unassignedGroupList" :key="group.id")
  .name {{ group.name }}
  .assign(@click="assign(group.id)") グループに設定
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockCustomer from "~/components/presentational/molescules/block/Person.vue";

const { id } = useRoute().params;
const { customer, assigned_group_list, unassigned_group_list } = await $fetch(
  `/admin/customers/${id}`,
  {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    headers: {
      Authorization: useAdminAuth().getAuth(),
    },
  }
);
const assignedGroupList = ref(assigned_group_list);
const unassignedGroupList = ref(unassigned_group_list);

const { $toast } = useNuxtApp();
const assign = async (groupId) => {
  try {
    useLoad().start();
    const data = await $fetch("/admin/customer_group", {
      method: "POST",
      baseURL: useRuntimeConfig().public.apiBaseURL,
      headers: {
        Authorization: useAdminAuth().getAuth(),
      },
      body: {
        group: {
          group_id: groupId,
          customer_id: id,
        },
      },
    });
    assignedGroupList.value = data.assigned_group_list;
    unassignedGroupList.value = data.unassigned_group_list;
    $toast.info("グループを設定しました");
  } catch (e) {
    $toast.error(`設定できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};

const unassign = async (groupId) => {
  const checkUnassign = await confirm("本当に解除しますか？");
  if (!checkUnassign) return;

  try {
    useLoad().start();
    const data = await $fetch("/admin/customer_group", {
      method: "DELETE",
      baseURL: useRuntimeConfig().public.apiBaseURL,
      headers: {
        Authorization: useAdminAuth().getAuth(),
      },
      body: {
        group: {
          group_id: groupId,
          customer_id: id,
        },
      },
    });
    assignedGroupList.value = data.assigned_group_list;
    unassignedGroupList.value = data.unassigned_group_list;
    $toast.info("グループの設定を解除しました");
  } catch (e) {
    $toast.error(`解除できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
</script>

<style lang="sass">
.group
  display: flex
  align-items: center
  justify-content: space-between
  .assign, .unassign
    font-size: 12px
  .assign
    color: $primary
  .unassign
    color: $red
</style>
