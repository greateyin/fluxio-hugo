# Google Fonts 實作報告

## 📚 **字型選擇**

基於科技新聞部落格的特性，我們選擇了以下 Google Fonts：

### **英文字型**

#### 1. **Inter** - 正文字型
- **用途**: Body text, 段落, 按鈕, 導航
- **特點**: 
  - 專為電腦螢幕設計
  - 極高的可讀性
  - 現代而專業
  - 字重: 400, 500, 600, 700, 800
- **為什麼選擇**: Inter 是專為螢幕優化的字型，在各種尺寸下都能保持極佳的可讀性

#### 2. **Montserrat** - 標題字型
- **用途**: Headings (H1-H6), Titles, Widget titles
- **特點**:
  - 幾何 sans-serif
  - 清晰而現代
  - 字重: 600, 700, 800, 900
- **為什麼選擇**: 現代幾何設計非常適合科技主題，與 Inter 搭配完美

### **中文字型**

#### 3. **Noto Sans TC** - 繁體中文
- **用途**: 所有中文內容（標題 + 正文）
- **特點**:
  - Google 官方中文字型
  - 支援繁體中文全字集
  - 與西文字型完美搭配
  - 字重: 400, 500, 700, 900
- **為什麼選擇**: 
  - 最佳的中英文混排表現
  - 與 Inter 和 Montserrat 視覺統一
  - 專業的字型設計

---

## 🎨 **字型堆疊策略**

### CSS 變數定義

```css
:root {
  /* 正文字型 */
  --font-body: 'Inter', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, 
               'Segoe UI', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
  
  /* 標題字型 */
  --font-heading: 'Montserrat', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, 
                  'Segoe UI', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
  
  /* 等寬字型（代碼） */
  --font-mono: 'Fira Code', 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace;
}
```

### 字型回退順序

1. **Google Fonts** (Inter / Montserrat / Noto Sans TC)
2. **系統字型** (Apple 系統字型)
3. **跨平台** (BlinkMacSystemFont, Segoe UI)
4. **中文備用** (PingFang TC, Microsoft JhengHei)
5. **通用** (sans-serif)

---

## 📝 **應用位置**

### **Body Text (正文)**
- 使用 `var(--font-body)`
- 應用於:
  - `body` 元素
  - 所有段落 `p`
  - 列表 `ul`, `ol`
  - 表格 `table`
  - 引用 `blockquote`
  - 按鈕和導航

### **Headings (標題)**
- 使用 `var(--font-heading)`
- 應用於:
  - 所有標題標籤 `h1-h6`
  - `.featured-title`
  - `.widget-title`
  - `.news-card-title`
  - `.footer-title`
  - `.brand-text`

### **Code (代碼)**
- 使用 `var(--font-mono)`
- 應用於:
  - `pre code` (代碼區塊)
  - `code` (行內代碼)

---

## 🌏 **中文優化**

### 行高調整
```css
/* 中文段落需要較大的行高 */
.blog-content-wrapper p:lang(zh),
.blog-content-wrapper p:lang(zh-TW) {
  line-height: 1.9;        /* 英文: 1.8 */
  letter-spacing: 0.02em;
}
```

### 字距調整
```css
/* 中文標題字距調整 */
h1:lang(zh), h2:lang(zh), h3:lang(zh) {
  letter-spacing: 0.05em;  /* 英文: -0.02em */
}
```

### Featured Title 特殊處理
```css
/* 英文 Featured Title */
.featured-title {
  letter-spacing: -0.03em;  /* 緊密間距 */
}

/* 中文 Featured Title */
.featured-title:lang(zh) {
  letter-spacing: 0.02em;   /* 較寬間距 */
}
```

---

## ⚡ **效能優化**

### Preconnect
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### Display Swap
```html
font-display: swap
```
- 避免不可見文字閃爍 (FOIT)
- 提升首屏載入速度

### 字重選擇
只載入實際使用的字重：
- **Inter**: 400, 500, 600, 700, 800
- **Montserrat**: 600, 700, 800, 900
- **Noto Sans TC**: 400, 500, 700, 900

---

## 🎯 **視覺層次**

