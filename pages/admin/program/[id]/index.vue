<template lang="pug">
BlockText.mb-line プログラム管理
BlockProgram.mb-10(
  :key="program.id"
  :time="program.required_time"
  :name="program.name"
  :hint="program.description"
)
BlockText.mb-line アサイン中のトレーナー
BlockTrainerSelected.mb-line(
  v-for="trainer in assignedTrainerList"
  :key="trainer.id"
  :id="trainer.id"
  :name="trainer.name"
  :image="trainer.image.thumb.url"
  forAssign
  assigned
  @unassign="unassign"
)
.mb-10
BlockText.mb-line 待機中のトレーナー
BlockTrainerSelected.mb-line(
  v-for="trainer in waitTrainerList"
  :key="trainer.id"
  :id="trainer.id"
  :name="trainer.name"
  :image="trainer.image.thumb.url"
  forAssign
  @assign="assign"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockProgram from "~/components/presentational/molescules/block/Program.vue";
import BlockTrainerSelected from "~/components/presentational/molescules/block/PersonSelected.vue";

const { id } = useRoute().params;
const { program, assigned_trainer_list, wait_trainer_list } = await $fetch(
  `/admin/programs/${id}`,
  {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    headers: {
      Authorization: useAdminAuth().getAuth(),
    },
  }
);
const assignedTrainerList = ref(assigned_trainer_list);
const waitTrainerList = ref(wait_trainer_list);

const { $toast } = useNuxtApp();
const assign = async (staffId) => {
  try {
    useLoad().start();
    const data = await $fetch("/admin/program_staff", {
      method: "POST",
      baseURL: useRuntimeConfig().public.apiBaseURL,
      headers: {
        Authorization: useAdminAuth().getAuth(),
      },
      body: {
        assign: {
          program_id: program.id,
          staff_id: staffId,
        },
      },
    });
    assignedTrainerList.value = data.assigned_trainer_list;
    waitTrainerList.value = data.wait_trainer_list;
    $toast.info("トレーナーをアサインしました");
  } catch (e) {
    $toast.error(`アサインできませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
const unassign = async (staffId) => {
  const checkUnassign = await confirm("本当に解除しますか？");
  if (!checkUnassign) return;

  try {
    useLoad().start();
    const data = await $fetch("/admin/program_staff", {
      method: "DELETE",
      baseURL: useRuntimeConfig().public.apiBaseURL,
      headers: {
        Authorization: useAdminAuth().getAuth(),
      },
      body: {
        assign: {
          program_id: program.id,
          staff_id: staffId,
        },
      },
    });
    assignedTrainerList.value = data.assigned_trainer_list;
    waitTrainerList.value = data.wait_trainer_list;
    $toast.info("トレーナーのアサインを解除しました");
  } catch (e) {
    $toast.error(`アサインを解除できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
</script>
