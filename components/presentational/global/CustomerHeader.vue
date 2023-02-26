<template lang="pug">
header
  .logo(v-if="noLink")
    img(src="@/assets/images/logo.png")
  nuxt-link.logo(v-else to="/")
    img(src="@/assets/images/logo.png")
  .menu-toggler(
    v-if="loggedIn"
    @click="logout()"
  )
    img(src="@/assets/images/logout.svg")
</template>

<script setup>
const { loggedIn, logout } = useCustomerAuth();
console.log(useRoute().path);
const noLink = computed(
  () => !loggedIn.value && useRoute().path === "/reserve"
);
</script>

<style lang="sass" scoped>
header
  width: 100%
  color: $black
  background-color: $white
  border-top: 5px solid $primary
  padding: $block-padding
  display: flex
  align-items: center
  justify-content: space-between
  .logo img
    height: 30px
    width: auto
</style>
