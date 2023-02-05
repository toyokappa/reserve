<template lang="pug">
TextBlock.line-margin プログラムを選択してください。
ProgramBlock.line-margin(
  time="60"
  name="無料カウンセリング"
)
ProgramBlock(
  time="60"
  name="パーソナルトレーニング"
  hint="ご利用にはチケットが必要となります。"
)
</template>

<script setup>
import TextBlock from '~/components/presentational/molescules/TextBlock.vue'
import ProgramBlock from '~/components/presentational/molescules/ProgramBlock.vue'
</script>

<style scoped lang="sass">

</style>