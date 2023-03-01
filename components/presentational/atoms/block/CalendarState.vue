<template lang="pug">
.calendar-state(
  :class="state"
) {{ stateSymbol }}
</template>

<script setup>
const props = defineProps({
  state: String,
});

const stateSymbol = computed(() => {
  let symbol;
  switch (props.state) {
    case "ok":
    case "work":
    case "lock":
      symbol = "○";
      break;
    case "ng":
      symbol = "-";
      break;
    case "rest":
      symbol = "×";
      break;
  }
  return symbol;
});
</script>

<style lang="sass" scoped>
.calendar-state
  font-size: 12px
  text-align: center
  width: 40px
  aspect-ratio: 1
  display: flex
  align-items: center
  justify-content: center
  &.ok
    color: $black
    background-color: $white
  &.ng, &.rest
    color: $black
    background-color: $grey
  &.work
    color: $white
    background-color: $primary
  &.lock
    color: $white
    background-color: $hint
</style>
