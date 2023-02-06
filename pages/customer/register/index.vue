<template lang="pug">
template(v-if="register.screen === 'register'")
  BlockText.mb-line 会員登録に必要な情報を入力してください。
  FormRegister(
    :lastName="register.lastName"
    :firstName="register.firstName"
    :lastNameKana="register.lastNameKana"
    :firstNameKana="register.firstNameKana"
    :birthday="register.birthday"
    :email="register.email"
    :tel="register.tel"
    :postcode="register.postcode"
    :address="register.address"
    :idCard="register.idCard"
    @confirmRegister="confirmRegister"
  )
template(v-if="register.screen === 'confirm'")
  BlockText.mb-line 下記の内容を確認してください。
  .button-area
    DefaultButton.mb-10(@click.prevent="moveScreen('register')") 戻る
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import FormRegister from '~/components/presentational/organizms/FormRegister.vue'
import DefaultButton from '~~/components/presentational/atoms/button/Default.vue';

const register = reactive({
  screen: 'register',
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  birthday: '1990-01-01',
  email: '',
  tel: '',
  postcode: '',
  address: '',
  idCard: [],
})

const moveScreen = (screen) => {
  register.screen = screen
}

const confirmRegister = (userInfo) => {
  const { lastName, firstName, lastNameKana, firstNameKana, birthday, email, tel, postcode, address, idCard} = userInfo
  register.lastName = lastName
  register.firstName = firstName
  register.lastNameKana = lastNameKana
  register.firstNameKana = firstNameKana
  register.birthday = birthday
  register.email = email
  register.tel = tel
  register.postcode = postcode
  register.address = address
  register.idCard = idCard
  moveScreen('confirm')
}
</script>