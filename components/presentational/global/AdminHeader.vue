<template lang="pug">
header
  nuxt-link.logo(to="/admin") LOGO
  //- .menu-toggler(
  //-   v-if="loggedIn"
  //-   @click="logout()"
  //- )
  //-   img(src="@/assets/images/logout-white.svg")
</template>

<script setup>
// const { loggedIn, logout } = useStaffAuth();
</script>

<style lang="sass" scoped>
header
  width: 100%
  color: $white
  background-color: $primary
  padding: $block-padding
  display: flex
  align-items: center
  justify-content: space-between
  .logo
    color: $white
</style>
