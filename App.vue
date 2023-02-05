<template lang="pug">
NuxtLayout(:name="layoutName")
  NuxtPage
</template>

<script setup>
const $route = useRoute()
const layoutName = computed(() => {
  return $route.name.startsWith('customer') ? 'customer' : 'staff'
})
</script>

<style lang="sass">
body
  background-color: $base
.mb-line
  margin-bottom: 2px
.mb-10
  margin-bottom: 10px
.mb-20
  margin-bottom: 20px
</style>