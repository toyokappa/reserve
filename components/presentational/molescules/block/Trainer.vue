<template lang="pug">
.trainer-block
  .thumbnail
  .profile
    .name {{ name }}
    .comment(v-if="comment") {{ comment }}
</template>

<script setup>
const props = defineProps({
  name: String,
  comment: String,
})
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