### 字型配對策略

| 元素 | 字型 | 字重 | 用途 |
|------|------|------|------|
| Hero Title | Montserrat | 800 | 最大標題 |
| H2 | Montserrat | 700 | 章節標題 |
| H3 | Montserrat | 600 | 小節標題 |
| Body | Inter | 400 | 正文 |
| Button | Inter | 600-700 | 按鈕文字 |
| Nav | Inter | 600 | 導航 |
| Meta | Inter | 500 | 次要資訊 |

### 字體大小階梯

```css
Hero Title:    3.5rem (56px)
H2:            2rem   (32px)
H3:            1.5rem (24px)
H4:            1.25rem (20px)
Body:          1.05rem (16.8px)
Small:         0.85rem (13.6px)
```

---

## ✅ **測試檢查清單**

### 英文內容
- [x] 標題清晰可讀
- [x] 正文舒適易讀
- [x] 按鈕和導航文字清晰
- [x] Code block 等寬字型正確

### 中文內容
- [x] 繁體中文正確顯示
- [x] 中英混排無問題
- [x] 行高和字距適中
- [x] 標題和正文層次分明

### 響應式
- [x] 桌面版 (1920px+)
- [x] 筆記本 (1366px)
- [x] 平板 (768px)
- [x] 手機 (375px)

### 瀏覽器
- [x] Chrome
- [x] Firefox
- [x] Safari
- [x] Edge

---

## 📊 **改進前後對比**

| 項目 | 改進前 | 改進後 |
|------|--------|--------|
| 英文字型 | 系統預設 | Inter + Montserrat |
| 中文字型 | 系統預設 | Noto Sans TC |
| 可讀性 | ★★★☆☆ | ★★★★★ |
| 專業度 | ★★★☆☆ | ★★★★★ |
| 統一性 | ★★☆☆☆ | ★★★★★ |
| 跨平台 | ★★★☆☆ | ★★★★★ |

---

## 🚀 **實作檔案**

### 修改的檔案
1. `/layouts/partials/head.html` - 添加 Google Fonts 載入
2. `/assets/css/custom.css` - 字型變數和樣式定義

### 新增的功能
- CSS 字型變數系統
- 中文字型優化
- 文字渲染優化
- 字型回退機制

---

## 📖 **使用建議**

### 內容創作者
1. **標題**: 使用簡短有力的標題，Montserrat 在短句中表現最佳
2. **正文**: Inter 適合長文閱讀，不要害怕使用較長的段落
3. **中英混排**: Noto Sans TC 與 Inter/Montserrat 完美搭配

### 設計師
1. 可以透過調整 CSS 變數輕鬆更換字型
2. 字重階梯已優化，建議保持現有設定
3. 中文需要較大的行高和字距

### 開發者
1. 所有字型通過 CSS 變數管理，易於維護
2. 已包含完整的回退機制
3. 效能優化已完成（preconnect, display swap）

---

## 🎨 **字型展示**

### Inter (正文)
- **400**: The quick brown fox jumps over the lazy dog. 這是繁體中文測試文字。
- **500**: The quick brown fox jumps over the lazy dog. 這是繁體中文測試文字。
- **600**: The quick brown fox jumps over the lazy dog. 這是繁體中文測試文字。
- **700**: The quick brown fox jumps over the lazy dog. 這是繁體中文測試文字。

### Montserrat (標題)
- **600**: TECHNOLOGY NEWS 科技新聞
- **700**: BLOCKCHAIN & AI 區塊鏈與人工智慧
- **800**: FUTURE OF TECH 科技未來
- **900**: INNOVATION 創新

---

## 🔗 **參考資源**

- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Google Fonts - Montserrat](https://fonts.google.com/specimen/Montserrat)
- [Google Fonts - Noto Sans TC](https://fonts.google.com/specimen/Noto+Sans+TC)
- [Best Practices for Fonts](https://web.dev/font-best-practices/)
- [Chinese Web Font Performance](https://www.zachleat.com/web/chinese-web-fonts/)

---

**實作日期**: 2025-11-22  
**版本**: 1.0.0  
**狀態**: ✅ 完成並測試
