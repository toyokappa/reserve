<template lang="pug">
template(v-if="reserve.screen === 'program'")
  BlockText.mb-line プログラムを選択してください。
  BlockProgram.mb-line(
    v-for="program in programList"
    :key="program.id"
    :time="program.requireTime"
    :name="program.name"
    :hint="program.hint"
    @click.native="selectProgram(program)"
  )
  BlockText.mb-line 連絡先をご入力ください。
  FormNoAccount
template(v-else-if="reserve.screen === 'trainer'")
  BlockProgramSelected.mb-10(
    :time="reserve.program.requireTime"
    :name="reserve.program.name"
    @click.native="moveScreen('program')"
  )
  BlockText.mb-line トレーナーを選択してください。
  BlockTrainer.mb-line(
    v-for="trainer in trainerList"
    :key="trainer.id"
    :name="trainer.name"
    :comment="trainer.comment"
    @click.native="selectTrainer(trainer)"
  )
template(v-else-if="reserve.screen === 'schedule'")
  BlockProgramSelected.mb-line(
    :time="reserve.program.requireTime"
    :name="reserve.program.name"
    @click.native="moveScreen('program')"
  )
  BlockTrainerSelected.mb-10(
    :name="reserve.trainer.name"
    @click.native="moveScreen('trainer')"
  )
  BlockText.mb-line ご希望の日程を選択してください。
  CalendarReserve(@selectSchedule="selectSchedule")
template(v-else-if="reserve.screen === 'userInput'")
  BlockProgramSelected.mb-line(
    :time="reserve.program.requireTime"
    :name="reserve.program.name"
    @click.native="moveScreen('program')"
  )
  BlockTrainerSelected.mb-line(
    :name="reserve.trainer.name"
    @click.native="moveScreen('trainer')"
  )
  BlockScheduleSelected.mb-10(
    :schedule="reserve.schedule"
    @click.native="moveScreen('schedule')"
  )
  BlockText.mb-line 連絡先をご入力ください。
</template>

<script setup>
import CalendarReserve from '~/components/presentational/organizms/CalendarReserve.vue'
import FormNoAccount from '~/components/presentational/organizms/FormNoAccount.vue'
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockProgram from '~/components/presentational/molescules/block/Program.vue'
import BlockProgramSelected from '~/components/presentational/molescules/block/ProgramSelected.vue'
import BlockTrainer from '~/components/presentational/molescules/block/Trainer.vue'
import BlockTrainerSelected from '~/components/presentational/molescules/block/TrainerSelected.vue'
import BlockScheduleSelected from '~/components/presentational/molescules/block/ScheduleSelected.vue'

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
const selectSchedule = (schedule) => {
  reserve.schedule = schedule
  moveScreen('userInput')
}
</script>

<style scoped lang="sass">

</style>