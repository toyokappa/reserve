<template lang="pug">
.trainer-block
  img.thumbnail(:src="image || noUserIcon")
  .profile
    .name {{ name }}
    .comment(v-if="comment") {{ comment }}
</template>

<script setup>
import noUserIcon from "@/assets/images/no-user-icon.png";

const props = defineProps({
  image: String,
  name: String,
  comment: String,
});
</script>

<style lang="sass" scoped>
.trainer-block
  background-color: $white
  padding: $block-padding
  display: flex
  align-items: center
  .thumbnail
    width: 80px
    height: 80px
    border-radius: 50%
    background-color: $base
    margin-right: 20px
  .profile
    .comment
      font-size: 12px
      margin-top: 5px
</style>
