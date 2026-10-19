(function (FW) {
  var COLORS = ['#e8553d', '#f2dfb0', '#6fb7d6', '#fff6dd', '#1d5f8a', '#f0aa3c', '#5ea05a', '#fac8be'];
  var DARK = { '#1d5f8a': 1, '#e8553d': 1, '#5ea05a': 1 };
  var imgCache = {};
  function img(src, cb) {
    if (imgCache[src]) return cb(imgCache[src]);
    var i = new Image(); i.onload = function () { imgCache[src] = i; cb(i); }; i.onerror = function () { cb(null); }; i.src = src;
  }
  function draw(canvas, types) {
    var S = 240, c = canvas.getContext('2d'), n = types.length, th = 2 * Math.PI / n;
    canvas.width = canvas.height = S; c.imageSmoothingEnabled = false;
    c.clearRect(0, 0, S, S);
    for (var k = 0; k < n; k++) {
      c.beginPath(); c.moveTo(S / 2, S / 2);
      c.arc(S / 2, S / 2, S / 2 - 2, -Math.PI / 2 + k * th, -Math.PI / 2 + (k + 1) * th); c.closePath();
      c.fillStyle = COLORS[k % COLORS.length]; c.fill(); c.lineWidth = 2; c.strokeStyle = '#0b2a4a'; c.stroke();
    }
    types.forEach(function (t, k) {
      var mid = -Math.PI / 2 + (k + 0.5) * th;
      c.save(); c.translate(S / 2, S / 2); c.rotate(mid); c.translate(S / 2 - 14, 0);
      c.fillStyle = DARK[COLORS[k % COLORS.length]] ? '#fff6dd' : '#0b2a4a';
      c.font = '12px Pixel, sans-serif'; c.textAlign = 'right'; c.textBaseline = 'middle';
      c.fillText(t.name, -26, 0);
      c.restore();
      img(t.icon, function (im) {
        if (!im) return;
        c.save(); c.translate(S / 2, S / 2); c.rotate(mid); c.translate(S / 2 - 14, 0);
        c.imageSmoothingEnabled = false; c.drawImage(im, -24, -10, 20, 20); c.restore();
      });
    });
  }
  // 回傳 {index, deg}：先決定結果，再算停止角度
  function plan(n, currentDeg) {
    var i = Math.floor(Math.random() * n), th = 360 / n, j = Math.random() * 0.8 - 0.4;
    var target = 360 * (5 + Math.floor(Math.random() * 3)) - (i + 0.5 + j) * th;
    var base = Math.ceil(currentDeg / 360) * 360;
    return { index: i, deg: base + target };
  }
  FW.wheel = { draw: draw, plan: plan };
})(window.FoodWheel);
