/**
 * TweetPilot i18n — English / 中文
 * Usage: data-i18n="key"      → sets textContent
 *        data-i18n-html="key" → sets innerHTML (use for <strong>, <br/> etc.)
 */
(function () {
  'use strict';

  /* ─── Translation dictionary ─────────────────────────────────── */
  var T = {
    en: {
      // Page titles
      'index.title': 'TweetPilot — AI-Powered Twitter Automation',
      'pricing.title': 'Pricing — TweetPilot',

      // Nav
      'nav.features': 'Features',
      'nav.how_it_works': 'How It Works',
      'nav.ai_engine': 'AI Engine',
      'nav.pricing': 'Pricing',
      'nav.download': 'Download',
      'nav.download_free': 'Download Free',

      // Hero
      'hero.badge': 'AI-Powered Twitter Automation · macOS',
      'hero.h1_line1': 'Your Twitter Workflow,',
      'hero.h1_gradient': 'Fully Automated',
      'hero.sub': 'TweetPilot is a macOS desktop app that lets AI agents manage your Twitter/X presence — scheduling posts, analyzing accounts, running Python scripts, all from one intelligent workspace.',
      'hero.btn_download': 'Download for macOS',
      'hero.btn_extension': 'Get TweetClaw Extension',
      'hero.meta_local': 'Runs locally on macOS',
      'hero.meta_scheduled': 'Scheduled automation',
      'hero.meta_multi': 'Multi-account support',

      // App mockup (decorative UI)
      'mockup.workspaces': 'Workspaces',
      'mockup.main_workspace': 'Main Workspace',
      'mockup.growth_campaign': 'Growth Campaign',
      'mockup.content_schedule': 'Content Schedule',
      'mockup.accounts': 'Accounts',
      'mockup.active_tasks': 'Active Tasks',
      'mockup.task1_name': 'Auto Reply to Mentions',
      'mockup.task1_meta': 'mention_reply.py · runs every 15min',
      'mockup.task2_name': 'Daily Growth Report',
      'mockup.task2_meta': 'growth_report.py · cron 09:00 daily',
      'mockup.task3_name': 'Trend Search & Post',
      'mockup.task3_meta': 'trend_post.py · runs every 2hr',
      'mockup.badge_sched': 'Scheduled',
      'mockup.ai_agent': 'TweetPilot Agent',
      'mockup.ai_msg': "Found 3 trending topics. Drafting reply thread for @user's mention...",

      // Stats
      'stats.ai_providers': 'AI Providers',
      'stats.x_modes': 'X Access Modes',
      'stats.scheduled': 'Scheduled Tasks',
      'stats.local': 'Local & Private',

      // Features
      'features.label': 'Capabilities',
      'features.title': 'Everything you need to<br />dominate Twitter/X',
      'features.desc': 'A full-featured desktop workspace with AI at the core — built for power users who want total control.',
      'feat1.title': 'AI-Powered Chat Interface',
      'feat1.desc': 'Talk to your AI agent directly. Ask it to search tweets, analyze accounts, draft content, or execute any Twitter action — all through natural conversation.',
      'feat2.title': 'Task Scheduling',
      'feat2.desc': 'Set up recurring tasks with flexible interval or cron schedules. Run Python scripts automatically — post at peak times, monitor keywords, send reports.',
      'feat3.title': 'Multi-Account Management',
      'feat3.desc': 'Manage multiple Twitter/X accounts in one place. Switch contexts instantly. Each account runs in its own isolated workspace with dedicated credentials.',
      'feat4.title': 'Python Script Execution',
      'feat4.desc': 'Write and run Python scripts that interact with Twitter. Full access to the TweetPilot SDK — search, post, retweet, follow, and analyze data programmatically.',
      'feat5.title': 'Data Blocks',
      'feat5.desc': 'Build structured knowledge bases that feed directly into your AI sessions. Store personas, templates, target audiences, and brand guidelines for consistent outputs.',
      'feat6.title': 'Feishu / Lark Integration',
      'feat6.desc': 'Connect TweetPilot to Feishu (Lark) bots. Receive automated reports, alerts, and summaries directly in your enterprise messaging channels.',

      // How It Works
      'hiw.label': 'Architecture',
      'hiw.title': 'Two ways to reach X',
      'hiw.desc': 'TweetPilot supports both browser-based automation via TweetClaw and direct API access — pick the mode that fits your setup.',
      'hiw.ext_badge': 'Chrome Extension Mode',
      'hiw.ext_title': 'TweetClaw Bridge',
      'hiw.ext_desc': 'Use the TweetClaw Chrome extension as a local WebSocket bridge. TweetPilot connects directly to your logged-in browser session — no API keys needed, no rate limit headaches.',
      'hiw.ext_step1': 'Install the <strong>TweetClaw</strong> Chrome extension from the Web Store',
      'hiw.ext_step2': 'Open Twitter/X in Chrome — the extension starts a local <strong>WebSocket server</strong> on port 20086',
      'hiw.ext_step3': 'TweetPilot connects via LocalBridge and can <strong>read, post, search, and interact</strong> using your browser session',
      'hiw.ext_link': 'Install TweetClaw from Chrome Web Store',
      'hiw.api_badge': 'Official X API Mode',
      'hiw.api_title': 'X API Direct',
      'hiw.api_desc': 'Connect with official X API credentials (OAuth 2.0 or API keys) for enterprise-grade reliability. Full access to all X API endpoints with your own developer app credentials.',
      'hiw.api_step1': 'Create an app at <strong>developer.twitter.com</strong> and obtain your API keys',
      'hiw.api_step2': 'Enter your <strong>Consumer Key, Secret, and OAuth tokens</strong> in TweetPilot Settings',
      'hiw.api_step3': 'TweetPilot calls X API directly — supports <strong>v1.1 and v2 endpoints</strong> with automatic credential management',

      // AI Engine
      'ai.label': 'AI Engine',
      'ai.title': 'Bring your own AI model',
      'ai.desc': 'TweetPilot is model-agnostic. Connect to Claude, GPT-4, a local Ollama model, or any OpenAI-compatible API. Switch providers without changing your workflows.',
      'ai.provider1_name': 'Anthropic Claude',
      'ai.provider1_desc': 'Claude 3 Opus / Sonnet',
      'ai.provider2_name': 'OpenAI',
      'ai.provider2_desc': 'GPT-4o / GPT-4 Turbo',
      'ai.provider3_name': 'Ollama',
      'ai.provider3_desc': 'Local models, 100% private',
      'ai.provider4_name': 'Custom API',
      'ai.provider4_desc': 'Any OpenAI-compatible endpoint',
      'ai.chat_header': 'AI Session · Main Workspace',
      'ai.chat_user_msg': 'Search for tweets about “AI automation” from the past 24h and like the top 5 most engaging ones',
      'ai.chat_agent_name': 'TweetPilot Agent',
      'ai.chat_searching': 'Searching Twitter for “AI automation” tweets from the last 24 hours...',
      'ai.chat_result_label': 'Result',
      'ai.chat_found': 'Found 47 tweets. Identified top 5 by engagement score. Liking them now...',
      'ai.chat_done': '✓ All 5 tweets liked successfully',

      // Integrations
      'int.label': 'Integrations',
      'int.title': 'Connects to your stack',
      'int.twitter_desc': 'Full read/write access via TweetClaw or official X API',
      'int.tweetclaw_desc': 'Chrome extension WebSocket bridge for browserless access',
      'int.feishu_desc': 'Push reports and alerts to enterprise Feishu bots',
      'int.python_desc': "Execute custom automation scripts with TweetPilot's local SDK",

      // Pricing section (index)
      'pricing.label': 'Pricing',
      'pricing.title': 'Simple, transparent pricing',
      'pricing.desc': 'Start for free. Upgrade when you need scheduled automation and AI-powered remote conversations.',
      'pricing.view_full': 'View full pricing & FAQ',

      // Plan — Free
      'plan.free_badge': 'Free',
      'plan.free_name': 'Starter',
      'plan.free_sub': 'Forever free, no credit card required',
      'plan.feat_multi_account': 'Multi-account management',
      'plan.feat_manual_task': 'Manual task execution',
      'plan.feat_python': 'Python script runner',
      'plan.feat_x_api': 'X API & TweetClaw support',
      'plan.feat_workspace': 'Workspace & Data Blocks',
      'plan.feat_scheduled_no': 'Scheduled tasks (interval & cron)',
      'plan.feat_ai_agent_no': 'AI remote conversation agent',
      'plan.feat_feishu_no': 'Feishu / Lark integration',
      'plan.free_btn': 'Download Free',

      // Plan — Pro
      'plan.pro_badge': 'Most Popular',
      'plan.pro_name': 'Professional',
      'plan.pro_period': '/ year',
      'plan.pro_sub': '1 license · up to 2 devices · 1 year',
      'plan.feat_everything_starter': 'Everything in Starter',
      'plan.feat_scheduled': '<strong style="color:var(--color-text);">Scheduled tasks</strong> — interval &amp; cron',
      'plan.feat_ai_agent': '<strong style="color:var(--color-text);">AI remote conversation</strong> agent',
      'plan.feat_feishu_bot': 'Feishu / Lark bot integration',
      'plan.feat_2devices': '2 devices per license',
      'plan.feat_email_support': 'Email support',
      'plan.feat_12months': 'License valid for 12 months',
      'plan.pro_btn': 'Buy License — $300/yr',

      // Plan — Enterprise
      'plan.ent_badge': 'Enterprise',
      'plan.ent_name': 'Lifetime & Custom',
      'plan.ent_price': 'Custom',
      'plan.ent_sub_index': 'Offline payment · signed contract',
      'plan.ent_sub_pricing': 'Offline payment · contract required',
      'plan.feat_everything_pro': 'Everything in Professional',
      'plan.feat_lifetime': '<strong style="color:var(--color-text);">Lifetime license</strong> — no renewal',
      'plan.feat_training': 'AI workflow training &amp; onboarding',
      'plan.feat_custom_scripts': 'Custom AI scripts &amp; reports',
      'plan.feat_priority_support': 'Priority support via Feishu',
      'plan.feat_contract': 'Signed service contract',
      'plan.ent_btn': 'Contact Us',

      // Download
      'download.label': 'Download',
      'download.title': 'Ready to automate?',
      'download.desc': 'TweetPilot is a native macOS app. Download, install, and connect your accounts in minutes.',
      'download.btn': 'Download .dmg for macOS',
      'download.ext_link': 'Also install TweetClaw Chrome Extension',
      'download.req': 'macOS 12 Monterey or later · Apple Silicon &amp; Intel',

      // Footer
      'footer.copyright': '© 2026 TweetPilot. All rights reserved.',
      'footer.terms': 'Terms of Service',
      'footer.privacy': 'Privacy Policy',
      'footer.refund': 'Refund Policy',
      'footer.contact': 'Contact',

      // Contact modal
      'modal.title': 'Get in Touch',
      'modal.sub': 'Reach us via email or scan the Feishu QR code below',
      'modal.email_label': 'Email',
      'modal.feishu_label': 'Feishu / Lark',
      'modal.send': 'Send',
      'modal.copy': 'Copy',
      'modal.copied': 'Copied',
      'modal.qr_hint': 'Scan with Feishu app to start a conversation',

      // Pricing page header
      'pp.label': 'Pricing',
      'pp.title_before': 'Simple, ',
      'pp.title_gradient': 'transparent',
      'pp.title_after': ' pricing',
      'pp.sub': 'Start for free. Upgrade when you need scheduled automation and AI-powered remote conversations.',

      // FAQ
      'faq.title': 'Frequently asked questions',
      'faq.q1': 'What does the free plan include?',
      'faq.a1': 'The free plan lets you manage multiple Twitter/X accounts, run Python scripts manually, use the TweetClaw browser extension or X API, and build workspaces with Data Blocks. The only limitations are scheduled (automatic) tasks and the AI remote conversation agent — those require a paid license.',
      'faq.q2': 'How many devices can I use per license?',
      'faq.a2': 'Each Professional license supports up to 2 devices simultaneously. If you need more devices, you can purchase additional licenses.',
      'faq.q3': 'What happens when my annual license expires?',
      'faq.a3': 'When your license expires, your account reverts to the free plan. All your data, workspaces, and scripts remain intact — you just lose access to scheduled tasks and the AI conversation agent until you renew.',
      'faq.q4': 'What is the Enterprise Lifetime plan?',
      'faq.a4': 'The Lifetime plan is an offline, contract-based arrangement designed for businesses or power users who want a permanent license plus hands-on services: AI workflow training, custom report development, and dedicated script writing. Payment is handled offline with a signed service contract. Contact us at ribencong@gmail.com or via Feishu to discuss.',
      'faq.q5': 'Do you offer refunds?',
      'faq.a5': 'Yes. We offer a 7-day refund for annual licenses if you are not satisfied. See our <a href="/refund.html" style="color:var(--color-secondary);">Refund Policy</a> for details.',
      'faq.q6': 'Is my data stored on your servers?',
      'faq.a6': 'No. TweetPilot runs entirely locally on your macOS device. Your credentials, scripts, and workspaces never leave your machine. License validation is the only network call made to our servers.',
    },

    zh: {
      // Page titles
      'index.title': 'TweetPilot — AI 驱动的 Twitter 自动化',
      'pricing.title': '价格 — TweetPilot',

      // Nav
      'nav.features': '功能特点',
      'nav.how_it_works': '工作原理',
      'nav.ai_engine': 'AI 引擎',
      'nav.pricing': '价格',
      'nav.download': '下载',
      'nav.download_free': '免费下载',

      // Hero
      'hero.badge': 'AI 驱动的 Twitter 自动化 · macOS',
      'hero.h1_line1': '你的 Twitter 工作流，',
      'hero.h1_gradient': '全面自动化',
      'hero.sub': 'TweetPilot 是一款 macOS 桌面应用，让 AI 代理管理你的 Twitter/X —— 定时发布、分析账号、运行 Python 脚本，一切在一个智能工作空间中完成。',
      'hero.btn_download': '下载 macOS 版',
      'hero.btn_extension': '获取 TweetClaw 扩展',
      'hero.meta_local': '本地运行于 macOS',
      'hero.meta_scheduled': '定时自动化',
      'hero.meta_multi': '多账号支持',

      // App mockup
      'mockup.workspaces': '工作空间',
      'mockup.main_workspace': '主工作空间',
      'mockup.growth_campaign': '增长计划',
      'mockup.content_schedule': '内容计划',
      'mockup.accounts': '账号',
      'mockup.active_tasks': '活跃任务',
      'mockup.task1_name': '自动回复提及',
      'mockup.task1_meta': 'mention_reply.py · 每15分钟执行',
      'mockup.task2_name': '每日增长报告',
      'mockup.task2_meta': 'growth_report.py · 每夥09:00定时',
      'mockup.task3_name': '热点搜索并发布',
      'mockup.task3_meta': 'trend_post.py · 数2小时执行',
      'mockup.badge_sched': '定时',
      'mockup.ai_agent': 'TweetPilot Agent',
      'mockup.ai_msg': '发现3个热门话题，正在为 @user 的提及起草回复…',

      // Stats
      'stats.ai_providers': 'AI 提供商',
      'stats.x_modes': 'X 访问模式',
      'stats.scheduled': '定时任务',
      'stats.local': '本地 & 私密',

      // Features
      'features.label': '功能能力',
      'features.title': '统治 Twitter/X<br />所需的一切',
      'features.desc': '以 AI 为核心的全功能桌面工作空间 —— 专为追求完全控制的高级用户打造。',
      'feat1.title': 'AI 驱动的聊天界面',
      'feat1.desc': '直接与 AI 代理对话。让它搜索推文、分析账号、起草内容或执行任何 Twitter 操作 —— 全程通过自然语言交流。',
      'feat2.title': '任务调度',
      'feat2.desc': '设置灵活的间隔或 cron 定时任务。自动运行 Python 脚本 —— 在流量高峰期发布、监控关键词、发送报告。',
      'feat3.title': '多账号管理',
      'feat3.desc': '在一处管理多个 Twitter/X 账号，即时切换上下文。每个账号在独立工作空间中运行，拥有专属凭证。',
      'feat4.title': 'Python 脚本执行',
      'feat4.desc': '编写并运行与 Twitter 交互的 Python 脚本。完整访问 TweetPilot SDK —— 以编程方式搜索、发布、转推、关注和分析数据。',
      'feat5.title': '数据块',
      'feat5.desc': '构建直接馈入 AI 会话的结构化知识库。存储人设、模板、目标受众和品牌指南，确保输出一致。',
      'feat6.title': '飞书 / Lark 集成',
      'feat6.desc': '将 TweetPilot 连接到飞书（Lark）机器人。在企业消息频道中直接接收自动化报告、警报和摘要。',

      // How It Works
      'hiw.label': '工作架构',
      'hiw.title': '两种方式连接 X',
      'hiw.desc': 'TweetPilot 同时支持通过 TweetClaw 的浏览器自动化和直接 API 访问 —— 选择适合你的方式。',
      'hiw.ext_badge': 'Chrome 扩展模式',
      'hiw.ext_title': 'TweetClaw 桥接',
      'hiw.ext_desc': '使用 TweetClaw Chrome 扩展作为本地 WebSocket 桥接。TweetPilot 直接连接到你已登录的浏览器会话 —— 无需 API 密钥，无速率限制烦恰。',
      'hiw.ext_step1': '从应用商店安装 <strong>TweetClaw</strong> Chrome 扩展',
      'hiw.ext_step2': '在 Chrome 中打开 Twitter/X —— 扩展会在 20086 端口启动本地 <strong>WebSocket 服务器</strong>',
      'hiw.ext_step3': 'TweetPilot 通过 LocalBridge 连接，可使用你的浏览器会话进行<strong>读取、发布、搜索和交互</strong>',
      'hiw.ext_link': '从 Chrome 应用商店安装 TweetClaw',
      'hiw.api_badge': '官方 X API 模式',
      'hiw.api_title': '直连 X API',
      'hiw.api_desc': '使用官方 X API 凭证（OAuth 2.0 或 API 密钥）连接，获得企业级可靠性。使用你自己的开发者应用凭证完整访问所有 X API 端点。',
      'hiw.api_step1': '在 <strong>developer.twitter.com</strong> 创建应用并获取 API 密钥',
      'hiw.api_step2': '在 TweetPilot 设置中填入 <strong>Consumer Key、Secret 和 OAuth 令牌</strong>',
      'hiw.api_step3': 'TweetPilot 直接调用 X API —— 支持 <strong>v1.1 和 v2 端点</strong>，自动管理凭证',

      // AI Engine
      'ai.label': 'AI 引擎',
      'ai.title': '接入你自己的 AI 模型',
      'ai.desc': 'TweetPilot 不绑定特定模型。连接 Claude、GPT-4、本地 Ollama 模型或任何兼容 OpenAI 的 API。切换提供商无需改变工作流。',
      'ai.provider1_name': 'Anthropic Claude',
      'ai.provider1_desc': 'Claude 3 Opus / Sonnet',
      'ai.provider2_name': 'OpenAI',
      'ai.provider2_desc': 'GPT-4o / GPT-4 Turbo',
      'ai.provider3_name': 'Ollama',
      'ai.provider3_desc': '本地模型，100% 私密',
      'ai.provider4_name': '自定义 API',
      'ai.provider4_desc': '任何兼容 OpenAI 的端点',
      'ai.chat_header': 'AI 会话 · 主工作空间',
      'ai.chat_user_msg': '搜索过24小时内关于“AI automation”的推文，并点赞互动最高的5条',
      'ai.chat_agent_name': 'TweetPilot Agent',
      'ai.chat_searching': '正在搜索过24小时内关于“AI automation”的推文…',
      'ai.chat_result_label': '结果',
      'ai.chat_found': '找到47条推文，已按互动分数筛选出動5条，正在点赞…',
      'ai.chat_done': '✓ 已成功点赞5条推文',

      // Integrations
      'int.label': '集成',
      'int.title': '与你的技术栈无缝集成',
      'int.twitter_desc': '通过 TweetClaw 或官方 X API 完整读写',
      'int.tweetclaw_desc': 'Chrome 扩展 WebSocket 桥接，实现免 API 访问',
      'int.feishu_desc': '向企业飞书机器人推送报告和通知',
      'int.python_desc': '使用 TweetPilot 本地 SDK 执行自定义自动化脚本',

      // Pricing section (index)
      'pricing.label': '价格',
      'pricing.title': '简单透明的定价',
      'pricing.desc': '免费开始。当你需要定时自动化和 AI 远程对话时再升级。',
      'pricing.view_full': '查看完整定价和 FAQ',

      // Plan — Free
      'plan.free_badge': '免费',
      'plan.free_name': '入门版',
      'plan.free_sub': '永久免费，无需信用卡',
      'plan.feat_multi_account': '多账号管理',
      'plan.feat_manual_task': '手动任务执行',
      'plan.feat_python': 'Python 脚本运行器',
      'plan.feat_x_api': 'X API 和 TweetClaw 支持',
      'plan.feat_workspace': '工作空间和数据块',
      'plan.feat_scheduled_no': '定时任务（间隔和 cron）',
      'plan.feat_ai_agent_no': 'AI 远程对话代理',
      'plan.feat_feishu_no': '飞书 / Lark 集成',
      'plan.free_btn': '免费下载',

      // Plan — Pro
      'plan.pro_badge': '最受欢迎',
      'plan.pro_name': '专业版',
      'plan.pro_period': '/ 年',
      'plan.pro_sub': '1 个许可证 · 最夷2台设备 · 1年',
      'plan.feat_everything_starter': '包含入门版所有功能',
      'plan.feat_scheduled': '<strong style="color:var(--color-text);">定时任务</strong> — 间隔和 cron',
      'plan.feat_ai_agent': '<strong style="color:var(--color-text);">AI 远程对话</strong>代理',
      'plan.feat_feishu_bot': '飞书 / Lark 机器人集成',
      'plan.feat_2devices': '每个许可证2台设备',
      'plan.feat_email_support': '邮件支持',
      'plan.feat_12months': '许可证有效期12个月',
      'plan.pro_btn': '购买许可证 — $300/年',

      // Plan — Enterprise
      'plan.ent_badge': '企业版',
      'plan.ent_name': '终身版 & 定制',
      'plan.ent_price': '定制报价',
      'plan.ent_sub_index': '线下付款 · 签署合同',
      'plan.ent_sub_pricing': '线下付款 · 需签合同',
      'plan.feat_everything_pro': '包含专业版所有功能',
      'plan.feat_lifetime': '<strong style="color:var(--color-text);">终身许可证</strong> — 无需续费',
      'plan.feat_training': 'AI 工作流培训和入门指导',
      'plan.feat_custom_scripts': '定制 AI 脚本和报告',
      'plan.feat_priority_support': '通过飞书提供优先支持',
      'plan.feat_contract': '签署服务合同',
      'plan.ent_btn': '联系我们',

      // Download
      'download.label': '下载',
      'download.title': '准备好自动化了吗？',
      'download.desc': 'TweetPilot 是原生 macOS 应用。几分钟内即可下载、安装并连接你的账号。',
      'download.btn': '下载 macOS .dmg',
      'download.ext_link': '同时安装 TweetClaw Chrome 扩展',
      'download.req': 'macOS 12 Monterey 或更高版本 · Apple Silicon 和 Intel',

      // Footer
      'footer.copyright': '© 2026 TweetPilot. 保留所有权利。',
      'footer.terms': '服务条款',
      'footer.privacy': '隐私政策',
      'footer.refund': '退款政策',
      'footer.contact': '联系我们',

      // Contact modal
      'modal.title': '联系我们',
      'modal.sub': '通过邮件或扫描下方飞书二维码联系我们',
      'modal.email_label': '邮件',
      'modal.feishu_label': '飞书 / Lark',
      'modal.send': '发送',
      'modal.copy': '复制',
      'modal.copied': '已复制',
      'modal.qr_hint': '用飞书扫码开始对话',

      // Pricing page header
      'pp.label': '价格',
      'pp.title_before': '简单，',
      'pp.title_gradient': '透明',
      'pp.title_after': '的定价',
      'pp.sub': '免费开始。当你需要定时自动化和 AI 远程对话时再升级。',

      // FAQ
      'faq.title': '常见问题',
      'faq.q1': '免费计划包含哪些内容？',
      'faq.a1': '免费计划允许你管理多个 Twitter/X 账号、手动运行 Python 脚本、使用 TweetClaw 浏览器扩展或 X API，以及使用数据块构建工作空间。唯一限制是定时（自动）任务和 AI 远程对话代理 —— 这些功能需要付费许可证。',
      'faq.q2': '每个许可证可以使用多少台设备？',
      'faq.a2': '每个专业版许可证最多支持2台设备同时使用。如果需要更多设备，可以购买额外的许可证。',
      'faq.q3': '年度许可证到期后会怎样？',
      'faq.a3': '许可证到期后，你的账号将恢复到免费计划。所有数据、工作空间和脚本均完好保留 —— 只是失去定时任务和 AI 对话代理的访问权限，续费后即可恢复。',
      'faq.q4': '什么是企业终身计划？',
      'faq.a4': '终身计划是一种线下、基于合同的安排，专为需要永久许可证及实操服务的企业或高级用户设计：AI 工作流培训、定制报告开发和专属脚本编写。付款通过线下签署服务合同进行。请通过 ribencong@gmail.com 或飞书联系我们洽谈。',
      'faq.q5': '是否提供退款？',
      'faq.a5': '是的。如果不满意，我们为年度许可证提供7天退款保障。详情请查看我们的<a href="/refund.html" style="color:var(--color-secondary);">退款政策</a>。',
      'faq.q6': '我的数据会存储在你们的服务器上吗？',
      'faq.a6': '不会。TweetPilot 完全在你的 macOS 设备上本地运行。你的凭证、脚本和工作空间永远不会离开你的设备。向我们服务器发出的唯一网络请求是许可证验证。',
    }
  };

  /* ─── Core engine ────────────────────────────────────────────── */
  /* Language priority:
   * 1. User's explicit choice (saved in localStorage)
   * 2. Browser / OS language (navigator.language)
   * 3. Fallback → 'en'
   */
  function detectBrowserLang() {
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return nav.startsWith('zh') ? 'zh' : 'en';
  }
  var lang = localStorage.getItem('tp_lang') || detectBrowserLang();

  function t(key) {
    return (T[lang] && T[lang][key]) || (T['en'] && T['en'][key]) || key;
  }

  function applyTranslations() {
    // textContent
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    // innerHTML (for <strong>, <br/>, <a> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    // Page title
    var titleKey = document.documentElement.getAttribute('data-title-key');
    if (titleKey) document.title = t(titleKey);
    // html lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    // Toggle button label
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'en' ? '中文' : 'EN';
  }

  /* Expose globally so inline onclick handlers can call toggleLang() */
  window.toggleLang = function () {
    lang = lang === 'en' ? 'zh' : 'en';
    localStorage.setItem('tp_lang', lang);
    applyTranslations();
  };

  /* Expose t() so inline scripts (e.g. copyEmail) can use it */
  window.i18n = { t: t };

  document.addEventListener('DOMContentLoaded', applyTranslations);
})();
