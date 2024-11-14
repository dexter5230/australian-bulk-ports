
// 获取合适的缩放级别

function getInitialZoom() {
  const width = window.innerWidth;

  if (width >= 1600) {
    return 5; // 大屏幕，缩放较高
  } else if (width >= 1200) {
    return 4; // 中等屏幕
  } else {
    return 3; // 小屏幕
  }
}

// 初始化地图
var map = L.map('map', {
  center: [-25.2744, 133.7751],
  zoom: getInitialZoom(),
  minZoom: 0,
  maxZoom: 8,
  zoomControl: false,
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
  keyboard: false
});

// 添加高德地图图层
L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&key=0d74da2bbff35f4ac3e0477be8deeb74', {
  subdomains: '1234', // 高德地图支持的子域名
  maxZoom: 18,
  attribution: '© 高德地图'
}).addTo(map);

// API 密钥
var aqicnApiKey = "b12bbdc7e6c363e2e24787cb5d1f926747dd46ee";
var openWeatherMapApiKey = "75cb1af3f90086faa221f4de75f0c803";

// 示例港口数据
var ports = [
  {
    name: "Port of Groote Eylandt Milner Bay",
    lat: -13.8481,
    lon: 136.4877,
    berths: "1个泊位，散货",
    fees: { Supramax: "暂无", Ultramax: "暂无"},
    cargo: "锰矿石",
    throughput: "暂无",
    draft: "12.5米",
    opening: "于2024年3月关闭直至另行通知。",
    shipTypes: "暂无",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Skardon River",
    lat: -10.6904,
    lon: 142.7905,
    berths: "暂无",
    fees: { Supramax: "54,260澳元", Ultramax: "59,235澳元" },
    cargo: "铝土矿，铁矿",
    throughput: "年吞吐量约350万吨",
    draft: "暂无",
    opening: "全年开放，极端天气时关闭",
    shipTypes: "适合Supramax, Ultramax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", 248, 400, 179, 321] }
  },
  {
    name: "Port of Weipa",
    lat: -12.6408,
    lon: 141.8551,
    berths: "2个泊位，散货",
    fees: { Supramax: "暂无", Ultramax: "暂无" },
    cargo: "铝土矿，铁矿",
    throughput: "年吞吐量约1734万吨",
    draft: "11.7米",
    opening: "全年开放，依据季风影响",
    shipTypes: "Handymax, Capesize",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [2734, 1979, 1597, 1620, 1517] }
  },
  {
    name: "Port of Abbot Point",
    lat: -20.3923,
    lon: 148.0956,
    berths: "2个泊位，散货",
    fees: { Handymax: "74,000澳元", Supramax: "80,000澳元", Ultramax: "85,000澳元", Panamax: "110,000澳元", Kamsarmax: "118,000澳元", PostPanamax: "124,000澳元", MiniCape: "142,000澳元", Capesize: "169,000澳元", Newcastlemax: "178,000澳元" },
    cargo: "煤炭",
    throughput: "年吞吐量约3466万吨",
    draft: "16米+潮水/1.06, 排水量超过110,000吨的船只不能靠泊",
    opening: "全年开放, 圣诞节期间关闭",
    shipTypes: "适合Handymax, Supramax, Ultramax, Panamax, Kamsarmax, Post-Panamax, Mini-Cape, Capesize, Newcastlemax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [2894, 3189, 2956, 2823, 3344] }
  },
  {
    name: "Port of Mackay",
    lat: -21.1415,
    lon: 149.1953,
    berths: "4个泊位，散货",
    fees: { Handysize粮食: "128,000澳元", Handymax粮食: "160,000澳元", Supramax粮食: "218,000澳元", Panamax粮食: "280,000澳元" },
    cargo: "煤炭, 燃料, 糖, 谷物, 磁铁矿, 肥料, 废金属",
    throughput: "年吞吐量约358万吨",
    draft: "13.1米, sailling draft 8.6米+潮水/1.1, maximum departure draft 8.5米+潮水-10%UKC",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [291, 318, 318, 359, 351] }
  },
  {
    name: "Port of Hay Point",
    lat: -21.2081,
    lon: 149.2869,
    berths: "3个泊位，散货",
    fees: { Handymax: "130,875澳元", Supramax: "134,380澳元", Ultramax: "138,000澳元", Panamax: "142,185澳元", Kamsarmax: "147,215澳元", PostPanamax: "152,160澳元", MiniCape: "158,000澳元", Capesize: "187,225澳元", Newcastlemax: "195,000澳元" },
    cargo: "煤炭",
    throughput: "年吞吐量约9997万吨",
    draft: "13.7米+潮水/1.05",
    opening: "全年开放,极端天气时关闭",
    shipTypes: "适合Handymax, Supramax, Ultramax, Panamax, Kamsarmax, Post-Panamax, Mini-Cape, Capesize, Newcastlemax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", 11832, 11086, 9832, 9710] }
  },
  {
    name: "Dalrymple Bay Coal Terminal",
    lat: -21.1820,
    lon: 149.2280,
    berths: "4个泊位，散货",
    fees: { Handymax: "125,830澳元", Supramax: "129,985澳元", Ultramax: "132,000澳元", Panamax: "139,110澳元", Kamsarmax: "144,960澳元", PostPanamax: "150,835澳元", MiniCape: "160,000澳元", Capesize: "193,715澳元", Newcastlemax: "208,000澳元" },
    cargo: "煤炭",
    throughput: "年吞吐量约6052万吨",
    draft: "13.7米+潮水/1.05",
    opening: "全年开放",
    shipTypes: "适合Handymax, Supramax, Ultramax, Panamax, Kamsarmax, Post-Panamax, Mini-Cape, Capesize, Newcastlemax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [6939, 6118, 5189, 5323, 5683] }
  },
  {
    name: "Port of Gladstone",
    lat: -23.8495,
    lon: 151.2634,
    berths: "15个泊位，散货",
    fees: { Handysize粮食: "80,350澳元", Handymax粮食: "97,850澳元", Supramax粮食: "103,000澳元", Panamax粮食: "118,450澳元", Handymax煤炭: "90,735澳元", Supramax煤炭: "102,880澳元", Ultramax煤炭: "108,365澳元", Panamax煤炭: "120,545澳元", Kamsarmax煤炭: "127,015澳元", PostPanamax煤炭: "141,245澳元", MiniCape煤炭: "167,760澳元", Capesize煤炭: "239,605澳元", Newcastlemax煤炭: "538,920澳元" },
    cargo: "煤炭，铝土矿，谷物，水泥，铁矿，水泥熟料，废金属，化肥，焦炭",
    throughput: "年吞吐量约11121万吨",
    draft: "18.8米, sailing draft 11.3米+潮水-0.5UKC",
    opening: "全年开放",
    shipTypes: "适合Handymax, Supramax, Ultramax, Panamax, Kamsarmax, Post-Panamax, Mini-Cape, Capesize, Newcastlemax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", 12402, 12199, 12262, 11941] }
  },
  {
    name: "Port of Brisbane",
    lat: -27.4111,
    lon: 153.1176,
    berths: "13个泊位，散货和集装箱",
    fees: { Handysize粮食: "87,650澳元", Handymax粮食: "97,335澳元", Supramax粮食: "104,665澳元", Panamax粮食: "92,000澳元", Handymax煤炭: "77,000澳元", Supramax煤炭: "80,000澳元", Ultramax煤炭: "86,000澳元", Panamax煤炭: "102,000澳元", Kamsarmax煤炭: "94,000澳元", PostPanamax煤炭: "98,000澳元", MiniCape煤炭: "108,000澳元" },
    cargo: "熟料，石膏，谷物，肥料，糖，矿砂，废钢，沥青，水泥，焦炭，矿物质",
    throughput: "年吞吐量约3415万吨",
    draft: "14.2米, sailing draft 13.8米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Ultramax, Panamax, Kamsarmax, Post-Panamax, Mini-Cape",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", 3404, 3140, 2930, 3210] }
  },
  {
    name: "Port of Newcastle",
    lat: -32.9173,
    lon: 151.7740,
    berths: "2个泊位，散货",
    fees: { Handysize粮食: "61,530澳元", Handymax粮食: "71,320澳元", Supramax粮食: "75,490澳元", Panamax粮食: "97,425澳元", Handymax煤炭: "78,350澳元", Supramax煤炭: "86,900澳元", Ultramax煤炭: "100,875澳元", Panamax煤炭: "124,525澳元", Kamsarmax煤炭: "129,550澳元", PostPanamax煤炭: "135,350澳元", MiniCape煤炭: "165,400澳元", Capesize煤炭: "207,900澳元", Newcastlemax煤炭: "228,250澳元" },
    cargo: "煤炭，水泥，氧化铝，石油焦，磁铁矿，沙子，废料，肥料，谷物，矿石精矿，焦炭，矿物质",
    throughput: "暂无",
    draft: "16.2米, sailing draft 11.6米-0.3UKC",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Ultramax, Panamax, Kamsarmax, Post-Panamax, Mini-Cape, Capesize, Newcastlemax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Port Kembla",
    lat: -34.4656,
    lon: 150.8955,
    berths: "4个泊位，散货",
    fees: { Handysize粮食: "81,480澳元", Handymax粮食: "94,890澳元", Supramax粮食: "98,215澳元", Panamax粮食: "142,340澳元", Handymax煤炭: "93,500澳元", Supramax煤炭: "97,350澳元", Ultramax煤炭: "106,050澳元", Panamax煤炭: "131,250澳元", Kamsarmax煤炭: "137,100澳元", PostPanamax煤炭: "149,625澳元", MiniCape煤炭: "172,200澳元", Capesize煤炭: "248,500澳元", Newcastlemax煤炭: "335,000澳元"  },
    cargo: "铜精矿，肥料，熟料，纸浆，锯材，钢铁，煤炭，谷物，水泥，矿物质",
    throughput: "暂无",
    draft: "16米, 103泊位sailing draft 14.9米+潮水1.08UKC, 104泊位shilling draft 13.6米+潮水1.08UKC, maximum departure 14.4米+潮水-0.3UKC ",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Ultramax, Panamax, Kamsarmax, Post-Panamax, Mini-Cape, Capesize, Newcastlemax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Port Hedland",
    lat: -20.3086,
    lon: 118.5784,
    berths: "5个泊位，散货",
    fees: { MiniCape铁矿: "136635澳元" },
    cargo: "铁矿石，谷物，水泥",
    throughput: "年吞吐量约57360万吨",
    draft: "19.2米",
    opening: "全年开放",
    shipTypes: "Mini-Cape",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: ["暂无", 53820, 54610, 56110, 56650] }
  },
  {
    name: "Port of Cape Preston",
    lat: -20.5294,
    lon: 117.2204,
    berths: "仅在锚地装载，散货",
    fees: { MiniCape铁矿: "暂无" },
    cargo: "铁矿石",
    throughput: "暂无",
    draft: "15米",
    opening: "全年开放，港口通常在关闭前2-3个月通知，无固定关闭时间",
    shipTypes: "Mini-Cape, Capesize",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Onslow",
    lat: -21.1626,
    lon: 115.1064,
    berths: "1个泊位，散货",
    fees: { Capesize: "36,320澳元" },
    cargo: "矿石",
    throughput: "暂无",
    draft: "暂无",
    opening: "全年开放",
    shipTypes: "适合Capesize",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Esperance",
    lat: -33.8603,
    lon: 121.8945,
    berths: "3个泊位，散货",
    fees: { Handysize粮食: "111,000澳元", Handymax粮食: "130,000澳元", Supramax粮食: "141,000澳元", Panamax粮食: "155,000澳元", Kamsarmax粮食: "165,000澳元" },
    cargo: "铁矿，谷物，化肥，矿物质",
    throughput: "年吞吐量约1320万吨",
    draft: "18米, sailing draft 13.5米+潮水, maximum departure 13.4米+潮水",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax, Kamsarmax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: ["暂无", "暂无", "暂无", "暂无", 1360] }
  },
  {
    name: "Port of Dampier",
    lat: -20.6284,
    lon: 116.6872,
    berths: "7个泊位，散货",
    fees: { Handysize: "90,685澳元", Supramax: "101,050澳元", Panamax: "112,025澳元", Kamsarmax: "114,760澳元" },
    cargo: "铁矿石，盐，氨，矿物，谷物，一般散货，水泥",
    throughput: "年吞吐量约17264万吨",
    draft: "17.5米",
    opening: "在热带气旋季节通常为每年11月至次年4月期间因天气预警而暂时关闭",
    shipTypes: "适合Handysize, Supramax, Panamax, Kamsarmax, Capesize",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: ["暂无", 16793, 16741, 16189, 17400] }
  },
  {
    name: "Port of Cape Cuvier",
    lat: -24.7312,
    lon: 113.4778,
    berths: "1个泊位，散货",
    fees: { Handysize: "75,925澳元", Supramax: "99,820澳元", Panamax: "121,150澳元", Kamsarmax: "131,420澳元" },
    cargo: "盐，石膏，矿物质",
    throughput: "暂无",
    draft: "16.8米",
    opening: "通常每年有一次非固定的持续3-4周的大规模关闭",
    shipTypes: "适合Handysize, Handymax, Supramax, Ultramax, Panamax, Kamsarmax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Geraldton",
    lat: -28.7784,
    lon: 114.6134,
    berths: "7个泊位，散货",
    fees: { Panamax铁矿: "76,000澳元", Kamsarmax铁矿: "81,000澳元", PostPanamax铁矿: "93,000澳元", Handysize粮食: "115,000澳元", Handymax粮食: "150,000澳元", Supramax粮食: "160,000澳元", Panamax粮食: "185,000澳元", Kamsarmax粮食: "200,000澳元" },
    cargo: "谷物，矿物，铁矿，肥料，燃料",
    throughput: "年吞吐量约1729万吨",
    draft: "12.8米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax, Kamsarmax, Post-Panamax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: ["暂无", 1495, 1507, 1640, 1741] }
  },
  {
    name: "Port of Kwinana",
    lat: -32.1897,
    lon: 115.7610,
    berths: "3个泊位，散货",
    fees: { Handysize粮食: "67,000澳元", Handymax粮食: "78,000澳元", Supramax粮食: "83,000澳元", Panamax粮食: "88,000澳元", Kamsarmax粮食: "94,000澳元" },
    cargo: "煤炭，石油，液化石油气，氧化铝，矿砂，化肥，煤炭，硫磺，铁矿，水泥，矿物质",
    throughput: "暂无",
    draft: "10.5米, maximum departure draft 12.9米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax, Kamsarmax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Bunbury",
    lat: -33.3263,
    lon: 115.6353,
    berths: "5个泊位，散货",
    fees: { Handysize粮食: "112,000澳元", Handymax粮食: "125,000澳元", Panamax粮食: "170,000澳元" },
    cargo: "甲醇，氧化铝，木片，谷物，氢氧化钠，一般散货，化肥，矿物质，铁矿",
    throughput: "年吞吐量约1700万吨",
    draft: "11.6米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: ["暂无", "暂无", "暂无", "暂无", 1810] }
  },
  {
    name: "Port of Albany",
    lat: -35.0219,
    lon: 117.8915,
    berths: "2个泊位，散货",
    fees: { Handysize粮食: "98,000澳元", Handymax粮食: "108,000澳元", Supramax粮食: "119,000澳元", Panamax粮食: "126,000澳元", Kamsarmax粮食: "130,000澳元" },
    cargo: "谷物，木片，化肥，焦炭，矿物质",
    throughput: "年吞吐量约520万吨",
    draft: "11.7米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax, Kamsarmax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: ["暂无", "暂无", "暂无", "暂无", 550] }
  },
  {
    name: "Port of Port Latta",
    lat: -40.8952,
    lon: 145.3378,
    berths: "暂无",
    fees: { Panamax: "112,460澳元" },
    cargo: "铁矿",
    throughput: "暂无",
    draft: "15.3米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Kamsarmax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Geelong",
    lat: -38.1499,
    lon: 144.3607,
    berths: "4个泊位，散货",
    fees: { Handysize粮食: "125,000澳元", Handymax粮食: "147,500澳元", Supramax粮食: "166,000澳元", Panamax粮食: "177,500澳元" },
    cargo: "农产品，木片，矿物，化肥，石油，水泥，矿物质",
    throughput: "年吞吐量约1367万吨",
    draft: "11.7米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: ["暂无", 1152, 1078, 1162, 1151] }
  },
  {
    name: "Port of Portland",
    lat: -38.3586,
    lon: 141.5930,
    berths: "5个泊位，散货",
    fees: { Handysize粮食: "115,000澳元", Handymax粮食: "123,235澳元", Supramax粮食: "149,665澳元", Panamax粮食: "138,000澳元" },
    cargo: "原木，木片，冶炼产品，化肥，谷物，矿砂",
    throughput: "年吞吐量约610万吨",
    draft: "12.7米, maximum departure draft 12.85米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Melbourne",
    lat: -37.8143,
    lon: 144.9632,
    berths: "6个泊位，散货",
    fees: { Handysize粮食: "105,465澳元", Handymax粮食: "117,535澳元", Supramax粮食: "123,325澳元", Panamax粮食: "128,525澳元" },
    cargo: "钢铁，水泥，谷物，石膏，原油肥料和矿物，NEI，油菜籽，石油",
    throughput: "暂无",
    draft: "14.7米, maximum departure draft 10.6米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Adelaide",
    lat: -34.9285,
    lon: 138.6007,
    berths: "3个泊位，散货",
    fees: { Handysize粮食: "85,250澳元", Handymax粮食: "100,250澳元", Supramax粮食: "121,000澳元", Panamax粮食: "136,335澳元", Kamsarmax粮食: "127,000澳元" },
    cargo: "肥料，废金属，钢材，纺织品，酸，纯碱，林业，矿砂，牲畜，硫磺，水泥，熟料，石灰石，石油，散装液体，谷物，矿物质",
    throughput: "暂无",
    draft: "13米, 27号泊位sailling draft 9.3米+潮水less7.5% VSL DRAFT, OH8号泊位sailling draft 14.2米+潮水less10% VSL DRAFT, maximum departure draft 14.2米 ",
    opening: "全年开放",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax, Kamsarmax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Whyalla",
    lat: -33.0325,
    lon: 137.5886,
    berths: "2个泊位，散货",
    fees: { Capesize: "163,065澳元" },
    cargo: "煤炭，铁矿，铜精矿，谷物，水泥，焦炭，矿物质",
    throughput: "暂无",
    draft: "12.5米",
    opening: "全年开放，风速超过25节或者潮差超过40厘米会暂停船舶操作",
    shipTypes: "适合Capesize",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  },
  {
    name: "Port of Lincoln",
    lat: -34.7339,
    lon: 135.8684,
    berths: "2个泊位，散货",
    fees: { Handymax: "99,670澳元", Supramax: "113,620澳元", Panamax: "127,465澳元", Capesize: "129,770澳元" },
    cargo: "谷物，化肥",
    throughput: "暂无",
    draft: "14.7米, sailing draft 14.4米+潮水less 1.2米或者10% VSL DRAFT",
    opening: "只能在白天停泊，白天或者晚上离开",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax, Capesize, Kamsarmax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: ["暂无", "暂无", "暂无", "暂无", "暂无"] }
  }
];

