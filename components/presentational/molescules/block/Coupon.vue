<template lang="pug">
.coupon-block
  .name {{ name }}
  .code {{ code }}
  .expiration.mb-5
    span 有効期限: {{ expiration }}
    span(v-if="daysOfExpiration > 0") （{{ daysOfExpiration }}日間有効）
    span(v-else) （有効期限切れ）
  Badge(v-if="useLimit") {{ useLimit }}回まで使用可能
  .discount
    span.value {{ discountAmount.toLocaleString() }}円
    span.unit (税込)
</template>

<script setup>
import { add, differenceInDays, format } from "date-fns";

import Badge from "@/components/presentational/atoms/Badge.vue";

const props = defineProps({
  name: String,
  code: String,
  expiration: String,
  useLimit: Number,
  discountAmount: Number,
});

const expiration = computed(() => {
  if (props.expiration) return format(new Date(props.expiration), "Y/M/d");

  return format(add(new Date(), { days: props.daysOfExpiration }), "Y/M/d");
});

const daysOfExpiration = computed(() => {
  if (props.daysOfExpiration) return props.daysOfExpiration;

  return differenceInDays(new Date(props.expiration), new Date());
});
</script>

<style lang="sass" scoped>
.coupon-block
  background-color: $white
  padding: 17px 20px
  .code
    font-size: 20px
    font-weight: bold
  .discount
    text-align: right
    .value
      font-size: 20px
    .unit
      font-size: 12px
  .expiration
    font-size: 14px
    color: $hint
</style>
