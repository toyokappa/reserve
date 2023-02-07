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
  BlockConfirm.mb-line(label="お名前" :contents="[name]")
  BlockConfirm.mb-line(label="お名前（かな）" :contents="[nameKana]")
  BlockConfirm.mb-line(label="生年月日" :contents="[birthdayFmt]")
  BlockConfirm.mb-line(label="メールアドレス" :contents="[register.email]")
  BlockConfirm.mb-line(label="電話番号" :contents="[register.tel]")
  BlockConfirm.mb-line(label="住所" :contents="['〒' + register.postcode, register.address]")
  BlockConfirmImages.mb-10(label="本人確認書類" :images="register.idCard")
  .button-area
    DefaultButton.mb-10(@click.prevent="moveScreen('register')") 戻る
</template>

<script setup>
import { format } from 'date-fns'

import BlockText from '~/components/presentational/molescules/block/Text.vue'
import FormRegister from '~/components/presentational/organizms/FormRegister.vue'
import DefaultButton from '~~/components/presentational/atoms/button/Default.vue';
import BlockConfirm from '~/components/presentational/molescules/block/Confirm.vue'
import BlockConfirmImages from '~/components/presentational/molescules/block/ConfirmImages.vue'

const register = reactive({
  screen: 'register',
  lastName: '田中',
  firstName: '太郎',
  lastNameKana: 'たなか',
  firstNameKana: 'たろう',
  birthday: '1990-01-01',
  email: 'tanaka@example.com',
  tel: '080-1234-1234',
  postcode: '371-0221',
  address: '',
  idCard: [],
})

const moveScreen = (screen) => {
  register.screen = screen
}

const confirmRegister = (userInfo) => {
  const {
    lastName,
    firstName,
    lastNameKana,
    firstNameKana,
    birthday,
    email,
    tel,
    postcode,
    address,
    idCard,
  } = userInfo

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

const name = computed(() => (`${register.lastName} ${register.firstName}`))
const nameKana = computed(() => (`${register.lastNameKana} ${register.firstNameKana}`))
const birthdayFmt = computed(() => format(new Date(register.birthday), 'Y年M月d日'))
</script>