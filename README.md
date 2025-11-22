# Fluxio Hugo Site

這個專案是使用 Hugo + Parsa 主題客製化的新聞 / 部落格首頁，已經針對：

- 玻璃擬態首頁 UI（類似加密新聞 Dashboard）
- 自訂首頁 Hero + Latest News 排版
- 多語系（`en`, `zh-cn`, `zh-tw`）
- 站內搜尋（Fuse.js + `index.json`）
- 預設縮圖（Placeholder）
- SEO / Open Graph / Twitter Card / Geo meta

以下說明如何設定 `hugo.toml`，以及相關的檔案與欄位用途。

---

## 1. 基本設定

檔案：`hugo.toml`

```toml
baseURL = 'https://example.org/'
title = 'Fluxio'
theme = 'parsa'
defaultContentLanguage = 'en'
defaultContentLanguageInSubdir = true

[outputs]
  home = ["HTML", "RSS", "JSON"]
```

- `baseURL`：正式站網址（例如 `https://fluxio.news/`）。部署到正式環境一定要改。
- `title`：站台名稱，會用在：
  - `<title>` 頁面標題
  - footer 版權行 `© {{year}} {{ site.Title }}`
  - Open Graph `og:site_name`
- `theme`：使用的主題（目前是 `parsa`）。
- `defaultContentLanguage` / `defaultContentLanguageInSubdir`：
  - 預設語系為 `en`
  - 語系用子路徑呈現：`/en`, `/zh-cn`, `/zh-tw`
- `[outputs].home`：
  - 讓首頁輸出 `index.json`，供搜尋用（必須保留 JSON）。

---

## 2. 多語系設定

```toml
[languages]
  [languages.en]
    languageName = 'English'
    weight = 1
    contentDir = 'content/en'
  [languages.zh-cn]
    languageName = '简体中文'
    weight = 2
    contentDir = 'content/zh-cn'
  [languages.zh-tw]
    languageName = '繁體中文'
    weight = 3
    contentDir = 'content/zh-tw'
```

- 每個語系對應各自的 `content/*` 目錄。
- header 的語系切換器，以及 `/en/search`, `/zh-cn/search` 等路徑，都依此設定運作。
- 如需新增語系，複製一段 `[languages.xx]`，設定好 `languageName` 和 `contentDir` 即可。

---

## 3. Markdown / HTML 設定

```toml
[markup.goldmark.renderer]
  unsafe = true
```

- 允許 Markdown 中的 HTML 直接渲染（例如 Mermaid、嵌入 iframe）。

---

## 4. 站台參數 `[params]`

這一節是本專案客製行為的重點。主要欄位如下：

```toml
[params]
  description = "Fluxio - Modern Tech News"
  author = "Fluxio Team"
  layout = "2"

  # 預設與分享用縮圖
  default_image = "images/placeholder.svg"
  og_image = "images/placeholder.svg"

  # 自訂 CSS
  custom_css = ["css/custom.css"]

  # 搜尋功能開關
  search = true
```

### 4.1 `description` / `author`

- `description`：
  - 預設 SEO 描述（meta description）。
  - 若單篇文章沒有設定 `.Description`，Open Graph / Twitter 也會 fallback 到這裡。
- `author`：
  - `<meta name="author">`
  - 單篇文章上方 meta 也會引用。

### 4.2 `layout`

- 主題原生參數，用來控制列表頁 layout：
  - `"1"` 或 `"2"`
  - 本專案設定為 `"2"`，配合我們的 News 頁版型。

### 4.3 `default_image` / `og_image`

- `default_image`：
  - 全站的圖片 fallback，用在：
    - `layouts/partials/image.html`：若文章沒有圖片，或圖片載入錯誤，就顯示這張 placeholder。
    - 搜尋索引 `layouts/_default/index.json`：若沒有文章圖片，`image` 欄位會寫入這張圖。
  - 檔案目前放在：`static/images/placeholder.svg`。
  - 若想換成自己的預設縮圖，把圖放到 `static/images/`，再改路徑即可。

- `og_image`：
  - 全站預設 Open Graph 分享圖。
  - 判斷順序：
    1. 若文章 front matter 有 `image` → 使用文章圖。
    2. 否則使用 `og_image`。
    3. 再沒有則使用 `default_image`。

