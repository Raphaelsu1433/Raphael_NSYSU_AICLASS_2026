(function (FW) {
  function haversineKm(a, b) {
    var R = 6371, rad = function (d) { return d * Math.PI / 180; };
    var dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
    var h = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.pow(Math.sin(dLng / 2), 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function formatDistance(km) {
    if (km < 1) return (Math.round(km * 100) * 10) + ' 公尺';
    return km.toFixed(1) + ' 公里';
  }
  // 店家的 Google 地圖頁（有 placeId 就直接開該店資訊頁；沒有就用店名搜尋）
  function mapsPlaceUrl(r) {
    var u = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(r.name + ' 高雄');
    return r.placeId ? u + '&query_place_id=' + encodeURIComponent(r.placeId) : u;
  }
  function mapsSearchUrl(q) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  }
  function formatPrice(r) {
    if (typeof r.priceMin === 'number' && typeof r.priceMax === 'number') {
      var s = r.priceMin === r.priceMax ? 'NT$ ' + r.priceMin : 'NT$ ' + r.priceMin + '–' + r.priceMax;
      return s + (r.priceNote ? '（' + r.priceNote + '）' : '');
    }
    return '未提供' + (r.priceNote ? '（' + r.priceNote + '）' : '');
  }
  FW.geo = { haversineKm: haversineKm, formatDistance: formatDistance, mapsPlaceUrl: mapsPlaceUrl, mapsSearchUrl: mapsSearchUrl, formatPrice: formatPrice };
})(window.FoodWheel);
