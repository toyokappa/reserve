<template lang="pug">
.calendar-date(:class="{ blue: day === '土', red: day === '日' }")
  .date {{ date }}
  .day ({{ day }})
</template>

<script setup>
const props = defineProps({
  date: String,
  day: String,
})
</script>

<style lang="sass" scoped>
.calendar-date
  font-size: 12px
  text-align: center
  color: $white
  background-color: $dark
  width: 40px
  aspect-ratio: 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  .date, .day
    line-height: 1.25
  &.blue
    background-color: $sat-blue
  &.red
    background-color: $sun-red
</style>