### 4.4 自訂 CSS：`custom_css`

```toml
custom_css = ["css/custom.css"]
```

- 對應 `static/css/custom.css`（不是 `assets/css`），定義：
  - 玻璃擬態背景
  - Hero chips / 搜尋框
  - Featured card / Latest News card / News list / Search results card 等。

如需新增額外 CSS，也可以：

```toml
custom_css = ["css/custom.css", "css/another.css"]
```

並將檔案放在 `static/css/another.css`。

### 4.5 搜尋開關：`search`

```toml
search = true
```

- 控制 header / sidebar / Hero 中各搜尋框是否顯示。
- 搜尋流程：
  - `index.json`：由 `layouts/_default/index.json` 產生，包含 `title / contents / tags / categories / permalink / image`。
  - 前端 JS：`static/plugins/search/search.js`（覆寫 theme 原版本）+ Fuse.js。
  - 搜尋頁 template：`layouts/_default/search.html`。

請維持 `home = ["HTML","RSS","JSON"]` 與 `search = true` 才能正常使用站內搜尋。

---

## 5. 外掛 / JS 插件設定

```toml
  [[params.plugins.css]]
  link = "plugins/bootstrap/bootstrap.min.css"
  [[params.plugins.css]]
  link = "plugins/slick/slick.css"
  [[params.plugins.css]]
  link = "plugins/themify-icons/themify-icons.css"
  
  [[params.plugins.js]]
  link = "plugins/jQuery/jquery.min.js"
  [[params.plugins.js]]
  link = "plugins/bootstrap/bootstrap.min.js"
  [[params.plugins.js]]
  link = "plugins/slick/slick.min.js"
  [[params.plugins.js]]
  link = "plugins/search/fuse.min.js"
  [[params.plugins.js]]
  link = "plugins/search/mark.js"
  [[params.plugins.js]]
  link = "plugins/search/search.js"
```

- 這些檔案對應 `static/plugins/**`，是主題運作所需：
  - Bootstrap / Slick / Themify Icons
  - 搜尋相關：`fuse.min.js`, `mark.js`, `search.js`
- 若未來不需要某些功能（例如 Slick），可以刪掉對應 plug-in 但也要確保 layout 沒再使用。

---

## 6. 社群連結 `[params.social]`

```toml
  [[params.social]]
  icon = "ti-github"
  link = "#"
```

- 用在 footer 的「Follow」區塊：
  - icon 使用 Themify Icons 的 class，例如 `ti-twitter-alt`, `ti-facebook`, `ti-github`。
  - link 為實際社群網址。
- 可建立多個：

```toml
  [[params.social]]
  icon = "ti-twitter-alt"
  link = "https://twitter.com/your-handle"

  [[params.social]]
  icon = "ti-github"
  link = "https://github.com/your-org"
```

---

## 7. Geo SEO 設定 `[params.geo]`

```toml
  [params.geo]
    region = "TW-TPE"
    placename = "Taipei"
    position = "25.0330;121.5654"
```

- 對應 `<head>` 中的：
  - `meta name="geo.region"` → `TW-TPE`
  - `meta name="geo.placename"` → `Taipei`
  - `meta name="geo.position"` / `ICBM` → `緯度;經度`
- 若你的服務地點不同，請修改成實際城市與座標。

---

## 8. SEO / Open Graph / Twitter Card

相關邏輯都在 `layouts/partials/head.html`：

- `<meta name="description">`
  - 先用 `.Description`；沒有就用 `site.Params.description`。
- Open Graph：
  - `og:site_name` → `site.Title`
  - `og:title` → 文章標題或站名。
  - `og:description` → 文章描述或站台描述。
  - `og:type` → 單篇為 `article`，其他為 `website`。
  - `og:url` → `.Permalink`
  - `og:image` → 文章圖片 / `og_image` / `default_image`
  - 文章頁另外加上：
    - `article:section`
    - `article:published_time`
    - `article:modified_time`
- Twitter Card：
  - 使用 `summary_large_image`
  - `twitter:title` / `twitter:description` / `twitter:image` 都與 OG 同步。

若未來要加入 Twitter 帳號，只需在 head 裡再增加：

