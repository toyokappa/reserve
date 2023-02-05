<template lang="pug">
header
  .logo LOGO
  .menu-toggler
    img(src="@/assets/images/menu-toggler-white.svg")
</template>

<script setup>
</script>

<style lang="sass" scoped>
header
  width: 100%
  color: $white
  background-color: $dark
  padding: $block-padding
  display: flex
  align-items: center
  justify-content: space-between
</style>