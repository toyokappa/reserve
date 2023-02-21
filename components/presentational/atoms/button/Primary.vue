<template lang="pug">
button.primary-button(:class="{ 'full-width': fullWidth }")
  slot
</template>

<script setup lang="ts">
interface Props {
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  fullWidth: true,
});
</script>

<style lang="sass">
.primary-button
  white-space: nowrap
  color: $white
  background-color: $primary
  padding: 8px 16px
  border-radius: 3px
  &.full-width
    width: 100%
  &[disabled]
    background-color: $hint
</style>
