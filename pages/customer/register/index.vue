<template lang="pug">
template(v-if="screen === 'register'")
  FormRegister(
    :lastName="register.last_name"
    :firstName="register.first_name"
    :lastNameKana="register.last_name_kana"
    :firstNameKana="register.first_name_kana"
    :birthday="register.birthday"
    :tel="register.tel"
    :postcode="register.postcode"
    :address="register.address"
    :email="register.email"
    :password="register.password"
    :passwordConfirmation="register.password_confirmation"
    @confirmRegister="confirmRegister"
  )
template(v-if="screen === 'confirm'")
  BlockText.mb-line 下記の内容を確認してください。
  BlockConfirm.mb-line(label="お名前" :contents="[name]")
  BlockConfirm.mb-line(label="お名前（かな）" :contents="[nameKana]")
  BlockConfirm.mb-line(label="生年月日" :contents="[birthdayFmt]")
  BlockConfirm.mb-line(label="電話番号" :contents="[register.tel]")
  BlockConfirm.mb-line(label="住所" :contents="['〒' + register.postcode, register.address]")
  BlockConfirm.mb-10(label="メールアドレス" :contents="[register.email]")
  .button-area
    PrimaryButton.mb-10(
      @click.prevent="submitRegister()"
    ) 上記の内容で会員登録をする
    DefaultButton.mb-10(@click.prevent="moveScreen('register')") 戻る
</template>

<script setup>
import { format } from "date-fns";

import BlockText from "~/components/presentational/molescules/block/Text.vue";
import FormRegister from "~/components/presentational/organizms/FormRegister.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";
import DefaultButton from "~~/components/presentational/atoms/button/Default.vue";
import BlockConfirm from "~/components/presentational/molescules/block/Confirm.vue";
import BlockConfirmImages from "~/components/presentational/molescules/block/ConfirmImages.vue";

definePageMeta({
  middleware: "customer-auth",
});

const register = reactive({
  last_name: "",
  first_name: "",
  last_name_kana: "",
  first_name_kana: "",
  birthday: "1990-01-01",
  tel: "",
  postcode: "",
  address: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const screen = ref("register");

const moveScreen = (nextScreen) => {
  screen.value = nextScreen;
};

const confirmRegister = (userInfo) => {
  const {
    lastName,
    firstName,
    lastNameKana,
    firstNameKana,
    birthday,
    tel,
    postcode,
    address,
    email,
    password,
    passwordConfirmation,
  } = userInfo;

  register.last_name = lastName;
  register.first_name = firstName;
  register.last_name_kana = lastNameKana;
  register.first_name_kana = firstNameKana;
  register.birthday = birthday;
  register.tel = tel;
  register.postcode = postcode;
  register.address = address;
  register.email = email;
  register.password = password;
  register.password_confirmation = passwordConfirmation;
  moveScreen("confirm");
};

const { appHost, apiBaseURL } = useRuntimeConfig().public;
const submitRegister = async () => {
  try {
    await $fetch(`/customer/auth`, {
      baseURL: apiBaseURL,
      method: "POST",
      headers: {
        Authorization: useCustomerAuth().getAuth(),
      },
      body: {
        sign_up: register,
        confirm_success_url: `${appHost}/register/complete`,
      },
    });
    useRouter().push("/register/sendMail");
  } catch (e) {
    useNuxtApp().$toast.error(`登録できませんでした(code: ${e.status})`);
    throw e;
  }
};

const name = computed(() => `${register.last_name} ${register.first_name}`);
const nameKana = computed(
  () => `${register.last_name_kana} ${register.first_name_kana}`
);
const birthdayFmt = computed(() =>
  format(new Date(register.birthday), "Y年M月d日")
);
</script>
