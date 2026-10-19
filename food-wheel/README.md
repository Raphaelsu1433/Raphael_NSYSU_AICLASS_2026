# 今天吃什麼？美食轉盤

純 HTML + JavaScript + CSS，無需建置。轉盤抽類型 → 列出西子灣隧道（臨海二路端）5 公里內的店家（直線距離由近到遠）。

## 本機執行
雙擊 `index.html` 即可，或 `python3 -m http.server` 後開 http://localhost:8000

## 部署到 GitHub Pages（repo：Raphael_NSYSU_AICLASS_2026）
```
git init && git add . && git commit -m "food wheel"
git branch -M main
git remote add origin https://github.com/Raphaelsu1433/Raphael_NSYSU_AICLASS_2026.git
git push -u origin main
```
GitHub → Settings → Pages → Branch: main / (root)。網址：https://raphaelsu1433.github.io/Raphael_NSYSU_AICLASS_2026/

## 資料維護
- 起點與半徑：`js/config.js`（起點為 Wikipedia 的西子灣隧道座標，近似值）
- 餐廳：`data/restaurants.js`（座標目前是依地址概估，請用 Google Maps 右鍵複製座標修正；價格來自網路文章，可能過期）
- 預設類型：`data/default-types.js`
- 圖檔全在 `assets/`（原創像素圖，由 PIL 腳本產生）

## 授權
字型「俐方體11號 Cubic 11」SIL OFL 1.1，見 `fonts/OFL.txt`。
