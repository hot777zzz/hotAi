HotAI 聊天应用
一个基于 Next.js 和 React 构建的现代化 AI 聊天应用，支持多主题切换和本地聊天历史记录。

## 功能特点

- 🎨 支持亮色/暗色主题切换
- 💬 实时聊天界面
- 📝 本地存储聊天历史
- 📱 响应式设计，适配移动端和桌面端
- 🔄 多对话管理，可在不同对话间切换
- 🔒 用户认证系统

## 技术栈

- 前端框架: Next.js 15.1.7
- UI 库: React 19.0.0
- 样式: Tailwind CSS
- 状态管理: React Hooks
- 本地存储: localStorage API
- 图标: Lucide Icons

## 预览地址

https://hot-ai.vercel.app/chat

## 项目结构

```开源/ai/hotai/README.md
<code_block_to_apply_changes_from>
src/
├── app/                  # 应用页面
│   ├── chat/             # 聊天页面
│   ├── login/            # 登录页面
│   ├── settings/         # 设置页面
│   └── tuning/           # 模型调优页面
├── components/           # 可复用组件
│   ├── chat/             # 聊天相关组件
│   ├── login/            # 登录相关组件
│   ├── nav/              # 导航组件
│   ├── theme/            # 主题相关组件
│   └── ui/               # UI 基础组件
├── services/             # 服务层
├── types/                # 类型定义
└── lib/                  # 工具函数
```

## 开始使用

### 安装依赖

```bash
pnpm install
```

### 开发环境运行

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## 主要功能说明

### 聊天历史记录

应用会自动保存用户的聊天历史记录到本地存储中，用户可以：

- 查看所有历史对话
- 在不同对话间切换
- 开始新的对话
- 每个对话会自动以第一条消息作为标题

### 主题切换

支持亮色和暗色两种主题模式，会根据用户系统设置自动切换，也可以手动选择。

### 响应式设计

- 在桌面端显示侧边栏和聊天区域
- 在移动端通过滑动菜单访问侧边栏
- 自适应不同屏幕尺寸的布局

## 贡献指南

欢迎提交 Pull Request 或创建 Issue 来帮助改进这个项目。

## 许可证

[MIT](LICENSE)
