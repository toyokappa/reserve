<template lang="pug">
BlockText.mb-line 変更したい項目を入力してください。
FormProfileEdit(
  :lastName="profile.lastName"
  :firstName="profile.firstName"
  :lastNameKana="profile.lastNameKana"
  :firstNameKana="profile.firstNameKana"
  :tel="profile.tel"
  :postcode="profile.postcode"
  :address="profile.address"
  @updateProfile="updateProfile()"
)
</template>

<script setup>
import { format } from 'date-fns'

import BlockText from '~/components/presentational/molescules/block/Text.vue'
import FormProfileEdit from '~/components/presentational/organizms/FormProfileEdit.vue'

import sampleData from '~/data/sample'
const { currentCustomer } = sampleData

const router = useRouter()

const profile = reactive({
  lastName: currentCustomer.lastName,
  firstName: currentCustomer.firstName,
  lastNameKana: currentCustomer.lastNameKana,
  firstNameKana: currentCustomer.firstNameKana,
  tel: currentCustomer.tel,
  postcode: currentCustomer.postcode,
  address: currentCustomer.address,
})

const updateProfile = () => {
  router.push('/')
}
</script>