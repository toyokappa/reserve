<template lang="pug">
BlockText.mb-line 希望のシフトを入力してください。
CalendarShift
</template>
  
<script setup>
import CalendarShift from '~/components/presentational/organizms/CalendarShift.vue'
import BlockText from '~/components/presentational/molescules/block/Text.vue'

definePageMeta({
  middleware: 'staff-auth'
})
</script>

<style scoped lang="sass">

</style>