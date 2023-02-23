<template lang="pug">
BlockText.mb-line プログラム管理
BlockProgram.mb-line(
  v-for="program in program_list"
  :key="program.id"
  :time="program.required_time"
  :name="program.name"
  :hint="program.description"
)
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockProgram from "~/components/presentational/molescules/block/Program.vue";

const { program_list } = await $fetch("/admin/programs", {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useAdminAuth().getAuth(),
  },
});
</script>
