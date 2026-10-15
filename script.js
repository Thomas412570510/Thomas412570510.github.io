$(document).ready(function() {
    // 初始化地圖 (預設中心設為台灣與西太平洋海域)
    const map = L.map('map').setView([23.5, 121], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | 氣象資料來源：交通部中央氣象署'
    }).addTo(map);

    const apiUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/T-A0031-001?Authorization=CWA-D9D189A8-D4BF-4C99-9885-B46EBB12D61E';

    // 獲取中央氣象署颱風路徑開放資料
    $.getJSON(apiUrl)
        .done(function(data) {
            if (data.records && data.records.location && data.records.location.length > 0) {
                const typhoons = data.records.location;
                const allPoints = [];

                typhoons.forEach(typhoon => {
                    const name = typhoon.typhoonName || "現行颱風";
                    const forecastPath = typhoon.forecastPath || [];
                    const intensity = typhoon.intensity || "一般";

                    // 轉換座標 [緯度, 經度]
                    const pathCoords = forecastPath.map(point => [point.lat, point.lon]);
                    if (pathCoords.length > 0) {
                        allPoints.push(...pathCoords);

                        // 繪製颱風路徑折線
                        L.polyline(pathCoords, { color: '#e53935', weight: 4, opacity: 0.85 }).addTo(map);

                        // 標記颱風當前中心位置與資訊彈窗
                        L.marker(pathCoords[0]).addTo(map)
                            .bindPopup(`<b>🌀 颱風名稱:</b> ${name}<br><b>⚡ 預測強度:</b> ${intensity}`)
                            .openPopup();
                    }
                });

                if (allPoints.length > 0) {
                    const bounds = L.latLngBounds(allPoints);
                    map.fitBounds(bounds, { padding: [50, 50] });
                }
            } else {
                console.info("目前西北太平洋海域無現行颱風警報資料");
                L.popup()
                    .setLatLng([23.5, 121])
                    .setContent('<b>✅ 當前西北太平洋海域無現行颱風警報</b><br>系統正持續監聽氣象署開放資料。')
                    .openOn(map);
            }
        })
        .fail(function(jqxhr, textStatus, error) {
            console.warn("CWA API 連線異常或當前無警報發布: " + textStatus);
            L.popup()
                .setLatLng([23.5, 121])
                .setContent('<b>🛰️ 氣象署 OpenData 連線中</b><br>當前無現行警報發布，或請稍後重新整理。')
                .openOn(map);
        });
});
