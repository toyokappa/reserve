<template lang="pug">
.program-block
  img.thumbnail(:src="defaultProgramImage")
  .menu
    .menu-main
      RequiredTime(:time="time")
      .menu-name {{ name }}
    .menu-hint(v-if="hint") {{ hint }}
</template>

<script setup>
import RequiredTime from "~/components/presentational/atoms/RequiredTime.vue";
import defaultProgramImage from "~/assets/images/default-program-image.jpg";

const props = defineProps({
  time: Number | String,
  name: String,
  hint: String,
});
</script>

<style lang="sass" scoped>
.program-block
  background-color: $white
  padding: $block-padding
  display: flex
  align-items: center
  .thumbnail
    width: 80px
    height: 80px
    border-radius: 50%
    background-color: $base
    object-fit: cover
    object-position: center center
    margin-right: 20px
  .menu
    .menu-main
      display: flex
      align-items: center
      .menu-name
        margin-left: 10px
    .menu-hint
      font-size: 12px
      color: $hint
      margin-top: 5px
</style>
