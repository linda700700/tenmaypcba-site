# 腾美独立站 · SEO / GEO 落地清单

更新日期：2026-10-28

## 一、板块顺序（已按买家提问顺序重排）

首页现在的顺序不是按"我们有什么"，而是按采购的决策路径：

| # | 板块 | 回答的问题 |
|---|---|---|
| 1 | 左右分栏 Hero（文案在左白底 / 实景图右侧出血） | 你们是谁、做了多久、多快 |
| 2 | 四张服务卡（Turnkey / SMT·THT / 检测 / 涂覆整机） | 你到底做哪几段 |
| 3 | 应用场景（3 行业 × 4 产品族，含产品图） | 我这块板你们做过类似的吗 |
| 4 | 八道工序菜单（Solutions） | 具体工序覆盖到哪 |
| 5 | 六步流程条 | 从文件到出货怎么走 |
| 6 | 三种下单模式对比 | 我能不能只给料/只给长交期料 |
| 7 | 18 年 + 四条做事方式 | 你们靠不靠得住 |
| 8 | 车间实景 | 这些是不是真的 |
| 9 | 质量体系 | 出了事怎么追溯 |
| 10 | 报价逻辑 | 钱是怎么算的 |
| 11 | 三个典型订单 | 复杂件怎么处理 |
| 12 | RFQ | 现在怎么开始 |
| 13 | FAQ（8 问） | 剩下的疑虑 |
| 14 | 深绿 CTA + 页脚 | 再给一次入口 |

删掉了首页的 `IndustriesServed`（与"应用场景"重复）和 `CapabilityMatrix`（与 `/capabilities` 整页重复），减少同质信息互相稀释。


## 一（补充）、导航结构（本轮重做）

一级 6 项，全部指向真实存在的页面或锚点，没有死链：

| 一级 | 指向 | 二级分组 |
|---|---|---|
| Assembly | `/assembly` | Surface mount / Through-hole & mechanical / Inspection & finishing |
| Capabilities | `/capabilities` | Process window / Material & supply / Volume & timing |
| Applications | `/applications` | Consumer / Industrial / Automotive aftermarket（12 个产品锚点） |
| Quality | `/#quality` | System / Inspection / Documentation |
| Resources | `/#faq` | Before you order / Technical / Company |
| Contact | `/#rfq` | Request a quote / WhatsApp / Email |

- 每组 3–4 条，共 **58 个入站链接**，全部带搜索关键词（`kw`），站内搜索直接复用。
- 每组右侧一张推广卡（图 + 一句话 + CTA），与 PCBWay 的面板节奏一致。
- 新增 `/assembly` 页面：三标签流程图（SMT / THT+box build / Coating），每标签 6 步带箭头，右侧"你提供 / 我们核什么 / 你收到"三栏 + 绿色 CTA。这是导航 Assembly 分支的落点，也是后续 `/applications/*` 落地页的模板。

### 本轮补充（2026-10-28 第 2 版）

**Hero 改成左右分栏，取消全屏蒙版。** 原来深绿蒙版压在整张实景图上，字压图、图发灰，看着"假"。现在左半是白底深绿色文案（H1 34/50px，正文 17px），右半是实景图出血到右边缘，只在底部留一条很薄的渐变给图片说明条。没有蒙版色，照片本身的现场光保留下来，这才是"真实感"的来源。

**照片里补上了 logo。** `hero-floor.webp` 与 `box-build-assembly.webp` 两张实景图里，工服左胸加了 3.5cm 的刺绣 logo（跟着布料褶皱走，不是贴图），后者背景隔断上还挂了一块白底亚克力招牌（"tm TENGMEI"）。

**新增 `/applications` 整页（12 个锚点）。** 导航里应用分支的 12 个条目原本全部指向 `/#applications`，也就是 12 个入口抢一个锚点。现在是 `/applications#vfd`、`#jump-starter` 这类具体落点：进页面自动切到对应行业 tab，滚动到该产品卡并高亮 2 秒。卡片结构是 PCBWay 那种"板子构成 / 工艺依赖标签 / 典型批量 / 需求信号 / 依据"五段式，右侧常驻"该发什么文件"面板。

