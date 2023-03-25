<template lang="pug">
BlockText.mb-line 顧客管理
BlockCustomer.mb-10(
  :image="customer.image.thumb.url"
  :name="customer.full_name"
)
BlockText.mb-line 設定中のグループ
BlockAssign.mb-line(
  v-for="group in assignedGroupList"
  :key="group.id"
  :name="group.name"
  unassignText="グループから解除"
  assigned
  @unassign="unassign(group.id)"
)
.mb-10
BlockText.mb-line 未設定のグループ
BlockAssign.mb-line(
  v-for="group in unassignedGroupList"
  :key="group.id"
  :name="group.name"
  assignText="グループに設定"
  @assign="assign(group.id)"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockCustomer from "~/components/presentational/molescules/block/Person.vue";
import BlockAssign from "~/components/presentational/molescules/block/Assign.vue";

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

<style lang="sass" scoped></style>
