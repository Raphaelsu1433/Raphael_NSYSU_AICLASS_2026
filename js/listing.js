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
    var r = x.r, menu = safeUrl(r.menuUrl), src = (r.sources || []).filter(function (s) { return safeUrl(s.url); })
      .map(function (s) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + '</a>'; }).join('、');
    return '<article class="panel card" data-id="' + esc(r.id) + '"><h3><span class="rank">#' + rank + '</span> ' + esc(r.name) + '</h3>' +
      '<div class="addr">' + esc(r.address) + '</div><dl>' +
      '<dt>直線距離</dt><dd>' + FW.geo.formatDistance(x.km) + '</dd>' +
      '<dt>人均消費</dt><dd>' + esc(FW.geo.formatPrice(r)) + '</dd>' +
      '<dt>菜單</dt><dd>' + (menu ? '<a href="' + esc(menu) + '" target="_blank" rel="noopener">' + esc(r.menuLabel || '查看菜單') + '</a>' :
        '<a href="' + esc(FW.geo.mapsSearchUrl(r.name + ' ' + r.address)) + '" target="_blank" rel="noopener">在 Google 地圖看菜單照片</a>') + '</dd></dl>' +
      (r.coordSource === 'approx' ? '<div class="warn">※ 位置為概估，距離僅供參考</div>' : '') +
      (src ? '<div class="warn">資料來源：' + src + '（查證日 ' + esc(r.verifiedAt || '') + '）</div>' : '') +
      '<div class="acts"><a class="btn" target="_blank" rel="noopener" href="' + esc(FW.geo.mapsNavUrl(r)) + '">Google 地圖導航（步行）</a></div></article>';
  }
  FW.listing = { nearby: nearby, cardHtml: cardHtml, esc: esc };
})(window.FoodWheel);
