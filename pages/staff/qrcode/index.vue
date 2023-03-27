<template lang="pug">
BlockText.mb-line 会員登録ページ
BlockText.mb-10
  QRCodeVue3(
    value="https://sympl.jp/register"
    width="500"
    height="500"
    :dotsOptions="dotsOptionsMain"
    :cornersSquareOptions="cornersSquareOptions"
    imgclass="full-width"
  )
BlockText.mb-line Google口コミ
BlockText.mb-10
  QRCodeVue3(
    value="https://g.page/r/CQwYKdSmMs5pEBk/review"
    width="500"
    height="500"
    :dotsOptions="dotsOptionsMain"
    :cornersSquareOptions="cornersSquareOptions"
    imgclass="full-width"
  )
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import QRCodeVue3 from "qrcode-vue3";

const dotsOptionsMain = {
  type: "extra-rounded",
  color: "#68B3F9",
};

const dotsOptionsLine = {
  type: "extra-rounded",
  color: "#4CC764",
};

const cornersSquareOptions = {
  type: "extra-rounded",
  color: "black",
};

definePageMeta({
  middleware: "staff-auth",
});
</script>

<style lang="sass">
.full-width
  width: 100%
</style>
