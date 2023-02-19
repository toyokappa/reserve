<template lang="pug">
template(v-if="reserve.screen === 'program'")
  BlockText.mb-line プログラムを選択してください。
  BlockProgram.mb-line(
    v-for="program in program_list"
    :key="program.id"
    :time="program.required_time"
    :name="program.name"
    :hint="program.description"
    @click.native="selectProgram(program)"
  )
template(v-else-if="reserve.screen === 'trainer'")
  BlockProgramSelected.mb-10(
    :time="reserve.program.required_time"
    :name="reserve.program.name"
    @click.native="moveScreen('program')"
  )
  BlockText.mb-line トレーナーを選択してください。
  BlockTrainer.mb-line(
    :name="trainerNoSelected.name"
    :comment="trainerNoSelected.comment"
    @click.native="selectTrainer(trainerNoSelected)"
  )
  BlockTrainer.mb-line(
    v-for="trainer in reserve.program.trainer_list"
    :key="trainer.id"
    :image="trainer.image.url"
    :name="trainer.name"
    :comment="trainer.comment"
    @click.native="selectTrainer(trainer)"
  )
template(v-else-if="reserve.screen === 'schedule'")
  BlockProgramSelected.mb-line(
    :time="reserve.program.required_time"
    :name="reserve.program.name"
    @click.native="moveScreen('program')"
  )
  BlockTrainerSelected.mb-10(
    :name="reserve.trainer.name"
    :image="reserve.trainer.image.url"
    @click.native="moveScreen('trainer')"
  )
  BlockText.mb-line ご希望の日程を選択してください。
  CalendarReserve(
    :programId="reserve.program.id"
    :staffId="reserve.trainer.id"
    @selectSchedule="selectSchedule"
  )
template(v-else-if="reserve.screen === 'userInput'")
  BlockProgramSelected.mb-line(
    :time="reserve.program.required_time"
    :name="reserve.program.name"
    @click.native="moveScreen('program')"
  )
  BlockTrainerSelected.mb-line(
    :name="reserve.trainer.name"
    :image="reserve.trainer.image.url"
    @click.native="moveScreen('trainer')"
  )
  BlockScheduleSelected.mb-10(
    :schedule="reserve.schedule"
    @click.native="moveScreen('schedule')"
  )
  template(v-if="loggedIn")
    .button-area
      PrimaryButton.mb-10(@click.prevent="completeReserve()") チケットを消費して予約を確定する
  template(v-else)
    BlockText.mb-line 連絡先をご入力ください。
    FormReserveNoAccount(
      :name="reserve.name"
      :email="reserve.email"
      :tel="reserve.tel"
      :message="reserve.message"
      @confirmReserve="confirmReserve"
    )
  .button-area
    DefaultButton.mb-10(@click.prevent="moveScreen('schedule')") 戻る
template(v-else-if="reserve.screen === 'confirm'")
  BlockProgramSelected.mb-line(
    :time="reserve.program.required_time"
    :name="reserve.program.name"
    @click.native="moveScreen('program')"
  )
  BlockTrainerSelected.mb-line(
    :name="reserve.trainer.name"
    :image="reserve.trainer.image.url"
    @click.native="moveScreen('trainer')"
  )
  BlockScheduleSelected.mb-line(
    :schedule="reserve.schedule"
    @click.native="moveScreen('schedule')"
  )
  BlockConfirm.mb-line(label="お名前" :contents="[reserve.name]")
  BlockConfirm.mb-line(label="メールアドレス" :contents="[reserve.email]")
  BlockConfirm.mb-line(label="電話番号" :contents="[reserve.tel]")
  BlockConfirm.mb-10(label="ご質問など" :contents="[reserve.message]")
  .button-area
    PrimaryButton.mb-10(@click.prevent="completeReserve()") 予約を確定する
    DefaultButton.mb-10(@click.prevent="moveScreen('userInput')") 戻る
</template>

<script setup>
// TODO: チケットが一枚もない場合の処理も追加
import CalendarReserve from "~/components/presentational/organizms/CalendarReserve.vue";
import FormReserveNoAccount from "~~/components/presentational/organizms/FormReserveNoAccount.vue";
import BlockText from "~/components/presentational/molescules/block/Text.vue";
import BlockProgram from "~/components/presentational/molescules/block/Program.vue";
import BlockProgramSelected from "~/components/presentational/molescules/block/ProgramSelected.vue";
import BlockTrainer from "~/components/presentational/molescules/block/Trainer.vue";
import BlockTrainerSelected from "~/components/presentational/molescules/block/TrainerSelected.vue";
import BlockScheduleSelected from "~/components/presentational/molescules/block/ScheduleSelected.vue";
import BlockConfirm from "~/components/presentational/molescules/block/Confirm.vue";
import PrimaryButton from "~~/components/presentational/atoms/button/Primary.vue";
import DefaultButton from "~~/components/presentational/atoms/button/Default.vue";

definePageMeta({
  middleware: "customer-auth",
});
const loggedIn = useState("customerLoggedIn");
const currentCustomer = useState("currentCustomer");

const trainerNoSelected = {
  id: null,
  image: {
    url: null,
  },
  name: "指名なし",
  comment: "",
};
const { program_list } = await $fetch("/customer/reserve", {
  baseURL: useRuntimeConfig().public.apiBaseURL,
  headers: {
    Authorization: useStaffAuth().getAuth(),
  },
  params: {
    logged_in: loggedIn.value,
  },
});

const reserve = reactive({
  screen: "program",
  program: null,
  trainer: null,
  schedule: null,
  name: "",
  email: "",
  tel: "",
  message: "",
});

const moveScreen = (screen) => {
  reserve.screen = screen;
};
const selectProgram = (program) => {
  reserve.program = program;
  moveScreen("trainer");
};
const selectTrainer = (trainer) => {
  reserve.trainer = trainer;
  moveScreen("schedule");
};
const selectSchedule = (schedule) => {
  reserve.schedule = schedule;
  moveScreen("userInput");
};
const confirmReserve = (userInfo) => {
  const { name, email, tel, message } = userInfo;
  reserve.name = name;
  reserve.email = email;
  reserve.tel = tel;
  reserve.message = message;
  moveScreen("confirm");
};

const completeReserve = async () => {
  const { schedule, program, trainer } = reserve;
  let params;
  if (loggedIn.value) {
    params = {
      customer: {
        id: currentCustomer.value.id,
        required_ticket: program.required_ticket,
      },
    };
  } else {
    params = {
      guest: {
        name: reserve.name,
        email: reserve.email,
        tel: reserve.tel,
        message: reserve.message,
      },
    };
  }

  await $fetch("/customer/reserve", {
    baseURL: useRuntimeConfig().public.apiBaseURL,
    method: "POST",
    headers: {
      Authorization: useStaffAuth().getAuth(),
    },
    body: {
      reservation: {
        program_id: program.id,
        staff_id: trainer.id,
        scheduled_date: schedule,
        required_time: program.required_time,
      },
      ...params,
    },
  });
  useRouter().push("/reserve/complete");
};
</script>

<style scoped lang="sass"></style>
