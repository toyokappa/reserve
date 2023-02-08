<template lang="pug">
.reservation-block
  .schedule.mb-5 {{ schedule }}
  .program.mb-5
    RequireTime(:time="time" size="16")
    .name {{ name }}
  .trainer トレーナー: {{ trainer }}
</template>

<script setup>
import RequireTime from '~/components/presentational/atoms/RequireTime.vue';

const props = defineProps({
  schedule: String,
  time: [Number, String],
  name: String,
  trainer: String,
})
</script>

<style lang="sass" scoped>
.reservation-block
  background-color: $white
  padding: $block-padding
  .schedule
    font-weight: bold
  .program
    display: flex
    .name
      margin-left: 10px
  .trainer
    color: $hint
    font-size: 14px
</style>