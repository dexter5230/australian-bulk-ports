
// 初始化地图
var map = L.map('map', {
  center: [-25.2744, 133.7751],
  zoom: 4,
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
    fees: { Panamax: "每吨约6美元", Handy: "每吨约5美元" },
    cargo: "锰矿石",
    throughput: "年吞吐量约60万吨",
    draft: "12.5米",
    opening: "于2024年3月关闭直至另行通知。",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [40, 45, 50, 55, 60] }
  },
  {
    name: "Port of Skardon River",
    lat: -10.6904,
    lon: 142.7905,
    berths: "1个泊位，散货",
    fees: { Panamax: "每吨约4.5美元", Handy: "每吨约3.5美元" },
    cargo: "铝土矿",
    throughput: "年吞吐量约350万吨",
    draft: "8米",
    opening: "全年开放",
    shipTypes: "适合Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [0, 248, 400, 179, 321] }
  },
  {
    name: "Port of Weipa Lorim Point Wharf",
    lat: -12.6408,
    lon: 141.8551,
    berths: "2个泊位，散货",
    fees: { Panamax: "每吨约4美元", Handy: "每吨约3美元" },
    cargo: "铝土矿",
    throughput: "年吞吐量约1734万吨",
    draft: "11.7米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [2734, 1979, 1597, 1620, 1517] }
  },
  {
    name: "Port of Abbot Point",
    lat: -20.3923,
    lon: 148.0956,
    berths: "2个泊位，散货",
    fees: { Capesize: "每吨约5.5美元", Panamax: "每吨约4.5美元" },
    cargo: "煤炭",
    throughput: "年吞吐量约3466万吨",
    draft: "17.6米",
    opening: "全年开放, 圣诞节期间关闭",
    shipTypes: "适合Handymax, Panamax, Supramax, Capesize, Kamsarmax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [2894, 3189, 2956, 2823, 3344] }
  },
  {
    name: "Port of Mackay",
    lat: -21.1415,
    lon: 149.1953,
    berths: "4个泊位，散货",
    fees: { Panamax粮食: "280,000澳元", Handysize粮食: "128,000澳元", Handymax粮食: "160,000澳元", Supramax粮食: "218,000澳元"},
    cargo: "煤炭, 燃料, 糖, 谷物, 磁铁矿, 肥料, 废金属",
    throughput: "年吞吐量约358万吨",
    draft: "13.1米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [291, 318, 318, 359, 351] }
  },
  {
    name: "Port of Hay Point",
    lat: -21.2081,
    lon: 149.2869,
    berths: "3个泊位，散货",
    fees: { Handysize: "129,345澳元", Panamax: "147,445澳元", Supramax: "130,870澳元", Kamsarmax: "150,500澳元" },
    cargo: "煤炭",
    throughput: "年吞吐量约9997万吨",
    draft: "17.5米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Panamax, Supramax, Kamsarmax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [0, 11832, 11086, 9832, 9710] }
  },
  {
    name: "Dalrymple Bay Coal Terminal",
    lat: -21.1820,
    lon: 149.2280,
    berths: "2个泊位，散货",
    fees: { Handysize: "107,190澳元", Panamax: "127,100澳元", Supramax: "116,635澳元", Kamsarmax: "136,645澳元" },
    cargo: "煤炭",
    throughput: "年吞吐量约6052万吨",
    draft: "15米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Panamax, Supramax, Kamsarmax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [6939, 6118, 5189, 5323, 5683] }
  },
  {
    name: "Port of Gladstone",
    lat: -23.8495,
    lon: 151.2634,
    berths: "15个泊位，散货和集装箱",
    fees: { Panamax粮食: "118,450澳元", Handysize粮食: "80,350澳元", Handymax粮食: "97,850澳元", Supramax粮食: "103,000澳元" },
    cargo: "煤炭，铝土矿，谷物，水泥，铁矿，水泥熟料，废金属",
    throughput: "年吞吐量约11121万吨",
    draft: "18.8米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [0, 12402, 12199, 12262, 11941] }
  },
  {
    name: "Port of Brisbane",
    lat: -27.4111,
    lon: 153.1176,
    berths: "13个泊位，散货和集装箱",
    fees: { Panamax粮食: "92,000澳元", Handysize粮食: "87,650澳元", Handymax粮食: "97,335澳元", Supramax粮食: "104,665澳元" },
    cargo: "熟料，石膏，谷物，肥料，糖，矿砂，废钢，沥青",
    throughput: "年吞吐量约3415万吨",
    draft: "14.2米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [0, 3404, 3140, 2930, 3210] }
  },
  {
    name: "Port of Newcastle",
    lat: -32.9173,
    lon: 151.7740,
    berths: "2个泊位，散货",
    fees: { Panamax粮食: "97,425澳元", Handysize粮食: "61,530澳元", Handymax粮食: "71,320澳元", Supramax粮食: "75,490澳元" },
    cargo: "煤炭，水泥，氧化铝，石油焦，磁铁矿，沙子，废料，肥料，谷物，矿石精矿",
    throughput: "年吞吐量约1500万吨",
    draft: "16.2米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [1200, 1300, 1400, 1500, 1600] }
  },
  {
    name: "Port of Port Kembla",
    lat: -34.4656,
    lon: 150.8955,
    berths: "4个泊位，散货",
    fees: { Panamax粮食: "142,340澳元", Handysize粮食: "81,480澳元", Handymax粮食: "94,890澳元", Supramax粮食: "98,215澳元" },
    cargo: "铜精矿，肥料，熟料，纸浆，锯材，钢铁",
    throughput: "年吞吐量约600万吨",
    draft: "16米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [500, 550, 600, 650, 700] }
  },
  {
    name: "Port of Port Hedland",
    lat: -20.3086,
    lon: 118.5784,
    berths: "10个泊位，散货",
    fees: { Capesize: "每吨约5美元", Panamax: "每吨约4美元" },
    cargo: "铁矿石",
    throughput: "年吞吐量约57360万吨",
    draft: "19.2米",
    opening: "全年开放",
    shipTypes: "适合Capesize, Panamax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [0, 53820, 54610, 56110, 56650] }
  },
  {
    name: "Port of Cape Preston",
    lat: -20.5294,
    lon: 117.2204,
    berths: "2个泊位，散货",
    fees: { Capesize: "每吨约5.5美元", Panamax: "每吨约4.5美元" },
    cargo: "铁矿石",
    throughput: "年吞吐量约3000万吨",
    draft: "15米",
    opening: "全年开放",
    shipTypes: "适合Capesize, Panamax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [2500, 2800, 2900, 3000, 3100] }
  },
  {
    name: "Port of Onslow",
    lat: -21.1626,
    lon: 115.1064,
    berths: "1个泊位，散货",
    fees: { Panamax: "每吨约4美元", Handy: "每吨约3美元" },
    cargo: "液化天然气",
    throughput: "年吞吐量约150万吨",
    draft: "10米",
    opening: "全年开放",
    shipTypes: "适合Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [100, 120, 130, 140, 150] }
  },
  {
    name: "Port of Esperance",
    lat: -33.8603,
    lon: 121.8945,
    berths: "3个泊位，散货",
    fees: { Panamax粮食: "155,000澳元", Handysize粮食: "111,000澳元", Handymax粮食: "130,000澳元", Supramax粮食: "141,000澳元", Kamsarmax粮食: "165,000澳元" },
    cargo: "铁矿，谷物",
    throughput: "年吞吐量约1320万吨",
    draft: "18米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax, Kamsarmax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [0, 0, 0, 0, 1360] }
  },
  {
    name: "Port of Dampier",
    lat: -20.6284,
    lon: 116.6872,
    berths: "7个泊位，散货",
    fees: { Handysize: "90,685澳元", Panamax: "112,025澳元", Supramax: "101,050澳元", Kamsarmax: "114,760澳元" },
    cargo: "铁矿石，盐，氨，矿物，谷物，一般散货",
    throughput: "年吞吐量约17264万吨",
    draft: "17.5米",
    opening: "在热带气旋季节通常为每年11月至次年4月期间因天气预警而暂时关闭",
    shipTypes: "适合Handysize, Panamax, Supramax, Kamsarmax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [0, 16793, 16741, 16189, 17400] }
  },
  {
    name: "Port of Cape Cuvier",
    lat: -24.7312,
    lon: 113.4778,
    berths: "1个泊位，散货",
    fees: { Handysize: "75,925澳元", Panamax: "121,150澳元", Supramax: "99,820澳元", Kamsarmax: "131,420澳元" },
    cargo: "盐，石膏",
    throughput: "年吞吐量约10万吨",
    draft: "16.8米",
    opening: "通常每年有一次非固定的持续3-4周的大规模关闭",
    shipTypes: "适合Handysize, Panamax, Supramax, Kamsarmax, Handymax, Ultramax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [8, 9, 10, 11, 12] }
  },
  {
    name: "Port of Geraldton",
    lat: -28.7784,
    lon: 114.6134,
    berths: "7个泊位，散货",
    fees: { Panamax: "76,000澳元", Kamsarmax: "81,000澳元", Capesize: "93,000澳元" },
    cargo: "谷物，矿物，铁矿，肥料，燃料",
    throughput: "年吞吐量约1729万吨",
    draft: "12.8米",
    opening: "全年开放",
    shipTypes: "适合Handysize, Panamax, Supramax, Kamsarmax, Handymax, Capesize",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [0, 1495, 1507, 1640, 1741] }
  },
  {
    name: "Port of Kwinana",
    lat: -32.1897,
    lon: 115.7610,
    berths: "3个泊位，散货",
    fees: { Panamax粮食: "88,000澳元", Handysize粮食: "67,000澳元", Handymax粮食: "78,000澳元", Supramax粮食: "83,000澳元", Kamsarmax粮食: "94,000澳元" },
    cargo: "煤炭，石油，液化石油气，氧化铝，矿砂，化肥，煤炭，硫磺，铁矿",
    throughput: "年吞吐量约600万吨",
    draft: "10.5米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax, Kamsarmax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [500, 550, 600, 650, 700] }
  },
  {
    name: "Port of Bunbury",
    lat: -33.3263,
    lon: 115.6353,
    berths: "5个泊位，散货",
    fees: { Panamax粮食: "170,000澳元", Handysize粮食: "112,000澳元", Handymax粮食: "125,000澳元" },
    cargo: "甲醇，氧化铝，木片，谷物，氢氧化钠，一般散货",
    throughput: "年吞吐量约1700万吨",
    draft: "11.6米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [0, 0, 0, 0, 1810] }
  },
  {
    name: "Port of Albany",
    lat: -35.0219,
    lon: 117.8915,
    berths: "2个泊位，散货",
    fees: { Panamax粮食: "126,000澳元", Handysize粮食: "98,000澳元", Handymax粮食: "108,000澳元", Supramax粮食: "119,000澳元", Kamsarmax粮食: "130,000澳元" },
    cargo: "谷物，木片",
    throughput: "年吞吐量约520万吨",
    draft: "11.7米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax, Kamsarmax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [0, 0, 0, 0, 550] }
  },
  {
    name: "Port of Port Latta",
    lat: -40.8952,
    lon: 145.3378,
    berths: "1个泊位，散货",
    fees: { Panamax: "每吨约5美元", Handy: "每吨约4美元" },
    cargo: "铁矿",
    throughput: "年吞吐量约100万吨",
    draft: "8米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [80, 90, 95, 100, 105] }
  },
  {
    name: "Port of Geelong",
    lat: -38.1499,
    lon: 144.3607,
    berths: "4个泊位，散货",
    fees: { Panamax粮食: "177,500澳元", Handysize粮食: "12,500澳元", Handymax粮食: "93,500澳元", Supramax粮食: "166,000澳元" },
    cargo: "农产品，木片，矿物，化肥，石油",
    throughput: "年吞吐量约1367万吨",
    draft: "11.7米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax",
    historicalData: { years: ["2019", "2020", "2021", "2022", "2023"], throughput: [0, 1152, 1078, 1162, 1151] }
  },
  {
    name: "Port of Portland",
    lat: -38.3586,
    lon: 141.5930,
    berths: "5个泊位，散货",
    fees: { Panamax粮食: "128,525澳元", Handysize粮食: "105,465澳元", Handymax粮食: "117,535澳元", Supramax粮食: "123,325澳元" },
    cargo: "原木，木片，冶炼产品，化肥，谷物，矿砂",
    throughput: "年吞吐量约610万吨",
    draft: "12.7米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [0, 0, 0, 0, 0] }
  },
  {
    name: "Port of Melbourne",
    lat: -37.8143,
    lon: 144.9632,
    berths: "6个泊位，散货",
    fees: { Panamax粮食: "138,000澳元", Handysize粮食: "115,000澳元", Handymax粮食: "123,235澳元", Supramax粮食: "149,665澳元" },
    cargo: "钢铁，水泥，谷物，石膏，原油肥料和矿物，NEI，油菜籽，石油",
    throughput: "年吞吐量约2000万吨",
    draft: "14.7米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [1500, 1600, 1700, 1800, 1900] }
  },
  {
    name: "Port of Adelaide",
    lat: -34.9285,
    lon: 138.6007,
    berths: "3个泊位，散货",
    fees: { Panamax粮食: "136,335澳元", Handysize粮食: "85,250澳元", Handymax粮食: "100,250澳元", Supramax粮食: "121,000澳元", Kamsarmax粮食: "127,000澳元" },
    cargo: "肥料，废金属，钢材，纺织品，酸，纯碱，林业，谷物，矿砂，牲畜，硫磺，废金属，水泥，熟料，石灰石，石油，散装液体，杂物，谷物",
    throughput: "年吞吐量约0万吨",
    draft: "13米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handysize, Handymax, Supramax, Kamsarmax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [0, 0, 0, 0, 0] }
  },
  {
    name: "Port of Whyalla",
    lat: -33.0325,
    lon: 137.5886,
    berths: "2个泊位，散货",
    fees: { Panamax: "每吨约4.5美元", Handy: "每吨约3.5美元" },
    cargo: "矿石",
    throughput: "年吞吐量约150万吨",
    draft: "12.5米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [120, 130, 140, 150, 160] }
  },
  {
    name: "Port of Lincoln",
    lat: -34.7339,
    lon: 135.8684,
    berths: "2个泊位，散货",
    fees: { Handymax: "99,670澳元", Panamax: "127,465澳元", Supramax: "113,620澳元", Capesize: "129,770澳元" },
    cargo: "谷物",
    throughput: "年吞吐量约0万吨",
    draft: "14.7米",
    opening: "只能在白天停泊，白天或者晚上离开",
    shipTypes: "适合Handysize, Handymax, Supramax, Panamax, Capesize, Kamsarmax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [0, 0, 0, 0, 0] }
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
    <p><strong>最大吃水深度：</strong> ${port.draft}</p>
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
  zoom: 5
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

