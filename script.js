$(document).ready(function() {
    // 初始化地圖
    const map = L.map('map').setView([23.5, 121], 6); // 中心設為台灣

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const apiUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/T-A0031-001?Authorization=CWA-D9D189A8-D4BF-4C99-9885-B46EBB12D61E'; // API URL

    // 獲取颱風數據
    $.getJSON(apiUrl)
        .done(function(data) {
            console.log(data); // 檢查數據結構

            if (data.records && data.records.location) {
                const typhoons = data.records.location;

                typhoons.forEach(typhoon => {
                    const name = typhoon.typhoonName || "未知"; // 颱風名稱
                    const forecastPath = typhoon.forecastPath || []; // 預測路徑
                    const intensity = typhoon.intensity || "未知"; // 預測強度

                    // 顯示颱風路徑
                    const pathCoords = forecastPath.map(point => [point.lat, point.lon]);
                    if (pathCoords.length > 0) {
                        L.polyline(pathCoords, { color: 'red', weight: 3 }).addTo(map);

                        // 在地圖上標示颱風名稱和強度
                        L.marker(pathCoords[0]).addTo(map)
                            .bindPopup(`颱風名稱: ${name}<br>預測強度: ${intensity}級`)
                            .openPopup();
                    }
                });

                // 自動調整地圖顯示範圍
                const bounds = L.latLngBounds(typhoons.map(typhoon => typhoon.forecastPath.map(point => [point.lat, point.lon])).flat());
                map.fitBounds(bounds);
            } else {
                console.error("未能獲取颱風資料");
            }
        })
        .fail(function(jqxhr, textStatus, error) {
            console.error("API 請求失敗: " + textStatus + ", " + error);
        });
});
