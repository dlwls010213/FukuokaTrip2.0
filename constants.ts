import { DaySchedule, PackingItem } from './types';

export const ITINERARY_DATA: DaySchedule[] = [
  {
    date: '2025-12-18',
    displayDate: '12/18',
    weekday: '週三',
    items: [
      {
        time: '全天',
        activity: '飛行與轉機',
        locationCN: '臺中 → 仁川',
        locationJP: 'Incheon',
        note: '仁川過夜停留。'
      }
    ]
  },
  {
    date: '2025-12-19',
    displayDate: '12/19',
    weekday: '週四',
    items: [
      {
        time: '09:25',
        activity: '抵達熊本機場',
        locationCN: '熊本機場',
        locationJP: '熊本空港 (KMJ)',
        transport: '搭乘利木津巴士至熊本車站'
      },
      {
        time: '11:15',
        activity: '新幹線至久留米',
        locationCN: '熊本車站 → JR久留米車站',
        locationJP: '熊本駅 → JR久留米駅',
        transport: '快速列車'
      },
      {
        time: '11:45',
        activity: '快速寄放行李',
        locationCN: '東橫INN 久留米',
        locationJP: '東横INN久留米',
        note: '重要：僅寄放行李'
      },
      {
        time: '12:00',
        activity: '搭乘西鐵至太宰府',
        locationCN: '西鐵久留米車站',
        locationJP: '西鉄久留米駅',
        transport: '西鐵線 (經二日市轉乘)'
      },
      {
        time: '13:00',
        activity: '快速午餐/點心',
        locationCN: '太宰府',
        locationJP: '太宰府',
        note: '推薦梅枝餅'
      },
      {
        time: '13:30',
        activity: '竈門神社參拜',
        locationCN: '寶滿宮 竈門神社',
        locationJP: '竈門神社',
        transport: '在太宰府站搭乘當地巴士'
      },
      {
        time: '14:30',
        activity: '前往博多',
        locationCN: '太宰府 → JR博多站',
        locationJP: '太宰府 → JR博多駅',
        transport: '西鐵線轉乘至 JR'
      },
      {
        time: '15:00',
        activity: '與友人會合：聖誕市集',
        locationCN: 'JR博多站廣場',
        locationJP: 'JR博多駅前広場',
        note: '會合點'
      },
      {
        time: '18:30',
        activity: '市集結束，前往晚餐',
        locationCN: '博多 → 藥院',
        locationJP: 'Hakata → Yakuin',
        transport: '地鐵/短途交通'
      },
      {
        time: '19:00',
        activity: '燒肉晚餐預訂',
        locationCN: '藥院燒肉',
        locationJP: '薬院焼肉'
      },
      {
        time: '21:00',
        activity: '返回並辦理入住',
        locationCN: '藥院 → 久留米',
        locationJP: 'Yakuin → Kurume'
      }
    ]
  },
  {
    date: '2025-12-20',
    displayDate: '12/20',
    weekday: '週五',
    items: [
      {
        time: '09:00',
        activity: '前往演唱會區域',
        locationCN: '久留米 → 唐人町/西新站',
        locationJP: '唐人町駅/西新駅',
        transport: 'JR 轉乘地鐵'
      },
      {
        time: '10:00',
        activity: '搶整理券',
        locationCN: '福岡 PayPay 巨蛋',
        locationJP: 'PayPayドーム',
        note: '購買周邊商品、排隊。'
      },
      {
        time: '13:30',
        activity: '演唱會前活動',
        locationCN: '福岡 PayPay 巨蛋周邊',
        locationJP: 'PayPayドーム周辺',
        note: '看情況安排。'
      },
      {
        time: '15:00',
        activity: '領續會卡及場限',
        locationCN: '福岡 PayPay 巨蛋',
        locationJP: 'PayPayドーム',
        note: '先開好FC會員"我的頁面"。'
      },
      {
        time: '16:00',
        activity: '領票',
        locationCN: '福岡 PayPay 巨蛋→ Trip.com 櫃台',
        locationJP: 'PayPayドーム',
        note: '先開好頁面或下載QRCode。'
      },
      {
        time: '18:00',
        activity: 'SEVENTEEN WORLD TOUR [NEW_] IN FUKUOKA',
        locationCN: '福岡 PayPay 巨蛋',
        locationJP: 'PayPayドーム',
        isSpecial: true
      },
      {
        time: '22:00',
        activity: '返回久留米',
        locationCN: '久留米',
        locationJP: '久留米',
        note: '確認末班車時間'
      }
    ]
  },
  {
    date: '2025-12-21',
    displayDate: '12/21',
    weekday: '週六',
    items: [
      {
        time: '05:45',
        activity: '提早起床/辦理退房',
        locationCN: '東橫INN 久留米',
        locationJP: '東横INN久留米',
        note: '必須準時'
      },
      {
        time: '06:30',
        activity: '新幹線至熊本車站',
        locationCN: 'JR久留米車站',
        locationJP: 'JR久留米駅',
        transport: '當日最早班次新幹線'
      },
      {
        time: '07:00',
        activity: '利木津巴士至機場',
        locationCN: '熊本車站 → 熊本機場',
        locationJP: '熊本駅 → 熊本空港',
        transport: '巴士'
      },
      {
        time: '08:25',
        activity: '抵達熊本機場',
        locationCN: '熊本機場 (KMJ)',
        locationJP: '熊本空港',
        note: '預留安檢緩衝時間'
      },
      {
        time: '10:25',
        activity: '飛機起飛',
        locationCN: '',
        locationJP: ''
      }
    ]
  }
];

export const DEFAULT_PACKING_LIST: PackingItem[] = [
  { id: '1', name: '護照', category: '證件', checked: false },
  { id: '2', name: '機票/住宿憑證 (電子)', category: '證件', checked: false },
  { id: '3', name: '日幣現金', category: '錢包', checked: false },
  { id: '4', name: '信用卡 (海外回饋)', category: '錢包', checked: false },
  { id: '5', name: '行動電源', category: '電子', checked: false },
  { id: '6', name: '轉接頭/充電器', category: '電子', checked: false },
  { id: '7', name: 'SIM卡/漫遊', category: '電子', checked: false },
  { id: '8', name: 'SEVENTEEN 應援棒', category: '演唱會', checked: false },
  { id: '9', name: '應援毛巾/扇子', category: '演唱會', checked: false },
  { id: '10', name: '望遠鏡', category: '演唱會', checked: false },
  { id: '11', name: '保暖大衣', category: '衣物', checked: false },
  { id: '12', name: '圍巾/手套', category: '衣物', checked: false },
  { id: '13', name: '暖暖包', category: '雜物', checked: false },
  { id: '14', name: '常備藥品', category: '雜物', checked: false },
];