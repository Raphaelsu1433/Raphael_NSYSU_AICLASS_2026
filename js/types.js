(function (FW) {
  var C = FW.config;
  function clone(a) { return JSON.parse(JSON.stringify(a)); }
  function load() {
    try {
      var raw = localStorage.getItem(C.storageKey);
      if (raw) { var a = JSON.parse(raw); if (Array.isArray(a) && a.length >= C.minTypes) return a; }
    } catch (e) {}
    return clone(FW.defaultTypes);
  }
  function save(list) { try { localStorage.setItem(C.storageKey, JSON.stringify(list)); } catch (e) {} }
  var types = load();
  FW.types = {
    all: function () { return types; },
    get: function (id) { return types.filter(function (t) { return t.id === id; })[0]; },
    add: function (name) {
      name = (name || '').trim();
      if (!name) return '請輸入名稱';
      if (name.length > 8) return '名稱最多 8 個字';
      if (types.length >= C.maxTypes) return '最多 ' + C.maxTypes + ' 種';
      if (types.some(function (t) { return t.name === name; })) return '已經有這個類型了';
      types.push({ id: 'c' + Date.now().toString(36), name: name, icon: 'assets/star.png', builtin: false });
      save(types); return '';
    },
    remove: function (id) {
      if (types.length <= C.minTypes) return '至少要保留 ' + C.minTypes + ' 種';
      types = types.filter(function (t) { return t.id !== id; }); save(types); return '';
    },
    reset: function () { types = clone(FW.defaultTypes); save(types); }
  };
})(window.FoodWheel);
