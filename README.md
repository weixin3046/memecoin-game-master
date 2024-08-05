This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# memecoin-game

## 基本信息

- **标题**：交接文档
- **日期**：2024 年 8 月 5 日
- **交接人**：米润中

## 项目概述

- **项目名称**：memecoin-game
- **项目目标**：通过游戏把 PEG 与 memecoin 做关联
- **项目状态**：项目已完成 80%，目前在已通过手机号和 Google 授权登录流程验证

## 主要职责

- **岗位职责**：前端开发、UI 设计、功能测试
- **日常工作**：每天检查项目进度，每周汇报项目状态，每月进行团队讨论

## 关键项目/任务

- **当前任务**：
  - 项目基本游戏流程全部实现；
  - Swap 的 Approve 和 Cross 功能拆分完成
- **未完成任务**：
  - 优化网站加载速度
  - Apple 授权登录，和接口三方授权；
- **关键文档和资源**：
  - [设计文档](https://example.com/design-doc)
  - [代码库](https://github.com/example/repo)
  - [nextjs](https://nextjs.org/docs)
  - [chakraUi](https://v2.chakra-ui.com/)
  - [AuthJs](https://authjs.dev/getting-started)
  - [Icon](https://react-icons.github.io/react-icons/)
  - [zustand](https://github.com/pmndrs/zustand)
  - [shadcnUi](https://ui.shadcn.com/docs)

## 问题和解决方案

- **已知问题**：网站采用 AuthJS 来实现页面登录，目前 Apple Provider 无法正确登录
- **解决方案**：改变 Authjs 库的 Apple Provider 配置选项[Github 社区 ieeues 讨论方案](https://github.com/nextauthjs/next-auth/pull/11453)

## 目录结构

memecoin-game/
├── public/ # 公共资源目录
├── src/ # 源代码
│ │ ├── components/ # React/Vue 组件
│ │ ├── app/ # 页面组件
│ │ ├── api/ # 项目接口
│ │ ├── auth/ # 登录页面
│ │ ├── result/ # 游戏记录页面（已弃用）
│ │ ├── rule/ # 游戏规则页面
│ │ ├── success/ # 三方登录授权回调页面
│ │ ├── success/ # 三方登录授权回调页面
│ │ ├── transactions/ # 游戏交易页面（已弃用）
│ │ └── page.tsx/ # 游戏首页
│ ├── actions/ # 页面登录服务
│ │ └──login.ts # 手机号登录
│ │ └──logout.ts # 账号退出
│ ├── stores/ # 状态管理（zustand）
│ ├── theme/ # 样式主题（chakraUi）
│ ├── utils/ # 工具函数
├── .env # 环境变量配置文件
├── .gitignore # Git 忽略文件列表
├── package.json # 项目配置和依赖项
└── README.md # 项目总览

## 概述

- 项目总体采用 nextjs 的 app router
- 项目分为 main test Google 分支，目前只有一个正式环境没有多余环境
- test 是在 main 分叉而来，Google 是 test 分叉而来，Google 分支上重点开发的 Google 授权登录
- [项目地址](https://winfunnygames.com/)
- 项目发布要在发布的 commit 上打上 Tag(不区分分支)
