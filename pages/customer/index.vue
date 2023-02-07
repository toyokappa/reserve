<template lang="pug">
BlockProfile.mb-30(
  name="田中 太郎"
  email="tanaka@example.com"
)
BlockMenu.mb-line(
  v-for="menuSection in mypageMenu"
  :key="menuSection.title"
  :title='menuSection.title'
  :menuList="menuSection.menuList"
)
</template>

<script setup>
import BlockProfile from '~/components/presentational/molescules/block/Profile.vue'
import BlockMenu from '~/components/presentational/molescules/block/Menu.vue'

import reserveIcon from '~/assets/images/menu-reserve.svg'
import purchaseIcon from '~/assets/images/menu-purchase.svg'
import scheduleIcon from '~/assets/images/menu-schedule.svg'
import ticketIcon from '~/assets/images/menu-ticket.svg'
import purchaseHistoryIcon from '~/assets/images/menu-purchase-history.svg'
import profileIcon from '~/assets/images/menu-profile.svg'
import passwordIcon from '~/assets/images/menu-password.svg'
import cardIcon from '~/assets/images/menu-card.svg'

const mypageMenu = [
  {
    title: '予約・購入',
    menuList: [
      { name: 'トレーニング予約', link: '/reserve', icon: reserveIcon },
      { name: 'チケット購入', link: '/purchase', icon: purchaseIcon },
    ]
  },
  {
    title: '管理',
    menuList: [
      { name: '予約スケジュール', link: '/', icon: scheduleIcon },
      { name: '所持チケット', link: '/', icon: ticketIcon },
      { name: '購入履歴', link: '/', icon: purchaseHistoryIcon },
    ]
  },
  {
    title: 'アカウント',
    menuList: [
      { name: 'プロフィール変更', link: '/', icon: profileIcon },
      { name: 'パスワード変更', link: '/', icon: passwordIcon },
      { name: 'クレジットカード設定', link: '/', icon: cardIcon },
    ]
  },
]
</script>

<style lang="sass" scoped>

</style>