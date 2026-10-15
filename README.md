# 🌀 台灣即時颱風預測路徑可視化平台 (Taiwan Typhoon Tracker)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?logo=github)](https://thomas412570510.github.io/)
[![Leaflet.js](https://img.shields.io/badge/Leaflet-v1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![OpenStreetMap](https://img.shields.io/badge/Map-OpenStreetMap-7EBC6F?logo=openstreetmap&logoColor=white)](https://www.openstreetmap.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 一個整合 **交通部中央氣象署 (CWA) OpenData API** 與 **Leaflet.js 互動式向量地圖** 的即時颱風路徑追蹤網頁。當西北太平洋有熱帶性低氣壓或颱風發布警報時，自動繪製即時中心位置、暴風半徑與未來預測路徑折線。

🔗 **線上即時展示 (Live Demo):** [https://thomas412570510.github.io/](https://thomas412570510.github.io/)

---

## 🌟 核心特色 (Features)

- 🛰️ **中央氣象署 OpenData 連動**：串接 CWA 最新颱風路徑資料集（`T-A0031-001`），動態獲取颱風名稱、暴風強度與未來經緯度預測點。
- 🗺️ **Leaflet.js 向量圖層渲染**：
  - 高精度 Polyline 路徑折線繪製。
  - 互動式標記（Marker）與點擊資訊彈窗（Popup），直觀顯示颱風名稱與暴風級數。
  - 智慧邊界自適應（`map.fitBounds`），無論颱風位於呂宋島海面、台灣海峽或琉球群島，皆能自動縮放最佳視野。
- 🛡️ **無颱風狀態防呆反饋**：非颱風季節或無現行警報時，在地圖中央溫馨提示「當前西北太平洋海域無現行颱風警報」，避免使用者誤認系統故障。
- 📱 **響應式排版**：採用純 CSS 打造，兼容桌上型電腦、平板與智慧型手機螢幕。

---

## 🏗️ 專案目錄結構 (Project Structure)

```text
Thomas412570510.github.io/
├── index.html              # 網頁主架構與 Leaflet 地圖容器
├── styles.css              # 簡約清新風格樣式表
├── script.js               # Leaflet 地圖初始化、CWA API 請求與路徑圖層繪製
└── README.md               # 專案技術說明文件
```

---

## 🛠️ 技術棧 (Tech Stack)

- **前端核心**：HTML5, CSS3, JavaScript (ES6+), jQuery
- **地圖引擎**：[Leaflet.js](https://leafletjs.com/) + [OpenStreetMap Tile Layer](https://www.openstreetmap.org/)
- **資料來源**：[交通部中央氣象署開放資料平台 (CWA OpenData)](https://opendata.cwa.gov.tw/)
- **託管佈署**：GitHub Pages (靜態網站即時發布)

---

## 🚀 本地開發 (Local Development)

無需安裝複雜套件，直接使用任意靜態伺服器或瀏覽器開啟：

```bash
# 複製專案
git clone https://github.com/Thomas412570510/Thomas412570510.github.io.git
cd Thomas412570510.github.io

# 使用 Python 內建 HTTP 伺服器啟動 (可選)
python -m http.server 8080
```

開啟瀏覽器造訪 `http://localhost:8080` 或直接雙擊 `index.html` 即可預覽。

---

## 📄 授權條款 (License)

本專案採用 [MIT License](LICENSE) 授權。氣象數據版權歸交通部中央氣象署所有。
