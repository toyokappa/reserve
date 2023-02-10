<template lang="pug">
BlockText.mb-line 変更したい項目を入力してください。
FormProfileEdit(
  :lastName="currentCustomer.last_name"
  :firstName="currentCustomer.first_name"
  :lastNameKana="currentCustomer.last_name_kana"
  :firstNameKana="currentCustomer.first_name_kana"
  :tel="currentCustomer.tel"
  :postcode="currentCustomer.postcode"
  :address="currentCustomer.address"
  @updateProfile="updateProfile()"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import FormProfileEdit from '~/components/presentational/organizms/FormProfileEdit.vue'

definePageMeta({
  middleware: 'customer-auth'
})
const currentCustomer = useState('currentCustomer')
const updateProfile = () => {
  useRouter().push('/')
}
</script>