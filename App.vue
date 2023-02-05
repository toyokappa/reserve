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

<style lang="sass" scoped>

</style>