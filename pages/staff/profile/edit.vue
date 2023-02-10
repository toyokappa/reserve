<template lang="pug">
BlockText.mb-line 変更したい項目を入力してください。
FormStaffProfileEdit(
  :name="currentStaff.display_name"
  :photo="[]"
  :comment="currentStaff.comment"
  @updateProfile="updateProfile()"
)
</template>

<script setup>
import { format } from 'date-fns'

import BlockText from '~/components/presentational/molescules/block/Text.vue'
import FormStaffProfileEdit from '~/components/presentational/organizms/FormStaffProfileEdit.vue'

definePageMeta({
  middleware: 'staff-auth'
})

const currentStaff = useState('currentStaff')
const router = useRouter()

const updateProfile = () => {
  router.push('/staff')
}
</script>