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

const reservalTimeList = [
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

const shiftTimeList = [
  { hour: '09:00', stateList: ['rest', 'rest', 'rest', 'rest', 'rest', 'rest', 'rest'], },
  { hour: '10:00', stateList: ['rest', 'rest', 'rest', 'rest', 'work', 'work', 'work'], },
  { hour: '11:00', stateList: ['rest', 'rest', 'rest', 'rest', 'lock', 'work', 'work'], },
  { hour: '12:00', stateList: ['rest', 'rest', 'rest', 'work', 'lock', 'work', 'work'], },
  { hour: '13:00', stateList: ['rest', 'work', 'lock', 'work', 'work', 'work', 'work'], },
  { hour: '14:00', stateList: ['rest', 'work', 'lock', 'lock', 'work', 'work', 'work'], },
  { hour: '15:00', stateList: ['rest', 'work', 'work', 'lock', 'work', 'work', 'work'], },
  { hour: '16:00', stateList: ['rest', 'work', 'work', 'work', 'work', 'work', 'work'], },
  { hour: '17:00', stateList: ['rest', 'work', 'work', 'work', 'work', 'work', 'work'], },
  { hour: '18:00', stateList: ['work', 'work', 'work', 'work', 'work', 'work', 'work'], },
  { hour: '19:00', stateList: ['work', 'work', 'work', 'work', 'work', 'work', 'work'], },
  { hour: '20:00', stateList: ['work', 'work', 'work', 'work', 'work', 'work', 'work'], },
  { hour: '21:00', stateList: ['work', 'work', 'work', 'work', 'work', 'work', 'work'], },
]

export default {
  programList,
  trainerList,
  reservalTimeList,
  shiftTimeList,
}