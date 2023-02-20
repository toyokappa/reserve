<template lang="pug">
header
  nuxt-link.logo(to="/") LOGO
  .menu-toggler(
    v-if="loggedIn"
    @click="logout()"
  )
    img(src="@/assets/images/logout.svg")
</template>

<script setup>
const loggedIn = useState("customerLoggedIn");
const logout = () => {
  const cookie = useCookie("customer_access_token");
  cookie.value = null;
  useRouter().push("/login");
};
</script>

<style lang="sass" scoped>
header
  width: 100%
  color: $black
  background-color: $white
  padding: $block-padding
  display: flex
  align-items: center
  justify-content: space-between
  .logo
    color: $black
</style>
