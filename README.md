# 1. 如何執行此專案

請確定已安裝 Node.js 和 npm，然後在專案根目錄下依序執行以下命令：

**開發模式：**
```bash
npm run i
npm run dev
```

**或者，建置並啟動生產模式：**
```bash
npm run i
npm run build
npm run start
```

---

# 2. 專案架構、邏輯說明

依職責關注點分離原則劃分目錄：

```text
├── app/               # Next.js App Router 頁面路由層與全域設定
│   ├── _components/   # 僅供該層級頁面使用的特定業務元件 (如 jobInfo, jobList)
│   ├── _hook/         # 頁面層級的狀態邏輯 (如 useSearch.ts)
│   └── providers.tsx  # 管理與封裝所有第三方套件的 Context Provider (如 TanStack Query 等)
├── apiClient/         # 統一的 API 管理層
│   ├── axiosInstance.ts # Axios 實體與攔截器設定
│   ├── hook/          # 封裝好的 API 請求 Hooks (供元件直接呼叫)(因為api很少所以都放一起，不然每個domain下會有專屬hook)
│   └── {api模組}/      # 依據api模組區分 (如 education, job, salary)，包含 api請求函式 與 DTO 定義
├── components/        # 全域共用的基礎獨立 UI 元件 (如 Card, myInput, mySelect)
├── css/               # 全域樣式庫 (包含 Typography, Breakpoints 設定)
├── mocks/             # MSW的Mock 資料、Schema 與請求攔截邏輯處理
└── utils/             # 獨立的純函式工具庫 (如 qsToNumberString.ts 等共用運算邏輯)
```

### 主題色與字階
* 專案有建立主題色與字階，可以快速調整整個網站的顏色或字體樣式。
* 若有需要可以快速實作主題色切換功能。

### API 的部分
* 每個 API 都會建立一個 API 請求函式，該函式可能被一個或多個 hook 使用。
* 一個 hook 依情況使用一個或多個 API 請求函式，再依情況看是否 map/sort 資料。
* hook 接收的參數內容若有變化就會自動重新取資料。

### 關於元件
* 所有的 UI 元件都是啞元件，沒有任何業務邏輯，僅根據 props 渲染 UI。
* 並且都有設置獨立的介面，避免與其他元件耦合。

### 關於 heroImage
* 將多張圖片重疊組成一張完整的圖。
* 圖片的大小與位置都是用百分比，這樣在不同大小的畫面看起來都會一樣。
* 移動眼睛的做法為在 heroImage 上綁定事件：取得滑鼠的座標，再與眼睛的座標比較計算後眼睛的新座標；然後再改變眼睛的 style，用 `transform: translate` 的方式移動眼睛。
* 圖片放大縮小動畫用 CSS animation 實現。

### 搜尋功能的實現
* 每個欄位都有各自的狀態，待使用者按下搜尋按鈕後，就會把狀態送進 url 的 query string 裡面。
* qs 的值作為 API hook 的參數，一改變就會重新取資料。
* 因為搜尋參數放在 url 裡面，所以使用者可以直接複製網址分享給其他人。
* 另外在 RWD mobile 時，取得資料後 scrollbar 會自動滾到上方。

### 職缺明細的部分
* 輪播圖使用 swiper 實現。

---

# 3. 專案遇到的困難、問題及解決方法

1. **ESLint 版本不兼容問題**
   `eslint-config-airbnb` 不支援 ESLint 9，若用 ESLint 9 專案無法啟動。但 Next.js 16 似乎有部分功能要用到 ESLint 9。
   > **解決方法：** 為了避免未知的問題，決定將 Next.js 降回 15 並使用 ESLint 8。

2. **Next.js App Router 與 MUI 的相容性**
   Next.js 的 App Router 對 MUI 不友善。直接使用的話會出問題。
   > **解決方法：** 按照官方文件做一些設定才正常開發。

3. **MirageJS 於 App Router 的執行錯誤**
   MirageJS 在 App Router 使用會出問題。當 URL 改變時，Next.js 會發出請求取得 RSC，MirageJS 會攔截這個請求然後發生錯誤，於是整個網頁就重啟了 (相當於按下F5)。
   > **解決方法：** 最後決定改用 MSW，並用 vibe coding 建立 mock。

     


