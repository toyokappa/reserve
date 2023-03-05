<template lang="pug">
NuxtLayout(:name="layoutName")
  NuxtPage
Loading
</template>

<script setup>
import Loading from "~/components/presentational/global/Loading.vue";

const route = useRoute();
const layoutName = computed(() => {
  if (route.name.startsWith("customer")) {
    return "customer";
  } else if (route.name.startsWith("staff")) {
    return "staff";
  } else if (route.name.startsWith("admin")) {
    return "admin";
  }
});
</script>

<style lang="sass"></style>
