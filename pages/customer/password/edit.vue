<template lang="pug">
BlockText.mb-line 新しいパスワードを入力してください。
FormPassword(
  buttonText="パスワードを変更する"
  @submitForm="updatePassword"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import FormPassword from '~~/components/presentational/organizms/FormPassword.vue';

definePageMeta({
  middleware: 'customer-auth'
})
const updatePassword = async (values) => {
  await $fetch('/customer/auth/password', {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    method: 'PATCH',
    headers: {
      Authorization: useCustomerAuth().getAuth()
    },
    body: values,
  })
  useRouter().push('/')
}
</script>

<style lang="sass" scoped>
</style>