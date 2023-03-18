<template lang="pug">
.person-block
  img.arrow(
    v-if="forSelect"
    src="@/assets/images/arrow-right.svg"
  )
  img.thumbnail(:src="image || noUserIcon")
  .profile
    .name {{ name }}
  .for-assign(v-if="forAssign")
    .assigned(
      v-if="assigned"
      @click="emits('unassign', id)"
    ) アサインを解除
    .wait(
      v-else
      @click="emits('assign', id)"
    ) アサインする
</template>

<script setup lang="ts">
// @ts-ignore
import noUserIcon from "@/assets/images/no-user-icon.png";

interface Props {
  image?: string | null;
  id?: string | number;
  name?: string;
  forSelect?: boolean;
  forAssign?: boolean;
  assigned?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  forSelect: false,
  forAssign: false,
  assigned: false,
});

const emits = defineEmits();
</script>

<style lang="sass" scoped>
.person-block
  background-color: $white
  padding: $block-padding
  display: flex
  align-items: center
  .arrow
    margin-right: 10px
  .thumbnail
    width: 40px
    height: 40px
    object-fit: cover
    object-position: center center
    border-radius: 50%
    background-color: $base
    margin-right: 10px
  .profile
    .name
      font-size: 14px
  .for-assign
    font-size: 12px
    margin-left: auto
    .assigned
      color: $red
    .wait
      color: $primary
</style>
