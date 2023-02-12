<template lang="pug">
.reservation-block
  .schedule.mb-5 {{ schedule }}
  .program.mb-5
    RequiredTime(:time="time" size="16")
    .name {{ name }}
  .trainer(v-if="trainer") トレーナー: {{ trainer }}
  .trainee(v-if="trainee") {{ trainee }}
</template>

<script setup>
import RequiredTime from '~/components/presentational/atoms/RequiredTime.vue';

const props = defineProps({
  schedule: String,
  time: [Number, String],
  name: String,
  trainer: String,
  trainee: String,
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
  .trainee
    font-weight: bold
</style>