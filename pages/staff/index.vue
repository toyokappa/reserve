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
import customerIcon from "~/assets/images/menu-customer.svg";
import manualIcon from "~/assets/images/menu-manual.svg";
import scheduleIcon from "~/assets/images/menu-schedule.svg";
import shiftIcon from "~/assets/images/menu-shift.svg";
import karteIcon from "~/assets/images/menu-karte.svg";
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
      { name: "顧客情報", link: "/staff/customer", icon: customerIcon },
      {
        name: "マニュアル",
        link: "https://www.notion.so/lixa/b960858e43ce43deb1d51bf4041e2358?pvs=4",
        icon: manualIcon,
        external: true,
      },
    ],
  },
  {
    title: "管理",
    menuList: [
      { name: "予約スケジュール", link: "/staff/schedule", icon: scheduleIcon },
      { name: "シフト入力", link: "/staff/shift", icon: shiftIcon },
      { name: "カルテ入力", link: "/staff/karte", icon: karteIcon },
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
