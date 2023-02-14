const reservationList = [
  {
    id: 'r1',
    scheduleDate: '2/5(日)',
    scheduleTime: '10:00~11:00',
    requireTime: 60,
    programName: 'パーソナルトレーニング',
    trainer: 'Hanako',
    ticketList: [
      {
        id: 't1',
        name: 'ビジターチケット',
        expiration: '2023/3/1',
      },
    ]
  },
  {
    id: 'r2',
    scheduleDate: '2/9(木)',
    scheduleTime: '13:00~14:00',
    requireTime: 60,
    programName: 'パーソナルトレーニング',
    trainer: 'Umeko',
    ticketList: [
      {
        id: 't2',
        name: '2ヶ月コース',
        expiration: '2023/4/12',
      },
    ]
  },
  {
    id: 'r3',
    scheduleDate: '2/12(日)',
    scheduleTime: '13:00~14:00',
    requireTime: 60,
    programName: 'パーソナルトレーニング',
    trainer: 'Hanako',
    ticketList: [
      {
        id: 't3',
        name: '2ヶ月コース',
        expiration: '2023/4/12',
      },
    ]
  },
]

const ticketSetList = [
  {
    id: 'ts1',
    name: 'ビジターチケット',
    expiration: '2023/2/28',
    numberOfTicket: 1,
  },
  {
    id: 'ts2',
    name: 'ビジターチケット',
    expiration: '2023/3/14',
    numberOfTicket: 1,
  },
  {
    id: 'ts3',
    name: '2ヶ月コース',
    expiration: '2023/4/18',
    numberOfTicket: 16,
  },
]

const purchaseHistoryList = [
  {
    id: 'ph3',
    productName: '2ヶ月コース',
    purchaseDate: '2023/2/4',
    paymentMethod: 'クレジットカード支払い',
    totalAmount: 232000,
    detail: {
      productName: '2ヶ月コース',
      price: 192000,
      options: [
        { name: '入会金', price: 40000 }
      ],
      cardInfo: {
        number: '1234',
        brand: 'visa',
        expiration: '10/2024',
        owner: 'TARO TANAKA',
      },
    },
  },
  {
    id: 'ph2',
    productName: 'ビジターチケット',
    purchaseDate: '2023/2/4',
    paymentMethod: 'クレジットカード支払い',
    totalAmount: 14980,
    detail: {
      productName: 'ビジターチケット',
      price: 14980,
      options: [],
      cardInfo: {
        number: '1234',
        brand: 'visa',
        expiration: '10/2024',
        owner: 'TARO TANAKA',
      },
    },
  },
  {
    id: 'ph1',
    productName: 'ビジターチケット',
    purchaseDate: '2023/2/1',
    paymentMethod: 'クレジットカード支払い',
    totalAmount: 14980,
    detail: {
      productName: 'ビジターチケット',
      price: 14980,
      options: [],
      cardInfo: {
        number: '1234',
        brand: 'visa',
        expiration: '10/2024',
        owner: 'TARO TANAKA',
      },
    },
  },
]

const creditCardList = {
  inUse: {
    id: 'c1',
    number: '1234',
    brand: 'visa',
    expiration: '10/2024',
    owner: 'TARO TANAKA'
  },
  registered: [
    {
      id: 'c2',
      number: '0123',
      brand: 'visa',
      expiration: '10/2025',
      owner: 'TARO TANAKA'
    },
  ]
}

export default {
  productList,
  reservationList,
  ticketSetList,
  purchaseHistoryList,
  creditCardList,
}