**质量板块重写。** 删掉了 Zero-Defect、IPC Class 3、恒温恒湿老化、SPC 这些没有凭证的说法，换成四个真实工位（来料 / 印前与首件 / AOI·X 光 / 终检与文件），并单列一块浅色虚线框"Not held：IATF 16949 · ISO 13485 · 认证 Class 3 · 自有 ICT/FCT"。买家查证得到的比我们写出来的更有说服力。

**全站字号上调一档。** 10.5→11.5、11→12、12→13、13→14、14→15、14.5→15.5（共 23 个文件），导航一级 13→14px、二级 13→14px 并把行距放宽到 py-2。锚点跳转统一加了 `scroll-margin-top: 118px` 并在 App 里补了一次带偏移的滚动，任何锚点都不会再被吸顶导航盖住。

**sitemap 现在 4 条**：`/`、`/assembly`、`/applications`、`/capabilities`。

## 二、已落地（累计）

| 项目 | 位置 | 说明 |
|---|---|---|
| 满屏 Hero | `Hero.jsx` | 全幅实景图 + 慢速漂移；左侧深绿渐变承托文案；下方数据条 |
| 视频位 | `data/company.js` 的 `HERO_VIDEO` | 填入 MP4 路径即自动切换为静音循环视频，留空则用静态图，不会出现空媒体框 |
| 品牌色 | `tailwind.config.js` | 从 logo 取样：#126B3F / #5BAC5D / #118AA7 / #0A3D26 |
| 立体图标 | `IconTile.jsx` | 渐变+内高光+外投影，全站统一 |
| 应用场景 | `IndustryUseCases.jsx` | 每行业 1 个主打产品图 + 3 个紧凑条目，含批量与热度判断 |
| 做事方式 | `AboutCompany.jsx` | 真诚 / 耐心 / 细心 / 长期，四条可验证的行为描述 |
| FAQ | `data/faq.js` | 8 问单一来源，页面与 FAQPage 结构化数据同源，不会打架 |
| 结构化数据 | `Seo.jsx` | Organization + Service + FAQPage（8+3 问），`knowsAbout` 已扩到 12 项 |
| 元信息 | `index.html` | title / description / canonical / OG / Twitter |
| 站点地图 | `public/sitemap.xml`、`robots.txt` | 首页 + `/capabilities` |
| 图片体积 | `*.webp` | 2 MB 级 PNG 压到 0.14–0.28 MB |

## 三、上线前必须替换（阻断项）

1. `SITE_URL = 'https://YOUR-DOMAIN.com'`，同步改 `index.html`、`sitemap.xml`、`robots.txt`。
2. 邮箱 `1563414877@qq.com` 换企业域名邮箱。
3. ISO 9001 证书号 / 发证机构 / 有效期 —— 写进 `Organization.hasCredential`。
4. Hero 视频：1080p、8–12 秒、静音、<6 MB，放 `public/assets/video/hero.mp4`，再改 `HERO_VIDEO`。

## 四、图片现状

- 已替换：`hero-floor.webp`（新，车间全景，中国员工）、`box-build-assembly.webp`（新，中国女工整机组装，替换原先外籍员工那张）。
- 新增产品图：`case-vfd.webp`、`case-jumpstarter.webp`、`case-treadmill.webp`。
- 仍是 AI 生成、建议尽快换实拍：`chinese-engineer-smt`、`chinese-engineer-inspection`、`factory-cleanroom`、`inspection-3d-xray`、`smt-pick-and-place`。

## 五、下一步（按 ROI 排序）

1. 换域名与企业邮箱，canonical/sitemap 一次改净。
2. 每个 A 类产品族做独立落地页：`/applications/vfd`、`/applications/jump-starter`、`/applications/treadmill`。结构沿用"约束 → 我们的做法 → 买家得到什么"。
3. 拿 ISO 证书号 + 拍 6 组车间照片（换料、AOI 判图、X-ray、三防漆、THT、打包）。
4. Hero 视频：手机横拍稳定器走一遍产线即可，不需要宣传片质感。
5. 补 `BreadcrumbList` 与 `Product`/`Service` 的 `areaServed` 细分（等独立落地页上线后一起加）。
