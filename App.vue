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
  font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
  background-color: $base
a
  color: $primary
  text-decoration: none
.emphasis-red
  font-weight: bold
  color: $red
.ms-line
  margin-left: 2px
.me-line
  margin-right: 2px
.mb-line
  margin-bottom: 2px
.mb-5
  margin-bottom: 5px
.mb-10
  margin-bottom: 10px
.mb-20
  margin-bottom: 20px
.mb-30
  margin-bottom: 30px
.button-area
  padding: 0 20px
.complete-page
  text-align: center
  letter-spacing: 0.05em
  padding: 50px 0 80px
</style>