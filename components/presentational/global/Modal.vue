<template lang="pug">
teleport(to="body")
  transition(name="fade")
    .modal(v-if="visible" @click.self="emits('close')")
      slot
</template>

<script setup lang="ts">
interface Props {
  visible?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
});

const emits = defineEmits();
</script>

<style lang="sass">
.modal
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  align-items: center
  justify-content: center
.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s ease

.fade-enter-from, .fade-leave-to
  opacity: 0
</style>
