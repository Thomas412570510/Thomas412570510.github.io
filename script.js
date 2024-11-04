$(document).ready(function() {
    // 初始化地圖
    const map = L.map('map').setView([23.5, 121], 6); // 中心設為台灣

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const apiUrl = 'CWA-D9D189A8-D4BF-4C99-9885-B46EBB12D61E'; // 請替換為您的 API 金鑰

    $.getJSON(apiUrl, function(data) {
        const typhoons = data.records.location;

        typhoons.forEach(typhoon => {
            const name = typhoon.typhoonName; // 颱風名稱
            const forecastPath = typhoon.forecastPath; // 預測路徑
            const intensity = typhoon.intensity; // 預測強度

            // 顯示颱風路徑
            const pathCoords = forecastPath.map(point => [point.lat, point.lon]);
            const polyline = L.polyline(pathCoords, { color: 'red', weight: 3 }).addTo(map);

            // 在地圖上標示颱風名稱和強度
            L.marker(pathCoords[0]).addTo(map)
                .bindPopup(`颱風名稱: ${name}<br>預測強度: ${intensity}級`)
                .openPopup();
        });

        // 自動調整地圖顯示範圍
        const bounds = L.latLngBounds(typhoons.map(typhoon => typhoon.forecastPath.map(point => [point.lat, point.lon])).flat());
        map.fitBounds(bounds);
    });
});
