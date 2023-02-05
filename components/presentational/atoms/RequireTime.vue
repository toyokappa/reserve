<template lang="pug">
.require-time(:style="styles")
  .icon
    img(src="@/assets/images/require-time.svg")
  .text {{ time }}分
</template>

<script setup lang="ts">
interface Props {
  time?: number | string,
  size?: number | string,
}

const props = withDefaults(defineProps<Props>(), {
  time: 60,
  size: 16,
})

const styles = computed(() => ({
  '--size': `${props.size}px`,
}))
</script>

<style lang="sass" scoped>
.require-time
  display: flex
  align-items: center
  .icon
    margin-right: 3px
    width: var(--size)
    height: auto
  .text
    font-size: var(--size)
</style>