// 为每个港口添加标记
ports.forEach(port => {
  L.marker([port.lat, port.lon]).addTo(map)
    .bindPopup(`<strong>${port.name}</strong>`)
    .on("click", function() {
      showModal(port);
    });
});

// 显示模态窗口
function showModal(port) {
  document.getElementById("modalTitle").innerText = port.name;

  document.getElementById("modalContent").innerHTML = `
    <p><strong>泊位数量及类型：</strong> ${port.berths}</p>
    <p><strong>主要货种：</strong> ${port.cargo}</p>
    <p><strong>年吞吐量：</strong> ${port.throughput}</p>
    <p><strong>吃水深度：</strong> ${port.draft}</p>
    <p><strong>开港时间：</strong> ${port.opening}</p>
    <p><strong>可靠泊船型：</strong> ${port.shipTypes}</p>
    <p><strong>港口费用：</strong></p>
    ${Object.entries(port.fees).map(([shipType, fee]) => `<p>${shipType}: ${fee}</p>`).join('')}
  `;

  document.getElementById("portModal").style.display = "block";
  
  fetchWeatherData(port);
  fetchAirQualityData(port);
  displayThroughputChart(port);
}

// 获取天气数据
function fetchWeatherData(port) {
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${port.lat}&lon=${port.lon}&appid=${openWeatherMapApiKey}&units=metric&lang=zh_cn`;

  $.getJSON(weatherUrl)
    .done(function(weatherData) {
      var temperature = weatherData.main.temp;
      var weatherDescription = weatherData.weather[0].description;
      var weatherIcon = weatherData.weather[0].icon;
      var windSpeed = weatherData.wind.speed;
      var windDirection = weatherData.wind.deg;
      var humidity = weatherData.main.humidity;
      var iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      document.getElementById("weatherInfo").innerHTML = `
        <div class="weather-info">
          <img src="${iconUrl}" alt="Weather icon">
          <div>
            <p><strong>${temperature}°C - ${weatherDescription}</strong></p>
            <p>湿度: ${humidity}%</p>
            <p>风速: ${windSpeed} 米/秒，方向: ${getWindDirection(windDirection)}</p>
          </div>
        </div>
      `;
      document.getElementById("weatherInfo").classList.add("show");
    })
    .fail(function() {
      document.getElementById("weatherInfo").innerHTML = "<p>无法获取天气信息</p>";
      document.getElementById("weatherInfo").classList.add("show");
    });
}

// 获取空气质量数据
function fetchAirQualityData(port) {
  var airQualityUrl = `https://api.waqi.info/feed/geo:${port.lat};${port.lon}/?token=${aqicnApiKey}`;

  $.getJSON(airQualityUrl)
    .done(function(airData) {
      var aqi = airData.data.aqi;
      var airQuality = aqi <= 50 ? "优" : aqi <= 100 ? "良" : "不健康";
      
      document.getElementById("weatherInfo").innerHTML += `
        <div>
          <p>AQI: ${aqi} (${airQuality})</p>
        </div>
      `;
    });
}

