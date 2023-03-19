<template lang="pug">
BlockText.mb-line 顧客情報
BlockCustomer.mb-10(
  :image="customer.image.url"
  :name="customer.full_name"
)
BlockText.mb-line トレーニング記録
Carousel.mb-10(v-if="training_log_list.length > 0" :itemsToShow="1.5" :wrapAround="true")
  Slide(
    v-for="(log, i) in training_log_list"
    :key="log.id"
    @click="openModal(log.photo.url)"
  )
    .log.me-line
      .date {{ log.logged_date }}
      img.photo(:src="log.photo.url")
  template(#addons)
    Navigation
    Pagination
BlockText.mb-10(v-else)
  .empty-state 登録されたトレーニング記録はありません。
BlockText.mb-line 体組成記録
Carousel(v-if="body_metrics_log_list.length > 0" :itemsToShow="1.5" :wrapAround="true")
  Slide(
    v-for="(log, i) in body_metrics_log_list"
    :key="log.id"
    @click="openModal(log.photo.url)"
  )
    .log.me-line
      .date {{ log.logged_date }}
      img.photo(:src="log.photo.url")
  template(#addons)
    Navigation
    Pagination
BlockText.mb-10(v-else)
  .empty-state 登録された体組成記録はありません。
Modal(:visible="visible" @close="closeModal")
  .current-log
    img(:src="currentLog")
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockCustomer from "~/components/presentational/molescules/block/Person.vue";
import Modal from "~~/components/presentational/global/Modal.vue";

definePageMeta({
  middleware: "staff-auth",
});

const visible = ref(false);
const currentLog = ref("");
const openModal = (log) => {
  currentLog.value = log;
  visible.value = true;
};
const closeModal = () => {
  visible.value = false;
};

const { id } = useRoute().params;
const { customer, training_log_list, body_metrics_log_list } = await $fetch(
  `/staff/customers/${id}`,
  {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    headers: {
      Authorization: useStaffAuth().getAuth(),
    },
  }
);
</script>

<style lang="sass" scoped>
.log
  .date
    font-size: 14px
    width: 100%
    background-color: $white
    padding: 10px
  .photo
    width: 100%
    aspect-ratio: 3/4
    object-fit: cover
    object-position: center center
</style>
