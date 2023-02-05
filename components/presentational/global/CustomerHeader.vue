<template lang="pug">
header
  .logo LOGO
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
  padding: 10px 20px
  display: flex
  align-items: center
  justify-content: space-between
</style>