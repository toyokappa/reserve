<template lang="pug">
BlockMenu.mb-line(
  v-for="menuSection in mypageMenu"
  :key="menuSection.title"
  :title='menuSection.title'
  :menuList="menuSection.menuList"
)
</template>

<script setup>
import BlockMenu from "~/components/presentational/molescules/block/Menu.vue";
import customerIcon from "~/assets/images/menu-customer.svg";
import profileIcon from "~/assets/images/menu-profile.svg";
import programIcon from "~/assets/images/menu-program.svg";
import couponIcon from "~/assets/images/menu-coupon.svg";

const mypageMenu = [
  {
    title: "管理",
    menuList: [
      { name: "顧客管理", link: "/admin/customer", icon: customerIcon },
      { name: "トレーナー管理", link: "/admin/staff", icon: profileIcon },
      { name: "プログラム管理", link: "/admin/program", icon: programIcon },
      { name: "クーポン管理", link: "/admin/coupon", icon: couponIcon },
    ],
  },
];
</script>
