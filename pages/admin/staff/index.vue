<template lang="pug">
BlockText.mb-line トレーナー管理
BlockTrainer.mb-line(
  v-for="trainer in trainer_list"
  :key="trainer.id"
  :image="trainer.image.url"
  :name="trainer.name"
  :comment="trainer.comment"
)
.button-area.mt-10.mb-10
  PrimaryButton(@click.prevent="useRouter().push('/admin/staff/register')") トレーナーを追加する
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockTrainer from "~/components/presentational/molescules/block/Trainer.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";

const { trainer_list } = await $fetch("/admin/staffs", {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useAdminAuth().getAuth(),
  },
});
</script>
