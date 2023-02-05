<template lang="pug">
TextBlock.line-margin プログラムを選択してください。
ProgramBlock.line-margin(
  v-for="program in programList"
  :key="program.id"
  :time="program.requireTime"
  :name="program.name"
  :hint="program.hint"
)
</template>

<script setup>
import TextBlock from '~/components/presentational/molescules/TextBlock.vue'
import ProgramBlock from '~/components/presentational/molescules/ProgramBlock.vue'

import sampleData from '@/data/sample'
const { programList } = sampleData
</script>

<style scoped lang="sass">

</style>