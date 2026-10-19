// 餐廳資料。座標為「依地址/街區概估」(coordSource:'approx')，誤差可能數百公尺；
// 請在 Google Maps 對店家按右鍵複製座標後修正。價格來自網路文章，可能已過期，以現場為準。
// 欄位：priceMin/priceMax 為每人平均消費(NT$)，查不到就留 null → 顯示「未提供」。
window.FoodWheel = window.FoodWheel || {};
(function () {
  var A = 'approx', V = '2026-10-19';
  FoodWheel.restaurants = [
    { id: 'takau', name: '獺鯌拉麵 Takau', typeIds: ['ramen'], address: '高雄市鹽埕區大仁路164號', lat: 22.6252, lng: 120.2855, coordSource: A,
      priceMin: 150, priceMax: 250, priceNote: '單碗約150元起', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'tajie', name: '田介拉麵大眾食堂', typeIds: ['ramen'], address: '高雄市鹽埕區五福四路22號', lat: 22.6240, lng: 120.2870, coordSource: A,
      priceMin: 220, priceMax: 250, priceNote: '', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'dagang32', name: '大港參貳牛排館（鹽埕店）', typeIds: ['steak'], address: '高雄市鹽埕區五福四路32號', lat: 22.6238, lng: 120.2873, coordSource: A,
      priceMin: 190, priceMax: 360, priceNote: '排餐190元起', menuUrl: '', sources: [{ title: '食尚玩家', url: 'https://supertaste.tvbs.com.tw/food/354324' }], verifiedAt: V },
    { id: 'laowang', name: '老王壽司', typeIds: ['sushi'], address: '高雄市鹽埕區必忠街51號', lat: 22.6262, lng: 120.2838, coordSource: A,
      priceMin: null, priceMax: null, priceNote: '單件約30–60元', menuUrl: 'https://www.facebook.com/profile.php?id=100075695214893', menuLabel: '粉專（菜單）', sources: [{ title: '食尚玩家', url: 'https://supertaste.tvbs.com.tw/food/345026' }], verifiedAt: V },
    { id: 'kyomo', name: 'KYOMO PASTA', typeIds: ['pasta'], address: '高雄市鹽埕區大義街93號', lat: 22.6230, lng: 120.2845, coordSource: A,
      priceMin: 220, priceMax: 260, priceNote: '', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'dor', name: 'Dor留手工義大利麵（駁二店）', typeIds: ['pasta'], address: '高雄市鹽埕區大勇路181號', lat: 22.6205, lng: 120.2820, coordSource: A,
      priceMin: 220, priceMax: 280, priceNote: '', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'chiyi', name: '千義', typeIds: ['pasta'], address: '高雄市鹽埕區新樂街122號（另有資料寫瀨南街176號，待確認）', lat: 22.6250, lng: 120.2860, coordSource: A,
      priceMin: 200, priceMax: 400, priceNote: '地址有出入', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'artco', name: 'ARTCO', typeIds: ['pasta'], address: '高雄市鹽埕區大義街2號', lat: 22.6215, lng: 120.2840, coordSource: A,
      priceMin: null, priceMax: null, priceNote: '', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'pappagallo', name: 'Pappagallo', typeIds: ['pasta'], address: '高雄市鹽埕區大義街10號', lat: 22.6217, lng: 120.2838, coordSource: A,
      priceMin: null, priceMax: null, priceNote: '', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'miaojiang', name: '妙醬日式蓋飯', typeIds: ['donburi'], address: '高雄市鹽埕區新樂街188號', lat: 22.6258, lng: 120.2862, coordSource: A,
      priceMin: 100, priceMax: 300, priceNote: '2015年資料', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'xu', name: '鹽埕續', typeIds: ['donburi', 'udon'], address: '高雄市鹽埕區河西路126號1樓', lat: 22.6275, lng: 120.2870, coordSource: A,
      priceMin: null, priceMax: null, priceNote: '海鮮湯烏龍約150元', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'nosign', name: '無招牌鍋燒炸麵', typeIds: ['udon'], address: '高雄市鹽埕區瀨南街137號', lat: 22.6245, lng: 120.2885, coordSource: A,
      priceMin: 60, priceMax: 60, priceNote: '2019年資料', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'haowa', name: '好哇好哇美式餐館', typeIds: ['burger'], address: '高雄市鼓山區明倫路77號', lat: 22.6560, lng: 120.2870, coordSource: A,
      priceMin: null, priceMax: null, priceNote: '', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'honbo', name: 'HONBO Burger shop', typeIds: ['burger'], address: '高雄市鼓山區明華路117號', lat: 22.6600, lng: 120.2900, coordSource: A,
      priceMin: null, priceMax: null, priceNote: '只收現金；週二、三公休', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'laohan', name: '老韓家韓味廚房', typeIds: ['bibimbap'], address: '高雄市鹽埕區七賢三路65號之1', lat: 22.6245, lng: 120.2855, coordSource: A,
      priceMin: 250, priceMax: 300, priceNote: '', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'lan', name: '란韓式美食館', typeIds: ['bibimbap'], address: '高雄市鼓山區慶豐街26號', lat: 22.6480, lng: 120.2850, coordSource: A,
      priceMin: 200, priceMax: 400, priceNote: '', menuUrl: '', sources: [], verifiedAt: V },
    { id: 'hanfu', name: '韓福香', typeIds: ['bibimbap'], address: '高雄市鼓山區文忠路44號', lat: 22.6540, lng: 120.2880, coordSource: A,
      priceMin: 150, priceMax: 150, priceNote: '150元起', menuUrl: '', sources: [], verifiedAt: V }
  ];
})();
