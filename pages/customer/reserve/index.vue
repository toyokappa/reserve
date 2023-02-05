<template lang="pug">
TextBlock.line-margin プログラムを選択してください。
ProgramBlock.line-margin(
  v-for="program in programList"
  :key="program.id"
  :time="program.requireTime"
  :name="program.name"
  :hint="program.hint"
)
TextBlock.line-margin トレーナーを選択してください。
TrainerBlock.line-margin(
  name="指名なし"
)
TrainerBlock.line-margin(
  v-for="trainer in trainerList"
  :key="trainer.id"
  :name="trainer.name"
  :comment="trainer.comment"
)
</template>

<script setup>
import TextBlock from '~/components/presentational/molescules/TextBlock.vue'
import ProgramBlock from '~/components/presentational/molescules/ProgramBlock.vue'
import TrainerBlock from '~/components/presentational/molescules/TrainerBlock.vue'

import sampleData from '@/data/sample'
const { programList, trainerList } = sampleData

const reserveInput = reactive({
  program: null,
  trainer: null,
  schedule: null,
  name: null,
  email: null,
  tel: null,
  message: null,
})
</script>

<style scoped lang="sass">

</style>