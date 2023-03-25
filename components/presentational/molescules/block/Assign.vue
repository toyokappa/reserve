<template lang="pug">
BlockText.assign-block
  template(v-if="assigned")
    .name {{ name }}
    .unassign(@click="emits('unassign')") {{ unassignText }}
  template(v-else) 
    .name {{ name }}
    .assign(@click="emits('assign')") {{ assignText }}
</template>

<script setup lang="ts">
import BlockText from "~/components/presentational/molescules/block/Text.vue";

interface Props {
  assigned?: boolean;
  name: string;
  assignText?: string;
  unassignText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  assigned: false,
});

const emits = defineEmits();
</script>

<style lang="sass" scoped>
.assign-block
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
