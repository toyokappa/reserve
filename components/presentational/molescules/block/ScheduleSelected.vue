<template lang="pug">
.schedule-block
  img.arrow(src="@/assets/images/arrow-right.svg")
  .schedule {{ scheduleToS }}
</template>

<script setup>
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

const props = defineProps({
  schedule: Date,
})

const scheduleToS = format(props.schedule, 'yyyy/M/d(EEEEE) H:mm~', { locale: ja })
</script>

<style lang="sass" scoped>
.schedule-block
  background-color: $white
  padding: 22px 20px
  display: flex
  align-items: center
  .arrow
    margin-right: 10px
  .schedule
    font-size: 14px
</style>