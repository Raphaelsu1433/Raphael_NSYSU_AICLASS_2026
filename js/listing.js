(function (FW) {
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function safeUrl(u) { return /^https?:\/\//i.test(u || '') ? u : ''; }
  function nearby(typeId) {
    var o = FW.config.origin;
    return FW.restaurants.filter(function (r) { return r.typeIds.indexOf(typeId) >= 0; })
      .map(function (r) { return { r: r, km: FW.geo.haversineKm(o, r) }; })
      .filter(function (x) { return x.km <= FW.config.radiusKm; })
      .sort(function (a, b) { return a.km - b.km || a.r.name.localeCompare(b.r.name, 'zh-Hant'); });
  }
  function cardHtml(x, rank) {
    var r = x.r;
    return '<article class="panel card" data-id="' + esc(r.id) + '"><h3><span class="rank">#' + rank + '</span> ' + esc(r.name) + '</h3>' +
      (r.district ? '<div class="addr">' + esc(r.district) + '</div>' : '') + '<dl>' +
      '<dt>直線距離</dt><dd>' + FW.geo.formatDistance(x.km) + '</dd>' +
      '<dt>人均消費</dt><dd>' + esc(FW.geo.formatPrice(r)) + '</dd></dl>' +
      '<div class="acts"><a class="btn" target="_blank" rel="noopener" href="' + esc(FW.geo.mapsPlaceUrl(r)) + '">在 Google 地圖查看</a></div></article>';
  }
  FW.listing = { nearby: nearby, cardHtml: cardHtml, esc: esc };
})(window.FoodWheel);
