<template lang="pug">
BlockText.mb-line 予約スケジュール
BlockReservation.mb-10(
  :schedule="`${reservation.scheduled_date} ${reservation.scheduled_time}`"
  :time="reservation.required_time"
  :name="reservation.program_name"
  :trainer="reservation.trainer"
)
BlockText.mb-line 利用チケット
BlockTicket.mb-line(
  v-for="ticket in reservation.ticket_list"
  :key="ticket.id"
  :name="ticket.name"
  :expiration="ticket.expiration"
)
.button-area.mt-10
  DefaultButton.mb-10(
    @click.prevent="router.push('/schedule')"
  ) 戻る
  DangerButton.mb-5(
    :disabled="reservation.disabled_cancel"
    @click.prevent="cancelScheudle()"
  ) 予約をキャンセルする
  HintText(
    text="予約日前日以降のキャンセルは直接ご連絡ください"
    centering
  )
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockReservation from "~/components/presentational/molescules/block/Reservation.vue";
import BlockTicket from "~/components/presentational/molescules/block/Ticket.vue";
import DangerButton from "~/components/presentational/atoms/button/Danger.vue";
import DefaultButton from "~/components/presentational/atoms/button/Default.vue";
import HintText from "~/components/presentational/atoms/HintText.vue";

definePageMeta({
  middleware: "customer-auth",
});

const router = useRouter();
const { id } = useRoute().params;
const { reservation } = await $fetch(`/customer/schedules/${id}`, {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useCustomerAuth().getAuth(),
  },
});

const { $toast } = useNuxtApp();
const cancelScheudle = async () => {
  const checkCancel = await confirm("本当に予約をキャンセルしますか？");
  if (!checkCancel) return;

  try {
    useLoad().start();
    await $fetch(`/customer/schedules/${id}`, {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "DELETE",
      headers: {
        Authorization: useCustomerAuth().getAuth(),
      },
    });
    $toast.info("予約をキャンセルしました");
    router.push("/schedule");
  } catch (e) {
    $toast.error(`キャンセルできませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
</script>

<style lang="sass" scoped></style>
