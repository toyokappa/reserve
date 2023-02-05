const programList = [
  {
    id: 1,
    name: '無料カウンセリング',
    requireTime: 60,
    hint: ''
  },
  {
    id: 2,
    name: 'パーソナルトレーニング',
    requireTime: 60,
    hint: 'ご利用にはチケットが必要となります。'
  }
]

const trainerList = [
  {
    id: 0,
    name: '指名なし',
    comment: '',
  },
  {
    id: 1,
    name: 'Hanako',
    comment: 'よろしくおねがいします😊',
  },
  {
    id: 2,
    name: 'Umeko',
    comment: ''
  }
]

const calendarReserve = {
  now: '2023-02-05T16:30:00+09:00',
  start: '2023-02-05',
  end: '2023-02-11',
  timeList: [
    { hour: '09:00', stateList: ['ng', 'ng', 'ng', 'ng', 'ng', 'ng', 'ng'], },
    { hour: '10:00', stateList: ['ng', 'ng', 'ng', 'ng', 'ok', 'ok', 'ok'], },
    { hour: '11:00', stateList: ['ng', 'ng', 'ng', 'ng', 'ok', 'ok', 'ok'], },
    { hour: '12:00', stateList: ['ng', 'ng', 'ng', 'ok', 'ok', 'ok', 'ok'], },
    { hour: '13:00', stateList: ['ng', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok'], },
    { hour: '14:00', stateList: ['ng', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok'], },
    { hour: '15:00', stateList: ['ng', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok'], },
    { hour: '16:00', stateList: ['ng', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok'], },
    { hour: '17:00', stateList: ['ng', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok'], },
    { hour: '18:00', stateList: ['ok', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok'], },
    { hour: '19:00', stateList: ['ok', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok'], },
    { hour: '20:00', stateList: ['ok', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok'], },
    { hour: '21:00', stateList: ['ok', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok'], },
  ]
}

export default {
  programList,
  trainerList,
  calendarReserve,
}