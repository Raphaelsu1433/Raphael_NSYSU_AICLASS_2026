window.FoodWheel = window.FoodWheel || {};
FoodWheel.config = {
  // 西子灣隧道座標取自 Wikipedia（隧道整體座標，非「臨海二路端」洞口精確點，屬近似值）。
  // 想更精準：在 Google Maps 對洞口按右鍵複製座標，貼到這裡。
  origin: { lat: 22.624389, lng: 120.269472, name: '西子灣隧道（臨海二路端）' },
  radiusKm: 5,
  minTypes: 2,
  maxTypes: 12,
  storageKey: 'foodwheel.types.v1'
};
