<template lang="pug">
BlockProfile.mb-30(
  :name="currentStaff.display_name"
  :email="currentStaff.email"
  :image="currentStaff.image.url"
)
BlockMenu.mb-line(
  v-for="menuSection in mypageMenu"
  :key="menuSection.title"
  :title='menuSection.title'
  :menuList="menuSection.menuList"
)
</template>

<script setup>
import BlockProfile from "~/components/presentational/molescules/block/Profile.vue";
import BlockMenu from "~/components/presentational/molescules/block/Menu.vue";

import qrcodeIcon from "~/assets/images/menu-qrcode.svg";
import scheduleIcon from "~/assets/images/menu-schedule.svg";
import shiftIcon from "~/assets/images/menu-shift.svg";
import profileIcon from "~/assets/images/menu-profile.svg";
import passwordIcon from "~/assets/images/menu-password.svg";

definePageMeta({
  middleware: "staff-auth",
});

const currentStaff = useState("currentStaff");
const mypageMenu = [
  {
    title: "接客",
    menuList: [
      { name: "各種QRコード", link: "/staff/qrcode", icon: qrcodeIcon },
    ],
  },
  {
    title: "管理",
    menuList: [
      { name: "予約スケジュール", link: "/staff/schedule", icon: scheduleIcon },
      { name: "シフト入力", link: "/staff/shift", icon: shiftIcon },
    ],
  },
  {
    title: "アカウント",
    menuList: [
      {
        name: "プロフィール変更",
        link: "/staff/profile/edit",
        icon: profileIcon,
      },
      {
        name: "パスワード変更",
        link: "/staff/password/edit",
        icon: passwordIcon,
      },
    ],
  },
];
</script>

<style scoped lang="sass"></style>
