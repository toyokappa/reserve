<template lang="pug">
.switch-week
  .week-switcher.me-line
    .arrow-left(@click="emits('switchWeek', prevWeek)" v-if="!isThisWeek")
      img(src="@/assets/images/arrow-left.svg")
    .arrow-left-blank(v-else)
    .display-week {{ startDate }} - {{ endDate }}
    .arrow-right(@click="emits('switchWeek', nextWeek)")
      img(src="@/assets/images/arrow-right.svg")
  BlockText.today-switcher(@click="emits('switchWeek', today)")
    img.icon(src="@/assets/images/return-today.svg")
    .text 今日に戻る
</template>

<script setup>
import { add, format, isToday, startOfToday, subWeeks } from "date-fns";
import BlockText from "~/components/presentational/molescules/block/Text.vue";

const props = defineProps({
  start: Date,
  end: Date,
});

const { start, end } = toRefs(props);
const startDate = computed(() => format(start.value, "M/d"));
const endDate = computed(() => format(end.value, "M/d"));
const isThisWeek = computed(() => isToday(start.value));
const prevWeek = computed(() => subWeeks(start.value, 1));
const nextWeek = computed(() => add(start.value, { days: 7 }));
const today = computed(() => startOfToday());

const emits = defineEmits();
</script>

<style lang="sass" scoped>
.switch-week
  display: flex
  .week-switcher
    width: 100%
    background-color: $white
    padding: $block-padding
    display: flex
    align-items: center
    justify-content: space-between
    .arrow-left-blank
      width: 8px
      height: 13px
  .today-switcher
    display: flex
    align-items: center
    justify-content: center
    @include pc
      width: 50%
    .icon
      margin-right: 3px
      width: 16px
      height: auto
    .text
      white-space: nowrap
</style>
