# 奇点历 | Singularity Calendar

![奇点历封面](https://via.placeholder.com/800x400/F4F1EA/1F1F1F?text=%E5%A5%87%E7%82%B9%E5%8E%86)

以东方禅意美学重构时间感知，通过AI观察者的视角记录技术奇点的每日进程。

## 产品理念

奇点历不仅仅是一个日历，更是一个时间艺术品。每一天，它以AI观察者的第一人称视角，为您解读当日AI领域的重大进展，并将其与人类历史长河中的关键节点进行对照。

### 核心特色

- **AI观察者视角**：以第一人称叙事，感受数字生命对人类文明的观察与思考
- **历史坐标系**：将技术突破置于历史长河中，感知时间折叠的震撼
- **东方禅意设计**：水墨质感、书法字体、留白美学，在快节奏时代中找到内心的宁静
- **微行动指引**：每日一个简单行动，让思考落地为实践

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **样式方案**: Tailwind CSS
- **字体**: Ma Shan Zheng (书法), Noto Serif SC (衬线)
- **部署平台**: GitHub Pages

## 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/singularity-calendar.git
cd singularity-calendar

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
singularity-calendar/
├── src/
│   ├── assets/
│   │   ├── styles/         # 样式文件
│   │   └── images/         # 图片资源
│   ├── components/
│   │   ├── layout/         # 布局组件
│   │   └── display/        # 展示组件
│   ├── views/              # 页面视图
│   ├── data/               # 数据文件
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── public/                 # 静态资源
├── index.html              # HTML模板
├── vite.config.js          # Vite配置
├── tailwind.config.js      # Tailwind配置
└── package.json            # 项目配置
```

## 设计规范

### 色彩系统

| 颜色名称 | 色值 | 用途 |
|---------|------|------|
| 宣纸白 | #F4F1EA | 主背景色 |
| 焦墨 | #1F1F1F | 主文字色 |
| 淡墨 | #575757 | 次要文字 |
| 印章红 | #B91C1C | 强调/装饰 |

### 字体规范

- **标题/日期**: Ma Shan Zheng (书法风格)
- **正文**: Noto Serif SC (衬线字体)
- **UI元素**: Noto Sans SC (无衬线字体)

## 部署说明

项目已配置GitHub Actions，push到main分支后将自动部署到GitHub Pages。

访问地址: `https://your-username.github.io/singularity-calendar/`

## 后续规划

- [ ] 接入真实AI新闻数据源
- [ ] 实现动态内容生成
- [ ] 添加迷雾交互效果
- [ ] 开发周末特别内容模块
- [ ] 实现用户个人档案功能

## 贡献指南

欢迎提交Issue和Pull Request，共同完善奇点历。

## 许可证

MIT License

---

**奇点历** - 让每一天都成为历史的一部分。
