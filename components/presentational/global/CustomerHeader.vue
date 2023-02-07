<template lang="pug">
header
  nuxt-link.logo(to="/") LOGO
  .menu-toggler
    img(src="@/assets/images/menu-toggler.svg")
</template>

<script setup>
</script>

<style lang="sass" scoped>
header
  width: 100%
  color: $black
  background-color: $white
  padding: $block-padding
  display: flex
  align-items: center
  justify-content: space-between
  .logo
    color: $black
</style>