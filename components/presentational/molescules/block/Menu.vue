<template lang="pug">
.block
  .block-title {{ title }}
  .block-menu
    Menu(
      v-for="menu in menuList"
      :key="menu.name"
      :name="menu.name"
      :link="menu.link"
      :icon="menu.icon"
      :external="menu.external"
    )
</template>

<script setup>
import Menu from "@/components/presentational/atoms/Menu.vue";

const props = defineProps({
  title: String,
  menuList: Array,
});
</script>

<style lang="sass" scoped>
.block-title
  font-size: 14px
  color: $hint
  background-color: $white
  padding: 10px 20px
.block-menu
  background-color: $white
  padding: 0 20px 20px
  display: flex
  flex-wrap: wrap
  .menu
    display: block
    text-align: center
    color: $black
    width: calc(100% / 3)
    .icon
      margin: 0 auto
    .name
      font-size: 10px
</style>
