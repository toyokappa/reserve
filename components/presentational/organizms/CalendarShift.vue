<template lang="pug">
.calendar
  BlockSwitchWeek.mb-line(
    :start="start"
    :end="end"
    @switchWeek="switchWeek"
  )
  .calendar-header.mb-line
    .column-title.black 開始時間
    BlockCalendarDate.ms-line(v-for="column in dateColumns" :key="column.date" :date="column.date" :day="column.day")
  .calendar-body.mb-line(v-for="(_d, stateIndex) in schedule[0].state_list" :key="stateIndex")
    .column-title {{ calcHour(stateIndex) }}
    BlockCalendarState.ms-line(
      v-for="(day, dateIndex) in selectedSchedule"
      :key="day.date + dateIndex"
      :state="day.state_list[stateIndex]"
      :data-state="day.state_list[stateIndex]"
      :data-index="stateIndex"
      :data-date="day.date"
      @click="toggleShift"
      @touchstart.prevent="toggleShift"
      @touchmove="toggleShift"
      @touchend="touchDocument = null"
      @touchcancel="touchDocument = null"
    )
  .button-area.mt-10
    PrimaryButton.mb-10(@click.prevent="submitShift()") シフト変更を確定する
</template>

<script setup>
import { add, eachDayOfInterval, format, startOfToday } from "date-fns";
import { ja } from "date-fns/locale";
import BlockSwitchWeek from "~/components/presentational/molescules/block/SwitchWeek.vue";
import BlockCalendarDate from "~/components/presentational/atoms/block/CalendarDate.vue";
import BlockCalendarState from "~/components/presentational/atoms/block/CalendarState.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";

const currentStaff = useState("currentStaff");
const start = ref(startOfToday());
const end = computed(() => add(start.value, { days: 6 }));
const dayInterval = computed(() =>
  eachDayOfInterval({ start: start.value, end: end.value })
);
const dateColumns = computed(() =>
  dayInterval.value.map((day) => ({
    date: format(day, "dd"),
    day: format(day, "EEEEE", { locale: ja }),
  }))
);
const currentDateRange = computed(() =>
  dayInterval.value.map((day) => format(day, "Y-MM-dd"))
);
const readDateRange = computed(() => {
  const interval = eachDayOfInterval({
    start: start.value,
    end: add(start.value, { days: 13 }),
  });
  return interval.map((day) => format(day, "Y-MM-dd"));
});

const getShift = async () => {
  return await $fetch("/staff/shift", {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    headers: {
      Authorization: useStaffAuth().getAuth(),
    },
    params: {
      start_date: format(start.value, "Y-MM-dd"),
    },
  });
};

const { schedule, reserval_hours_first } = await getShift();
const reactiveSchedule = ref(schedule);
const storedDateRange = computed(() =>
  reactiveSchedule.value.map(({ date }) => date)
);
const selectedSchedule = computed(() => {
  return reactiveSchedule.value.filter(({ date }) =>
    currentDateRange.value.includes(date)
  );
});
const hasNewSchedule = computed(() => {
  return !readDateRange.value.every((date) =>
    storedDateRange.value.includes(date)
  );
});

const switchWeek = async (startDate) => {
  start.value = startDate;
  if (hasNewSchedule.value) {
    const newShift = await getShift();
    const newSchedule = newShift.schedule.filter(
      ({ date }) => !storedDateRange.value.includes(date)
    );
    reactiveSchedule.value.push(...newSchedule);
  }
};

const calcHour = (hour) => {
  const time = reserval_hours_first + hour;
  return ("0" + time).slice(-2) + ":00~";
};

let touchDocument;
const toggleShift = (e) => {
  if (e.type.startsWith("touch")) {
    const newTouchDocument = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    if (!newTouchDocument.classList.contains("calendar-state")) return;
    if (newTouchDocument.dataset.state === "lock") return;
    if (touchDocument && touchDocument === newTouchDocument) return;

    touchDocument = newTouchDocument;
  } else {
    touchDocument = e.target;
  }
  const { state, date, index } = touchDocument.dataset;

  const toggledState = state === "work" ? "rest" : "work";
  const dateSet = reactiveSchedule.value.find((d) => d.date === date);
  dateSet.state_list[index] = toggledState;
};

const { $toast } = useNuxtApp();
const submitShift = async () => {
  try {
    useLoad().start();
    await $fetch("/staff/shift", {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "PUT",
      headers: {
        Authorization: useStaffAuth().getAuth(),
      },
      body: {
        shift: {
          schedule: reactiveSchedule.value,
        },
      },
    });
    $toast.info("シフトを更新しました");
    useRouter().push("/staff");
  } catch (e) {
    $toast.error(`更新できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
</script>

<style lang="sass" scoped>
.calendar
  .calendar-header, .calendar-body
    width: 100%
    display: flex
    .column-title
      font-size: 14px
      height: 40px
      background-color: $white
      display: flex
      flex-grow: 1
      align-items: center
      justify-content: center
      &.black
        color: $white
        background-color: $dark
</style>
