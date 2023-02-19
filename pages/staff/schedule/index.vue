<template lang="pug">
BlockText.mb-line 次回のトレーニング
BlockReservation.mb-10(
  v-if="next_reservation"
  :schedule="`${next_reservation.scheduled_date} ${next_reservation.scheduled_time}`"
  :time="next_reservation.required_time"
  :name="next_reservation.program_name"
  :trainee="next_reservation.trainee"
)
BlockText.mb-10(v-else)
  .empty-state 次回のトレーニングはありません。
BlockText.mb-line 予約一覧
BlockSwitchWeek.mb-line(
  :start="start"
  :end="end"
  @switchWeek="switchWeek"
)
template(
  v-if="Object.keys(reservationGroupByDate).length > 0"
  v-for="(reservationList, key) in reservationGroupByDate" :key="key"
)
  BlockText.mb-line(dark) {{ key }}
  BlockReservation.mb-line(
    v-for="reservation in reservationList"
    :key="reservation.id"
    :schedule="reservation.scheduled_time"
    :time="reservation.required_time"
    :name="reservation.program_name"
    :trainee="reservation.trainee"
  )
BlockText.mb-10(v-else)
  .empty-state この週のトレーニングはありません。
</template>

<script setup>
import { add, startOfToday, format, subWeeks } from "date-fns";
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockReservation from "~/components/presentational/molescules/block/Reservation.vue";
import BlockSwitchWeek from "~/components/presentational/molescules/block/SwitchWeek.vue";

import * as R from "ramda";

definePageMeta({
  middleware: "staff-auth",
});

const start = ref(startOfToday());
const end = computed(() => add(start.value, { days: 6 }));

const getReservationList = async () => {
  return await $fetch("/staff/schedules", {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    headers: {
      Authorization: useStaffAuth().getAuth(),
    },
    params: {
      start_date: format(start.value, "Y-MM-dd"),
    },
  });
};

const { next_reservation, reservation_list } = await getReservationList();
const reactiveReservationList = ref(reservation_list);
const reservationGroupByDate = computed(() => {
  return R.groupBy(
    ({ scheduled_date }) => scheduled_date,
    reactiveReservationList.value
  );
});

const router = useRouter();

const switchWeek = async (startDate) => {
  start.value = startDate;
  // TODO: APIリクエスト数を減らすためにキャッシュを使うロジックに変更
  const { reservation_list: newReservationList } = await getReservationList();
  reactiveReservationList.value = newReservationList;
};
</script>

<style lang="sass" scoped>
.empty-state
  font-size: 14px
  color: $hint
</style>
