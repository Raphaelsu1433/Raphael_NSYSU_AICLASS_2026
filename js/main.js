(function (FW) {
  var app = document.getElementById('app'), dlg = document.getElementById('dialog'), box = dlg.querySelector('.dialog-box');
  var E = FW.listing.esc, deg = 0, spinning = false;
  function closeDlg() { dlg.hidden = true; box.innerHTML = ''; }
  function renderHome() {
    var ts = FW.types.all();
    app.innerHTML = '<section class="home"><div><div class="wheel-wrap"><div class="pointer"></div><canvas class="px" id="wheel"></canvas></div>' +
      '<div class="spin-row"><button class="btn" id="spin">開轉！</button></div></div>' +
      '<aside class="panel types"><h2>我的類型</h2><ul class="type-list">' +
      ts.map(function (t) { return '<li><img class="px" src="' + E(t.icon) + '" alt="">' + E(t.name) + ' <button class="btn alt small" data-del="' + E(t.id) + '" aria-label="刪除' + E(t.name) + '">✕</button></li>'; }).join('') +
      '</ul><form class="add-row" id="addf"><input id="newname" maxlength="8" placeholder="新增類型（最多8字）"><button class="btn small">新增</button></form>' +
      '<div class="msg" id="msg"></div><button class="btn alt small" id="reset">恢復預設</button></aside></section>';
    var cv = document.getElementById('wheel'); FW.wheel.draw(cv, ts);
    cv.style.transform = 'rotate(' + deg + 'deg)';
    document.getElementById('spin').onclick = function () { spin(cv, ts, this); };
    document.getElementById('addf').onsubmit = function (e) { e.preventDefault(); var m = FW.types.add(document.getElementById('newname').value); if (m) document.getElementById('msg').textContent = m; else renderHome(); };
    document.getElementById('reset').onclick = function () { FW.types.reset(); renderHome(); };
    app.querySelectorAll('[data-del]').forEach(function (b) { b.onclick = function () { var m = FW.types.remove(b.dataset.del); if (m) document.getElementById('msg').textContent = m; else renderHome(); }; });
  }
  function spin(cv, ts, btn) {
    if (spinning) return; spinning = true; btn.disabled = true;
    var p = FW.wheel.plan(ts.length, deg); deg = p.deg;
    var done = false;
    function end() { if (done) return; done = true; spinning = false; btn.disabled = false; showResult(ts[p.index]); }
    cv.addEventListener('transitionend', end, { once: true });
    setTimeout(end, 4600);
    requestAnimationFrame(function () { cv.style.transform = 'rotate(' + deg + 'deg)'; });
  }
  function showResult(t) {
    box.innerHTML = '<p>今天吃…</p><img class="px" src="' + E(t.icon) + '" alt=""><h2>' + E(t.name) + '</h2><div class="btns"><button class="btn" id="ok">確定</button><button class="btn alt" id="again">重轉</button></div>';
    dlg.hidden = false;
    document.getElementById('ok').onclick = function () { closeDlg(); location.hash = '#/list/' + encodeURIComponent(t.id); };
    document.getElementById('again').onclick = function () { closeDlg(); document.getElementById('spin').click(); };
  }
  function renderList(id) {
    var t = FW.types.get(id);
    if (!t) { location.hash = '#/'; return; }
    var items = FW.listing.nearby(id);
    app.innerHTML = '<div class="list-head"><a class="btn alt" href="#/">← 回轉盤</a><h2>' + E(t.name) + '（' + items.length + ' 間）</h2><span class="grow"></span>' +
      (items.length ? '<button class="btn" id="rand">隨機再抽一間</button>' : '') + '</div>' +
      (items.length ? '<div class="cards">' + items.map(function (x, i) { return FW.listing.cardHtml(x, i + 1); }).join('') + '</div>' :
        '<div class="panel empty"><p>' + FW.config.radiusKm + ' 公里內還沒有收錄「' + E(t.name) + '」的店。</p><a class="btn" target="_blank" rel="noopener" href="' +
        E(FW.geo.mapsSearchUrl(t.name + ' 西子灣隧道 附近')) + '">去 Google 地圖搜尋</a></div>');
    var r = document.getElementById('rand');
    if (r) r.onclick = function () {
      var cards = app.querySelectorAll('.card'); cards.forEach(function (c) { c.classList.remove('hl'); });
      var c = cards[Math.floor(Math.random() * cards.length)]; c.classList.add('hl'); c.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  }
  function route() {
    closeDlg();
    var m = location.hash.match(/^#\/list\/(.+)$/);
    if (m) renderList(decodeURIComponent(m[1])); else renderHome();
  }
  window.addEventListener('hashchange', route);
  (document.fonts && document.fonts.load ? document.fonts.load('12px Pixel').catch(function () {}) : Promise.resolve()).then(route);
})(window.FoodWheel);
