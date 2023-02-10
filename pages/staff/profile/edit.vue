<template lang="pug">
BlockText.mb-line 変更したい項目を入力してください。
FormStaffProfileEdit(
  :name="profile.name"
  :photo="[]"
  :comment="profile.comment"
  @updateProfile="updateProfile()"
)
</template>

<script setup>
import { format } from 'date-fns'

import BlockText from '~/components/presentational/molescules/block/Text.vue'
import FormStaffProfileEdit from '~/components/presentational/organizms/FormStaffProfileEdit.vue'

import sampleData from '~/data/sample'
const { currentStaff } = sampleData

definePageMeta({
  middleware: 'staff-auth'
})
const router = useRouter()

const profile = reactive({
  name: currentStaff.name,
  comment: currentStaff.comment,
})

const updateProfile = () => {
  router.push('/staff')
}
</script>