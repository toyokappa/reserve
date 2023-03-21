<template lang="pug">
template(v-if="karte.screen === 'customer'")
  BlockText.mb-line カルテを入力したい顧客を選択してください。
  BlockCustomer.mb-line(
    v-if="customer_list.length > 0"
    v-for="customer in customer_list"
    :key="customer.id"
    :id="customer.id"
    :image="customer.image.thumb.url"
    :name="customer.full_name"
    @click.native="selectCustomer(customer)"
  )
  BlockText(v-else)
    .empty-state 対象の顧客はいません。
template(v-else-if="karte.screen === 'reservation'")
  BlockCustomerSelected.mb-10(
    :name="karte.customer.full_name"
    :image="karte.customer.image.thumb.url"
    forSelect
    @click.native="moveScreen('customer')"
  )
  BlockText.mb-line 紐付ける予約を選択してください。
  BlockReservation.mb-line(
    v-for="reservation in karte.customer.reservation_list"
    :key="reservation.id"
    :schedule="`${reservation.scheduled_date} ${reservation.scheduled_time}`"
    :time="reservation.required_time"
    :name="reservation.program_name"
    @click.native="selectReservation(reservation)"
  )
template(v-else-if="karte.screen === 'logInput'")
  BlockCustomerSelected.mb-line(
    :name="karte.customer.full_name"
    :image="karte.customer.image.thumb.url"
    forSelect
    @click.native="moveScreen('customer')"
  )
  BlockReservationSelected.mb-10(
    :schedule="`${karte.reservation.scheduled_date} ${karte.reservation.scheduled_time}`"
    :programName="karte.reservation.program_name"
    @click.native="moveScreen('reservation')"
  )
  BlockText.mb-line 記録の写真データを入力してください。
  FormKarteRegister(@submitForm="submitForm")
</template>

<script setup>
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockCustomer from "~/components/presentational/molescules/block/Person.vue";
import BlockCustomerSelected from "~/components/presentational/molescules/block/PersonSelected.vue";
import BlockReservation from "~/components/presentational/molescules/block/Reservation.vue";
import BlockReservationSelected from "~/components/presentational/molescules/block/ReservationSelected.vue";
import FormKarteRegister from "~~/components/presentational/organizms/FormKarteRegister.vue";

definePageMeta({
  middleware: "staff-auth",
});

const karte = reactive({
  screen: "customer",
  customer: null,
  reservation: null,
});

const { customer_list } = await $fetch("/staff/kartes", {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useStaffAuth().getAuth(),
  },
});

const moveScreen = (screen) => {
  karte.screen = screen;
};
const selectCustomer = (customer) => {
  karte.customer = customer;
  moveScreen("reservation");
};
const selectReservation = (reservation) => {
  karte.reservation = reservation;
  moveScreen("logInput");
};

const { $toast } = useNuxtApp();
const submitForm = async (logs) => {
  useLoad().start();
  const { customer, reservation } = karte;
  const { trainingLog, bodyMetricsLog } = logs;
  const formData = new FormData();
  formData.append("training_log[customer_id]", customer.id);
  formData.append("training_log[reservation_id]", reservation.id);
  formData.append("training_log[photo]", trainingLog);
  formData.append("training_log[logged_at]", reservation.scheduled_at);
  formData.append("body_metrics_log[customer_id]", customer.id);
  formData.append("body_metrics_log[reservation_id]", reservation.id);
  formData.append("body_metrics_log[photo]", bodyMetricsLog);
  formData.append("body_metrics_log[logged_at]", reservation.scheduled_at);

  try {
    await $fetch(`/staff/kartes`, {
      baseURL: useRuntimeConfig().public.apiBaseURL,
      method: "POST",
      headers: {
        Authorization: useStaffAuth().getAuth(),
      },
      body: formData,
    });
    $toast.info("カルテを保存しました");
    useRouter().push("/staff");
  } catch (e) {
    $toast.error(`保存できませんでした(code: ${e.status})`);
    throw e;
  } finally {
    useLoad().finish();
  }
};
</script>