```html
<meta name="twitter:site" content="@your_account">
<meta name="twitter:creator" content="@your_account">
```

---

## 9. 常見調整建議

1. **更換品牌與文案**
   - `title`
   - `[params].description`
   - `[params].author`

2. **設定正式網址**
   - 將 `baseURL` 改成你的正式 domain。
   - 部署到 Netlify / Vercel / Cloudflare Pages 時，記得同步更新。

3. **更新 Geo**
   - 修改 `[params.geo]` 內的 `region / placename / position`。

4. **自訂預設縮圖**
   - 用自己的圖替換 `static/images/placeholder.svg`，或改 `default_image` / `og_image` 路徑。

5. **新增語系**
   - 在 `[languages]` 中加入新的語系設定。
   - 在 `content/<lang>` 建立對應的 content 結構（news / blog / search 等）。

---

## 10. 開發與預覽

```bash
hugo server -D -F
```

- `-D`：包含 draft 內容。
- `-F`：包含 future content。
- 開發預設網址：`http://localhost:1313`

當你修改 `hugo.toml` 或 `layouts/**` 時，Hugo 會自動重新載入，你可以直接在瀏覽器觀察 UI、SEO meta、Open Graph 等變化。  
若需要檢查分享效果，可以使用：

- Facebook Sharing Debugger
- Twitter Card Validator
- 直接在瀏覽器 DevTools → Elements → `<head>` 中確認 meta 標籤。

---

## 11. 自訂 Shortcodes（Affiliate / 贊助）

以下 shortcode 都放在 `layouts/shortcodes/`，可直接在 Markdown 中呼叫。按鈕樣式可針對 `amazon-affiliate-link` / `bmc-link` / `paypal-me-link` 這三個 class 自行加 CSS。

- **Amazon Affiliate**：
  - 用法：`{{</* amazon-affiliate asin="B08N5WRWNW" tag="yourtag-20" */>}}` 或 `{{</* amazon-affiliate asin="B08N5WRWNW" */>}}Buy on Amazon{{</* /amazon-affiliate */>}}`
  - 參數：`asin`（必填）、`tag`（選填，若在 `site.Params.amazonAffiliateTag` 設定則可省略）、`market`（預設 `amazon.com`）、`label` 或內文自訂按鈕文字。

- **Buy Me a Coffee**：
  - 用法：`{{</* buy-me-a-coffee id="yourname" */>}}` 或 `{{</* buy-me-a-coffee id="yourname" message="Thanks!" */>}}Buy me a tea{{</* /buy-me-a-coffee */>}}`
  - 參數：`id`（必填）、`message`（選填，會帶入 ?text=）、`label` 或內文自訂按鈕文字。

- **PayPal.Me**：
  - 用法：`{{</* paypal-me user="yourname" amount="10" currency="USD" */>}}` 或 `{{</* paypal-me user="yourname" */>}}Support via PayPal{{</* /paypal-me */>}}`
  - 參數：`user`（必填）、`amount` / `currency`（選填，會組成 `https://paypal.me/user/10USD`）、`label` 或內文自訂按鈕文字。

範例區塊：

```md
支援我：
- Amazon 推薦：{{</* amazon-affiliate asin="B08N5WRWNW" */>}}看詳細{{</* /amazon-affiliate */>}}
- Buy Me a Coffee：{{</* buy-me-a-coffee id="yourname" message="Appreciate it!" */>}}請我喝咖啡{{</* /buy-me-a-coffee */>}}
- PayPal.Me：{{</* paypal-me user="yourname" amount="5" currency="USD" */>}}小額贊助{{</* /paypal-me */>}}
```

---

## 12. Sitemap / Robots.txt（Search Console 強化）

- `hugo.toml` 已設定：`home` 輸出包含 `SITEMAP` / `ROBOTS`，並設定 sitemap 頻率為每日、priority 0.7。
- 產物：
  - `/sitemap.xml`（多語系 URL 皆會列出）
  - `/robots.txt`（含 `Sitemap: https://your-domain/sitemap.xml`，並針對 Googlebot / Bingbot / GPTBot / CCBot / ClaudeBot / PerplexityBot 顯式 Allow）
- 提交到 Google Search Console / Bing Webmaster 時，直接使用 `https://your-domain/sitemap.xml`。
