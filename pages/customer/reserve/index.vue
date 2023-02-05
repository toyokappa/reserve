<template lang="pug">
template(v-if="reserve.screen === 'program'")
  BlockText.line-margin プログラムを選択してください。
  BlockProgram.line-margin(
    v-for="program in programList"
    :key="program.id"
    :time="program.requireTime"
    :name="program.name"
    :hint="program.hint"
    @click.native="selectProgram(program)"
  )
template(v-if="reserve.screen === 'trainer'")
  BlockProgramSelected.mb-10(
    :time="reserve.program.requireTime"
    :name="reserve.program.name"
    @click.native="moveScreen('program')"
  )
  BlockText.line-margin トレーナーを選択してください。
  BlockTrainer.line-margin(
    v-for="trainer in trainerList"
    :key="trainer.id"
    :name="trainer.name"
    :comment="trainer.comment"
    @click.native="selectTrainer(trainer)"
  )
template(v-if="reserve.screen === 'schedule'")
  BlockProgramSelected.line-margin(
    :time="reserve.program.requireTime"
    :name="reserve.program.name"
    @click.native="moveScreen('program')"
  )
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockProgram from '~/components/presentational/molescules/block/Program.vue'
import BlockProgramSelected from '~/components/presentational/molescules/block/ProgramSelected.vue'
import BlockTrainer from '~/components/presentational/molescules/block/Trainer.vue'

import sampleData from '@/data/sample'
const { programList, trainerList } = sampleData

const reserve = reactive({
  screen: 'program',
  program: null,
  trainer: null,
  schedule: null,
  name: null,
  email: null,
  tel: null,
  message: null,
})

const moveScreen = (screen) => {
  reserve.screen = screen
}
const selectProgram = (program) => {
  reserve.program = program
  moveScreen('trainer')
}
const selectTrainer = (trainer) => {
  reserve.trainer = trainer
  moveScreen('schedule')
}
</script>

<style scoped lang="sass">

</style>