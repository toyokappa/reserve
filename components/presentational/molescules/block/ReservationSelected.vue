<template lang="pug">
.reservation-block
  img.arrow(src="@/assets/images/arrow-right.svg")
  .schedule
    .date {{ schedule }}
    .program {{ programName }}
</template>

<script setup>
const props = defineProps({
  schedule: String,
  programName: String,
});
</script>

<style lang="sass" scoped>
.reservation-block
  background-color: $white
  padding: 22px 20px
  display: flex
  align-items: center
  .arrow
    margin-right: 10px
  .schedule
    font-size: 14px
    display: flex
    align-items: center
    .date
      margin-right: 10px
</style>
