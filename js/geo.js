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
  function mapsNavUrl(r) {
    var dest = (typeof r.lat === 'number') ? r.lat + ',' + r.lng : (r.address || r.name);
    return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(dest) + '&travelmode=walking';
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
  FW.geo = { haversineKm: haversineKm, formatDistance: formatDistance, mapsNavUrl: mapsNavUrl, mapsSearchUrl: mapsSearchUrl, formatPrice: formatPrice };
})(window.FoodWheel);
