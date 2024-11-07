// 初始化地图
var map = L.map('map', {
  center: [-25.2744, 133.7751],
  zoom: 4,
  minZoom: 4,
  maxZoom: 8,
  zoomControl: false,
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
  keyboard: false
});

// 添加地图图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
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
    throughput: "年吞吐量约500万吨",
    draft: "10米",
    opening: "全年开放",
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
    throughput: "年吞吐量约300万吨",
    draft: "8米",
    opening: "全年开放",
    shipTypes: "适合Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [20, 25, 30, 35, 40] }
  },
  {
    name: "Port of Weipa Lorim Point Wharf",
    lat: -12.6408,
    lon: 141.8551,
    berths: "2个泊位，散货",
    fees: { Panamax: "每吨约4美元", Handy: "每吨约3美元" },
    cargo: "铝土矿",
    throughput: "年吞吐量约1200万吨",
    draft: "12米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [800, 900, 1000, 1100, 1200] }
  },
  {
    name: "Port of Abbot Point",
    lat: -20.3923,
    lon: 148.0956,
    berths: "4个泊位，散货",
    fees: { Capesize: "每吨约5.5美元", Panamax: "每吨约4.5美元" },
    cargo: "煤炭",
    throughput: "年吞吐量约5000万吨",
    draft: "14米",
    opening: "全年开放",
    shipTypes: "适合Capesize, Panamax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [4000, 4500, 4800, 5000, 5200] }
  },
  {
    name: "Port of Mackay",
    lat: -21.1415,
    lon: 149.1953,
    berths: "2个泊位，散货",
    fees: { Panamax: "每吨约6美元", Handy: "每吨约5美元" },
    cargo: "煤炭",
    throughput: "年吞吐量约700万吨",
    draft: "10米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [500, 600, 650, 700, 750] }
  },
  {
    name: "Port of Hay Point",
    lat: -21.2081,
    lon: 149.2869,
    berths: "2个泊位，散货",
    fees: { Capesize: "每吨约5.5美元", Panamax: "每吨约4.5美元" },
    cargo: "煤炭",
    throughput: "年吞吐量约4000万吨",
    draft: "14米",
    opening: "全年开放",
    shipTypes: "适合Capesize, Panamax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [3200, 3500, 3800, 4000, 4200] }
  },
  {
    name: "Dalrymple Bay Coal Terminal",
    lat: -21.1820,
    lon: 149.2280,
    berths: "4个泊位，散货",
    fees: { Capesize: "每吨约6美元", Panamax: "每吨约5美元" },
    cargo: "煤炭",
    throughput: "年吞吐量约8000万吨",
    draft: "15米",
    opening: "全年开放",
    shipTypes: "适合Capesize, Panamax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [6500, 7000, 7200, 7800, 8000] }
  },
  {
    name: "Port of Gladstone",
    lat: -23.8495,
    lon: 151.2634,
    berths: "10个泊位，散货和集装箱",
    fees: { Panamax: "每吨约5美元", Handy: "每吨约4美元" },
    cargo: "煤炭，铝土矿",
    throughput: "年吞吐量约1100万吨",
    draft: "12米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [900, 1000, 1100, 1200, 1300] }
  },
  {
    name: "Port of Brisbane",
    lat: -27.4111,
    lon: 153.1176,
    berths: "8个泊位，散货和集装箱",
    fees: { Panamax: "每吨约7美元", Handy: "每吨约6美元" },
    cargo: "各种货物",
    throughput: "年吞吐量约800万吨",
    draft: "13米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [600, 700, 800, 900, 1000] }
  },
  {
    name: "Port of Newcastle",
    lat: -32.9173,
    lon: 151.7740,
    berths: "8个泊位，散货",
    fees: { Capesize: "每吨约6美元", Panamax: "每吨约5美元" },
    cargo: "煤炭",
    throughput: "年吞吐量约1500万吨",
    draft: "13米",
    opening: "全年开放",
    shipTypes: "适合Capesize, Panamax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [1200, 1300, 1400, 1500, 1600] }
  },
  {
    name: "Port of Port Kembla",
    lat: -34.4656,
    lon: 150.8955,
    berths: "6个泊位，散货和集装箱",
    fees: { Panamax: "每吨约5.5美元", Handy: "每吨约4.5美元" },
    cargo: "煤炭，铁矿石",
    throughput: "年吞吐量约600万吨",
    draft: "12米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [500, 550, 600, 650, 700] }
  },
  {
    name: "Port of Port Hedland",
    lat: -20.3086,
    lon: 118.5784,
    berths: "10个泊位，散货",
    fees: { Capesize: "每吨约5美元", Panamax: "每吨约4美元" },
    cargo: "铁矿石",
    throughput: "年吞吐量约6000万吨",
    draft: "14米",
    opening: "全年开放",
    shipTypes: "适合Capesize, Panamax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [5000, 5500, 5800, 6000, 6200] }
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
    berths: "2个泊位，散货",
    fees: { Panamax: "每吨约4.5美元", Handy: "每吨约3.5美元" },
    cargo: "小麦，羊毛",
    throughput: "年吞吐量约200万吨",
    draft: "11米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [150, 160, 170, 180, 190] }
  },
  {
    name: "Port of Dampier",
    lat: -20.6284,
    lon: 116.6872,
    berths: "5个泊位，散货",
    fees: { Capesize: "每吨约6美元", Panamax: "每吨约5美元" },
    cargo: "铁矿石，液化天然气",
    throughput: "年吞吐量约4000万吨",
    draft: "14米",
    opening: "全年开放",
    shipTypes: "适合Capesize, Panamax",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [3000, 3500, 3800, 4000, 4200] }
  },
  {
    name: "Port of Cape Cuvier",
    lat: -24.7312,
    lon: 113.4778,
    berths: "1个泊位，散货",
    fees: { Handy: "每吨约3.5美元" },
    cargo: "海鲜",
    throughput: "年吞吐量约10万吨",
    draft: "8米",
    opening: "全年开放",
    shipTypes: "适合Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [8, 9, 10, 11, 12] }
  },
  {
    name: "Port of Geraldton",
    lat: -28.7784,
    lon: 114.6134,
    berths: "2个泊位，散货",
    fees: { Panamax: "每吨约5美元", Handy: "每吨约4美元" },
    cargo: "小麦，铝土矿",
    throughput: "年吞吐量约500万吨",
    draft: "10米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [400, 450, 500, 550, 600] }
  },
  {
    name: "Port of Kwinana",
    lat: -32.1897,
    lon: 115.7610,
    berths: "3个泊位，散货",
    fees: { Panamax: "每吨约5.5美元", Handy: "每吨约4.5美元" },
    cargo: "煤炭，液体货物",
    throughput: "年吞吐量约600万吨",
    draft: "12米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [500, 550, 600, 650, 700] }
  },
  {
    name: "Port of Bunbury",
    lat: -33.3263,
    lon: 115.6353,
    berths: "4个泊位，散货和集装箱",
    fees: { Panamax: "每吨约5.5美元", Handy: "每吨约4.5美元" },
    cargo: "小麦，木材",
    throughput: "年吞吐量约300万吨",
    draft: "10米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [250, 270, 290, 300, 320] }
  },
  {
    name: "Port of Albany",
    lat: -35.0219,
    lon: 117.8915,
    berths: "2个泊位，散货",
    fees: { Panamax: "每吨约4.5美元", Handy: "每吨约3.5美元" },
    cargo: "小麦",
    throughput: "年吞吐量约200万吨",
    draft: "9米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [150, 160, 170, 180, 190] }
  },
  {
    name: "Port of Port Latta",
    lat: -40.8952,
    lon: 145.3378,
    berths: "1个泊位，散货",
    fees: { Panamax: "每吨约5美元", Handy: "每吨约4美元" },
    cargo: "铝土矿",
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
    berths: "3个泊位，散货和集装箱",
    fees: { Panamax: "每吨约5.5美元", Handy: "每吨约4.5美元" },
    cargo: "各种货物",
    throughput: "年吞吐量约500万吨",
    draft: "11米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [400, 450, 500, 550, 600] }
  },
  {
    name: "Port of Portland",
    lat: -38.3586,
    lon: 141.5930,
    berths: "3个泊位，散货",
    fees: { Panamax: "每吨约5美元", Handy: "每吨约4美元" },
    cargo: "小麦",
    throughput: "年吞吐量约200万吨",
    draft: "10米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [150, 160, 170, 180, 190] }
  },
  {
    name: "Port of Melbourne",
    lat: -37.8143,
    lon: 144.9632,
    berths: "30个泊位，散货和集装箱",
    fees: { Panamax: "每吨约7美元", Handy: "每吨约6美元" },
    cargo: "各种货物",
    throughput: "年吞吐量约2000万吨",
    draft: "13米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [1500, 1600, 1700, 1800, 1900] }
  },
  {
    name: "Port of Adelaide",
    lat: -34.9285,
    lon: 138.6007,
    berths: "8个泊位，散货和集装箱",
    fees: { Panamax: "每吨约6美元", Handy: "每吨约5美元" },
    cargo: "小麦，葡萄酒",
    throughput: "年吞吐量约800万吨",
    draft: "10米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [600, 650, 700, 750, 800] }
  },
  {
    name: "Port of Whyalla",
    lat: -33.0325,
    lon: 137.5886,
    berths: "2个泊位，散货",
    fees: { Panamax: "每吨约4.5美元", Handy: "每吨约3.5美元" },
    cargo: "矿石",
    throughput: "年吞吐量约150万吨",
    draft: "9米",
    opening: "全年开放",
    shipTypes: "适合Panamax, Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [120, 130, 140, 150, 160] }
  },
  {
    name: "Port of Lincoln",
    lat: -34.7339,
    lon: 135.8684,
    berths: "1个泊位，散货",
    fees: { Panamax: "每吨约4美元", Handy: "每吨约3美元" },
    cargo: "海鲜",
    throughput: "年吞吐量约20万吨",
    draft: "8米",
    opening: "全年开放",
    shipTypes: "适合Handy",
    historicalData: { years: ["2018", "2019", "2020", "2021", "2022"], throughput: [15, 18, 20, 22, 25] }
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