// 显示吞吐量图表
function displayThroughputChart(port) {
  setTimeout(() => {
    var ctx = document.getElementById("throughputChart");
    if (ctx) {
      new Chart(ctx.getContext("2d"), {
        type: 'line',
        data: {
          labels: port.historicalData.years,
          datasets: [
            {
              label: '年吞吐量（万吨）',
              data: port.historicalData.throughput,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }, 250);
}

// 关闭模态窗口
function closeModal() {
  document.getElementById("portModal").style.display = "none";
  document.getElementById("weatherInfo").innerHTML = "";
  document.getElementById("weatherInfo").classList.remove("show");
}

// 获取风向
function getWindDirection(degree) {
  const directions = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"];
  return directions[Math.round(degree / 45) % 8];
}

// 定义初始地图视图
const initialView = {
  center: [-25.2744, 133.7751],
  zoom: getInitialZoom()
};

// 初始化地图
  map.center = initialView.center;
  map.zoom= initialView.zoom;


// 创建地图和标记
var markers = {};
ports.forEach(port => {
  const marker = L.marker([port.lat, port.lon]).addTo(map)
    .bindPopup(`<strong>${port.name}</strong>`)
    .on("click", function() {
      showModal(port);
    });
  markers[port.name.toLowerCase()] = marker;
});

// 处理搜索输入
function handleSearchInput() {
  const searchBox = document.getElementById("searchBox");
  const query = searchBox.value.toLowerCase();
  const suggestionsList = document.getElementById("suggestionsList");

  // 清空当前建议
  suggestionsList.innerHTML = "";

  if (query) {
    const suggestions = ports.filter(port => port.name.toLowerCase().includes(query));
    
    suggestions.forEach(suggestion => {
      const listItem = document.createElement("li");
      listItem.textContent = suggestion.name;
      listItem.onclick = () => highlightPort(suggestion.name);
      suggestionsList.appendChild(listItem);
    });
  } else {
    // 当搜索框为空时，恢复到初始视图
    map.setView(initialView.center, initialView.zoom);
  }
}

// 高亮并移动到港口
function highlightPort(portName) {
  const port = ports.find(p => p.name === portName);

  if (port) {
    map.setView([port.lat, port.lon], 8);  // 缩放地图到港口
    markers[port.name.toLowerCase()].openPopup();  // 打开港口标记的弹出窗口

    // 清空搜索框和建议列表
    document.getElementById("searchBox").value = "";
    document.getElementById("suggestionsList").innerHTML = "";
  }
}

// 修改关闭模态窗口函数
function closeModal() {
  document.getElementById("portModal").style.display = "none";
  document.getElementById("weatherInfo").innerHTML = "";
  document.getElementById("weatherInfo").classList.remove("show");

  // 恢复地图到初始视图
  map.setView(initialView.center, initialView.zoom);
}

function displayTopPorts() {
  console.log("执行 displayTopPorts 函数，港口数据:", ports); // 确认 ports 数组内容

  const topPorts = [...ports]
    .map(port => {
      // 解析吞吐量字符串中的数值部分
      const throughput = parseFloat(port.throughput.replace(/[^\d.-]/g, ''));
      console.log(`港口: ${port.name}, 吞吐量: ${throughput}`); // 确认每个港口的吞吐量
      return { ...port, throughput: throughput || 0 };
    })
    .sort((a, b) => b.throughput - a.throughput)
    .slice(0, 10);

  console.log("排序后的前10港口数据:", topPorts); // 输出排序后的数据

  const rankTableBody = document.getElementById("rankTable").getElementsByTagName("tbody")[0];
  rankTableBody.innerHTML = ""; // 清空表格内容

  topPorts.forEach((port, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${port.name}</td>
      <td>${port.throughput}</td>
    `;
    rankTableBody.appendChild(row);
  });
}

// 在页面加载完成后调用 displayTopPorts()
window.addEventListener("load", function() {
  console.log("页面加载完成，准备调用 displayTopPorts 函数");
  displayTopPorts();
});

// 筛选条件函数
function applyFilter() {
  const filterValue = document.getElementById("filterSelect").value;
  let filteredPorts = [];

  switch (filterValue) {
    case "top10Throughput":
      // 按吞吐量排序并获取前10个港口
      filteredPorts = [...ports]
        .map(port => ({ ...port, throughputValue: parseFloat(port.throughput.replace(/[^\d.-]/g, '')) || 0 }))
        .sort((a, b) => b.throughputValue - a.throughputValue)
        .slice(0, 10);
      break;

    case "ironOre":
      // 筛选出装卸铁矿石的港口并按吞吐量排序
      filteredPorts = ports
        .filter(port => port.cargo.includes("铁矿"))
        .map(port => ({ ...port, throughputValue: parseFloat(port.throughput.replace(/[^\d.-]/g, '')) || 0 }))
        .sort((a, b) => b.throughputValue - a.throughputValue);
      break;

    case "grain":
      // 筛选出装卸粮食的港口并按吞吐量排序
      filteredPorts = ports
        .filter(port => port.cargo.includes("谷物"))
        .map(port => ({ ...port, throughputValue: parseFloat(port.throughput.replace(/[^\d.-]/g, '')) || 0 }))
        .sort((a, b) => b.throughputValue - a.throughputValue);
      break;
    
    case "bauxite":
      // 筛选出装卸粮食的港口并按吞吐量排序
      filteredPorts = ports
        .filter(port => port.cargo.includes("铝土矿"))
        .map(port => ({ ...port, throughputValue: parseFloat(port.throughput.replace(/[^\d.-]/g, '')) || 0 }))
        .sort((a, b) => b.throughputValue - a.throughputValue);
      break;
    
  }

  updateTable(filteredPorts);
}



// 更新表格内容
function updateTable(portList) {
  const rankTableBody = document.getElementById("rankTable").getElementsByTagName("tbody")[0];
  rankTableBody.innerHTML = ""; // 清空表格内容

  portList.forEach((port, index) => {
    const row = document.createElement("tr");

    // 创建港口名称单元格并添加点击事件
    const portNameCell = document.createElement("td");
    portNameCell.innerHTML = `<a href="#" style="text-decoration: none; color: inherit;">${port.name}</a>`;
    portNameCell.addEventListener("click", () => showModal(port));

    row.innerHTML = `
      <td>${index + 1}</td>
    `;
    row.appendChild(portNameCell);

    const throughputCell = document.createElement("td");
    throughputCell.textContent = `${port.throughputValue} 万吨`;
    row.appendChild(throughputCell);

    rankTableBody.appendChild(row);
  });
}
// 页面加载时初始化筛选，显示初始的港口列表
window.addEventListener("load", function() {
  applyFilter(); // 默认显示Top 10 吞吐量
});

function toggleRankList() {
  const rankContainer = document.getElementById("rankContainer");
  const expandButton = document.getElementById("expandButton");

  if (rankContainer.classList.contains("collapsed")) {
    // 展开
    rankContainer.classList.remove("collapsed");
    expandButton.style.display = "none"; // 隐藏展开按钮
  } else {
    // 收起
    rankContainer.classList.add("collapsed");
    expandButton.style.display = "block"; // 显示展开按钮
  }
}

// 页面加载时初始化
window.addEventListener("load", function() {
  document.getElementById("expandButton").style.display = "none"; // 隐藏展开按钮
});
