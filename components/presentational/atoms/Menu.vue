<template lang="pug">
a.menu(
  v-if="external"
  :href="link"
  target="_blank"
  rel="noopener"
)
  img.icon(:src="icon")
  .name
    span {{ name }}
    img.external(src="@/assets/images/external-link.svg")
nuxt-link.menu(
  v-else
  :to="link"
)
  img.icon(:src="icon")
  .name {{ name }}
</template>

<script setup lang="ts">
interface Props {
  name: string;
  link: string;
  icon: string;
  external?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  external: false,
});
</script>

<style lang="sass" scoped>
.menu
  display: block
  text-align: center
  color: $black
  width: calc(100% / 3)
  .icon
    margin: 0 auto
  .name
    font-size: 10px
    display: flex
    align-items: center
    justify-content: center
    .external
      margin-left: 3px
</style>
