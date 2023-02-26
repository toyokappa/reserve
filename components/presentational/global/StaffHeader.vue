<template lang="pug">
header
  nuxt-link.logo(to="/staff")
    img(src="@/assets/images/logo.png")
  .menu-toggler(
    v-if="loggedIn"
    @click="logout()"
  )
    img(src="@/assets/images/logout-white.svg")
</template>

<script setup>
const { loggedIn, logout } = useStaffAuth();
</script>

<style lang="sass" scoped>
header
  width: 100%
  color: $white
  background-color: $dark
  border-top: 5px solid $primary
  padding: $block-padding
  display: flex
  align-items: center
  justify-content: space-between
  .logo img
    height: 30px
    width: auto
</style>
