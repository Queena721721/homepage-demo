# 个人主页 · 张三

纯静态个人简历主页，零依赖、零构建，推送到 GitHub 后可在 Vercel 一键部署。

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `index.html` | 页面内容（文字、结构）—— **改内容只动这个文件** |
| `style.css` | 样式（颜色、字体、间距、响应式、打印样式） |
| `script.js` | 交互（主题切换、滚动淡入、导航高亮）—— 删掉页面也能用 |

---

## 一、本地预览

直接双击 `index.html` 即可在浏览器打开。

如果想更接近线上效果，可在本目录启动一个本地服务器：

```bash
python -m http.server 8000
```

然后访问 <http://localhost:8000>。

---

## 二、创建 GitHub 仓库并推送

在本目录（`personal-homepage/`）下依次执行：

```bash
git init
git add .
git commit -m "初始化个人主页"
git branch -M main
```

然后在 GitHub 上新建一个**空仓库**（不要勾选 Add README / .gitignore），
把下面的地址换成你自己的：

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

> 仓库名建议用 `<你的用户名>.github.io`，这样即使以后不用 Vercel，
> 也能通过 GitHub Pages 访问。

---

## 三、Vercel 一键部署

1. 打开 <https://vercel.com>，用 **GitHub 账号**登录。
2. 点击 **Add New… → Project**。
3. 在列表里找到刚才推送的仓库，点 **Import**。
4. Vercel 会自动识别为静态站点，配置保持默认即可：

   | 配置项 | 值 |
   | --- | --- |
   | Framework Preset | `Other` |
   | Build Command | 留空 |
   | Output Directory | 留空（或填 `.`） |
   | Install Command | 留空 |

5. 点 **Deploy**，约 20 秒后即可拿到形如
   `https://<项目名>.vercel.app` 的公开地址。

**此后的更新流程**：只要 `git push` 到 `main` 分支，Vercel 会自动重新部署，无需任何手动操作。

### 绑定自己的域名（可选）

Vercel 项目 → **Settings → Domains** → 输入你的域名 → 按提示到域名服务商处
添加一条 `CNAME` 记录即可，HTTPS 证书自动签发。

---

## 四、需要修改的内容

内容全部为虚构示例，请替换成你自己的。在 `index.html` 里搜索以下关键词：

| 搜索 | 替换为 |
| --- | --- |
| `张三` / `Zhang San` | 你的姓名 / 英文名 |
| `zhangsan@example.com` | 你的邮箱 |
| `github.com/zhangsan` | 你的 GitHub 主页 |
| `138-0000-0000` | 你的电话（不想公开就删掉整个 `<li>`） |
| `华东师范大学` / `苏州大学` | 你的学校 |
| `上海` | 你所在的城市 |

另外记得同步修改 `<head>` 中的 `<title>`、`<meta name="description">`
和 `og:title` / `og:description` —— 这几个决定分享到微信、微博时的标题和摘要。

### 换主题色

打开 `style.css`，改开头的两个变量即可，其余样式会自动跟随：

```css
:root {
  --accent:      #2f5bd7;  /* 主题色 */
  --accent-soft: #eef2fd;  /* 主题色的浅色底 */
}
```

### 增删区块

每个区块是一段 `<section class="section container reveal" id="...">`。
直接删除多余的 `<section>` 即可；如果要新增，记得同时：

1. 给新区块一个 `id`；
2. 在 `<div class="nav-links">` 里加一个对应的 `<a href="#新id">`。

导航高亮和滚动动画会自动适配，不用改 JS。

---

## 五、其他

- **导出 PDF 简历**：浏览器 `Ctrl/Cmd + P` → 目标选「另存为 PDF」。
  已写好打印样式，会自动隐藏导航栏、去掉背景色，排版适合 A4。
- **深色模式**：右上角按钮可切换，选择会记在浏览器里。默认是浅色。
- **响应式**：已适配手机、平板、桌面。
