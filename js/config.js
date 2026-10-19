window.FoodWheel = window.FoodWheel || {};
FoodWheel.config = {
  // 西子灣隧道座標：Wikipedia 與 Google 地點資料（地址為臨海二路、哨船街）兩邊一致，約為隧道標記點，非洞口精確點。
  // 想更精準：在 Google Maps 對洞口按右鍵複製座標，貼到這裡。
  origin: { lat: 22.624389, lng: 120.269472, name: '西子灣隧道（臨海二路端）' },
  radiusKm: 5,
  minTypes: 2,
  maxTypes: 16,
  storageKey: 'foodwheel.types.v2'
};
