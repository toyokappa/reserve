<template lang="pug">
BlockText.mb-line 希望のシフトを入力してください。
CalendarShift.mb-10
.button-area
  PrimaryButton.mb-10(@click="completeShift()") シフト変更を確定する
</template>
  
<script setup>
import CalendarShift from '~/components/presentational/organizms/CalendarShift.vue'
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import PrimaryButton from '~~/components/presentational/atoms/button/Primary.vue';

definePageMeta({
  middleware: 'staff-auth'
})
const router = useRouter()
const completeShift = () => {
  router.push('/staff')
}
</script>

<style scoped lang="sass">

</style>