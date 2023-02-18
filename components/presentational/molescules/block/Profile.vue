<template lang="pug">
.profile-block
  img.avatar(v-if="image" :src="image")
  .no-avatar(v-else)
  .text
    .name.mb-5 {{ name }}
    .email {{ email }}
</template>

<script setup>
const props = defineProps({
  name: String,
  email: String,
  image: String,
});
</script>

<style lang="sass" scoped>
.profile-block
  background-color: $white
  padding: 0 30px
  display: flex
  align-items: center
  .avatar
    width: 100px
    height: 100px
    object-fit: cover
    object-position: center center
    border: 5px solid $white
    border-radius: 50%
    margin-right: 20px
    transform: translateY(20px)
  .no-avatar
    width: 100px
    height: 100px
    background-color: $grey
    border: 5px solid $white
    border-radius: 50%
    margin-right: 20px
    transform: translateY(20px)
</style>
